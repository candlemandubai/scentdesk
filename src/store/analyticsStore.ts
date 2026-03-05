"use client";
import { create } from "zustand";
import type { AnalyticsEvent } from "@/types";

/** Detect where the visitor came from */
function detectTrafficSource(): string {
  if (typeof window === "undefined") return "unknown";

  // Check UTM first
  const params = new URLSearchParams(window.location.search);
  const utm = params.get("utm_source");
  if (utm) return utm;

  const ref = document.referrer;
  if (!ref) return "direct";

  try {
    const hostname = new URL(ref).hostname.replace("www.", "");
    // Map known domains to readable names
    const knownSources: Record<string, string> = {
      "google.com": "google",
      "google.ae": "google",
      "google.co.uk": "google",
      "bing.com": "bing",
      "duckduckgo.com": "duckduckgo",
      "yahoo.com": "yahoo",
      "t.co": "twitter",
      "x.com": "twitter",
      "instagram.com": "instagram",
      "l.instagram.com": "instagram",
      "facebook.com": "facebook",
      "l.facebook.com": "facebook",
      "linkedin.com": "linkedin",
      "reddit.com": "reddit",
      "tiktok.com": "tiktok",
      "youtube.com": "youtube",
      "pinterest.com": "pinterest",
      "threads.net": "threads",
      "whatsapp.com": "whatsapp",
      "telegram.org": "telegram",
      "fragrantica.com": "fragrantica",
      "basenotes.com": "basenotes",
      "olfactal.com": "olfactal",
      "candlestart.com": "candlestart",
    };
    return knownSources[hostname] || hostname;
  } catch {
    return "referral";
  }
}

/** Fire-and-forget POST to server analytics */
function sendToServer(payload: Record<string, unknown>) {
  try {
    const body = JSON.stringify(payload);
    // Use sendBeacon for non-blocking fire-and-forget
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics", body);
    } else {
      fetch("/api/analytics", {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Silent fail — analytics should never break the app
  }
}

interface AnalyticsState {
  events: AnalyticsEvent[];
  sessionStart: number;
  totalClicks: number;
  totalPageViews: number;
  widgetInteractions: Record<string, number>;
  tabViews: Record<string, number>;
  trafficSources: Record<string, number>;
  currentSource: string;
  trackEvent: (event: AnalyticsEvent) => void;
  getSessionDuration: () => number;
  getTopWidgets: () => { widget: string; count: number }[];
}

export const useAnalyticsStore = create<AnalyticsState>()((set, get) => ({
  events: [],
  sessionStart: Date.now(),
  totalClicks: 0,
  totalPageViews: 0,
  widgetInteractions: {},
  tabViews: {},
  trafficSources: {},
  currentSource: "unknown",
  trackEvent: (event) =>
    set((s) => {
      const newState: Partial<AnalyticsState> = {
        events: [...s.events.slice(-500), event],
      };
      if (event.type === "widget_click" && event.widget) {
        newState.totalClicks = s.totalClicks + 1;
        newState.widgetInteractions = {
          ...s.widgetInteractions,
          [event.widget]: (s.widgetInteractions[event.widget] || 0) + 1,
        };
        // Persist to server
        sendToServer({ type: "widget_click", widget: event.widget });
      }
      if (event.type === "page_view") {
        newState.totalPageViews = s.totalPageViews + 1;
        // Track traffic source on page view
        const source = detectTrafficSource();
        newState.currentSource = source;
        newState.trafficSources = {
          ...s.trafficSources,
          [source]: (s.trafficSources[source] || 0) + 1,
        };
        // Persist to server
        sendToServer({ type: "page_view", source });
      }
      if (event.type === "tab_change" && event.tab) {
        newState.tabViews = {
          ...s.tabViews,
          [event.tab]: (s.tabViews[event.tab] || 0) + 1,
        };
        // Persist to server
        sendToServer({ type: "tab_change", tab: event.tab });
      }
      return newState;
    }),
  getSessionDuration: () => Math.floor((Date.now() - get().sessionStart) / 1000),
  getTopWidgets: () => {
    const interactions = get().widgetInteractions;
    return Object.entries(interactions)
      .map(([widget, count]) => ({ widget, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  },
}));
