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
  | "feed"
  | "directory";

export type WidgetType =
  | "news-feed"
  | "news-market"
  | "news-launches"
  | "news-materials"
  | "news-home"
  | "regulatory-updates"
  | "world-clock"
  | "events-calendar"
  | "schools"
  | "suppliers"
  | "useful-apps"
  | "newsletter-signup"
  | "perfumer-spotlight"
  | "jobs-board"
  | "daily-brief"
  | "community-feed";

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
  instagram?: string;
}

export interface School {
  id: string;
  name: string;
  location: string;
  country: string;
  type: "university" | "institute" | "online" | "workshop";
  programs: string[];
  url?: string;
  instagram?: string;
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
  category: "widgets" | "features" | "data-sources" | "ui" | "analytics" | "monetization";
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
