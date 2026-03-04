"use client";
import WidgetWrapper from "./WidgetWrapper";
import { TrendingUp } from "lucide-react";

const segments = [
  { name: "Scented Candles", value: 5.2, growth: 9.4, share: 40.6, color: "#c8a97e" },
  { name: "Reed Diffusers", value: 2.8, growth: 12.7, share: 21.9, color: "#a78bfa" },
  { name: "Room Sprays", value: 1.9, growth: 7.8, share: 14.8, color: "#38bdf8" },
  { name: "Wax Melts", value: 1.4, growth: 6.2, share: 10.9, color: "#f59e0b" },
  { name: "Incense", value: 0.9, growth: 15.1, share: 7.0, color: "#e8768a" },
  { name: "Other", value: 0.6, growth: 4.3, share: 4.7, color: "#374151" },
];

export default function HomeFragranceMarket() {
  const total = segments.reduce((a, s) => a + s.value, 0);

  return (
    <WidgetWrapper title="Home Fragrance Market" info="Home fragrance market breakdown: candles, diffusers, room sprays, wax melts, and incense with projected growth to 2028.">
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-scent-bg/50 rounded-lg p-3 border border-scent-border">
          <div className="text-[10px] font-mono text-gray-500 uppercase">Market Size</div>
          <div className="text-2xl font-bold text-white mt-1">${total.toFixed(1)}B</div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 mt-0.5">
            <TrendingUp size={12} /> +11.5% YoY
          </div>
        </div>
        <div className="bg-scent-bg/50 rounded-lg p-3 border border-scent-border">
          <div className="text-[10px] font-mono text-gray-500 uppercase">Projected 2028</div>
          <div className="text-2xl font-bold text-scent-accent mt-1">$18.9B</div>
          <div className="text-[11px] font-mono text-gray-500 mt-0.5">CAGR 10.2%</div>
        </div>
      </div>

      {/* Stacked bar */}
      <div className="h-6 rounded-full overflow-hidden flex mb-3">
        {segments.map((s) => (
          <div
            key={s.name}
            style={{ width: `${s.share}%`, background: s.color }}
            className="h-full hover:opacity-80 transition-opacity relative group"
            title={`${s.name}: ${s.share}%`}
          />
        ))}
      </div>

      <div className="space-y-1.5">
        {segments.map((s) => (
          <div key={s.name} className="flex items-center gap-2 text-[12px]">
            <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: s.color }} />
            <span className="flex-1 text-gray-300">{s.name}</span>
            <span className="font-mono text-gray-400">${s.value}B</span>
            <span className="font-mono text-emerald-400 w-14 text-right">+{s.growth}%</span>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}
