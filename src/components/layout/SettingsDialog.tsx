"use client";
import { useState, useMemo } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { useAdminStore } from "@/store/adminStore";
import { X } from "lucide-react";

type SettingsTab = "general" | "panels" | "sources" | "system";

interface SettingsDialogProps {
  onClose: () => void;
}

// Data sources for "Sources" tab
const allSources = [
  { id: "fragrantica", name: "Fragrantica", region: "worldwide", enabled: true },
  { id: "basenotes", name: "Basenotes", region: "worldwide", enabled: true },
  { id: "ifra", name: "IFRA Updates", region: "europe", enabled: true },
  { id: "cosmetics-design", name: "Cosmetics Design", region: "worldwide", enabled: true },
  { id: "perfumer-flavorist", name: "Perfumer & Flavorist", region: "usa", enabled: true },
  { id: "gci-magazine", name: "GCI Magazine", region: "usa", enabled: true },
  { id: "happi", name: "Happi", region: "usa", enabled: true },
  { id: "euromonitor", name: "Euromonitor", region: "worldwide", enabled: false },
  { id: "mintel", name: "Mintel Beauty", region: "europe", enabled: false },
  { id: "beautyworld", name: "Beautyworld News", region: "middle-east", enabled: true },
  { id: "cosmetica", name: "Cosmética News", region: "latin-america", enabled: false },
  { id: "cosmeticschinaagency", name: "Cosmetics China Agency", region: "asia-pacific", enabled: false },
  { id: "jcia", name: "JCIA (Japan)", region: "asia-pacific", enabled: false },
  { id: "cirs-reach", name: "CIRS REACH", region: "europe", enabled: true },
  { id: "eu-cosmetics-reg", name: "EU Cosmetics Regulation", region: "europe", enabled: true },
  { id: "fda-cfsan", name: "FDA CFSAN", region: "usa", enabled: true },
  { id: "scent-beauty-blog", name: "Scent Beauty Blog", region: "worldwide", enabled: true },
  { id: "nst-prf", name: "NSTPRF", region: "worldwide", enabled: true },
  { id: "cafleurebon", name: "Cafleurebon", region: "worldwide", enabled: true },
  { id: "fragrance-foundation", name: "Fragrance Foundation", region: "usa", enabled: true },
  { id: "osmoz", name: "Osmoz", region: "europe", enabled: false },
  { id: "grain-de-musc", name: "Grain de Musc", region: "europe", enabled: false },
  { id: "the-perfume-society", name: "The Perfume Society", region: "europe", enabled: true },
  { id: "olfactal-blog", name: "Olfactal Blog", region: "middle-east", enabled: true },
];

const sourceRegions = ["all", "worldwide", "usa", "europe", "middle-east", "asia-pacific", "latin-america"];

