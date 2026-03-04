"use client";
import { useState } from "react";
import WidgetWrapper, { LiveBadge } from "./WidgetWrapper";
import { useLiveData } from "@/hooks/useLiveData";
import { mockRawMaterials } from "@/data/mockData";
import { ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";
import type { RawMaterial } from "@/types";

type Category = "all" | "essential-oil" | "natural" | "aroma-chemical" | "synthetic";

interface MaterialsResponse {
  materials: RawMaterial[];
  lastUpdated: string;
}

export default function RawMaterialsPrices() {
  const [category, setCategory] = useState<Category>("all");
  const [sortBy, setSortBy] = useState<"name" | "price" | "change">("name");

  const { data, loading, refetch, isStale } = useLiveData<MaterialsResponse>({
    url: "/api/materials",
    refreshInterval: 30000, // 30 sec - prices update frequently
    fallbackData: { materials: mockRawMaterials, lastUpdated: "" },
  });

  const materials = data.materials.length > 0 ? data.materials : mockRawMaterials;

  const categories: { label: string; value: Category }[] = [
    { label: "All", value: "all" },
    { label: "Essential Oils", value: "essential-oil" },
    { label: "Naturals", value: "natural" },
    { label: "Aroma Chemicals", value: "aroma-chemical" },
    { label: "Synthetics", value: "synthetic" },
  ];

  const filtered = category === "all"
    ? materials
    : materials.filter((m) => m.category === category);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price") return b.price - a.price;
    if (sortBy === "change") return Math.abs(b.change24h) - Math.abs(a.change24h);
    return a.name.localeCompare(b.name);
  });

  return (
    <WidgetWrapper
      title="Raw Materials Prices"
      badge={<LiveBadge />}
      info="Real-time pricing for 20+ essential oils, aroma chemicals, and naturals. Prices update every 30 seconds with 24h and 7d change tracking."
      headerRight={
        <button
          onClick={refetch}
          className={`text-gray-500 hover:text-gray-300 transition-colors ${isStale ? "animate-spin" : ""}`}
        >
          <RefreshCw size={11} />
        </button>
      }
    >
      <div className="flex gap-1.5 mb-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`text-[10px] font-mono font-semibold px-2 py-1 rounded transition-colors ${
              category === cat.value
                ? "bg-scent-accent/20 text-scent-accent"
                : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
            }`}
          >
            {cat.label.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="flex gap-2 mb-2">
        {(["name", "price", "change"] as const).map((s) => (
          <button key={s} onClick={() => setSortBy(s)}
            className={`text-[9px] font-mono uppercase tracking-wider ${sortBy === s ? "text-scent-accent" : "text-gray-600 hover:text-gray-400"}`}>
            {s}
          </button>
        ))}
      </div>
      {loading && materials.length <= mockRawMaterials.length && (
        <div className="flex items-center gap-2 py-1 mb-2 px-2 bg-scent-accent/5 rounded border border-scent-accent/10">
          <RefreshCw size={10} className="animate-spin text-scent-accent" />
          <span className="text-[10px] text-scent-accent font-mono">Updating prices...</span>
        </div>
      )}
      <div className="space-y-1">
        <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-3 text-[9px] font-mono text-gray-600 uppercase tracking-wider pb-1 border-b border-scent-border">
          <span>Material</span>
          <span className="text-right">Price</span>
          <span className="text-right">24h</span>
          <span className="text-right">7d</span>
          <span className="text-right">Supply</span>
        </div>
        {sorted.map((mat) => (
          <div key={mat.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-3 py-1.5 hover:bg-white/[0.02] rounded items-center">
            <div className="min-w-0">
              <span className="text-[12px] text-gray-200 truncate block">{mat.name}</span>
              <span className="text-[9px] text-gray-600 font-mono">{mat.origin}</span>
            </div>
            <span className="text-[12px] font-mono text-white text-right whitespace-nowrap">
              {mat.price >= 1000 ? `$${(mat.price / 1000).toFixed(1)}k` : `$${mat.price}`}
              <span className="text-[9px] text-gray-600">/{mat.unit.replace("$/", "")}</span>
            </span>
            <span className={`text-[11px] font-mono text-right flex items-center justify-end gap-0.5 ${
              mat.change24h > 0 ? "text-emerald-400" : mat.change24h < 0 ? "text-red-400" : "text-gray-500"
            }`}>
              {mat.change24h > 0 ? <ArrowUpRight size={10} /> : mat.change24h < 0 ? <ArrowDownRight size={10} /> : null}
              {mat.change24h > 0 ? "+" : ""}{mat.change24h}%
            </span>
            <span className={`text-[11px] font-mono text-right ${
              mat.change7d > 0 ? "text-emerald-400" : mat.change7d < 0 ? "text-red-400" : "text-gray-500"
            }`}>
              {mat.change7d > 0 ? "+" : ""}{mat.change7d}%
            </span>
            <span className={`text-[10px] font-mono text-right font-semibold status-${mat.supply}`}>
              {mat.supply.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
      {data.lastUpdated && (
        <div className="mt-2 pt-2 border-t border-scent-border text-[9px] font-mono text-gray-600">
          Prices updated: {new Date(data.lastUpdated).toLocaleTimeString()}
        </div>
      )}
    </WidgetWrapper>
  );
}
