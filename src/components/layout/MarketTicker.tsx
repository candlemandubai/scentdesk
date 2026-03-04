"use client";
import { mockRawMaterials, mockMarketData } from "@/data/mockData";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function MarketTicker() {
  const items = [
    ...mockRawMaterials.slice(0, 8).map((m) => ({
      label: m.name.split("(")[0].trim(),
      value: m.price >= 1000 ? `$${(m.price / 1000).toFixed(1)}k` : `$${m.price}`,
      change: m.change24h,
    })),
    ...mockMarketData.map((m) => ({
      label: m.segment,
      value: `$${m.value}B`,
      change: m.growth,
    })),
  ];

  const tickerContent = (
    <>
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-1.5 mx-4 whitespace-nowrap">
          <span className="text-[10px] text-gray-500 font-semibold">{item.label}</span>
          <span className="text-[10px] font-mono text-white">{item.value}</span>
          <span className={`inline-flex items-center gap-0.5 text-[10px] font-mono ${
            item.change > 0 ? "text-emerald-400" : item.change < 0 ? "text-red-400" : "text-gray-500"
          }`}>
            {item.change > 0 ? <ArrowUpRight size={8} /> : item.change < 0 ? <ArrowDownRight size={8} /> : null}
            {item.change > 0 ? "+" : ""}{item.change.toFixed(1)}%
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div className="bg-scent-bg/80 border-b border-scent-border overflow-hidden h-7 flex items-center">
      <div className="ticker-scroll inline-flex">
        {tickerContent}
        {tickerContent}
      </div>
    </div>
  );
}
