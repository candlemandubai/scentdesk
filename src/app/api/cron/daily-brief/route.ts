import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { promises as fs } from "fs";
import path from "path";

// Brief storage location — /tmp for serverless, .cache for local dev
const BRIEF_PATH =
  process.env.NODE_ENV === "production"
    ? "/tmp/scentdesk-daily-brief.json"
    : path.join(process.cwd(), ".cache", "daily-brief.json");

export interface BriefInsight {
  emoji: string;
  category: string;
  headline: string;
  detail: string;
}

export interface DailyBrief {
  generatedAt: string;
  insights: BriefInsight[];
  summary: string;
  newsCount: number;
}

/**
 * GET  → Return the latest cached brief (used by the widget)
 * POST → Generate a new brief via Claude (called by Vercel Cron)
 */
export async function GET() {
  try {
    const raw = await fs.readFile(BRIEF_PATH, "utf-8");
    const brief: DailyBrief = JSON.parse(raw);
    return NextResponse.json(brief);
  } catch {
    // No brief generated yet — return fallback
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
    const baseUrl =
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";

    const [newsRes, regRes] = await Promise.allSettled([
      fetch(`${baseUrl}/api/news`).then((r) => r.json()),
      fetch(`${baseUrl}/api/regulatory`).then((r) => r.json()),
    ]);

    const newsData =
      newsRes.status === "fulfilled" ? newsRes.value.news || [] : [];
    const regData =
      regRes.status === "fulfilled" ? regRes.value.updates || [] : [];

    const totalItems = newsData.length + regData.length;

    if (totalItems === 0) {
      // Nothing to analyze — keep existing brief or save fallback
      return NextResponse.json({
        status: "skipped",
        reason: "No news items available",
      });
    }

    // 2. Build a condensed prompt of headlines for Claude
    const headlines = newsData
      .slice(0, 30)
      .map(
        (n: { title: string; source: string; category: string; sentiment?: string }) =>
          `[${n.category}] ${n.title} (${n.source}) — sentiment: ${n.sentiment || "neutral"}`
      )
      .join("\n");

    const regHeadlines = regData
      .slice(0, 10)
      .map(
        (r: { title: string; body: string; severity: string; region: string }) =>
          `[${r.severity.toUpperCase()}] ${r.title} (${r.body}, ${r.region})`
      )
      .join("\n");

    // 3. Call Claude Haiku for cost-efficient analysis
    const client = new Anthropic();

    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      system: `You are ScentDesk's intelligence analyst for the fragrance industry. Analyze today's news headlines and generate a concise daily brief. You must respond with ONLY valid JSON — no markdown, no code fences, no explanation text.

JSON format:
{
  "summary": "One sentence overview of today's most important theme (max 120 chars)",
  "insights": [
    {
      "emoji": "📈",
      "category": "Market",
      "headline": "Short punchy headline (max 60 chars)",
      "detail": "1-2 sentence explanation with key facts (max 180 chars)"
    }
  ]
}

Rules:
- Generate exactly 4-5 insights covering different categories
- Categories to consider: Market, M&A, Regulatory, Supply Chain, Launches, Raw Materials
- Use appropriate emoji for each category: 📈 Market, 🤝 M&A, ⚖️ Regulatory, 🔗 Supply Chain, 🚀 Launches, 🧪 Raw Materials
- Focus on what matters to perfumers and fragrance business professionals
- Be concise and data-driven — no fluff
- If regulatory items have high severity, prioritize them`,
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

    // 4. Parse Claude's response
    const textBlock = response.content.find((b) => b.type === "text");
    const rawText = textBlock?.text || "";

    let parsed: { summary: string; insights: BriefInsight[] };
    try {
      parsed = JSON.parse(rawText);
    } catch {
      // Try extracting JSON from possible markdown code fence
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse Claude response as JSON");
      }
    }

    // 5. Build and save the brief
    const brief: DailyBrief = {
      generatedAt: new Date().toISOString(),
      insights: parsed.insights.slice(0, 5),
      summary: parsed.summary,
      newsCount: totalItems,
    };

    // Ensure directory exists
    const dir = path.dirname(BRIEF_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(BRIEF_PATH, JSON.stringify(brief, null, 2));

    return NextResponse.json({
      status: "success",
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
        category: "Raw Materials",
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
