import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { put, list } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";

// Blob storage keys for production (shared across all serverless instances)
const BLOB_KEY = "scentdesk/daily-brief.json";
const BLOB_HISTORY_PREFIX = "scentdesk/briefs/";

// Local dev: filesystem cache
const LOCAL_BRIEF_PATH = path.join(process.cwd(), ".cache", "daily-brief.json");

export interface BriefInsight {
  emoji: string;
  category: string;
  headline: string;
  detail: string;
  sourceUrl?: string;
  source?: string;
}

export interface DailyBrief {
  generatedAt: string;
  insights: BriefInsight[];
  summary: string;
  newsCount: number;
}

/* ─── Storage helpers ─── */

/**
 * Read the brief from persistent storage.
 * Production → Vercel Blob (shared across all instances)
 * Local dev  → filesystem (.cache/)
 */
async function readBrief(): Promise<DailyBrief | null> {
  // Production: use Vercel Blob if token is available
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({ prefix: BLOB_KEY, limit: 1 });
      if (blobs.length === 0) return null;
      const res = await fetch(blobs[0].url, { cache: "no-store" });
      if (!res.ok) return null;
      return res.json();
    } catch (err) {
      console.error("Blob read failed:", err);
      return null;
    }
  }

  // Fallback: try /tmp (same-instance only, not reliable across deploys)
  if (process.env.NODE_ENV === "production") {
    try {
      const raw = await fs.readFile("/tmp/scentdesk-daily-brief.json", "utf-8");
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  // Local dev: filesystem
  try {
    const raw = await fs.readFile(LOCAL_BRIEF_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Write the brief to persistent storage.
 * Production → Vercel Blob + /tmp fallback
 * Local dev  → filesystem (.cache/)
 */
async function writeBrief(brief: DailyBrief): Promise<void> {
  const json = JSON.stringify(brief, null, 2);

  // Production: Vercel Blob (primary) + /tmp (secondary)
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    // Write latest brief (overwrite existing)
    await put(BLOB_KEY, json, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });

    // Also save a dated snapshot for history (e.g. scentdesk/briefs/2026-03-05.json)
    // Each day's latest brief overwrites earlier briefs from the same day
    const dateKey = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    await put(`${BLOB_HISTORY_PREFIX}${dateKey}.json`, json, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });

    // Also write to /tmp as a fast local cache for same-instance reads
    try {
      await fs.writeFile("/tmp/scentdesk-daily-brief.json", json);
    } catch { /* /tmp write is best-effort */ }
    return;
  }

  // Production without Blob: /tmp only (not reliable)
  if (process.env.NODE_ENV === "production") {
    try {
      await fs.writeFile("/tmp/scentdesk-daily-brief.json", json);
    } catch { /* best-effort */ }
    return;
  }

  // Local dev: filesystem
  const dir = path.dirname(LOCAL_BRIEF_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(LOCAL_BRIEF_PATH, json);
}

/* ─── Route handlers ─── */

/**
 * GET → Return the latest cached brief (used by the widget)
 *   ?date=2026-03-05 → Return brief from that date
 *   ?history=true    → Return list of available brief dates
 * POST → Generate a new brief via Claude (called by Vercel Cron)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date");
    const historyParam = searchParams.get("history");

    // List available brief dates
    if (historyParam === "true" && process.env.BLOB_READ_WRITE_TOKEN) {
      const { blobs } = await list({ prefix: BLOB_HISTORY_PREFIX, limit: 90 });
      const dates = blobs
        .map((b) => {
          const match = b.pathname.match(/(\d{4}-\d{2}-\d{2})\.json$/);
          return match ? { date: match[1], url: b.url, size: b.size } : null;
        })
        .filter(Boolean)
        .sort((a, b) => b!.date.localeCompare(a!.date));

      return NextResponse.json({ dates, count: dates.length });
    }

    // Fetch brief for a specific date
    if (dateParam && process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { blobs } = await list({ prefix: `${BLOB_HISTORY_PREFIX}${dateParam}`, limit: 1 });
        if (blobs.length > 0) {
          const res = await fetch(blobs[0].url, { cache: "no-store" });
          if (res.ok) {
            const brief = await res.json();
            return NextResponse.json(brief);
          }
        }
      } catch { /* fall through to fallback */ }
      return NextResponse.json({ error: "No brief found for this date" }, { status: 404 });
    }

    // Default: return latest brief
    const brief = await readBrief();
    if (brief && brief.insights?.length > 0) {
      return NextResponse.json(brief, {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
        },
      });
    }
    return NextResponse.json(fallbackBrief());
  } catch {
    return NextResponse.json(fallbackBrief());
  }
}

