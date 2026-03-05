import { NextResponse } from "next/server";
import Parser from "rss-parser";
import { stripHtml } from "@/lib/sanitize";

const parser = new Parser({
  timeout: 8000,
  headers: {
    "User-Agent": "ScentDesk/1.0 (Fragrance Industry Terminal)",
  },
  customFields: {
    item: [
      ["media:group", "mediaGroup"],
      ["yt:videoId", "videoId"],
    ],
  },
});

interface YouTubeChannel {
  channelId: string;
  name: string;
}

const CHANNELS: YouTubeChannel[] = [
  { channelId: "UCzKrJ5NSA9o7RHYRG12kHZw", name: "Jeremy Fragrance" },
  { channelId: "UC88iYYngvMLb_3obJKMCI3w", name: "Demi Rawling" },
  { channelId: "UCMz0tE1qg5SwmrAF3Cshe0A", name: "The Fragrance Apprentice" },
  { channelId: "UCuSy0Z5UwvkMQ7lXRbUdOnQ", name: "Redolessence" },
  { channelId: "UCCKJhoBHK4Xs5zneLo5qFXg", name: "Brooklyn Fragrance Lover" },
  { channelId: "UCb_KHhZPlnuakJef3zcexEA", name: "Fragrance Du Bois" },
  { channelId: "UCmYZrY_MVZy5Iiwlua029kg", name: "TLTG Reviews" },
  { channelId: "UC9IImcLkUdmURWtQhxu8VwQ", name: "Gents Scents" },
  { channelId: "UC0fOGtvT1x8irPUZOFdF2mA", name: "Chaos Fragrances" },
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
  if (/review|first impression|worth it|thoughts on/i.test(t)) return "Review";
  if (/top \d|best \d|ranking|worst/i.test(t)) return "Top List";
  if (/haul|unboxing|mail|pickup/i.test(t)) return "Haul";
  if (/collection|shelf|display|entire/i.test(t)) return "Collection";
  if (/blind buy|should you buy|buy or skip/i.test(t)) return "Blind Buy";
  if (/summer|winter|spring|fall|autumn|season/i.test(t)) return "Seasonal";
  if (/diy|making|how to|tutorial/i.test(t)) return "Tutorial";
  if (/cheap|affordable|budget|under \$/i.test(t)) return "Budget";
  if (/compliment|date night|sexy|attract/i.test(t)) return "Compliment";
  if (/vs |versus|comparison|battle/i.test(t)) return "Versus";
  return "Video";
}

function extractVideoId(link: string, item: Record<string, unknown>): string {
  // Try yt:videoId field first
  if (item.videoId && typeof item.videoId === "string") return item.videoId;
  // Fallback: extract from URL
  const match = link.match(/[?&]v=([^&]+)/);
  return match ? match[1] : "";
}

export async function GET() {
  try {
    const feedPromises = CHANNELS.map(async (channel) => {
      try {
        const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channel.channelId}`;
        const parsed = await parser.parseURL(feedUrl);
        return (parsed.items || []).slice(0, 3).map((item) => {
          const videoId = extractVideoId(item.link || "", item as unknown as Record<string, unknown>);
          return {
            id: videoId || `${channel.channelId}-${Date.now()}`,
            title: stripHtml(item.title || "") || "Untitled",
            channel: channel.name,
            videoId,
            thumbnail: videoId ? `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg` : "",
            url: item.link || "#",
            tag: guessTag(item.title || ""),
            timestamp: getTimeSince(item.pubDate || item.isoDate || new Date().toISOString()),
            pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
          };
        });
      } catch {
        return [];
      }
    });

    const results = await Promise.allSettled(feedPromises);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allVideos = (results as any[])
      .filter((r) => r.status === "fulfilled")
      .flatMap((r) => r.value)
      .sort((a: { pubDate: string }, b: { pubDate: string }) =>
        new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      )
      .slice(0, 30);

    return NextResponse.json({
      videos: allVideos,
      lastUpdated: new Date().toISOString(),
      count: allVideos.length,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch videos", videos: [], lastUpdated: new Date().toISOString() },
      { status: 500 }
    );
  }
}
