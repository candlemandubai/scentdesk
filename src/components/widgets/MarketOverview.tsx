"use client";
import { useState } from "react";
import WidgetWrapper from "./WidgetWrapper";
import { useLiveData } from "@/hooks/useLiveData";
import { mockMarketData } from "@/data/mockData";
import { TrendingUp, TrendingDown, Minus, RefreshCw, ExternalLink } from "lucide-react";

interface MarketSegment {
  segment: string;
  value: number;
  growth: number;
  trend: "up" | "down" | "stable";
}

interface MarketResponse {
  segments: MarketSegment[];
  totalMarketSize: string;
  lastUpdated: string;
}

type ViewTab = "segments" | "houses";

const fragranceHouses = [
  { name: "Givaudan", revenue: "7.1B", currency: "CHF", growth: 4.2, trend: "up" as const, hq: "Switzerland", url: "https://www.givaudan.com" },
  { name: "dsm-firmenich", revenue: "12.4B", currency: "EUR", growth: 5.8, trend: "up" as const, hq: "Switzerland", url: "https://www.dsm-firmenich.com" },
  { name: "IFF", revenue: "11.3B", currency: "USD", growth: -1.2, trend: "down" as const, hq: "USA", url: "https://www.iff.com" },
  { name: "Symrise", revenue: "4.7B", currency: "EUR", growth: 5.3, trend: "up" as const, hq: "Germany", url: "https://www.symrise.com" },
  { name: "Mane SA", revenue: "1.9B", currency: "EUR", growth: 7.1, trend: "up" as const, hq: "France", url: "https://www.mane.com" },
  { name: "Robertet", revenue: "700M", currency: "EUR", growth: 3.4, trend: "up" as const, hq: "France", url: "https://www.robertet.com" },
  { name: "Takasago", revenue: "1.6B", currency: "USD", growth: 2.8, trend: "up" as const, hq: "Japan", url: "https://www.takasago.com" },
  { name: "Sensient", revenue: "1.5B", currency: "USD", growth: 1.9, trend: "up" as const, hq: "USA", url: "https://www.sensient.com" },
  { name: "Argeville", revenue: "180M", currency: "EUR", growth: 6.2, trend: "up" as const, hq: "France", url: "https://www.argeville.com" },
  { name: "Sozio", revenue: "150M", currency: "EUR", growth: 4.5, trend: "up" as const, hq: "France", url: "https://www.sozio.com" },
];

export default function MarketOverview() {
  const [viewTab, setViewTab] = useState<ViewTab>("segments");

  const { data, refetch, isStale } = useLiveData<MarketResponse>({
    url: "/api/market",
    refreshInterval: 300000,
    fallbackData: {
      segments: mockMarketData,
      totalMarketSize: "125.3",
      lastUpdated: "",
    },
  });

  const segments = data.segments.length > 0 ? data.segments : mockMarketData;
  const totalMarket = segments.reduce((acc, d) => acc + d.value, 0);
  const avgGrowth = segments.reduce((acc, d) => acc + d.growth, 0) / segments.length;
  const fastest = [...segments].sort((a, b) => b.growth - a.growth)[0];

  return (
    <WidgetWrapper
      title="Market Overview"
      info="Global fragrance market overview showing segment sizes, growth rates, and year-over-year trends. Includes top fragrance house revenues."
      headerRight={
        <button
          onClick={refetch}
          className={`text-gray-500 hover:text-gray-300 transition-colors ${isStale ? "animate-spin" : ""}`}
        >
          <RefreshCw size={11} />
        </button>
      }
    >
      <div className="flex gap-1 mb-3">
        <button
          onClick={() => setViewTab("segments")}
          className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-colors ${
            viewTab === "segments"
              ? "bg-scent-accent/20 text-scent-accent border border-scent-accent/30"
              : "text-gray-500 hover:text-gray-300 border border-transparent"
          }`}
        >
          Segments
        </button>
        <button
          onClick={() => setViewTab("houses")}
          className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-colors ${
            viewTab === "houses"
              ? "bg-scent-accent/20 text-scent-accent border border-scent-accent/30"
              : "text-gray-500 hover:text-gray-300 border border-transparent"
          }`}
        >
          Houses
        </button>
      </div>

      {viewTab === "segments" && (
        <>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-scent-bg/50 rounded-lg p-3 border border-scent-border">
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Global Market</div>
              <div className="text-2xl font-bold text-white mt-1">${totalMarket.toFixed(1)}B</div>
              <div className="text-[11px] font-mono text-emerald-400 mt-0.5">+{avgGrowth.toFixed(1)}% YoY</div>
            </div>
            <div className="bg-scent-bg/50 rounded-lg p-3 border border-scent-border">
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Fastest Growing</div>
              <div className="text-lg font-bold text-scent-accent mt-1">{fastest?.segment}</div>
              <div className="text-[11px] font-mono text-emerald-400 mt-0.5">+{fastest?.growth}% CAGR</div>
            </div>
          </div>
          <div className="space-y-2">
            {segments.map((seg) => (
              <div key={seg.segment} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] text-gray-300">{seg.segment}</span>
                    <span className="text-[12px] font-mono text-white">${seg.value}B</span>
                  </div>
                  <div className="h-1.5 bg-scent-bg rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(seg.value / totalMarket) * 100}%`,
                        background: seg.growth > 10 ? "#34d399" : seg.growth > 5 ? "#c8a97e" : seg.growth > 0 ? "#60a5fa" : "#ef4444",
                      }}
                    />
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-[11px] font-mono min-w-[60px] justify-end ${
                  seg.trend === "up" ? "text-emerald-400" : seg.trend === "down" ? "text-red-400" : "text-gray-500"
                }`}>
                  {seg.trend === "up" ? <TrendingUp size={12} /> : seg.trend === "down" ? <TrendingDown size={12} /> : <Minus size={12} />}
                  {seg.growth > 0 ? "+" : ""}{seg.growth}%
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {viewTab === "houses" && (
        <div className="space-y-1.5">
          {fragranceHouses.map((house) => (
            <a
              key={house.name}
              href={house.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-1.5 px-1.5 -mx-1.5 rounded hover:bg-white/[0.02] group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-semibold text-white group-hover:text-scent-accent transition-colors">{house.name}</span>
                  <ExternalLink size={8} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
                <span className="text-[10px] text-gray-600">{house.hq}</span>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[12px] font-mono text-white">{house.currency === "CHF" ? "CHF " : house.currency === "EUR" ? "\u20ac" : "$"}{house.revenue}</div>
              </div>
              <div className={`flex items-center gap-0.5 text-[11px] font-mono min-w-[50px] justify-end ${
                house.trend === "up" ? "text-emerald-400" : "text-red-400"
              }`}>
                {house.trend === "up" ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {house.growth > 0 ? "+" : ""}{house.growth}%
              </div>
            </a>
          ))}
        </div>
      )}

      {data.lastUpdated && (
        <div className="mt-3 pt-2 border-t border-scent-border text-[9px] font-mono text-gray-600">
          Updated: {new Date(data.lastUpdated).toLocaleTimeString()}
        </div>
      )}
    </WidgetWrapper>
  );
}