export async function POST(request: Request) {
  // Verify cron secret to prevent unauthorized triggers
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Fetch the latest news from our own RSS endpoint
    // Use the request's origin so it works regardless of DNS state
    const requestUrl = new URL(request.url);
    const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`;

    const [newsRes, regRes] = await Promise.allSettled([
      fetch(`${baseUrl}/api/news`, { cache: "no-store" }).then((r) => r.json()),
      fetch(`${baseUrl}/api/regulatory`, { cache: "no-store" }).then((r) => r.json()),
    ]);

    const newsData =
      newsRes.status === "fulfilled" ? newsRes.value.news || [] : [];
    const regData =
      regRes.status === "fulfilled" ? regRes.value.updates || [] : [];

    const totalItems = newsData.length + regData.length;

    if (totalItems === 0) {
      return NextResponse.json({
        status: "skipped",
        reason: "No news items available",
        debug: {
          baseUrl,
          newsStatus: newsRes.status,
          regStatus: regRes.status,
          newsError: newsRes.status === "rejected" ? String(newsRes.reason) : null,
          regError: regRes.status === "rejected" ? String(regRes.reason) : null,
        },
      });
    }

    // 2. Build a condensed prompt of headlines for Claude (including URLs for source attribution)
    const headlines = newsData
      .slice(0, 30)
      .map(
        (n: { title: string; source: string; category: string; sentiment?: string; url?: string }, idx: number) =>
          `${idx + 1}. [${n.category}] ${n.title} (${n.source}) — sentiment: ${n.sentiment || "neutral"}${n.url ? ` | url: ${n.url}` : ""}`
      )
      .join("\n");

    const regHeadlines = regData
      .slice(0, 10)
      .map(
        (r: { title: string; body: string; severity: string; region: string; url?: string }, idx: number) =>
          `${idx + 1}. [${r.severity.toUpperCase()}] ${r.title} (${r.body}, ${r.region})${r.url ? ` | url: ${r.url}` : ""}`
      )
      .join("\n");

    // 3. Call Claude Haiku for cost-efficient analysis
    const client = new Anthropic();

    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 2048,
      system: `You are ScentDesk's intelligence analyst for the fragrance industry. Analyze today's news headlines and generate a concise daily brief. You must respond with ONLY valid JSON — no markdown, no code fences, no explanation text.

JSON format:
{
  "summary": "One sentence overview of today's most important theme (max 120 chars)",
  "insights": [
    {
      "emoji": "📈",
      "category": "Market",
      "headline": "Short punchy headline (max 60 chars)",
      "detail": "1-2 sentence explanation with key facts (max 180 chars)",
      "sourceUrl": "https://example.com/article-url",
      "source": "Source Name"
    }
  ]
}

Rules:
- Generate exactly 4-5 insights covering different categories
- Categories to consider: Market, Deals, Regulatory, Supply Chain, Launches, Ingredients
- Use appropriate emoji for each category: 📈 Market, 🤝 Deals, ⚖️ Regulatory, 🔗 Supply Chain, 🚀 Launches, 🧪 Ingredients
- Focus on what matters to perfumers and fragrance business professionals
- Be concise and data-driven — no fluff
- If regulatory items have high severity, prioritize them
- For each insight, include the "sourceUrl" and "source" from the MOST relevant headline that inspired it. Use the exact url provided in the headline data. If no url is available, omit the sourceUrl field.`,
      messages: [
        {
          role: "user",
          content: `Today's fragrance industry headlines (${new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}):

NEWS (${newsData.length} items):
${headlines}

REGULATORY (${regData.length} items):
${regHeadlines || "No new regulatory updates today."}

Generate the daily intelligence brief as JSON.`,
        },
      ],
    });

    // 4. Parse Claude's response (with robust JSON extraction)
    const textBlock = response.content.find((b) => b.type === "text");
    const rawText = textBlock?.text || "";

    let parsed: { summary: string; insights: BriefInsight[] };

    // Clean the text: remove code fences, trailing commas, control characters
    const cleanJson = (text: string): string => {
      return text
        .replace(/```json\s*/g, "")
        .replace(/```\s*/g, "")
        .replace(/,\s*([\]}])/g, "$1")  // Remove trailing commas before ] or }
        .trim();
    };

    try {
      parsed = JSON.parse(cleanJson(rawText));
    } catch {
      // Try extracting JSON object from the text
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          parsed = JSON.parse(cleanJson(jsonMatch[0]));
        } catch {
          throw new Error(`Failed to parse Claude response as JSON: ${rawText.slice(0, 200)}`);
        }
      } else {
        throw new Error("No JSON found in Claude response");
      }
    }

    // 5. Build and save the brief
    const brief: DailyBrief = {
      generatedAt: new Date().toISOString(),
      insights: parsed.insights.slice(0, 5),
      summary: parsed.summary,
      newsCount: totalItems,
    };

    // Write to persistent storage (Vercel Blob in production)
    await writeBrief(brief);

    return NextResponse.json({
      status: "success",
      storage: process.env.BLOB_READ_WRITE_TOKEN ? "vercel-blob" : "tmp",
      brief,
      tokensUsed: {
        input: response.usage.input_tokens,
        output: response.usage.output_tokens,
      },
    });
  } catch (error) {
    console.error("Daily brief generation failed:", error);
    return NextResponse.json(
      {
        error: "Brief generation failed",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/** Fallback brief used when no AI-generated brief exists yet */
function fallbackBrief(): DailyBrief {
  return {
    generatedAt: new Date().toISOString(),
    insights: [
      {
        emoji: "📈",
        category: "Market",
        headline: "Global fragrance market continues growth trajectory",
        detail:
          "Industry analysts project steady expansion across premium and niche segments through 2026.",
      },
      {
        emoji: "⚖️",
        category: "Regulatory",
        headline: "IFRA standards update cycle ongoing",
        detail:
          "The 50th Amendment is expected later this year with new ingredient restrictions under review.",
      },
      {
        emoji: "🧪",
        category: "Ingredients",
        headline: "Natural ingredient sourcing under pressure",
        detail:
          "Climate and supply chain factors continue to impact vanilla, sandalwood, and vetiver availability.",
      },
      {
        emoji: "🚀",
        category: "Launches",
        headline: "Niche perfumery driving innovation",
        detail:
          "Independent houses are leading with novel ingredient combinations and sustainable formulations.",
      },
    ],
    summary:
      "Fragrance industry balances growth momentum with regulatory and supply chain headwinds.",
    newsCount: 0,
  };
}
