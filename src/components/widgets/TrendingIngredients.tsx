"use client";
import WidgetWrapper from "./WidgetWrapper";
import { trendingIngredients } from "@/data/mockData";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function TrendingIngredients() {
  return (
    <WidgetWrapper title="Trending Ingredients" info="Most searched and discussed fragrance ingredients ranked by popularity score. Updated based on industry and consumer data.">
      <div className="space-y-2">
        {trendingIngredients.map((item, i) => (
          <div key={item.name} className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-gray-600 w-4 text-right">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[12px] text-gray-200 font-medium">{item.name}</span>
                <span className={`badge ${item.category === "Natural" ? "badge-green" : "badge-purple"}`}>
                  {item.category}
                </span>
              </div>
              <div className="h-1.5 bg-scent-bg rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${item.score}%`,
                    background: `linear-gradient(90deg, rgba(200,169,126,0.3) 0%, rgba(200,169,126,0.8) 100%)`,
                  }}
                />
              </div>
            </div>
            <div className="text-right shrink-0 flex items-center gap-2">
              <span className="text-[13px] font-mono font-bold text-white">{item.score}</span>
              <div className={`flex items-center gap-0.5 text-[10px] font-mono ${
                item.direction === "up" ? "text-emerald-400" : "text-red-400"
              }`}>
                {item.direction === "up" ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {item.change > 0 ? "+" : ""}{item.change}
              </div>
            </div>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}
