"use client";
import { useMemo } from "react";
import WidgetWrapper, { LiveBadge } from "./WidgetWrapper";
import { useLiveData } from "@/hooks/useLiveData";
import { TrendingUp, RefreshCw } from "lucide-react";

interface MarketResponse {
  fragranceIndex: {
    value: number;
    change: number;
    high52w: number;
    low52w: number;
  };
  lastUpdated: string;
}

export default function FragranceIndex() {
  const { data, refetch, isStale } = useLiveData<MarketResponse>({
    url: "/api/market",
    refreshInterval: 15000, // 15 sec - live ticker feel
    fallbackData: {
      fragranceIndex: { value: 847, change: 1.8, high52w: 862, low52w: 819 },
      lastUpdated: "",
    },
  });

  const index = data.fragranceIndex?.value ?? 847;
  const change = data.fragranceIndex?.change ?? 1.8;
  const high = data.fragranceIndex?.high52w ?? 862;
  const low = data.fragranceIndex?.low52w ?? 819;
  const avg = Math.round((high + low) / 2);
  const isUp = change > 0;

  // Deterministic sparkline based on index value
  const sparkBars = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const seed = index * 0.01 + i * 0.4;
      const h = 20 + Math.sin(seed) * 15 + Math.abs(Math.sin(seed * 2.3)) * 10;
      return h;
    });
  }, [index]);

  return (
    <WidgetWrapper
      title="Fragrance Index"
      badge={<LiveBadge />}
      info="ScentDesk Composite Index — a weighted indicator of overall fragrance market health based on material prices, market sentiment, and growth data."
      headerRight={
        <button
          onClick={refetch}
          className={`text-gray-500 hover:text-gray-300 transition-colors ${isStale ? "animate-spin" : ""}`}
        >
          <RefreshCw size={11} />
        </button>
      }
    >
      <div className="flex items-end gap-3 mb-3">
        <div className="text-3xl font-bold text-white font-mono">{index}</div>
        <div className={`flex items-center gap-1 text-[13px] font-mono ${isUp ? "text-emerald-400" : "text-red-400"}`}>
          <TrendingUp size={14} className={isUp ? "" : "rotate-180"} />
          {isUp ? "+" : ""}{change.toFixed(2)}%
        </div>
      </div>
      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-0.5">ScentDesk Composite Index</div>
      <p className="text-[10px] text-gray-600 mb-2">Weighted score from raw material prices, market growth, and industry sentiment</p>
      {/* Sparkline */}
      <div className="flex items-end gap-[2px] h-12">
        {sparkBars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t transition-all duration-300"
            style={{
              height: `${h}%`,
              background: i === 29 ? (isUp ? "#34d399" : "#ef4444") : `rgba(200, 169, 126, ${0.15 + (i / 30) * 0.4})`,
            }}
          />
        ))}
      </div>
      <div className="flex justify-between text-[9px] text-gray-600 font-mono mt-1">
        <span>30d ago</span>
        <span>Now</span>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-scent-border">
        <div>
          <div className="text-[9px] font-mono text-gray-600">HIGH</div>
          <div className="text-[12px] font-mono text-emerald-400">{high}</div>
        </div>
        <div>
          <div className="text-[9px] font-mono text-gray-600">LOW</div>
          <div className="text-[12px] font-mono text-red-400">{low}</div>
        </div>
        <div>
          <div className="text-[9px] font-mono text-gray-600">AVG</div>
          <div className="text-[12px] font-mono text-gray-300">{avg}</div>
        </div>
      </div>
    </WidgetWrapper>
  );
}
