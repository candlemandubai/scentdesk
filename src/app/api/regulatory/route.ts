import { NextResponse } from "next/server";
import Parser from "rss-parser";
import { stripHtml, sanitizeUrl } from "@/lib/sanitize";

const parser = new Parser({
  timeout: 8000,
  headers: {
    "User-Agent": "ScentDesk/1.0 (Fragrance Industry Terminal)",
  },
});

interface RegFeedSource {
  url: string;
  body: string;
  region: string;
}

const REGULATORY_FEEDS: RegFeedSource[] = [
  // Google News searches for regulatory topics
  {
    url: "https://news.google.com/rss/search?q=IFRA+fragrance+regulation+OR+cosmetics+safety+amendment&hl=en-US&gl=US&ceid=US:en",
    body: "IFRA",
    region: "Global",
  },
  {
    url: "https://news.google.com/rss/search?q=EU+cosmetics+regulation+OR+REACH+SVHC+fragrance+OR+ECHA+cosmetics&hl=en-US&gl=US&ceid=US:en",
    body: "EU Commission",
    region: "Europe",
  },
  {
    url: "https://news.google.com/rss/search?q=FDA+cosmetics+regulation+OR+MoCRA+fragrance+safety&hl=en-US&gl=US&ceid=US:en",
    body: "FDA",
    region: "North America",
  },
  {
    url: "https://news.google.com/rss/search?q=%22Proposition+65%22+fragrance+OR+California+cosmetics+safety&hl=en-US&gl=US&ceid=US:en",
    body: "CA OEHHA",
    region: "North America",
  },
  {
    url: "https://news.google.com/rss/search?q=NMPA+China+cosmetics+regulation+OR+cosmetics+ingredient+ban&hl=en-US&gl=US&ceid=US:en",
    body: "NMPA",
    region: "Asia",
  },
];

function guessSeverity(title: string): "high" | "medium" | "low" {
  const lower = title.toLowerCase();
  const highWords = ["ban", "restrict", "recall", "prohibited", "suspend", "violation", "mandatory", "svhc", "critical"];
  const medWords = ["amendment", "update", "review", "guidance", "proposal", "limit", "threshold", "new rule"];
  const highScore = highWords.filter((w) => lower.includes(w)).length;
  const medScore = medWords.filter((w) => lower.includes(w)).length;
  if (highScore > 0) return "high";
  if (medScore > 0) return "medium";
  return "low";
}

function getTimeSince(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export async function GET() {
  try {
    const feedPromises = REGULATORY_FEEDS.map(async (feed) => {
      try {
        const parsed = await parser.parseURL(feed.url);
        return (parsed.items || []).slice(0, 8).map((item, idx) => ({
          id: `${feed.body}-${idx}-${Date.now()}`,
          title: stripHtml(item.title || "") || "Untitled",
          body: feed.body,
          date: getTimeSince(item.pubDate || item.isoDate || new Date().toISOString()),
          pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
          severity: guessSeverity(item.title || ""),
          region: feed.region,
          url: sanitizeUrl(item.link || "#"),
        }));
      } catch {
        return [];
      }
    });

    const results = await Promise.allSettled(feedPromises);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allUpdates = (results as any[])
      .filter((r) => r.status === "fulfilled")
      .flatMap((r) => r.value)
      .sort((a: { pubDate: string }, b: { pubDate: string }) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, 25);

    return NextResponse.json({
      updates: allUpdates,
      lastUpdated: new Date().toISOString(),
      count: allUpdates.length,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch regulatory updates", updates: [], lastUpdated: new Date().toISOString() },
      { status: 500 }
    );
  }
}
