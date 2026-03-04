"use client";
import { useState } from "react";
import WidgetWrapper from "./WidgetWrapper";
import { seasonalTrendsData } from "@/data/mockData";

type Season = "spring" | "summer" | "autumn" | "winter";

const seasonMeta: Record<Season, { icon: string; color: string; months: string }> = {
  spring: { icon: "🌸", color: "#e8768a", months: "Mar-May" },
  summer: { icon: "☀️", color: "#f59e0b", months: "Jun-Aug" },
  autumn: { icon: "🍂", color: "#c8a97e", months: "Sep-Nov" },
  winter: { icon: "❄️", color: "#38bdf8", months: "Dec-Feb" },
};

// Determine current season
function getCurrentSeason(): Season {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
}

export default function SeasonalTrends() {
  const [season, setSeason] = useState<Season>(getCurrentSeason());
  const data = seasonalTrendsData[season];
  const meta = seasonMeta[season];

  return (
    <WidgetWrapper title="Seasonal Trends" info="Fragrance family trends by season. See which scent profiles dominate spring, summer, autumn, and winter.">
      <div className="flex gap-2 mb-4">
        {(Object.keys(seasonMeta) as Season[]).map((s) => (
          <button
            key={s}
            onClick={() => setSeason(s)}
            className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
              season === s
                ? "bg-white/5 border border-scent-border"
                : "hover:bg-white/[0.02] border border-transparent"
            }`}
          >
            <span className="text-lg">{seasonMeta[s].icon}</span>
            <span className={`text-[10px] font-mono font-semibold uppercase ${
              season === s ? "text-white" : "text-gray-500"
            }`}>
              {s}
            </span>
            <span className="text-[9px] text-gray-600 font-mono">{seasonMeta[s].months}</span>
          </button>
        ))}
      </div>

      <div className="mb-4">
        <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-2">
          Top Families — {season.charAt(0).toUpperCase() + season.slice(1)}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {data.top.map((family, i) => (
            <div
              key={family}
              className="bg-scent-bg/50 rounded-lg p-3 border border-scent-border flex items-center gap-2"
            >
              <span className="text-[14px] font-mono font-bold" style={{ color: meta.color }}>
                {i + 1}
              </span>
              <span className="text-[12px] text-gray-200">{family}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-scent-bg/50 rounded-lg p-3 border border-scent-border">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-gray-600 uppercase">Season Growth Index</span>
          <span className="text-[16px] font-mono font-bold text-emerald-400">+{data.growth}%</span>
        </div>
        <div className="h-2 bg-scent-bg rounded-full mt-2 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${data.growth * 4}%`, background: meta.color }}
          />
        </div>
      </div>
    </WidgetWrapper>
  );
}
