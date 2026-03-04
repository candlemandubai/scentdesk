"use client";
import { useState } from "react";
import WidgetWrapper from "./WidgetWrapper";

const families = [
  { name: "Woody", share: 22, color: "#8B6914", subfamilies: ["Sandalwood", "Cedar", "Vetiver", "Oud"], growth: 8.5, topNote: "Oud" },
  { name: "Floral", share: 20, color: "#e8768a", subfamilies: ["Rose", "Jasmine", "Tuberose", "Iris"], growth: 3.2, topNote: "Iris" },
  { name: "Oriental", share: 16, color: "#c8a97e", subfamilies: ["Vanilla", "Amber", "Incense", "Spice"], growth: 11.4, topNote: "Vanilla" },
  { name: "Fresh", share: 15, color: "#38bdf8", subfamilies: ["Citrus", "Aquatic", "Green", "Ozonic"], growth: 5.1, topNote: "Bergamot" },
  { name: "Gourmand", share: 12, color: "#f59e0b", subfamilies: ["Caramel", "Coffee", "Chocolate", "Praline"], growth: -2.8, topNote: "Caramel" },
  { name: "Aromatic", share: 8, color: "#34d399", subfamilies: ["Lavender", "Sage", "Rosemary", "Thyme"], growth: 4.7, topNote: "Lavender" },
  { name: "Chypre", share: 7, color: "#a78bfa", subfamilies: ["Oakmoss", "Patchouli", "Bergamot", "Labdanum"], growth: 6.3, topNote: "Patchouli" },
];

export default function FragranceFamilies() {
  const [selected, setSelected] = useState<string | null>(null);
  const total = families.reduce((sum, f) => sum + f.share, 0);

  return (
    <WidgetWrapper title="Fragrance Families" info="Market share breakdown of fragrance families: Woody, Floral, Oriental, Fresh, Gourmand, Aromatic, and Chypre.">
      {/* Stacked bar */}
      <div className="flex h-6 rounded-lg overflow-hidden mb-3">
        {families.map((f) => (
          <div
            key={f.name}
            className="cursor-pointer hover:opacity-80 transition-opacity relative group"
            style={{ width: `${(f.share / total) * 100}%`, background: f.color }}
            onClick={() => setSelected(selected === f.name ? null : f.name)}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
        {families.map((f) => (
          <button
            key={f.name}
            onClick={() => setSelected(selected === f.name ? null : f.name)}
            className={`flex items-center gap-1 text-[10px] font-mono transition-colors ${
              selected === f.name ? "text-white" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <span className="w-2 h-2 rounded-sm shrink-0" style={{ background: f.color }} />
            {f.name} {f.share}%
          </button>
        ))}
      </div>

      {/* Detail view */}
      {selected ? (
        (() => {
          const fam = families.find((f) => f.name === selected)!;
          return (
            <div className="bg-scent-bg/50 rounded-lg p-3 border border-scent-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-semibold text-white">{fam.name}</span>
                <span className={`text-[11px] font-mono ${fam.growth > 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {fam.growth > 0 ? "+" : ""}{fam.growth}% YoY
                </span>
              </div>
              <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-1">Sub-families</div>
              <div className="flex flex-wrap gap-1 mb-2">
                {fam.subfamilies.map((sf) => (
                  <span key={sf} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300">{sf}</span>
                ))}
              </div>
              <div className="text-[10px] text-gray-500">
                Top trending note: <span className="text-scent-accent font-semibold">{fam.topNote}</span>
              </div>
            </div>
          );
        })()
      ) : (
        <div className="space-y-1.5">
          {families.map((f) => (
            <div key={f.name} className="flex items-center justify-between py-1 hover:bg-white/[0.02] rounded px-1 cursor-pointer"
              onClick={() => setSelected(f.name)}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm" style={{ background: f.color }} />
                <span className="text-[11px] text-gray-300">{f.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-gray-400">{f.share}%</span>
                <span className={`text-[10px] font-mono w-12 text-right ${f.growth > 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {f.growth > 0 ? "+" : ""}{f.growth}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </WidgetWrapper>
  );
}
