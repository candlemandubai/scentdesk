"use client";
import { useState } from "react";
import WidgetWrapper from "./WidgetWrapper";
import { mockHomeFragrances } from "@/data/mockData";
import { Star, TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";

export default function CandlesTracker() {
  const candles = mockHomeFragrances.filter((p) => p.category === "candle");
  const [sortBy, setSortBy] = useState<"rating" | "price" | "trend">("rating");

  const sorted = [...candles].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "price") return b.price - a.price;
    return a.trend === "rising" ? -1 : 1;
  });

  const avgPrice = candles.reduce((a, c) => a + c.price, 0) / candles.length;

  return (
    <WidgetWrapper title="Candles Market" info="Top-rated scented candles ranked by consumer ratings. Track price points and market trends across brands.">
      <div className="flex gap-3 mb-3">
        <div className="bg-scent-bg/50 rounded p-2 border border-scent-border flex-1 text-center">
          <div className="text-[9px] font-mono text-gray-500 uppercase">Avg Price</div>
          <div className="text-[16px] font-mono font-bold text-scent-accent">${avgPrice.toFixed(0)}</div>
        </div>
        <div className="bg-scent-bg/50 rounded p-2 border border-scent-border flex-1 text-center">
          <div className="text-[9px] font-mono text-gray-500 uppercase">Segment</div>
          <div className="text-[16px] font-mono font-bold text-emerald-400">$5.2B</div>
        </div>
        <div className="bg-scent-bg/50 rounded p-2 border border-scent-border flex-1 text-center">
          <div className="text-[9px] font-mono text-gray-500 uppercase">Growth</div>
          <div className="text-[16px] font-mono font-bold text-emerald-400">+9.4%</div>
        </div>
      </div>

      <div className="flex gap-2 mb-2">
        {(["rating", "price", "trend"] as const).map((s) => (
          <button key={s} onClick={() => setSortBy(s)}
            className={`text-[9px] font-mono uppercase ${sortBy === s ? "text-scent-accent" : "text-gray-600 hover:text-gray-400"}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {sorted.map((item) => (
          <a
            key={item.id}
            href={item.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-1 hover:bg-white/[0.02] rounded px-1 -mx-1 group"
          >
            <div className="flex-1 min-w-0">
              <div className="text-[12px] text-gray-200 group-hover:text-white transition-colors flex items-center gap-1">
                {item.brand} <span className="text-gray-500">—</span> {item.name}
                <ExternalLink size={8} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </div>
              <div className="text-[10px] text-gray-500 font-mono">{item.region}</div>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-amber-400">
              <Star size={10} fill="currentColor" /> {item.rating}
            </div>
            <span className="text-[12px] font-mono text-white">${item.price}</span>
            <span className={`${
              item.trend === "rising" ? "text-emerald-400" : item.trend === "falling" ? "text-red-400" : "text-gray-500"
            }`}>
              {item.trend === "rising" ? <TrendingUp size={12} /> : item.trend === "falling" ? <TrendingDown size={12} /> : <Minus size={12} />}
            </span>
          </a>
        ))}
      </div>
    </WidgetWrapper>
  );
}
