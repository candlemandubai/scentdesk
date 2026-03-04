"use client";
import { useState } from "react";
import WidgetWrapper from "./WidgetWrapper";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const sellers = {
  global: [
    { rank: 1, name: "Baccarat Rouge 540", brand: "MFK", change: 0, sales: "M" },
    { rank: 2, name: "Sauvage", brand: "Dior", change: 0, sales: "M" },
    { rank: 3, name: "Bleu de Chanel", brand: "Chanel", change: 1, sales: "M" },
    { rank: 4, name: "Lost Cherry", brand: "Tom Ford", change: 2, sales: "H" },
    { rank: 5, name: "Good Girl", brand: "Carolina Herrera", change: -1, sales: "M" },
    { rank: 6, name: "Oud Wood", brand: "Tom Ford", change: -1, sales: "H" },
    { rank: 7, name: "La Vie Est Belle", brand: "Lancôme", change: 0, sales: "M" },
    { rank: 8, name: "Aventus", brand: "Creed", change: 3, sales: "H" },
  ],
  niche: [
    { rank: 1, name: "Baccarat Rouge 540", brand: "MFK", change: 0, sales: "H" },
    { rank: 2, name: "Aventus", brand: "Creed", change: 1, sales: "H" },
    { rank: 3, name: "Ombré Nomade", brand: "Louis Vuitton", change: 2, sales: "H" },
    { rank: 4, name: "Hacivat", brand: "Nishane", change: 3, sales: "M" },
    { rank: 5, name: "Layton", brand: "PDM", change: -2, sales: "M" },
  ],
};

type Segment = "global" | "niche";

export default function TopSellers() {
  const [segment, setSegment] = useState<Segment>("global");

  return (
    <WidgetWrapper title="Top Sellers" info="Best-selling fragrances globally and in the niche segment, ranked by sales volume and consumer ratings.">
      <div className="flex gap-1.5 mb-3">
        {(["global", "niche"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSegment(s)}
            className={`text-[10px] font-mono font-semibold px-2 py-1 rounded transition-colors ${
              segment === s ? "bg-scent-accent/20 text-scent-accent" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
            }`}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="space-y-1.5">
        {sellers[segment].map((item) => (
          <div key={item.rank} className="flex items-center gap-2 py-1 hover:bg-white/[0.02] rounded px-1 -mx-1">
            <span className="text-[12px] font-mono text-gray-600 w-5 text-right">{item.rank}</span>
            <div className="flex-1 min-w-0">
              <span className="text-[12px] text-gray-200 truncate block">{item.name}</span>
              <span className="text-[10px] text-gray-500 font-mono">{item.brand}</span>
            </div>
            <div className="flex items-center gap-1">
              {item.change > 0 && <ArrowUpRight size={10} className="text-emerald-400" />}
              {item.change < 0 && <ArrowDownRight size={10} className="text-red-400" />}
              <span className={`text-[10px] font-mono ${
                item.change > 0 ? "text-emerald-400" : item.change < 0 ? "text-red-400" : "text-gray-600"
              }`}>
                {item.change === 0 ? "—" : `${item.change > 0 ? "+" : ""}${item.change}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}
