import type { Widget } from "@/types";

export const defaultWidgets: Widget[] = [
  // Feed tab — Intelligence Brief first (compact summary, great for mobile)
  { id: "daily-brief", type: "daily-brief", title: "Intelligence Brief", enabled: true, x: 8, y: 0, w: 4, h: 4, minW: 3, minH: 3, tab: "feed" },
  { id: "news-market", type: "news-market", title: "Market & M&A", enabled: true, x: 0, y: 0, w: 8, h: 5, minW: 4, minH: 3, tab: "feed" },
  { id: "news-launches", type: "news-launches", title: "Launches & Industry", enabled: true, x: 8, y: 4, w: 4, h: 5, minW: 4, minH: 3, tab: "feed" },
  { id: "news-materials", type: "news-materials", title: "Raw Materials & Supply", enabled: true, x: 0, y: 5, w: 4, h: 5, minW: 4, minH: 3, tab: "feed" },
  { id: "news-home", type: "news-home", title: "Home Fragrance", enabled: true, x: 4, y: 5, w: 4, h: 5, minW: 4, minH: 3, tab: "feed" },
  { id: "regulatory-updates", type: "regulatory-updates", title: "Regulatory Updates", enabled: true, x: 0, y: 10, w: 4, h: 5, minW: 3, minH: 3, tab: "feed" },
  { id: "world-clock", type: "world-clock", title: "Fragrance Capitals", enabled: true, x: 4, y: 10, w: 4, h: 3, minW: 4, minH: 2, tab: "feed" },
  { id: "community-feed", type: "community-feed", title: "Community", enabled: true, x: 8, y: 9, w: 4, h: 5, minW: 3, minH: 3, tab: "feed" },
  { id: "youtube-feed", type: "youtube-feed", title: "Fragrance YouTube", enabled: true, x: 4, y: 13, w: 4, h: 5, minW: 4, minH: 3, tab: "feed" },
  { id: "newsletter-signup", type: "newsletter-signup", title: "olfactal.com", enabled: true, x: 8, y: 14, w: 4, h: 3, minW: 3, minH: 3, tab: "feed" },

  // Directory tab — curated real industry data
  { id: "events-calendar", type: "events-calendar", title: "Upcoming Events", enabled: true, x: 0, y: 0, w: 6, h: 5, minW: 4, minH: 3, tab: "directory" },
  { id: "suppliers", type: "suppliers", title: "Suppliers & Houses", enabled: true, x: 6, y: 0, w: 6, h: 5, minW: 4, minH: 3, tab: "directory" },
  { id: "schools", type: "schools", title: "Schools & Programs", enabled: true, x: 0, y: 5, w: 4, h: 4, minW: 3, minH: 3, tab: "directory" },
  { id: "useful-apps", type: "useful-apps", title: "Apps & Resources", enabled: true, x: 4, y: 5, w: 4, h: 4, minW: 3, minH: 3, tab: "directory" },
  { id: "perfumer-spotlight", type: "perfumer-spotlight", title: "Perfumers & Podcasts", enabled: true, x: 8, y: 5, w: 4, h: 4, minW: 3, minH: 3, tab: "directory" },
  { id: "jobs-board", type: "jobs-board", title: "Jobs & Careers", enabled: true, x: 0, y: 9, w: 6, h: 4, minW: 3, minH: 3, tab: "directory" },
];
