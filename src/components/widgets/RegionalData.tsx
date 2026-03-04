"use client";
import WidgetWrapper from "./WidgetWrapper";

const regions = [
  { name: "Europe", value: 38.2, growth: 6.8, topMarkets: ["France", "UK", "Germany"], color: "#60a5fa" },
  { name: "North America", value: 28.7, growth: 7.2, topMarkets: ["USA", "Canada"], color: "#34d399" },
  { name: "Asia Pacific", value: 22.1, growth: 12.4, topMarkets: ["China", "Japan", "India"], color: "#f59e0b" },
  { name: "Middle East", value: 8.4, growth: 14.8, topMarkets: ["UAE", "Saudi Arabia", "Qatar"], color: "#c8a97e" },
  { name: "Latin America", value: 6.3, growth: 9.1, topMarkets: ["Brazil", "Mexico", "Argentina"], color: "#a78bfa" },
  { name: "Africa", value: 2.8, growth: 11.2, topMarkets: ["South Africa", "Nigeria", "Egypt"], color: "#e8768a" },
];

export default function RegionalData() {
  const total = regions.reduce((a, r) => a + r.value, 0);

  return (
    <WidgetWrapper title="Regional Sourcing" info="Market data broken down by global regions. Compare market sizes, growth rates, and key countries across continents.">
      <div className="space-y-3">
        {regions.map((region) => (
          <div key={region.name}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: region.color }} />
                <span className="text-[12px] text-gray-200">{region.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[12px] font-mono text-white">${region.value}B</span>
                <span className="text-[11px] font-mono text-emerald-400">+{region.growth}%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-scent-bg rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(region.value / total) * 100}%`, background: region.color }}
                />
              </div>
              <span className="text-[9px] font-mono text-gray-600">{((region.value / total) * 100).toFixed(0)}%</span>
            </div>
            <div className="flex gap-1 mt-1">
              {region.topMarkets.map((market) => (
                <span key={market} className="text-[9px] font-mono text-gray-600 bg-scent-bg/50 px-1 py-0.5 rounded">
                  {market}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}
