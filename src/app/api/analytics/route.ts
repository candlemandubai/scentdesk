import { NextResponse } from "next/server";
import { put, head } from "@vercel/blob";

// ─── Vercel Blob–backed analytics store ──────────────────
const BLOB_KEY = "scentdesk/analytics.json";

interface AnalyticsData {
  trafficSources: Record<string, number>;
  widgetInteractions: Record<string, number>;
  tabViews: Record<string, number>;
  events: Array<{
    type: string;
    widget?: string;
    tab?: string;
    source?: string;
    timestamp: number;
  }>;
  dailyViews: Record<string, number>;
}

const EMPTY: AnalyticsData = {
  trafficSources: {},
  widgetInteractions: {},
  tabViews: {},
  events: [],
  dailyViews: {},
};

async function readAnalytics(): Promise<AnalyticsData> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return { ...EMPTY };
  try {
    const blob = await head(BLOB_KEY);
    // Use downloadUrl to bypass CDN caching (token-authenticated, origin-direct)
    const url = blob.downloadUrl || blob.url;
    const res = await fetch(`${url}?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) return { ...EMPTY };
    return res.json();
  } catch {
    // head() throws BlobNotFoundError if blob doesn't exist yet
    return { ...EMPTY };
  }
}

async function writeAnalytics(data: AnalyticsData): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return;
  await put(BLOB_KEY, JSON.stringify(data), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 0, // Disable CDN caching — this blob changes frequently
  });
}

// ─── POST: record events (fire-and-forget from client) ───
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const events: Array<{
      type: string;
      widget?: string;
      tab?: string;
      source?: string;
    }> = Array.isArray(body) ? body : [body];

    const analytics = await readAnalytics();
    const today = new Date().toISOString().split("T")[0];

    for (const evt of events) {
      const { type, widget, tab, source } = evt;

      if (type === "page_view") {
        analytics.dailyViews[today] =
          (analytics.dailyViews[today] || 0) + 1;
        if (source) {
          analytics.trafficSources[source] =
            (analytics.trafficSources[source] || 0) + 1;
        }
      }

      if (type === "widget_click" && widget) {
        analytics.widgetInteractions[widget] =
          (analytics.widgetInteractions[widget] || 0) + 1;
      }

      if (type === "tab_change" && tab) {
        analytics.tabViews[tab] =
          (analytics.tabViews[tab] || 0) + 1;
      }

      analytics.events.push({
        type,
        widget,
        tab,
        source,
        timestamp: Date.now(),
      });
    }

    // Keep last 200 events
    if (analytics.events.length > 200) {
      analytics.events = analytics.events.slice(-200);
    }

    await writeAnalytics(analytics);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}

// ─── GET: retrieve analytics (admin-only) ────────────────
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const analytics = await readAnalytics();
  return NextResponse.json(analytics);
}
