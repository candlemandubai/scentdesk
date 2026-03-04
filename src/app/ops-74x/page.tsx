"use client";
import { useState, useEffect, useCallback } from "react";
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
  Lock,
  LogOut,
  ShieldCheck,
  Users,
  Globe,
  Mail,
} from "lucide-react";
import { useViewCounter } from "@/hooks/useViewCounter";

const categoryIcons: Record<string, React.ReactNode> = {
  widgets: <Layout size={16} />,
  features: <Power size={16} />,
  "data-sources": <Database size={16} />,
  ui: <Palette size={16} />,
  analytics: <Activity size={16} />,
};

// ─── Login Gate ─────────────────────────────────────────
function AdminLogin({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/ops-74x/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid password");
        setPassword("");
      } else {
        sessionStorage.setItem("admin_token", data.token);
        onLogin(data.token);
      }
    } catch {
      setError("Failed to connect. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-scent-bg flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="bg-scent-surface border border-scent-border rounded-xl p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-scent-accent/10 border border-scent-accent/30 flex items-center justify-center mb-4">
              <Lock size={20} className="text-scent-accent" />
            </div>
            <h1 className="text-[15px] font-mono font-bold text-white tracking-wider">
              ADMIN <span className="text-scent-accent">ACCESS</span>
            </h1>
            <p className="text-[11px] text-gray-500 mt-1">Enter admin password to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="w-full px-4 py-3 bg-scent-bg border border-scent-border rounded-lg text-[13px] font-mono text-white placeholder:text-gray-600 focus:outline-none focus:border-scent-accent/50 transition-colors"
            />

            {error && (
              <div className="text-[11px] font-mono text-red-400 bg-red-900/10 border border-red-900/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full px-4 py-3 bg-scent-accent/20 border border-scent-accent/40 rounded-lg text-[12px] font-mono font-bold text-scent-accent hover:bg-scent-accent/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "VERIFYING..." : "AUTHENTICATE"}
            </button>
          </form>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 mt-4 text-[11px] font-mono text-gray-500 hover:text-gray-300 transition-colors"
          >
            <ArrowLeft size={12} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}

// ─── Admin Dashboard (authenticated) ───────────────────
export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  const verifyToken = useCallback(async (token: string) => {
    try {
      const res = await fetch("/api/ops-74x/auth", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      return data.valid === true;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (token) {
      verifyToken(token).then((valid) => {
        setAuthenticated(valid);
        if (!valid) sessionStorage.removeItem("admin_token");
        setChecking(false);
      });
    } else {
      setChecking(false);
    }
  }, [verifyToken]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setAuthenticated(false);
  };

  if (checking) {
    return (
      <main className="min-h-screen bg-scent-bg flex items-center justify-center">
        <div className="text-[12px] font-mono text-gray-500 animate-pulse">VERIFYING ACCESS...</div>
      </main>
    );
  }

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}

// ─── Dashboard Content ──────────────────────────────────
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { features, toggleFeature, toggleSubFeature, enableAll, disableAll, resetDefaults } = useAdminStore();
  const { resetLayout, widgets } = useDashboardStore();
  const { totalClicks, totalPageViews, getSessionDuration, widgetInteractions, tabViews, events, trafficSources } = useAnalyticsStore();
  const { totalViews, liveViewers } = useViewCounter();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["widgets", "features"]));
  const [activeSection, setActiveSection] = useState<"toggles" | "analytics" | "layout">("toggles");
  const [subscribers, setSubscribers] = useState<{ email: string; subscribedAt: string; source: string }[]>([]);
  const [subscriberCount, setSubscriberCount] = useState(0);

  // Fetch subscribers list
  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (token) {
      fetch("/api/newsletter", { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((d) => {
          if (d.subscribers) setSubscribers(d.subscribers);
          if (d.count !== undefined) setSubscriberCount(d.count);
        })
        .catch(() => {});
    }
  }, []);

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
              <ShieldCheck size={14} className="text-emerald-400" />
              <span className="text-[13px] font-mono font-bold text-white">
                ADMIN <span className="text-scent-accent">DASHBOARD</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-gray-500">
              {totalEnabled}/{totalFeatures} features enabled
            </span>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-900/10 border border-red-900/20 rounded text-[10px] font-mono text-red-400 hover:bg-red-900/20 transition-colors"
            >
              <LogOut size={11} />
              LOGOUT
            </button>
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
            {/* Summary cards — row 1 */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              <div className="bg-scent-surface border border-scent-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={14} className="text-scent-accent" />
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Total Views</span>
                </div>
                <div className="text-2xl font-mono font-bold text-white">{totalViews?.toLocaleString() ?? "—"}</div>
                <div className="text-[9px] font-mono text-gray-600 mt-1">All time (persistent)</div>
              </div>
              <div className="bg-scent-surface border border-scent-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={14} className="text-emerald-400" />
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Live Now</span>
                </div>
                <div className="text-2xl font-mono font-bold text-emerald-400">{liveViewers}</div>
                <div className="text-[9px] font-mono text-gray-600 mt-1">Current viewers</div>
              </div>
              <div className="bg-scent-surface border border-scent-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye size={14} className="text-blue-400" />
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Session Views</span>
                </div>
                <div className="text-2xl font-mono font-bold text-white">{totalPageViews}</div>
                <div className="text-[9px] font-mono text-gray-600 mt-1">This session</div>
              </div>
              <div className="bg-scent-surface border border-scent-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MousePointer size={14} className="text-amber-400" />
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Clicks</span>
                </div>
                <div className="text-2xl font-mono font-bold text-white">{totalClicks}</div>
                <div className="text-[9px] font-mono text-gray-600 mt-1">This session</div>
              </div>
              <div className="bg-scent-surface border border-scent-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={14} className="text-purple-400" />
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Session</span>
                </div>
                <div className="text-2xl font-mono font-bold text-white">{formatDuration(getSessionDuration())}</div>
                <div className="text-[9px] font-mono text-gray-600 mt-1">Duration</div>
              </div>
              <div className="bg-scent-surface border border-scent-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={14} className="text-pink-400" />
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Subscribers</span>
                </div>
                <div className="text-2xl font-mono font-bold text-white">{subscriberCount}</div>
                <div className="text-[9px] font-mono text-gray-600 mt-1">Olfactal signups</div>
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

            {/* Traffic Sources + Recent Events side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Traffic Sources */}
              <div className="bg-scent-surface border border-scent-border rounded-lg p-4">
                <div className="text-[11px] font-mono text-gray-500 uppercase tracking-wider mb-3">Traffic Sources</div>
                {Object.keys(trafficSources).length > 0 ? (
                  <div className="space-y-2">
                    {Object.entries(trafficSources)
                      .sort(([, a], [, b]) => b - a)
                      .map(([source, count]) => {
                        const total = Object.values(trafficSources).reduce((a, b) => a + b, 0);
                        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                        return (
                          <div key={source} className="flex items-center gap-3">
                            <span className="text-[12px] text-gray-300 w-24 truncate capitalize">{source}</span>
                            <div className="flex-1 h-1.5 bg-scent-bg rounded-full overflow-hidden">
                              <div
                                className="h-full bg-scent-accent rounded-full transition-all"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-[11px] font-mono text-gray-500 w-8 text-right">{pct}%</span>
                            <span className="text-[11px] font-mono text-white w-6 text-right">{count}</span>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <p className="text-[12px] text-gray-600">No traffic data yet. Sources are detected on page view.</p>
                )}
              </div>

              {/* Recent Events */}
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

            {/* Olfactal Subscribers */}
            <div className="bg-scent-surface border border-scent-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[11px] font-mono text-gray-500 uppercase tracking-wider">Olfactal Beta Signups</div>
                <span className="text-[10px] font-mono text-scent-accent">{subscriberCount} total</span>
              </div>
              {subscribers.length > 0 ? (
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  <div className="grid grid-cols-[1fr_140px_80px] gap-2 text-[9px] font-mono text-gray-600 uppercase tracking-wider pb-2 border-b border-scent-border">
                    <span>Email</span>
                    <span>Date</span>
                    <span>Source</span>
                  </div>
                  {subscribers.map((sub, i) => (
                    <div key={i} className="grid grid-cols-[1fr_140px_80px] gap-2 py-1.5 items-center hover:bg-white/[0.02] rounded">
                      <span className="text-[12px] text-gray-300 truncate">{sub.email}</span>
                      <span className="text-[10px] font-mono text-gray-500">{new Date(sub.subscribedAt).toLocaleDateString()}</span>
                      <span className="badge badge-blue">{sub.source}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[12px] text-gray-600">No signups yet. Enable the Olfactal Beta widget to start collecting emails.</p>
              )}
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
