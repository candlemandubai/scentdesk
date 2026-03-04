"use client";
import WidgetWrapper from "./WidgetWrapper";
import { supplyChainData } from "@/data/mockData";
import { AlertTriangle } from "lucide-react";

export default function SupplyChain() {
  const criticalCount = supplyChainData.filter((r) => r.status === "critical").length;
  const tightCount = supplyChainData.filter((r) => r.status === "tight").length;

  return (
    <WidgetWrapper
      title="Supply Chain Status"
      info="Global supply chain risk monitor for fragrance raw materials. Tracks sourcing regions, risk levels, and disruption alerts."
      badge={criticalCount > 0 && (
        <span className="flex items-center gap-1 text-[10px] font-mono text-red-400 font-bold">
          <AlertTriangle size={10} /> {criticalCount} CRITICAL
        </span>
      )}
    >
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-red-900/20 rounded p-2 border border-red-900/30 text-center">
          <div className="text-[18px] font-mono font-bold text-red-400">{criticalCount}</div>
          <div className="text-[9px] font-mono text-red-400/60 uppercase">Critical</div>
        </div>
        <div className="bg-amber-900/20 rounded p-2 border border-amber-900/30 text-center">
          <div className="text-[18px] font-mono font-bold text-amber-400">{tightCount}</div>
          <div className="text-[9px] font-mono text-amber-400/60 uppercase">Tight</div>
        </div>
        <div className="bg-emerald-900/20 rounded p-2 border border-emerald-900/30 text-center">
          <div className="text-[18px] font-mono font-bold text-emerald-400">
            {supplyChainData.length - criticalCount - tightCount}
          </div>
          <div className="text-[9px] font-mono text-emerald-400/60 uppercase">Normal</div>
        </div>
      </div>

      <div className="space-y-2">
        {supplyChainData.sort((a, b) => b.risk - a.risk).map((region) => (
          <div key={region.region} className="hover:bg-white/[0.02] rounded p-1.5 -mx-1.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[12px] text-gray-200">{region.region}</span>
              <span className={`text-[10px] font-mono font-semibold status-${region.status}`}>
                {region.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 h-1.5 bg-scent-bg rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${region.risk}%`,
                    background: region.risk > 70 ? "#ef4444" : region.risk > 40 ? "#f59e0b" : "#34d399",
                  }}
                />
              </div>
              <span className="text-[10px] font-mono text-gray-500">{region.risk}%</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {region.materials.map((mat) => (
                <span key={mat} className="text-[9px] font-mono text-gray-500 bg-scent-bg/50 px-1.5 py-0.5 rounded">
                  {mat}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}
