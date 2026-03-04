export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  enabled: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  tab: DashboardTab;
}

export type DashboardTab =
  | "market"
  | "raw-materials"
  | "home-fragrances"
  | "trends"
  | "local";

export type WidgetType =
  | "news-feed"
  | "raw-materials-prices"
  | "market-overview"
  | "brand-launches"
  | "trending-ingredients"
  | "home-fragrance-market"
  | "candles-tracker"
  | "diffusers-market"
  | "room-sprays"
  | "seasonal-trends"
  | "ai-insights"
  | "events-calendar"
  | "jobs-board"
  | "schools"
  | "sustainability"
  | "regulatory-updates"
  | "regional-data"
  | "world-clock"
  | "market-heatmap"
  | "supply-chain"
  | "fragrance-index"
  | "top-sellers"
  | "community-feed"
  | "consumer-trends"
  | "fragrance-families"
  | "social-buzz"
  | "suppliers"
  | "fragrance-of-the-day"
  | "quick-converter";

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  category: string;
  timestamp: string;
  url: string;
  sentiment?: "positive" | "negative" | "neutral";
  region?: string;
}

export interface RawMaterial {
  id: string;
  name: string;
  category: "essential-oil" | "aroma-chemical" | "natural" | "synthetic";
  price: number;
  unit: string;
  change24h: number;
  change7d: number;
  origin: string;
  supply: "abundant" | "normal" | "tight" | "critical";
}

export interface MarketData {
  segment: string;
  value: number;
  growth: number;
  trend: "up" | "down" | "stable";
}

export interface FragranceEvent {
  id: string;
  name: string;
  type: "trade-show" | "conference" | "workshop" | "launch" | "webinar";
  date: string;
  location: string;
  city: string;
  country: string;
  lat?: number;
  lng?: number;
  url?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "freelance";
  category: "perfumer" | "marketing" | "production" | "research" | "sales" | "quality";
  posted: string;
  salary?: string;
  url?: string;
}

export interface School {
  id: string;
  name: string;
  location: string;
  country: string;
  type: "university" | "institute" | "online" | "workshop";
  programs: string[];
  url?: string;
}

export interface HomeFragranceProduct {
  id: string;
  category: "candle" | "diffuser" | "room-spray" | "wax-melt" | "incense";
  brand: string;
  name: string;
  price: number;
  rating: number;
  trend: "rising" | "falling" | "stable";
  region: string;
  url?: string;
}

export interface AnalyticsEvent {
  type: "page_view" | "widget_click" | "tab_change" | "search" | "filter";
  widget?: string;
  tab?: string;
  timestamp: number;
  duration?: number;
  metadata?: Record<string, string>;
}

export interface AdminFeature {
  id: string;
  name: string;
  description: string;
  category: "widgets" | "features" | "data-sources" | "ui" | "analytics";
  enabled: boolean;
  subFeatures?: AdminFeature[];
}

export interface GeoLocation {
  lat: number;
  lng: number;
  city: string;
  country: string;
  region: string;
}
