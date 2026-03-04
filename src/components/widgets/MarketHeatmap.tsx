"use client";
import WidgetWrapper from "./WidgetWrapper";

const sectors = [
  { name: "Fine Fragrance", change: 8.2, size: 3 },
  { name: "Niche", change: 15.3, size: 2 },
  { name: "Home", change: 11.5, size: 2 },
  { name: "Personal Care", change: 5.1, size: 3 },
  { name: "Raw Materials", change: 3.8, size: 2 },
  { name: "Celebrity", change: -2.1, size: 1 },
  { name: "Candles", change: 9.4, size: 2 },
  { name: "Diffusers", change: 12.7, size: 1 },
  { name: "Oud Segment", change: 18.2, size: 2 },
  { name: "Clean Beauty", change: 14.1, size: 1 },
  { name: "Unisex", change: 11.8, size: 1 },
  { name: "Mass Market", change: 1.2, size: 2 },
];

function getColor(change: number): string {
  if (change > 12) return "bg-emerald-500/80 text-white";
  if (change > 6) return "bg-emerald-600/50 text-emerald-100";
  if (change > 0) return "bg-emerald-900/40 text-emerald-300";
  return "bg-red-900/40 text-red-300";
}

export default function MarketHeatmap() {
  return (
    <WidgetWrapper title="Sector Heatmap" info="Visual heatmap of market sector performance. Green indicates growth, red indicates decline. Size reflects market value.">
      <div className="grid grid-cols-4 gap-1">
        {sectors.map((s) => (
          <div
            key={s.name}
            className={`${getColor(s.change)} rounded p-2 text-center cursor-pointer hover:opacity-80 transition-opacity ${
              s.size >= 3 ? "col-span-2" : ""
            }`}
          >
            <div className="text-[10px] font-mono font-semibold truncate">{s.name}</div>
            <div className="text-[11px] font-mono font-bold">
              {s.change > 0 ? "+" : ""}{s.change}%
            </div>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}
