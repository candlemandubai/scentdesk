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
      { id: "w-daily-brief", name: "Intelligence Brief", description: "AI-generated daily industry summary", category: "widgets", enabled: true },
      { id: "w-news-market", name: "Market & M&A News", description: "Market intelligence and M&A news", category: "widgets", enabled: true },
      { id: "w-news-launches", name: "Launches & Industry", description: "New launches and industry developments", category: "widgets", enabled: true },
      { id: "w-news-materials", name: "Raw Materials & Supply", description: "Raw materials and supply chain news", category: "widgets", enabled: true },
      { id: "w-news-home", name: "Home Fragrance News", description: "Candles, diffusers, room sprays", category: "widgets", enabled: true },
      { id: "w-regulatory", name: "Regulatory Updates", description: "IFRA, EU, FDA regulatory RSS news", category: "widgets", enabled: true },
      { id: "w-community", name: "Community Feed", description: "Reddit & forum discussions", category: "widgets", enabled: true },
      { id: "w-stock-tracker", name: "Industry Stocks", description: "Live stock prices for 16 fragrance tickers", category: "widgets", enabled: true },
      { id: "w-youtube", name: "Fragrance YouTube", description: "Latest videos from fragrance YouTubers", category: "widgets", enabled: true },
      { id: "w-clock", name: "World Clock", description: "Major fragrance hub time zones", category: "widgets", enabled: true },
      { id: "w-newsletter", name: "Newsletter Signup", description: "Email capture for weekly briefs", category: "widgets", enabled: true },
      { id: "w-events", name: "Events Calendar", description: "Industry events and trade shows", category: "widgets", enabled: true },
      { id: "w-suppliers", name: "Suppliers & Houses", description: "Fragrance houses and ingredient suppliers", category: "widgets", enabled: true },
      { id: "w-schools", name: "Schools & Education", description: "Perfumery schools and programs", category: "widgets", enabled: true },
      { id: "w-apps", name: "Useful Apps & Resources", description: "Tools, communities, and references", category: "widgets", enabled: true },
      { id: "w-perfumers", name: "Perfumers & Podcasts", description: "Notable noses and fragrance podcasts", category: "widgets", enabled: true },
      { id: "w-jobs", name: "Jobs & Careers", description: "Career pages and job search links", category: "widgets", enabled: true },
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
  {
    id: "monetization",
    name: "Olfactal Beta",
    description: "Olfactal integration features — disabled until ready to launch",
    category: "monetization",
    enabled: false,
    subFeatures: [
      { id: "m-newsletter", name: "Olfactal Signup", description: "Email capture widget for olfactal.com beta access", category: "monetization", enabled: false },
      { id: "m-affiliates", name: "Affiliate Links", description: "Add affiliate tags to outbound product/retailer links", category: "monetization", enabled: false },
      { id: "m-paywall", name: "Pro Paywall", description: "Gate premium widgets behind Pro subscription", category: "monetization", enabled: false },
      { id: "m-sponsored", name: "Sponsored Listings", description: "Show promoted cards in Brand Launches and Suppliers", category: "monetization", enabled: false },
    ],
  },
];

// Integrity check — detect localStorage tampering
function validateFeatures(features: AdminFeature[]): boolean {
  if (!Array.isArray(features)) return false;
  const validIds = new Set(defaultFeatures.map((f) => f.id));
  return features.every(
    (f) =>
      validIds.has(f.id) &&
      typeof f.enabled === "boolean" &&
      typeof f.name === "string" &&
      (!f.subFeatures || Array.isArray(f.subFeatures))
  );
}

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
    {
      name: "scent-desk-admin",
      // Validate stored data on rehydration — reset if tampered
      onRehydrateStorage: () => (state) => {
        if (state && !validateFeatures(state.features)) {
          console.warn("[ScentDesk] Admin store integrity check failed. Resetting to defaults.");
          state.features = defaultFeatures;
        }
      },
    }
  )
);
