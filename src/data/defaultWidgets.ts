import type { Widget } from "@/types";

export const defaultWidgets: Widget[] = [
  // Market tab
  { id: "news-feed", type: "news-feed", title: "Industry News", enabled: true, x: 0, y: 0, w: 4, h: 4, minW: 3, minH: 3, tab: "market" },
  { id: "market-overview", type: "market-overview", title: "Market Overview", enabled: true, x: 4, y: 0, w: 4, h: 4, minW: 3, minH: 3, tab: "market" },
  { id: "ai-insights", type: "ai-insights", title: "AI Insights", enabled: true, x: 8, y: 0, w: 4, h: 4, minW: 3, minH: 3, tab: "market" },
  { id: "fragrance-index", type: "fragrance-index", title: "Fragrance Index", enabled: true, x: 0, y: 4, w: 3, h: 3, minW: 2, minH: 2, tab: "market" },
  { id: "brand-launches", type: "brand-launches", title: "New Launches", enabled: true, x: 3, y: 4, w: 3, h: 3, minW: 2, minH: 2, tab: "market" },
  { id: "top-sellers", type: "top-sellers", title: "Top Sellers", enabled: true, x: 6, y: 4, w: 3, h: 3, minW: 2, minH: 2, tab: "market" },
  { id: "market-heatmap", type: "market-heatmap", title: "Sector Heatmap", enabled: true, x: 9, y: 4, w: 3, h: 3, minW: 2, minH: 2, tab: "market" },
  { id: "world-clock", type: "world-clock", title: "Fragrance Capitals", enabled: true, x: 0, y: 7, w: 4, h: 3, minW: 3, minH: 2, tab: "market" },
  { id: "regulatory-updates", type: "regulatory-updates", title: "Regulatory Updates", enabled: true, x: 4, y: 7, w: 4, h: 3, minW: 3, minH: 2, tab: "market" },
  { id: "community-feed", type: "community-feed", title: "Community", enabled: true, x: 8, y: 7, w: 4, h: 3, minW: 3, minH: 2, tab: "market" },

  // Raw Materials tab
  { id: "raw-materials-prices", type: "raw-materials-prices", title: "Raw Materials Prices", enabled: true, x: 0, y: 0, w: 6, h: 5, minW: 4, minH: 3, tab: "raw-materials" },
  { id: "supply-chain", type: "supply-chain", title: "Supply Chain Status", enabled: true, x: 6, y: 0, w: 6, h: 5, minW: 4, minH: 3, tab: "raw-materials" },
  { id: "trending-ingredients", type: "trending-ingredients", title: "Trending Ingredients", enabled: true, x: 0, y: 5, w: 4, h: 4, minW: 3, minH: 3, tab: "raw-materials" },
  { id: "sustainability", type: "sustainability", title: "Sustainability Tracker", enabled: true, x: 4, y: 5, w: 4, h: 4, minW: 3, minH: 3, tab: "raw-materials" },
  { id: "regional-data", type: "regional-data", title: "Regional Sourcing", enabled: true, x: 8, y: 5, w: 4, h: 4, minW: 3, minH: 3, tab: "raw-materials" },
  { id: "suppliers", type: "suppliers", title: "Suppliers & Houses", enabled: true, x: 0, y: 9, w: 12, h: 5, minW: 6, minH: 3, tab: "raw-materials" },

  // Home Fragrances tab
  { id: "home-fragrance-market", type: "home-fragrance-market", title: "Home Fragrance Market", enabled: true, x: 0, y: 0, w: 6, h: 4, minW: 4, minH: 3, tab: "home-fragrances" },
  { id: "candles-tracker", type: "candles-tracker", title: "Candles Market", enabled: true, x: 6, y: 0, w: 6, h: 4, minW: 4, minH: 3, tab: "home-fragrances" },
  { id: "diffusers-market", type: "diffusers-market", title: "Diffusers & Sprays", enabled: true, x: 0, y: 4, w: 6, h: 4, minW: 4, minH: 3, tab: "home-fragrances" },
  { id: "room-sprays", type: "room-sprays", title: "Room Sprays & Melts", enabled: true, x: 6, y: 4, w: 6, h: 4, minW: 4, minH: 3, tab: "home-fragrances" },

  // Trends tab
  { id: "seasonal-trends", type: "seasonal-trends", title: "Seasonal Trends", enabled: true, x: 0, y: 0, w: 6, h: 5, minW: 4, minH: 3, tab: "trends" },
  { id: "consumer-trends", type: "consumer-trends", title: "Consumer Trends", enabled: true, x: 6, y: 0, w: 6, h: 5, minW: 4, minH: 3, tab: "trends" },
  { id: "fragrance-families", type: "fragrance-families", title: "Fragrance Families", enabled: true, x: 0, y: 5, w: 6, h: 5, minW: 4, minH: 3, tab: "trends" },
  { id: "social-buzz", type: "social-buzz", title: "Social Buzz", enabled: true, x: 6, y: 5, w: 6, h: 5, minW: 4, minH: 3, tab: "trends" },

  // Trends tab — extras
  { id: "fragrance-of-the-day", type: "fragrance-of-the-day", title: "Fragrance of the Day", enabled: true, x: 0, y: 10, w: 6, h: 4, minW: 3, minH: 3, tab: "trends" },
  { id: "quick-converter", type: "quick-converter", title: "Quick Converter", enabled: true, x: 6, y: 10, w: 6, h: 4, minW: 3, minH: 3, tab: "trends" },

  // Local tab
  { id: "events-calendar", type: "events-calendar", title: "Upcoming Events", enabled: true, x: 0, y: 0, w: 6, h: 5, minW: 4, minH: 3, tab: "local" },
  { id: "jobs-board", type: "jobs-board", title: "Industry Jobs", enabled: true, x: 6, y: 0, w: 6, h: 5, minW: 4, minH: 3, tab: "local" },
  { id: "schools", type: "schools", title: "Schools & Programs", enabled: true, x: 0, y: 5, w: 6, h: 4, minW: 4, minH: 3, tab: "local" },
];
