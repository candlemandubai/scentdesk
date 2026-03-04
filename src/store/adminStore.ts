"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AdminFeature } from "@/types";

interface AdminState {
  features: AdminFeature[];
  toggleFeature: (id: string) => void;
  toggleSubFeature: (parentId: string, subId: string) => void;
  enableAll: () => void;
  disableAll: () => void;
  resetDefaults: () => void;
}

const defaultFeatures: AdminFeature[] = [
  {
    id: "widgets",
    name: "Dashboard Widgets",
    description: "Control which widgets appear on the dashboard",
    category: "widgets",
    enabled: true,
    subFeatures: [
      { id: "w-news", name: "News Feed", description: "Live fragrance industry news", category: "widgets", enabled: true },
      { id: "w-raw-materials", name: "Raw Materials Tracker", description: "Essential oils and aroma chemicals pricing", category: "widgets", enabled: true },
      { id: "w-market", name: "Market Overview", description: "Market size, growth, and segments", category: "widgets", enabled: true },
      { id: "w-launches", name: "Brand Launches", description: "New fragrance launches and releases", category: "widgets", enabled: true },
      { id: "w-trending", name: "Trending Ingredients", description: "Most popular ingredients tracker", category: "widgets", enabled: true },
      { id: "w-home-frag", name: "Home Fragrances", description: "Candles, diffusers, room sprays market", category: "widgets", enabled: true },
      { id: "w-seasonal", name: "Seasonal Trends", description: "Seasonal fragrance trends analysis", category: "widgets", enabled: true },
      { id: "w-ai", name: "AI Insights", description: "AI-powered market analysis", category: "widgets", enabled: true },
      { id: "w-events", name: "Events Calendar", description: "Industry events and trade shows", category: "widgets", enabled: true },
      { id: "w-jobs", name: "Jobs Board", description: "Industry job listings", category: "widgets", enabled: true },
      { id: "w-schools", name: "Schools & Education", description: "Perfumery schools and programs", category: "widgets", enabled: true },
      { id: "w-sustainability", name: "Sustainability Tracker", description: "Sustainability metrics and certifications", category: "widgets", enabled: true },
      { id: "w-regulatory", name: "Regulatory Updates", description: "IFRA, EU, FDA regulatory news", category: "widgets", enabled: true },
      { id: "w-regional", name: "Regional Data", description: "Market data by region", category: "widgets", enabled: true },
      { id: "w-clock", name: "World Clock", description: "Major fragrance hub time zones", category: "widgets", enabled: true },
      { id: "w-heatmap", name: "Market Heatmap", description: "Visual market performance", category: "widgets", enabled: true },
      { id: "w-supply", name: "Supply Chain", description: "Supply chain status tracker", category: "widgets", enabled: true },
      { id: "w-index", name: "Fragrance Index", description: "Custom fragrance market index", category: "widgets", enabled: true },
      { id: "w-sellers", name: "Top Sellers", description: "Best-selling fragrances globally", category: "widgets", enabled: true },
      { id: "w-community", name: "Community Feed", description: "Industry community posts", category: "widgets", enabled: true },
      { id: "w-consumer", name: "Consumer Trends", description: "Consumer demand and demographics", category: "widgets", enabled: true },
      { id: "w-families", name: "Fragrance Families", description: "Fragrance family market share", category: "widgets", enabled: true },
      { id: "w-social", name: "Social Buzz", description: "Social media trending hashtags", category: "widgets", enabled: true },
      { id: "w-suppliers", name: "Suppliers & Houses", description: "Fragrance houses and ingredient suppliers", category: "widgets", enabled: true },
      { id: "w-fotd", name: "Fragrance of the Day", description: "Daily fragrance spotlight with notes", category: "widgets", enabled: true },
      { id: "w-converter", name: "Quick Converter", description: "Volume, dilution, and markup calculator", category: "widgets", enabled: true },
    ],
  },
  {
    id: "features",
    name: "Core Features",
    description: "Toggle core application features",
    category: "features",
    enabled: true,
    subFeatures: [
      { id: "f-drag-drop", name: "Drag & Drop", description: "Allow widget rearrangement", category: "features", enabled: true },
      { id: "f-live-updates", name: "Live Updates", description: "Real-time data refresh", category: "features", enabled: true },
      { id: "f-geolocation", name: "Geolocation", description: "Location-based content", category: "features", enabled: true },
      { id: "f-search", name: "Global Search", description: "Search across all data", category: "features", enabled: true },
      { id: "f-notifications", name: "Notifications", description: "Alert notifications", category: "features", enabled: true },
      { id: "f-dark-mode", name: "Dark Mode", description: "Dark theme (always on)", category: "features", enabled: true },
      { id: "f-export", name: "Data Export", description: "Export data as CSV/JSON", category: "features", enabled: true },
    ],
  },
  {
    id: "data-sources",
    name: "Data Sources",
    description: "Toggle data source integrations",
    category: "data-sources",
    enabled: true,
    subFeatures: [
      { id: "d-fragrantica", name: "Fragrantica Feed", description: "Fragrantica news and reviews", category: "data-sources", enabled: true },
      { id: "d-basenotes", name: "Basenotes Feed", description: "Basenotes community content", category: "data-sources", enabled: true },
      { id: "d-ifra", name: "IFRA Updates", description: "IFRA regulatory feed", category: "data-sources", enabled: true },
      { id: "d-market-research", name: "Market Research", description: "Third-party market data", category: "data-sources", enabled: true },
      { id: "d-social", name: "Social Media", description: "Social media trends", category: "data-sources", enabled: true },
      { id: "d-trade", name: "Trade Publications", description: "Industry trade publications", category: "data-sources", enabled: true },
    ],
  },
  {
    id: "ui",
    name: "UI Settings",
    description: "User interface customization",
    category: "ui",
    enabled: true,
    subFeatures: [
      { id: "u-animations", name: "Animations", description: "UI animations and transitions", category: "ui", enabled: true },
      { id: "u-compact", name: "Compact Mode", description: "Denser information display", category: "ui", enabled: false },
      { id: "u-ticker", name: "Market Ticker", description: "Scrolling market ticker bar", category: "ui", enabled: true },
      { id: "u-sidebar", name: "Sidebar Navigation", description: "Show sidebar navigation", category: "ui", enabled: true },
      { id: "u-tooltips", name: "Tooltips", description: "Hover tooltips on data", category: "ui", enabled: true },
    ],
  },
  {
    id: "analytics",
    name: "Analytics & Tracking",
    description: "Control analytics collection",
    category: "analytics",
    enabled: true,
    subFeatures: [
      { id: "a-pageviews", name: "Page Views", description: "Track page view counts", category: "analytics", enabled: true },
      { id: "a-clicks", name: "Click Tracking", description: "Track widget interactions", category: "analytics", enabled: true },
      { id: "a-time", name: "Time on Page", description: "Track time spent", category: "analytics", enabled: true },
      { id: "a-scroll", name: "Scroll Depth", description: "Track scroll behavior", category: "analytics", enabled: true },
      { id: "a-search", name: "Search Analytics", description: "Track search queries", category: "analytics", enabled: true },
    ],
  },
];

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      features: defaultFeatures,
      toggleFeature: (id) =>
        set((s) => ({
          features: s.features.map((f) =>
            f.id === id ? { ...f, enabled: !f.enabled } : f
          ),
        })),
      toggleSubFeature: (parentId, subId) =>
        set((s) => ({
          features: s.features.map((f) =>
            f.id === parentId
              ? {
                  ...f,
                  subFeatures: f.subFeatures?.map((sf) =>
                    sf.id === subId ? { ...sf, enabled: !sf.enabled } : sf
                  ),
                }
              : f
          ),
        })),
      enableAll: () =>
        set((s) => ({
          features: s.features.map((f) => ({
            ...f,
            enabled: true,
            subFeatures: f.subFeatures?.map((sf) => ({ ...sf, enabled: true })),
          })),
        })),
      disableAll: () =>
        set((s) => ({
          features: s.features.map((f) => ({
            ...f,
            enabled: false,
            subFeatures: f.subFeatures?.map((sf) => ({ ...sf, enabled: false })),
          })),
        })),
      resetDefaults: () => set({ features: defaultFeatures }),
    }),
    { name: "scent-desk-admin" }
  )
);
