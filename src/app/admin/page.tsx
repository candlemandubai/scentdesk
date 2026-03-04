"use client";
import { useState } from "react";
import Link from "next/link";
import { useAdminStore } from "@/store/adminStore";
import { useDashboardStore } from "@/store/dashboardStore";
import { useAnalyticsStore } from "@/store/analyticsStore";
import { formatDuration } from "@/lib/analytics";
import {
  ArrowLeft,
  ToggleLeft,
  ToggleRight,
  RotateCcw,
  Power,
  PowerOff,
  ChevronDown,
  ChevronRight,
  BarChart3,
  Layout,
  Database,
  Palette,
  Activity,
  Clock,
  MousePointer,
  Eye,
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  widgets: <Layout size={16} />,
  features: <Power size={16} />,
  "data-sources": <Database size={16} />,
  ui: <Palette size={16} />,
  analytics: <Activity size={16} />,
};

export default function AdminPage() {
  const { features, toggleFeature, toggleSubFeature, enableAll, disableAll, resetDefaults } = useAdminStore();
  const { resetLayout, widgets } = useDashboardStore();
  const { totalClicks, totalPageViews, getSessionDuration, widgetInteractions, tabViews, events } = useAnalyticsStore();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["widgets", "features"]));
  const [activeSection, setActiveSection] = useState<"toggles" | "analytics" | "layout">("toggles");

  const toggleExpand = (id: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalEnabled = features.reduce(
    (acc, f) => acc + (f.subFeatures?.filter((sf) => sf.enabled).length || (f.enabled ? 1 : 0)),
    0
  );
  const totalFeatures = features.reduce(
    (acc, f) => acc + (f.subFeatures?.length || 1),
    0
  );

  return (
    <main className="min-h-screen bg-scent-bg">
      {/* Header */}
      <header className="bg-scent-surface border-b border-scent-border sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="text-[12px] font-mono">BACK</span>
            </Link>
            <div className="h-4 w-px bg-scent-border" />
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-mono font-bold text-white">
                ADMIN <span className="text-scent-accent">DASHBOARD</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-gray-500">
              {totalEnabled}/{totalFeatures} features enabled
            </span>
          </div>
        </div>

        {/* Section tabs */}
        <div className="flex gap-0.5 px-6 border-t border-scent-border">
          {([
            { id: "toggles" as const, label: "Feature Toggles", icon: <Power size={12} /> },
            { id: "analytics" as const, label: "Analytics", icon: <BarChart3 size={12} /> },
            { id: "layout" as const, label: "Layout", icon: <Layout size={12} /> },
          ]).map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-[11px] font-mono font-semibold uppercase tracking-wider transition-all relative ${
                activeSection === section.id ? "text-scent-accent" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {section.icon}
              {section.label}
              {activeSection === section.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-scent-accent" />}
            </button>
          ))}
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Feature Toggles */}
        {activeSection === "toggles" && (
          <>
            {/* Quick actions */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={enableAll}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-900/20 border border-emerald-900/30 rounded-lg text-[11px] font-mono font-semibold text-emerald-400 hover:bg-emerald-900/30 transition-colors"
              >
                <Power size={12} /> Enable All
              </button>
              <button
                onClick={disableAll}
                className="flex items-center gap-2 px-4 py-2 bg-red-900/20 border border-red-900/30 rounded-lg text-[11px] font-mono font-semibold text-red-400 hover:bg-red-900/30 transition-colors"
              >
                <PowerOff size={12} /> Disable All
              </button>
              <button
                onClick={resetDefaults}
                className="flex items-center gap-2 px-4 py-2 bg-scent-card border border-scent-border rounded-lg text-[11px] font-mono font-semibold text-gray-400 hover:text-white transition-colors"
              >
                <RotateCcw size={12} /> Reset Defaults
              </button>
            </div>

            {/* Feature categories */}
            <div className="space-y-3">
              {features.map((category) => {
                const isExpanded = expandedCategories.has(category.id);
                const enabledCount = category.subFeatures?.filter((sf) => sf.enabled).length || 0;
                const totalCount = category.subFeatures?.length || 0;

                return (
                  <div key={category.id} className="bg-scent-surface border border-scent-border rounded-lg overflow-hidden">
                    {/* Category header */}
                    <div
                      className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
                      onClick={() => toggleExpand(category.id)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500">{categoryIcons[category.category]}</span>
                        {isExpanded ? <ChevronDown size={14} className="text-gray-500" /> : <ChevronRight size={14} className="text-gray-500" />}
                        <div>
                          <span className="text-[13px] font-semibold text-white">{category.name}</span>
                          <span className="text-[11px] text-gray-500 ml-2">{category.description}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-gray-500">
                          {enabledCount}/{totalCount}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFeature(category.id);
                          }}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {category.enabled ? (
                            <ToggleRight size={24} className="text-scent-accent" />
                          ) : (
                            <ToggleLeft size={24} className="text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Sub-features */}
                    {isExpanded && category.subFeatures && (
                      <div className="border-t border-scent-border">
                        {category.subFeatures.map((sub) => (
                          <div
                            key={sub.id}
                            className="flex items-center justify-between px-4 py-2.5 pl-12 hover:bg-white/[0.02] transition-colors border-b border-scent-border/50 last:border-b-0"
                          >
                            <div>
                              <span className="text-[12px] text-gray-300">{sub.name}</span>
                              <span className="text-[10px] text-gray-600 ml-2">{sub.description}</span>
                            </div>
                            <button
                              onClick={() => toggleSubFeature(category.id, sub.id)}
                              className="transition-colors"
                            >
                              {sub.enabled ? (
                                <ToggleRight size={22} className="text-scent-accent" />
                              ) : (
                                <ToggleLeft size={22} className="text-gray-600" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Analytics */}
        {activeSection === "analytics" && (
          <div className="space-y-6">
            {/* Summary cards */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-scent-surface border border-scent-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye size={14} className="text-blue-400" />
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Page Views</span>
                </div>
                <div className="text-2xl font-mono font-bold text-white">{totalPageViews}</div>
              </div>
              <div className="bg-scent-surface border border-scent-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MousePointer size={14} className="text-emerald-400" />
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Total Clicks</span>
                </div>
                <div className="text-2xl font-mono font-bold text-white">{totalClicks}</div>
              </div>
              <div className="bg-scent-surface border border-scent-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={14} className="text-amber-400" />
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Session Time</span>
                </div>
                <div className="text-2xl font-mono font-bold text-white">{formatDuration(getSessionDuration())}</div>
              </div>
              <div className="bg-scent-surface border border-scent-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity size={14} className="text-purple-400" />
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Total Events</span>
                </div>
                <div className="text-2xl font-mono font-bold text-white">{events.length}</div>
              </div>
            </div>

            {/* Widget interactions */}
            <div className="bg-scent-surface border border-scent-border rounded-lg p-4">
              <div className="text-[11px] font-mono text-gray-500 uppercase tracking-wider mb-3">Widget Interactions</div>
              {Object.keys(widgetInteractions).length > 0 ? (
                <div className="space-y-2">
                  {Object.entries(widgetInteractions)
                    .sort(([, a], [, b]) => b - a)
                    .map(([widget, count]) => (
                      <div key={widget} className="flex items-center gap-3">
                        <span className="text-[12px] text-gray-300 flex-1">{widget}</span>
                        <div className="flex-1 h-1.5 bg-scent-bg rounded-full overflow-hidden">
                          <div
                            className="h-full bg-scent-accent rounded-full"
                            style={{ width: `${(count / Math.max(...Object.values(widgetInteractions))) * 100}%` }}
                          />
                        </div>
                        <span className="text-[12px] font-mono text-white w-8 text-right">{count}</span>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-[12px] text-gray-600">No interactions recorded yet. Click on widgets to see data.</p>
              )}
            </div>

            {/* Tab views */}
            <div className="bg-scent-surface border border-scent-border rounded-lg p-4">
              <div className="text-[11px] font-mono text-gray-500 uppercase tracking-wider mb-3">Tab Views</div>
              {Object.keys(tabViews).length > 0 ? (
                <div className="grid grid-cols-5 gap-2">
                  {Object.entries(tabViews).map(([tab, count]) => (
                    <div key={tab} className="bg-scent-bg rounded-lg p-3 text-center border border-scent-border">
                      <div className="text-[10px] font-mono text-gray-500 uppercase mb-1">{tab}</div>
                      <div className="text-[18px] font-mono font-bold text-scent-accent">{count}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[12px] text-gray-600">No tab views recorded yet.</p>
              )}
            </div>

            {/* Recent events */}
            <div className="bg-scent-surface border border-scent-border rounded-lg p-4">
              <div className="text-[11px] font-mono text-gray-500 uppercase tracking-wider mb-3">Recent Events</div>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {events.slice(-20).reverse().map((event, i) => (
                  <div key={i} className="flex items-center gap-3 py-1 text-[11px] font-mono">
                    <span className="text-gray-600">{new Date(event.timestamp).toLocaleTimeString()}</span>
                    <span className={`badge ${
                      event.type === "page_view" ? "badge-blue" :
                      event.type === "widget_click" ? "badge-green" :
                      event.type === "tab_change" ? "badge-gold" :
                      "badge-purple"
                    }`}>
                      {event.type}
                    </span>
                    {event.widget && <span className="text-gray-400">{event.widget}</span>}
                    {event.tab && <span className="text-gray-400">{event.tab}</span>}
                  </div>
                ))}
                {events.length === 0 && (
                  <p className="text-[12px] text-gray-600">No events recorded yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Layout Management */}
        {activeSection === "layout" && (
          <div className="space-y-6">
            <div className="bg-scent-surface border border-scent-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[11px] font-mono text-gray-500 uppercase tracking-wider">Layout Management</div>
                <button
                  onClick={resetLayout}
                  className="flex items-center gap-2 px-3 py-1.5 bg-scent-card border border-scent-border rounded text-[11px] font-mono text-gray-400 hover:text-white transition-colors"
                >
                  <RotateCcw size={12} /> Reset Layout
                </button>
              </div>
              <p className="text-[12px] text-gray-400 mb-4">
                Drag and drop widgets on the main dashboard to rearrange them. Your layout is automatically saved.
              </p>

              {/* Widget list */}
              <div className="space-y-1">
                <div className="grid grid-cols-[1fr_80px_60px_60px_80px] gap-2 text-[9px] font-mono text-gray-600 uppercase tracking-wider pb-2 border-b border-scent-border">
                  <span>Widget</span>
                  <span>Tab</span>
                  <span>Position</span>
                  <span>Size</span>
                  <span className="text-right">Status</span>
                </div>
                {widgets.map((w) => (
                  <div key={w.id} className="grid grid-cols-[1fr_80px_60px_60px_80px] gap-2 py-1.5 items-center hover:bg-white/[0.02] rounded">
                    <span className="text-[12px] text-gray-300">{w.title}</span>
                    <span className="text-[10px] font-mono text-gray-500">{w.tab}</span>
                    <span className="text-[10px] font-mono text-gray-500">{w.x},{w.y}</span>
                    <span className="text-[10px] font-mono text-gray-500">{w.w}x{w.h}</span>
                    <span className={`text-[10px] font-mono text-right font-semibold ${w.enabled ? "text-emerald-400" : "text-gray-600"}`}>
                      {w.enabled ? "ACTIVE" : "HIDDEN"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
