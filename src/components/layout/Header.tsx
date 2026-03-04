"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDashboardStore } from "@/store/dashboardStore";
import { useAnalyticsStore } from "@/store/analyticsStore";
import { createEvent, formatDuration } from "@/lib/analytics";
import {
  Search,
  Radio,
  Settings,
  BarChart3,
  MapPin,
  X,
} from "lucide-react";
import type { DashboardTab } from "@/types";

const tabs: { id: DashboardTab; label: string; shortLabel: string }[] = [
  { id: "market", label: "Market", shortLabel: "MKT" },
  { id: "raw-materials", label: "Raw Materials", shortLabel: "RAW" },
  { id: "home-fragrances", label: "Home Fragrances", shortLabel: "HOME" },
  { id: "trends", label: "Trends", shortLabel: "TRD" },
  { id: "local", label: "Local / Events", shortLabel: "LOC" },
];

export default function Header() {
  const { activeTab, setActiveTab, searchQuery, setSearchQuery, isLive, toggleLive } = useDashboardStore();
  const { trackEvent, totalClicks, totalPageViews, getSessionDuration } = useAnalyticsStore();
  const [showSearch, setShowSearch] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [sessionTime, setSessionTime] = useState("0s");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleString("en-US", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).toUpperCase()
      );
      setSessionTime(formatDuration(getSessionDuration()));
    }, 1000);
    return () => clearInterval(interval);
  }, [getSessionDuration]);

  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab);
    trackEvent(createEvent("tab_change", { tab }));
  };

  return (
    <header className="bg-scent-surface border-b border-scent-border sticky top-0 z-50">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 h-11">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-scent-accent" />
            <span className="text-[13px] font-mono font-bold tracking-wider text-white">
              SCENT<span className="text-scent-accent">DESK</span>
            </span>
            <span className="text-[10px] font-mono text-gray-600">v1.0.0</span>
          </div>

          <a
            href="https://instagram.com/candlemandubai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-mono text-gray-500 hover:text-scent-accent transition-colors"
          >
            @candlemandubai
          </a>

          <div className="h-4 w-px bg-scent-border" />

          <button
            onClick={toggleLive}
            className={`flex items-center gap-1.5 text-[10px] font-mono font-semibold px-2 py-1 rounded transition-colors ${
              isLive ? "text-red-400" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <Radio size={10} className={isLive ? "animate-pulse" : ""} />
            {isLive ? "LIVE" : "PAUSED"}
          </button>

          <div className="h-4 w-px bg-scent-border hidden md:block" />
          <span className="text-[10px] font-mono text-gray-500 hidden md:block">{currentTime}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick stats */}
          <button
            onClick={() => setShowStats(!showStats)}
            className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500 hover:text-gray-300 px-2 py-1 rounded hover:bg-white/5 transition-colors"
          >
            <BarChart3 size={12} />
            <span className="hidden sm:inline">{totalPageViews} views</span>
            <span className="hidden sm:inline text-gray-600">|</span>
            <span className="hidden sm:inline">{totalClicks} clicks</span>
            <span className="hidden sm:inline text-gray-600">|</span>
            <span className="hidden sm:inline">{sessionTime}</span>
          </button>

          <div className="h-4 w-px bg-scent-border" />

          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-gray-500 hover:text-gray-300 p-1.5 rounded hover:bg-white/5 transition-colors"
          >
            <Search size={14} />
          </button>

          <Link
            href="/admin"
            className="flex items-center gap-1 text-gray-500 hover:text-gray-300 p-1.5 rounded hover:bg-white/5 transition-colors"
          >
            <Settings size={14} />
          </Link>
        </div>
      </div>

      {/* Search bar */}
      {showSearch && (
        <div className="px-4 pb-2 animate-slide-up">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news, materials, brands, events..."
              className="w-full bg-scent-bg border border-scent-border rounded-lg pl-9 pr-9 py-2 text-[13px] text-white placeholder-gray-600 focus:outline-none focus:border-scent-accent/50 font-mono"
              autoFocus
            />
            <button
              onClick={() => { setShowSearch(false); setSearchQuery(""); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Tab navigation */}
      <div className="flex items-center gap-0.5 px-4 border-t border-scent-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-4 py-2.5 text-[11px] font-mono font-semibold uppercase tracking-wider transition-all relative ${
              activeTab === tab.id
                ? "text-scent-accent"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.shortLabel}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-scent-accent" />
            )}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1 text-[10px] font-mono text-gray-600">
          <MapPin size={10} />
          <span>Geolocation Active</span>
        </div>
      </div>

      {/* Stats dropdown */}
      {showStats && (
        <div className="absolute right-4 top-12 bg-scent-card border border-scent-border rounded-lg p-4 shadow-xl z-50 animate-slide-up min-w-[250px]">
          <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-3">Session Analytics</div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[12px] text-gray-400">Page Views</span>
              <span className="text-[12px] font-mono text-white">{totalPageViews}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[12px] text-gray-400">Widget Clicks</span>
              <span className="text-[12px] font-mono text-white">{totalClicks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[12px] text-gray-400">Session Duration</span>
              <span className="text-[12px] font-mono text-white">{sessionTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[12px] text-gray-400">Active Tab</span>
              <span className="text-[12px] font-mono text-scent-accent">{activeTab}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
