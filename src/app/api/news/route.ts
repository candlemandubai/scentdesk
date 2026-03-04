import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser({
  timeout: 8000,
  headers: {
    "User-Agent": "ScentDesk/1.0 (Fragrance Industry Terminal)",
  },
});

interface FeedSource {
  url: string;
  source: string;
  category: string;
}

const RSS_FEEDS: FeedSource[] = [
  // Fragrance & beauty industry feeds
  { url: "https://www.perfumerflavorist.com/rss/all", source: "Perfumer & Flavorist", category: "Industry" },
  { url: "https://www.cosmeticsdesign.com/var/plain_site/storage/rss/news.rss", source: "Cosmetics Design", category: "Industry" },
  { url: "https://www.cosmeticsdesign-europe.com/var/plain_site/storage/rss/news.rss", source: "Cosmetics Design EU", category: "Regulatory" },
  { url: "https://www.globalcosmeticsnews.com/feed/", source: "Global Cosmetics News", category: "Market" },
  { url: "https://www.premiumbeautynews.com/en/?format=feed&type=rss", source: "Premium Beauty News", category: "Launches" },
  // Business/market feeds that cover fragrance/luxury
  { url: "https://www.businessoffashion.com/rss", source: "Business of Fashion", category: "Market" },
  { url: "https://feeds.feedburner.com/beautypackaging/dOWj", source: "Beauty Packaging", category: "Supply Chain" },
  // General Reuters business (filtered for fragrance)
  { url: "https://news.google.com/rss/search?q=fragrance+industry+OR+perfume+market+OR+essential+oils+market&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "Market" },
  { url: "https://news.google.com/rss/search?q=IFRA+OR+fragrance+regulation+OR+cosmetics+regulation&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "Regulatory" },
  { url: "https://news.google.com/rss/search?q=Givaudan+OR+IFF+OR+Firmenich+OR+Symrise+fragrance&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "M&A" },
  { url: "https://news.google.com/rss/search?q=new+perfume+launch+2026+OR+fragrance+launch&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "Launches" },
  { url: "https://news.google.com/rss/search?q=essential+oils+price+OR+raw+materials+fragrance+OR+vanilla+price+OR+sandalwood+price&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "Raw Materials" },
];

function getTimeSince(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function guessSentiment(title: string): "positive" | "negative" | "neutral" {
  const posWords = ["growth", "record", "surge", "boost", "rise", "gain", "expand", "success", "launch", "innovation", "award", "sustainable"];
  const negWords = ["decline", "drop", "fall", "crisis", "restrict", "ban", "shortage", "concern", "risk", "recall", "warning", "loss"];
  const lower = title.toLowerCase();
  const posScore = posWords.filter((w) => lower.includes(w)).length;
  const negScore = negWords.filter((w) => lower.includes(w)).length;
  if (posScore > negScore) return "positive";
  if (negScore > posScore) return "negative";
  return "neutral";
}

function guessRegion(title: string, content?: string): string {
  const text = `${title} ${content || ""}`.toLowerCase();
  if (/europe|eu |france|germany|uk |italy|spain|grasse/i.test(text)) return "Europe";
  if (/us |usa|america|new york|california/i.test(text)) return "North America";
  if (/china|japan|india|asia|korea|singapore/i.test(text)) return "Asia";
  if (/middle east|uae|dubai|saudi|qatar/i.test(text)) return "Middle East";
  if (/brazil|latin|mexico|argentina/i.test(text)) return "Latin America";
  if (/africa|nigeria|south africa|egypt/i.test(text)) return "Africa";
  return "Global";
}

export async function GET() {
  try {
    const feedPromises = RSS_FEEDS.map(async (feed) => {
      try {
        const parsed = await parser.parseURL(feed.url);
        return (parsed.items || []).slice(0, 5).map((item, idx) => ({
          id: `${feed.source}-${idx}-${Date.now()}`,
          title: item.title?.replace(/<[^>]+>/g, "").trim() || "Untitled",
          source: item.creator || feed.source,
          category: feed.category,
          timestamp: getTimeSince(item.pubDate || item.isoDate || new Date().toISOString()),
          pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
          url: item.link || "#",
          sentiment: guessSentiment(item.title || ""),
          region: guessRegion(item.title || "", item.contentSnippet),
        }));
      } catch {
        return [];
      }
    });

    const results = await Promise.allSettled(feedPromises);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allNews = (results as any[])
      .filter((r) => r.status === "fulfilled")
      .flatMap((r) => r.value)
      .sort((a: { pubDate: string }, b: { pubDate: string }) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, 50);

    return NextResponse.json({
      news: allNews,
      lastUpdated: new Date().toISOString(),
      count: allNews.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news", news: [], lastUpdated: new Date().toISOString() },
      { status: 500 }
    );
  }
}
