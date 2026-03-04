"use client";
import WidgetWrapper, { CountBadge } from "./WidgetWrapper";
import { regulatoryUpdates } from "@/data/mockData";
import { AlertTriangle, AlertCircle, Info, ExternalLink } from "lucide-react";

export default function RegulatoryUpdates() {
  return (
    <WidgetWrapper title="Regulatory Updates" badge={<CountBadge count={regulatoryUpdates.length} />} info="Latest regulatory changes from IFRA, EU Commission, FDA, and other bodies affecting fragrance ingredients and labeling.">
      <div className="space-y-2.5">
        {regulatoryUpdates.map((update) => (
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
              </div>
            </div>
          </a>
        ))}
      </div>
    </WidgetWrapper>
  );
}
