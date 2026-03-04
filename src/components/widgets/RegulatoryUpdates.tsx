"use client";
import { useState } from "react";
import WidgetWrapper, { LiveBadge, CountBadge } from "./WidgetWrapper";
import { useLiveData } from "@/hooks/useLiveData";
import { regulatoryUpdates as staticUpdates } from "@/data/mockData";
import { AlertTriangle, AlertCircle, Info, ExternalLink, RefreshCw } from "lucide-react";

interface RegUpdate {
  id: string;
  title: string;
  body: string;
  date: string;
  severity: "high" | "medium" | "low";
  region: string;
  url: string;
}

interface RegResponse {
  updates: RegUpdate[];
  lastUpdated: string;
  count: number;
}

// Convert static data to the same shape as the API
const fallbackUpdates: RegUpdate[] = staticUpdates.map((u) => ({
  ...u,
  date: new Date(u.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
}));

export default function RegulatoryUpdates() {
  const [regionFilter, setRegionFilter] = useState("all");

  const { data, loading, refetch, isStale } = useLiveData<RegResponse>({
    url: "/api/regulatory",
    refreshInterval: 300000, // 5 minutes
    fallbackData: { updates: fallbackUpdates, lastUpdated: "", count: fallbackUpdates.length },
  });

  const updates = data.updates.length > 0 ? data.updates : fallbackUpdates;

  const regions = ["all", "Global", "Europe", "North America", "Asia"];
  const filtered = regionFilter === "all"
    ? updates
    : updates.filter((u) => u.region === regionFilter);

  return (
    <WidgetWrapper
      title="Regulatory Updates"
      badge={<><LiveBadge /><CountBadge count={updates.length} /></>}
      info="Live regulatory news from IFRA, EU Commission, FDA, and other bodies affecting fragrance ingredients and labeling. Auto-refreshes every 5 minutes."
      headerRight={
        <button
          onClick={refetch}
          className={`text-gray-500 hover:text-gray-300 transition-colors ${isStale ? "animate-spin" : ""}`}
          title="Refresh"
        >
          <RefreshCw size={11} />
        </button>
      }
    >
      {/* Region filters */}
      <div className="flex gap-1.5 mb-3 flex-wrap">
        {regions.map((r) => (
          <button
            key={r}
            onClick={() => setRegionFilter(r)}
            className={`text-[10px] font-mono font-semibold px-2 py-1 rounded transition-colors ${
              regionFilter === r
                ? "bg-scent-accent/20 text-scent-accent"
                : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
            }`}
          >
            {r === "all" ? "ALL" : r.toUpperCase()}
          </button>
        ))}
      </div>

      {loading && updates.length <= fallbackUpdates.length && (
        <div className="flex items-center gap-2 py-2 mb-2 px-2 bg-scent-accent/5 rounded border border-scent-accent/10">
          <RefreshCw size={10} className="animate-spin text-scent-accent" />
          <span className="text-[10px] text-scent-accent font-mono">Fetching regulatory feeds...</span>
        </div>
      )}

      <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
        {filtered.slice(0, 15).map((update) => (
          <a
            key={update.id}
            href={update.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2.5 group cursor-pointer hover:bg-white/[0.02] rounded p-1.5 -mx-1.5 block"
          >
            <div className={`mt-0.5 shrink-0 ${
              update.severity === "high" ? "text-red-400" :
              update.severity === "medium" ? "text-amber-400" : "text-blue-400"
            }`}>
              {update.severity === "high" ? <AlertTriangle size={14} /> :
               update.severity === "medium" ? <AlertCircle size={14} /> : <Info size={14} />}
            </div>
            <div className="min-w-0">
              <p className="text-[12px] text-gray-200 leading-tight group-hover:text-white transition-colors flex items-center gap-1.5">
                <span>{update.title}</span>
                <ExternalLink size={9} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-mono text-scent-accent">{update.body}</span>
                <span className="text-[10px] text-gray-600">|</span>
                <span className={`badge ${
                  update.severity === "high" ? "badge-red" :
                  update.severity === "medium" ? "badge-amber" : "badge-blue"
                }`}>
                  {update.severity}
                </span>
                <span className="text-[10px] text-gray-600">|</span>
                <span className="text-[10px] text-gray-500">{update.region}</span>
                <span className="text-[10px] text-gray-600">|</span>
                <span className="text-[10px] text-gray-500">{update.date}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {data.lastUpdated && (
        <div className="mt-3 pt-2 border-t border-scent-border text-[9px] font-mono text-gray-600">
          Last updated: {new Date(data.lastUpdated).toLocaleTimeString()}
        </div>
      )}
    </WidgetWrapper>
  );
}