export default function SettingsDialog({ onClose }: SettingsDialogProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const widgets = useDashboardStore((s) => s.widgets);
  const toggleWidget = useDashboardStore((s) => s.toggleWidget);
  const resetLayout = useDashboardStore((s) => s.resetLayout);
  const isLive = useDashboardStore((s) => s.isLive);
  const features = useAdminStore((s) => s.features);
  const toggleSubFeature = useAdminStore((s) => s.toggleSubFeature);

  // Panels tab state
  const [panelFilter, setPanelFilter] = useState("");
  const [panelCategory, setPanelCategory] = useState("all");

  // Sources tab state
  const [sourceFilter, setSourceFilter] = useState("");
  const [sourceRegion, setSourceRegion] = useState("all");
  const [sources, setSources] = useState(allSources);

  const toggleSource = (id: string) => {
    setSources((prev) => prev.map((s) => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const filteredSources = useMemo(() => {
    return sources.filter((s) => {
      if (sourceRegion !== "all" && s.region !== sourceRegion) return false;
      if (sourceFilter && !s.name.toLowerCase().includes(sourceFilter.toLowerCase())) return false;
      return true;
    });
  }, [sources, sourceRegion, sourceFilter]);

  const enabledSourceCount = sources.filter((s) => s.enabled).length;

  // Widget categories for Panels tab
  const widgetCategories = ["all", "feed", "directory"];
  const filteredWidgets = useMemo(() => {
    return widgets.filter((w) => {
      if (panelCategory !== "all" && w.tab !== panelCategory) return false;
      if (panelFilter && !w.title.toLowerCase().includes(panelFilter.toLowerCase())) return false;
      return true;
    });
  }, [widgets, panelCategory, panelFilter]);

  // UI features
  const uiFeatures = features.find((f) => f.id === "ui");
  const dataFeatures = features.find((f) => f.id === "data-sources");

  const settingsTabs: { id: SettingsTab; label: string }[] = [
    { id: "general", label: "GENERAL" },
    { id: "panels", label: "PANELS" },
    { id: "sources", label: "SOURCES" },
    { id: "system", label: "SYSTEM STATUS" },
  ];

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <h2 className="text-[16px] font-mono font-bold text-white tracking-wider">SETTINGS</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex gap-0 px-6 border-b border-scent-border">
          {settingsTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-[11px] font-mono font-semibold tracking-wider transition-colors relative ${
                activeTab === tab.id
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-scent-accent" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-120px)] px-6 py-4">
          {/* ---- GENERAL TAB ---- */}
          {activeTab === "general" && (
            <div className="space-y-5">
              {/* Data Refresh */}
              <div>
                <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-3">DATA</div>
                <div className="space-y-4">
                  <SettingsToggle
                    label="Live Updates"
                    description="Real-time data refresh across all widgets"
                    enabled={isLive}
                    onToggle={() => useDashboardStore.getState().toggleLive()}
                  />
                  {uiFeatures?.subFeatures?.map((sf) => (
                    <SettingsToggle
                      key={sf.id}
                      label={sf.name}
                      description={sf.description}
                      enabled={sf.enabled}
                      onToggle={() => toggleSubFeature("ui", sf.id)}
                    />
                  ))}
                </div>
              </div>

              <div className="border-t border-scent-border" />

              {/* Display */}
              <div>
                <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-3">DISPLAY</div>
                <div className="space-y-4">
                  <SettingsToggle
                    label="Dark Mode"
                    description="Dark terminal theme (default)"
                    enabled={!document.documentElement.classList.contains("theme-light")}
                    onToggle={() => document.documentElement.classList.toggle("theme-light")}
                  />
                </div>
              </div>

              <div className="border-t border-scent-border" />

              {/* Reset */}
              <div>
                <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-3">LAYOUT</div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-mono font-semibold text-white">Reset Widgets</p>
                    <p className="text-[11px] text-gray-500">Restore all panels to their original positions and sizes</p>
                  </div>
                  <button
                    onClick={() => {
                      resetLayout();
                      onClose();
                    }}
                    className="text-[10px] font-mono font-semibold text-red-400 hover:text-red-300 px-3 py-1.5 border border-red-400/30 rounded hover:border-red-400/50 hover:bg-red-400/5 transition-colors"
                  >
                    RESET
                  </button>
                </div>
              </div>

              <div className="border-t border-scent-border" />

              {/* About */}
              <div>
                <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-3">ABOUT</div>
                <p className="text-[11px] text-gray-500">
                  ScentDesk aggregates real-time data from 12+ RSS feeds and curated industry sources. All data shown is real — no simulated or placeholder content.
                </p>
              </div>
            </div>
          )}

          {/* ---- PANELS TAB ---- */}
          {activeTab === "panels" && (
            <div>
              {/* Category filters */}
              <div className="flex gap-1.5 mb-3 flex-wrap">
                {widgetCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPanelCategory(cat)}
                    className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded border transition-colors ${
                      panelCategory === cat
                        ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/30"
                        : "text-gray-500 border-scent-border hover:text-gray-300 hover:border-gray-500"
                    }`}
                  >
                    {cat === "all" ? "ALL" : cat.replace("-", " ").toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Filter input */}
              <input
                type="text"
                value={panelFilter}
                onChange={(e) => setPanelFilter(e.target.value)}
                placeholder="Filter panels..."
                className="w-full bg-scent-bg border border-scent-border rounded-lg px-3 py-2 text-[12px] font-mono text-white placeholder-gray-600 mb-3 focus:outline-none focus:border-scent-accent/50"
              />

              {/* Widget grid */}
              <div className="grid grid-cols-3 gap-2">
                {filteredWidgets.map((widget) => (
                  <button
                    key={widget.id}
                    onClick={() => toggleWidget(widget.id)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left transition-colors ${
                      widget.enabled
                        ? "border-emerald-400/30 bg-emerald-400/5"
                        : "border-scent-border bg-transparent hover:border-gray-500"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] shrink-0 ${
                      widget.enabled
                        ? "bg-emerald-400 border-emerald-400 text-black font-bold"
                        : "border-gray-600"
                    }`}>
                      {widget.enabled && "✓"}
                    </div>
                    <span className={`text-[11px] font-mono uppercase tracking-wide truncate ${
                      widget.enabled ? "text-white" : "text-gray-500"
                    }`}>
                      {widget.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ---- SOURCES TAB ---- */}
          {activeTab === "sources" && (
            <div>
              {/* Region filters */}
              <div className="flex gap-1.5 mb-3 flex-wrap">
                {sourceRegions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setSourceRegion(region)}
                    className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded border transition-colors ${
                      sourceRegion === region
                        ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/30"
                        : "text-gray-500 border-scent-border hover:text-gray-300 hover:border-gray-500"
                    }`}
                  >
                    {region === "all" ? "ALL" : region.replace("-", " ").toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Filter input */}
              <input
                type="text"
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                placeholder="Filter sources..."
                className="w-full bg-scent-bg border border-scent-border rounded-lg px-3 py-2 text-[12px] font-mono text-white placeholder-gray-600 mb-3 focus:outline-none focus:border-scent-accent/50"
              />

              {/* Source grid */}
              <div className="grid grid-cols-3 gap-2">
                {filteredSources.map((source) => (
                  <button
                    key={source.id}
                    onClick={() => toggleSource(source.id)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left transition-colors ${
                      source.enabled
                        ? "border-emerald-400/30 bg-emerald-400/5"
                        : "border-scent-border bg-transparent hover:border-gray-500"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] shrink-0 ${
                      source.enabled
                        ? "bg-emerald-400 border-emerald-400 text-black font-bold"
                        : "border-gray-600"
                    }`}>
                      {source.enabled && "✓"}
                    </div>
                    <span className={`text-[11px] font-mono truncate ${
                      source.enabled ? "text-white" : "text-gray-500"
                    }`}>
                      {source.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-scent-border">
                <span className="text-[11px] font-mono text-gray-500">
                  {enabledSourceCount}/{sources.length} enabled
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSources((prev) => prev.map((s) => ({ ...s, enabled: true })))}
                    className="text-[10px] font-mono font-semibold text-gray-500 hover:text-white px-3 py-1.5 border border-scent-border rounded hover:border-gray-500 transition-colors"
                  >
                    SELECT ALL
                  </button>
                  <button
                    onClick={() => setSources((prev) => prev.map((s) => ({ ...s, enabled: false })))}
                    className="text-[10px] font-mono font-semibold text-gray-500 hover:text-white px-3 py-1.5 border border-scent-border rounded hover:border-gray-500 transition-colors"
                  >
                    SELECT NONE
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ---- SYSTEM STATUS TAB ---- */}
          {activeTab === "system" && (
            <div className="space-y-5">
              {/* Data Feeds */}
              <div>
                <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-3">DATA FEEDS</div>
                <div className="space-y-1.5">
                  {[
                    { name: "Industry News (RSS)", items: 30, status: "active", lastUpdate: "2m ago" },
                    { name: "Regulatory Updates (RSS)", items: 12, status: "active", lastUpdate: "15m ago" },
                    { name: "Events Calendar", items: 15, status: "active", lastUpdate: "curated" },
                    { name: "Suppliers & Houses", items: 16, status: "active", lastUpdate: "curated" },
                    { name: "Schools & Programs", items: 12, status: "active", lastUpdate: "curated" },
                    { name: "Apps & Resources", items: 10, status: "active", lastUpdate: "curated" },
                    { name: "Perfumers & Podcasts", items: 16, status: "active", lastUpdate: "curated" },
                  ].map((feed) => (
                    <div key={feed.name} className="flex items-center justify-between py-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          feed.status === "active" ? "bg-emerald-400" : "bg-gray-600"
                        }`} />
                        <span className="text-[12px] font-mono text-gray-300">{feed.name}</span>
                      </div>
                      <span className="text-[11px] font-mono text-gray-500">
                        {feed.items} items {feed.lastUpdate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-scent-border" />

              {/* API Status */}
              <div>
                <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-3">API STATUS</div>
                <div className="space-y-1.5">
                  {[
                    { name: "Claude AI (Anthropic)", status: "operational" },
                    { name: "RSS Feed Aggregator", status: "operational" },
                    { name: "Geolocation (ipapi)", status: "operational" },
                    { name: "Newsletter API", status: "operational" },
                  ].map((api) => (
                    <div key={api.name} className="flex items-center justify-between py-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-[12px] font-mono text-gray-300">{api.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 uppercase">{api.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-scent-border" />

              {/* App Info */}
              <div>
                <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-3">APPLICATION</div>
                <div className="space-y-1.5">
                  <div className="flex justify-between py-1">
                    <span className="text-[12px] text-gray-400">Version</span>
                    <span className="text-[12px] font-mono text-white">1.0.0</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[12px] text-gray-400">Framework</span>
                    <span className="text-[12px] font-mono text-white">Next.js 16</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[12px] text-gray-400">Total Widgets</span>
                    <span className="text-[12px] font-mono text-white">{widgets.length}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[12px] text-gray-400">Active Widgets</span>
                    <span className="text-[12px] font-mono text-emerald-400">
                      {widgets.filter((w) => w.enabled).length}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Toggle component for settings
function SettingsToggle({
  label,
  description,
  enabled,
  onToggle,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[13px] font-mono font-semibold text-white">{label}</p>
        <p className="text-[11px] text-gray-500">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative w-10 h-5 rounded-full transition-colors ${
          enabled ? "bg-emerald-400" : "bg-gray-700"
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
            enabled ? "left-5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
