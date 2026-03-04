"use client";
import WidgetWrapper from "./WidgetWrapper";
import { Leaf } from "lucide-react";

const metrics = [
  { label: "Brands with Sustainability Pledges", value: "68%", change: "+5%", trend: "up" },
  { label: "Natural Ingredient Sourcing", value: "42%", change: "+8%", trend: "up" },
  { label: "Recyclable Packaging Adoption", value: "51%", change: "+12%", trend: "up" },
  { label: "Carbon Neutral Certified", value: "23%", change: "+3%", trend: "up" },
  { label: "Fair Trade Materials", value: "31%", change: "+6%", trend: "up" },
];

const certifications = [
  { name: "COSMOS", count: 342, color: "#34d399" },
  { name: "B Corp", count: 89, color: "#60a5fa" },
  { name: "Leaping Bunny", count: 567, color: "#e8768a" },
  { name: "Fair Trade", count: 234, color: "#f59e0b" },
  { name: "RSPO", count: 156, color: "#a78bfa" },
];

export default function Sustainability() {
  return (
    <WidgetWrapper
      title="Sustainability Tracker"
      badge={<span className="text-emerald-400"><Leaf size={12} /></span>}
      info="Industry sustainability metrics: pledges, natural sourcing, recyclable packaging, and carbon neutral certification rates."
    >
      <div className="space-y-2.5 mb-4">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between">
            <span className="text-[11px] text-gray-400">{m.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-mono font-bold text-white">{m.value}</span>
              <span className="text-[10px] font-mono text-emerald-400">{m.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-scent-border pt-3">
        <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-2">Certifications Tracked</div>
        <div className="flex flex-wrap gap-2">
          {certifications.map((cert) => (
            <div key={cert.name} className="flex items-center gap-1.5 bg-scent-bg/50 rounded px-2 py-1 border border-scent-border">
              <div className="w-2 h-2 rounded-full" style={{ background: cert.color }} />
              <span className="text-[10px] text-gray-300">{cert.name}</span>
              <span className="text-[10px] font-mono text-gray-500">{cert.count}</span>
            </div>
          ))}
        </div>
      </div>
    </WidgetWrapper>
  );
}
