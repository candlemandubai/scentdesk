"use client";
import { create } from "zustand";
import type { AnalyticsEvent } from "@/types";

interface AnalyticsState {
  events: AnalyticsEvent[];
  sessionStart: number;
  totalClicks: number;
  totalPageViews: number;
  widgetInteractions: Record<string, number>;
  tabViews: Record<string, number>;
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
      }
      if (event.type === "page_view") {
        newState.totalPageViews = s.totalPageViews + 1;
      }
      if (event.type === "tab_change" && event.tab) {
        newState.tabViews = {
          ...s.tabViews,
          [event.tab]: (s.tabViews[event.tab] || 0) + 1,
        };
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
