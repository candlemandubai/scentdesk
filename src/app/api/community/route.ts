import { NextResponse } from "next/server";
import Parser from "rss-parser";
import { stripHtml } from "@/lib/sanitize";

const parser = new Parser({
  timeout: 8000,
  headers: {
    "User-Agent": "ScentDesk/1.0 (Fragrance Industry Terminal)",
  },
});

interface CommunitySource {
  url: string;
  name: string;
  platform: "reddit" | "forum" | "blog";
  icon: string;
}

const COMMUNITY_FEEDS: CommunitySource[] = [
  // Reddit fragrance communities
  { url: "https://www.reddit.com/r/fragrance/hot/.rss", name: "r/fragrance", platform: "reddit", icon: "💬" },
  { url: "https://www.reddit.com/r/fragranceswap/hot/.rss", name: "r/fragranceswap", platform: "reddit", icon: "🔄" },
  { url: "https://www.reddit.com/r/Colognes/hot/.rss", name: "r/Colognes", platform: "reddit", icon: "💬" },
  { url: "https://www.reddit.com/r/Perfumes/hot/.rss", name: "r/Perfumes", platform: "reddit", icon: "💬" },
  { url: "https://www.reddit.com/r/DIYfragrance/hot/.rss", name: "r/DIYfragrance", platform: "reddit", icon: "🧪" },
  { url: "https://www.reddit.com/r/indiemakeupandmore/hot/.rss", name: "r/indiemakeupandmore", platform: "reddit", icon: "🌿" },
  // Candle & home fragrance communities
  { url: "https://www.reddit.com/r/candlemaking/hot/.rss", name: "r/candlemaking", platform: "reddit", icon: "🕯️" },
  { url: "https://www.reddit.com/r/Candles/hot/.rss", name: "r/Candles", platform: "reddit", icon: "🕯️" },
  { url: "https://www.reddit.com/r/candlemakers/hot/.rss", name: "r/candlemakers", platform: "reddit", icon: "🕯️" },
  { url: "https://www.reddit.com/r/scentedcandles/hot/.rss", name: "r/scentedcandles", platform: "reddit", icon: "🕯️" },
  { url: "https://www.reddit.com/r/waxmelts/hot/.rss", name: "r/waxmelts", platform: "reddit", icon: "🫠" },
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

function guessTag(title: string): string {
  const t = title.toLowerCase();
  if (/sotd|scent of the day|wearing today|what are you wearing/i.test(t)) return "SOTD";
  if (/recommend|suggestion|help me find|looking for/i.test(t)) return "Recommend";
  if (/review|first impression|thoughts on/i.test(t)) return "Review";
  if (/collection|haul|mail call|just arrived/i.test(t)) return "Collection";
  if (/deal|sale|discount|coupon|split/i.test(t)) return "Deal";
  if (/diy|recipe|formula|blend|mixing/i.test(t)) return "DIY";
  if (/candle|wax|wick|pour/i.test(t)) return "Candles";
  if (/news|launch|new release|just dropped/i.test(t)) return "News";
  if (/swap|trade|sell|buy|wtb|wts/i.test(t)) return "Swap";
  return "Discussion";
}

export async function GET() {
  try {
    const feedPromises = COMMUNITY_FEEDS.map(async (feed) => {
      try {
        const parsed = await parser.parseURL(feed.url);
        return (parsed.items || []).slice(0, 8).map((item, idx) => {
          const rawTitle = stripHtml(item.title || "") || "Untitled";

          return {
            id: `${feed.name}-${idx}-${Date.now()}`,
            title: rawTitle,
            community: feed.name,
            platform: feed.platform,
            icon: feed.icon,
            tag: guessTag(rawTitle),
            timestamp: getTimeSince(item.pubDate || item.isoDate || new Date().toISOString()),
            pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
            url: item.link || "#",
            author: item.creator || item["dc:creator"] || "",
          };
        });
      } catch {
        return [];
      }
    });

    const results = await Promise.allSettled(feedPromises);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allPosts = (results as any[])
      .filter((r) => r.status === "fulfilled")
      .flatMap((r) => r.value)
      .sort((a: { pubDate: string }, b: { pubDate: string }) =>
        new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      )
      .slice(0, 40);

    return NextResponse.json({
      posts: allPosts,
      lastUpdated: new Date().toISOString(),
      count: allPosts.length,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch community posts", posts: [], lastUpdated: new Date().toISOString() },
      { status: 500 }
    );
  }
}
