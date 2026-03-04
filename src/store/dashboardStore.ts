"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Widget, DashboardTab } from "@/types";
import { defaultWidgets } from "@/data/defaultWidgets";

interface DashboardState {
  activeTab: DashboardTab;
  widgets: Widget[];
  searchQuery: string;
  isLive: boolean;
  sidebarOpen: boolean;
  setActiveTab: (tab: DashboardTab) => void;
  setSearchQuery: (query: string) => void;
  toggleLive: () => void;
  toggleSidebar: () => void;
  updateWidgetPosition: (id: string, x: number, y: number) => void;
  updateWidgetSize: (id: string, w: number, h: number) => void;
  toggleWidget: (id: string) => void;
  resetLayout: () => void;
  updateLayouts: (widgets: Widget[]) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      activeTab: "market",
      widgets: defaultWidgets,
      searchQuery: "",
      isLive: true,
      sidebarOpen: false,
      setActiveTab: (tab) => set({ activeTab: tab }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      toggleLive: () => set((s) => ({ isLive: !s.isLive })),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      updateWidgetPosition: (id, x, y) =>
        set((s) => ({
          widgets: s.widgets.map((w) => (w.id === id ? { ...w, x, y } : w)),
        })),
      updateWidgetSize: (id, w, h) =>
        set((s) => ({
          widgets: s.widgets.map((widget) =>
            widget.id === id ? { ...widget, w, h } : widget
          ),
        })),
      toggleWidget: (id) =>
        set((s) => ({
          widgets: s.widgets.map((w) =>
            w.id === id ? { ...w, enabled: !w.enabled } : w
          ),
        })),
      resetLayout: () => set({ widgets: defaultWidgets }),
      updateLayouts: (widgets) => set({ widgets }),
    }),
    { name: "scent-desk-dashboard" }
  )
);
