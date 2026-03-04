"use client";
import WidgetWrapper from "./WidgetWrapper";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const trends = [
  { name: "Clean/Natural Fragrances", demand: 87, change: 12, direction: "up" as const },
  { name: "Gender-Neutral Scents", demand: 78, change: 18, direction: "up" as const },
  { name: "Layerable Collections", demand: 72, change: 9, direction: "up" as const },
  { name: "Oud/Middle Eastern", demand: 68, change: 15, direction: "up" as const },
  { name: "Niche Discovery Sets", demand: 65, change: 22, direction: "up" as const },
  { name: "Gourmand Fragrances", demand: 61, change: -3, direction: "down" as const },
  { name: "Celebrity Scents", demand: 44, change: -8, direction: "down" as const },
  { name: "Floral Soliflores", demand: 52, change: 0, direction: "stable" as const },
];

const demographics = [
  { group: "Gen Z (18-25)", share: 28, trend: "+4.2%" },
  { group: "Millennials (26-41)", share: 35, trend: "+1.8%" },
  { group: "Gen X (42-57)", share: 24, trend: "-0.5%" },
  { group: "Boomers (58+)", share: 13, trend: "-1.1%" },
];

export default function ConsumerTrends() {
  return (
    <WidgetWrapper title="Consumer Trends" info="Consumer demand trends and buyer demographics. Track which fragrance categories are growing or declining.">
      <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-2">Trending Categories</div>
      <div className="space-y-2 mb-4">
        {trends.map((t) => (
          <div key={t.name} className="flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[11px] text-gray-300 truncate">{t.name}</span>
                <span className={`text-[10px] font-mono flex items-center gap-0.5 ${
                  t.direction === "up" ? "text-emerald-400" : t.direction === "down" ? "text-red-400" : "text-gray-500"
                }`}>
                  {t.direction === "up" ? <TrendingUp size={10} /> : t.direction === "down" ? <TrendingDown size={10} /> : <Minus size={10} />}
                  {t.change > 0 ? "+" : ""}{t.change}%
                </span>
              </div>
              <div className="h-1 bg-scent-bg rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${t.demand}%`,
                    background: t.direction === "up" ? "#34d399" : t.direction === "down" ? "#ef4444" : "#6b7280",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-2">Buyer Demographics</div>
      <div className="space-y-1.5">
        {demographics.map((d) => (
          <div key={d.group} className="flex items-center justify-between">
            <span className="text-[11px] text-gray-400">{d.group}</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1 bg-scent-bg rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-scent-accent" style={{ width: `${d.share}%` }} />
              </div>
              <span className="text-[10px] font-mono text-gray-300 w-8 text-right">{d.share}%</span>
              <span className={`text-[9px] font-mono ${d.trend.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>
                {d.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}
