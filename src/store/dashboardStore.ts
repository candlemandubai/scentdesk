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
  reorderWidgets: (tab: DashboardTab, orderedIds: string[]) => void;
  resetLayout: () => void;
  updateLayouts: (widgets: Widget[]) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      activeTab: "feed",
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
      reorderWidgets: (tab, orderedIds) =>
        set((s) => {
          const tabWidgets = s.widgets.filter((w) => w.tab === tab && w.enabled);
          const otherWidgets = s.widgets.filter((w) => w.tab !== tab || !w.enabled);
          const ordered = orderedIds
            .map((id) => tabWidgets.find((w) => w.id === id))
            .filter(Boolean) as Widget[];
          return { widgets: [...ordered, ...otherWidgets] };
        }),
      resetLayout: () => set({ widgets: defaultWidgets }),
      updateLayouts: (widgets) => set({ widgets }),
    }),
    {
      name: "scent-desk-v2",
      version: 5,
      migrate: (persisted: unknown, version: number) => {
        const state = persisted as DashboardState;
        if (version < 5) {
          // Merge any new default widgets that don't exist in persisted state
          const existingIds = new Set(state.widgets.map((w) => w.id));
          const newWidgets = defaultWidgets.filter((w) => !existingIds.has(w.id));
          return { ...state, widgets: [...state.widgets, ...newWidgets] };
        }
        // Always merge new defaults for any version
        const existingIds = new Set(state.widgets.map((w) => w.id));
        const newWidgets = defaultWidgets.filter((w) => !existingIds.has(w.id));
        if (newWidgets.length > 0) {
          return { ...state, widgets: [...state.widgets, ...newWidgets] };
        }
        return state;
      },
    }
  )
);
