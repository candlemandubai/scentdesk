"use client";
import WidgetWrapper from "./WidgetWrapper";
import { mockHomeFragrances } from "@/data/mockData";
import { Star, TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";

export default function DiffusersMarket() {
  const diffusers = mockHomeFragrances.filter((p) => p.category === "diffuser" || p.category === "room-spray");

  return (
    <WidgetWrapper title="Diffusers & Sprays" info="Reed diffuser and room spray market data with top products, pricing, and regional performance.">
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-scent-bg/50 rounded p-2 border border-scent-border text-center">
          <div className="text-[9px] font-mono text-gray-500 uppercase">Diffusers</div>
          <div className="text-[14px] font-mono font-bold text-scent-lavender">$2.8B</div>
          <div className="text-[10px] font-mono text-emerald-400">+12.7%</div>
        </div>
        <div className="bg-scent-bg/50 rounded p-2 border border-scent-border text-center">
          <div className="text-[9px] font-mono text-gray-500 uppercase">Room Sprays</div>
          <div className="text-[14px] font-mono font-bold text-scent-sky">$1.9B</div>
          <div className="text-[10px] font-mono text-emerald-400">+7.8%</div>
        </div>
      </div>

      <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-2">Top Products</div>
      <div className="space-y-2">
        {diffusers.map((item) => (
          <a
            key={item.id}
            href={item.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-1 hover:bg-white/[0.02] rounded px-1 -mx-1 group"
          >
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.category === "diffuser" ? "bg-purple-400" : "bg-sky-400"}`} />
            <div className="flex-1 min-w-0">
              <div className="text-[12px] text-gray-200 group-hover:text-white transition-colors flex items-center gap-1">
                {item.brand} — {item.name}
                <ExternalLink size={8} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-gray-500 font-mono">{item.category === "diffuser" ? "Diffuser" : "Spray"}</span>
                <span className="text-[10px] text-gray-600">|</span>
                <span className="text-[10px] text-gray-500">{item.region}</span>
              </div>
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
