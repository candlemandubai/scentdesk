"use client";
import { useState, useEffect, useCallback } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { useAnalyticsStore } from "@/store/analyticsStore";
import { createEvent } from "@/lib/analytics";
import {
  Search,
  Radio,
  Settings,
  MapPin,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
} from "lucide-react";
import type { DashboardTab } from "@/types";
import CommandPalette from "@/components/layout/CommandPalette";
import SettingsDialog from "@/components/layout/SettingsDialog";
import ShareButton from "@/components/layout/ShareButton";

const tabs: { id: DashboardTab; label: string; shortLabel: string }[] = [
  { id: "feed", label: "Live Feed", shortLabel: "FEED" },
  { id: "directory", label: "Industry Directory", shortLabel: "DIR" },
];

export default function Header() {
  const activeTab = useDashboardStore((s) => s.activeTab);
  const setActiveTab = useDashboardStore((s) => s.setActiveTab);
  const isLive = useDashboardStore((s) => s.isLive);
  const toggleLive = useDashboardStore((s) => s.toggleLive);
  const trackEvent = useAnalyticsStore((s) => s.trackEvent);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [geoLocation, setGeoLocation] = useState<{ city: string; country: string } | null>(null);

  // Clock
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
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Geolocation — detect country/city
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((d) => {
        if (d.city && d.country_name) {
          setGeoLocation({ city: d.city, country: d.country_name });
        }
      })
      .catch(() => {
        // Fallback — try alternative
        fetch("https://get.geojs.io/v1/ip/geo.json")
          .then((r) => r.json())
          .then((d) => {
            if (d.city && d.country) {
              setGeoLocation({ city: d.city, country: d.country });
            }
          })
          .catch(() => setGeoLocation(null));
      });
  }, []);

  // ⌘K / Ctrl+K shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fullscreen listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab);
    trackEvent(createEvent("tab_change", { tab }));
  };

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.remove("theme-light");
      } else {
        document.documentElement.classList.add("theme-light");
      }
      return next;
    });
  }, []);

  return (
    <>
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
              className="text-[10px] font-mono text-gray-500 hover:text-scent-accent transition-colors hidden sm:block"
            >
              @candlemandubai
            </a>
            <a
              href="https://olfactal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono text-gray-500 hover:text-scent-accent transition-colors hidden sm:block"
            >
              olfactal.com
            </a>

            <div className="h-4 w-px bg-scent-border hidden sm:block" />

            {/* LIVE signal — green with grey text */}
            <button
              onClick={toggleLive}
              className="flex items-center gap-1.5 text-[10px] font-mono font-semibold px-2 py-1 rounded transition-colors text-gray-400 hover:text-gray-200"
            >
              {isLive ? (
                <>
                  <span className="live-dot" style={{ width: 8, height: 8 }} />
                  <span className="text-gray-400">LIVE</span>
                </>
              ) : (
                <>
                  <Radio size={10} className="text-gray-500" />
                  <span className="text-gray-500">PAUSED</span>
                </>
              )}
            </button>

            <div className="h-4 w-px bg-scent-border hidden md:block" />
            <span className="text-[10px] font-mono text-gray-500 hidden md:block">{currentTime}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Session time shown subtly — analytics detail in admin only */}

            {/* Search — opens command palette */}
            <button
              onClick={() => setShowCommandPalette(true)}
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 px-2 py-1 rounded hover:bg-white/5 transition-colors"
              title="Search (⌘K)"
            >
              <Search size={14} />
              <span className="text-[10px] font-mono text-gray-600 hidden md:inline">⌘K</span>
            </button>

            {/* Share */}
            <ShareButton compact />

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="text-gray-500 hover:text-gray-300 p-1.5 rounded hover:bg-white/5 transition-colors"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Settings */}
            <button
              onClick={() => setShowSettings(true)}
              className="text-gray-500 hover:text-gray-300 p-1.5 rounded hover:bg-white/5 transition-colors"
              title="Settings"
            >
              <Settings size={14} />
            </button>

            {/* Fullscreen — hidden on mobile, doesn't make sense there */}
            <button
              onClick={toggleFullscreen}
              className="text-gray-500 hover:text-gray-300 p-1.5 rounded hover:bg-white/5 transition-colors hidden sm:block"
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          </div>
        </div>

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
          <div className="ml-auto flex items-center gap-2 text-[10px] font-mono text-gray-600 overflow-hidden">
            {/* @candlemandubai — mobile only (hidden on desktop where it shows in top bar) */}
            <a
              href="https://instagram.com/candlemandubai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-scent-accent transition-colors sm:hidden whitespace-nowrap text-[9px]"
            >
              @candlemandubai
            </a>
            {/* Location — hidden on mobile to save space, shown on sm+ */}
            <div className="hidden sm:flex items-center gap-1 whitespace-nowrap">
              <MapPin size={10} />
              <span>
                {geoLocation
                  ? `${geoLocation.city}, ${geoLocation.country}`
                  : "Detecting location..."}
              </span>
            </div>
          </div>
        </div>

        {/* Analytics available in admin dashboard only */}
      </header>

      {/* Command Palette */}
      {showCommandPalette && (
        <CommandPalette onClose={() => setShowCommandPalette(false)} />
      )}

      {/* Settings Dialog */}
      {showSettings && (
        <SettingsDialog onClose={() => setShowSettings(false)} />
      )}
    </>
  );
}
