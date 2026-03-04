"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import {
  Search,
  FileText,
  Settings,
  Clock,
  LayoutGrid,
  Newspaper,
  Calendar,
  GraduationCap,
  Building2,
  Headphones,
  Globe2,
  Command,
} from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  category: "navigate" | "command" | "widget" | "data";
  shortcut?: string;
  action: () => void;
}

interface CommandPaletteProps {
  onClose: () => void;
}

export default function CommandPalette({ onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const setActiveTab = useDashboardStore((s) => s.setActiveTab);
  const setSearchQuery = useDashboardStore((s) => s.setSearchQuery);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Escape to close
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose]);

  const commands: CommandItem[] = useMemo(
    () => [
      // Navigation
      {
        id: "nav-feed",
        label: "Live Feed",
        description: "Go to live news and regulatory feed",
        icon: <Newspaper size={16} />,
        category: "navigate",
        action: () => { setActiveTab("feed"); onClose(); },
      },
      {
        id: "nav-directory",
        label: "Industry Directory",
        description: "Go to events, schools, suppliers directory",
        icon: <Globe2 size={16} />,
        category: "navigate",
        action: () => { setActiveTab("directory"); onClose(); },
      },
      // Commands
      {
        id: "cmd-fullscreen",
        label: "Toggle Fullscreen",
        description: "Enter or exit fullscreen mode",
        icon: <LayoutGrid size={16} />,
        category: "command",
        shortcut: "F11",
        action: () => {
          if (document.fullscreenElement) document.exitFullscreen();
          else document.documentElement.requestFullscreen();
          onClose();
        },
      },
      {
        id: "cmd-dark-mode",
        label: "Toggle Dark Mode",
        description: "Switch between dark and light theme",
        icon: <Settings size={16} />,
        category: "command",
        action: () => {
          document.documentElement.classList.toggle("theme-light");
          onClose();
        },
      },
      // Widget quick-jumps
      {
        id: "w-news",
        label: "Industry News",
        description: "Real-time RSS news from 12+ sources",
        icon: <Newspaper size={16} />,
        category: "widget",
        action: () => {
          setActiveTab("feed");
          onClose();
          setTimeout(() => {
            document.getElementById("news-feed")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        },
      },
      {
        id: "w-regulatory",
        label: "Regulatory Updates",
        description: "IFRA, EU, FDA regulatory news",
        icon: <FileText size={16} />,
        category: "widget",
        action: () => {
          setActiveTab("feed");
          onClose();
          setTimeout(() => {
            document.getElementById("regulatory-updates")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        },
      },
      {
        id: "w-clock",
        label: "World Clock",
        description: "Fragrance capital time zones",
        icon: <Clock size={16} />,
        category: "widget",
        action: () => {
          setActiveTab("feed");
          onClose();
        },
      },
      {
        id: "w-events",
        label: "Upcoming Events",
        description: "Industry trade shows, conferences, workshops",
        icon: <Calendar size={16} />,
        category: "widget",
        action: () => {
          setActiveTab("directory");
          onClose();
          setTimeout(() => {
            document.getElementById("events-calendar")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        },
      },
      {
        id: "w-suppliers",
        label: "Suppliers & Houses",
        description: "Major fragrance houses and suppliers",
        icon: <Building2 size={16} />,
        category: "widget",
        action: () => {
          setActiveTab("directory");
          onClose();
        },
      },
      {
        id: "w-schools",
        label: "Schools & Programs",
        description: "Perfumery education worldwide",
        icon: <GraduationCap size={16} />,
        category: "widget",
        action: () => {
          setActiveTab("directory");
          onClose();
        },
      },
      {
        id: "w-perfumers",
        label: "Perfumers & Podcasts",
        description: "Notable noses and fragrance podcasts",
        icon: <Headphones size={16} />,
        category: "widget",
        action: () => {
          setActiveTab("directory");
          onClose();
        },
      },
      // Data search
      {
        id: "search-ifra",
        label: "Search: IFRA Regulations",
        description: "Search for IFRA standards and amendments",
        icon: <Search size={16} />,
        category: "data",
        action: () => { setSearchQuery("IFRA"); onClose(); },
      },
      {
        id: "search-givaudan",
        label: "Search: Givaudan",
        description: "Search for Givaudan across all data",
        icon: <Search size={16} />,
        category: "data",
        action: () => { setSearchQuery("Givaudan"); onClose(); },
      },
      {
        id: "search-iff",
        label: "Search: IFF",
        description: "Search for IFF across all data",
        icon: <Search size={16} />,
        category: "data",
        action: () => { setSearchQuery("IFF"); onClose(); },
      },
      {
        id: "search-firmenich",
        label: "Search: dsm-firmenich",
        description: "Search for dsm-firmenich across all data",
        icon: <Search size={16} />,
        category: "data",
        action: () => { setSearchQuery("firmenich"); onClose(); },
      },
    ],
    [setActiveTab, setSearchQuery, onClose]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [commands, query]);

  // Reset selection when filter changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].action();
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [filtered, selectedIndex]);

  // Scroll selected into view
  useEffect(() => {
    const el = listRef.current?.children[selectedIndex] as HTMLElement;
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  // Group by category
  const grouped = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    filtered.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filtered]);

  const categoryLabels: Record<string, string> = {
    navigate: "NAVIGATE",
    command: "COMMANDS",
    widget: "WIDGETS",
    data: "SEARCH DATA",
  };

  let flatIndex = -1;

  return (
    <div className="command-palette-overlay" onClick={onClose}>
      <div className="command-palette" onClick={(e) => e.stopPropagation()}>
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-scent-border">
          <Command size={16} className="text-gray-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or type a command..."
            className="flex-1 bg-transparent text-[14px] font-mono text-white placeholder-gray-500 outline-none"
          />
          <kbd className="text-[10px] font-mono text-gray-500 bg-scent-bg px-2 py-1 rounded border border-scent-border">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[400px] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-[13px] text-gray-500 font-mono">No results for &quot;{query}&quot;</p>
              <p className="text-[11px] text-gray-600 mt-1">Try searching for widgets or commands</p>
            </div>
          ) : (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <div className="px-4 py-1.5 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                  {categoryLabels[category] || category}
                </div>
                {items.map((item) => {
                  flatIndex++;
                  const idx = flatIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        selectedIndex === idx
                          ? "bg-scent-accent/10 border-l-2 border-scent-accent"
                          : "border-l-2 border-transparent hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className={`shrink-0 ${selectedIndex === idx ? "text-scent-accent" : "text-gray-500"}`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-[13px] font-mono ${selectedIndex === idx ? "text-white" : "text-gray-300"}`}>
                          {item.label}
                        </p>
                        <p className="text-[10px] text-gray-600 truncate">{item.description}</p>
                      </div>
                      {item.shortcut && (
                        <kbd className="text-[9px] font-mono text-gray-600 bg-scent-bg px-1.5 py-0.5 rounded border border-scent-border shrink-0">
                          {item.shortcut}
                        </kbd>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-scent-border text-[10px] font-mono text-gray-600">
          <span className="flex items-center gap-1">
            <kbd className="bg-scent-bg px-1 py-0.5 rounded border border-scent-border">↑↓</kbd>
            navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="bg-scent-bg px-1 py-0.5 rounded border border-scent-border">↵</kbd>
            select
          </span>
          <span className="flex items-center gap-1">
            <kbd className="bg-scent-bg px-1 py-0.5 rounded border border-scent-border">esc</kbd>
            close
          </span>
        </div>
      </div>
    </div>
  );
}
