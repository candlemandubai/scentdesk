"use client";
import { ReactNode, useState, useRef, useEffect, useCallback } from "react";
import { MoreHorizontal, Info } from "lucide-react";

interface WidgetWrapperProps {
  title: string;
  badge?: ReactNode;
  children: ReactNode;
  headerRight?: ReactNode;
  className?: string;
  info?: string;
}

export default function WidgetWrapper({ title, badge, children, headerRight, className = "", info }: WidgetWrapperProps) {
  const [showInfo, setShowInfo] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
      setShowInfo(false);
    }
  }, []);

  useEffect(() => {
    if (showInfo) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showInfo, handleClickOutside]);

  return (
    <div className={`widget-card h-full flex flex-col overflow-visible ${className}`}>
      <div className="widget-header">
        <div className="flex items-center gap-2 min-w-0">
          <span className="truncate">{title}</span>
          {badge}
          {info && (
            <div className="relative" ref={tooltipRef}>
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="text-gray-600 hover:text-gray-400 transition-colors shrink-0"
              >
                <Info size={12} />
              </button>
              {showInfo && (
                <div
                  className="fixed z-[999] bg-scent-card border border-scent-border rounded-lg p-3 shadow-2xl w-[260px] sm:w-[280px] animate-slide-up"
                  style={{
                    top: tooltipRef.current
                      ? tooltipRef.current.getBoundingClientRect().bottom + 6
                      : 0,
                    left: tooltipRef.current
                      ? Math.min(
                          tooltipRef.current.getBoundingClientRect().left,
                          window.innerWidth - 290
                        )
                      : 0,
                  }}
                  onMouseLeave={() => setShowInfo(false)}
                >
                  <p className="text-[11px] text-gray-300 leading-relaxed">{info}</p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {headerRight}
          <button className="text-gray-500 hover:text-gray-300 transition-colors">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>
      <div className="widget-body flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}

export function LiveBadge() {
  return (
    <span className="flex items-center gap-1.5 text-[10px] font-bold text-red-400">
      <span className="live-dot" />
      LIVE
    </span>
  );
}

export function CountBadge({ count }: { count: number }) {
  return (
    <span className="text-[10px] font-mono bg-scent-border px-1.5 py-0.5 rounded text-gray-400">
      {count}
    </span>
  );
}
