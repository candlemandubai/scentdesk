"use client";
import { useState } from "react";
import WidgetWrapper, { CountBadge } from "./WidgetWrapper";
import { mockJobs } from "@/data/mockData";
import { Briefcase, MapPin, Clock, ExternalLink } from "lucide-react";

type JobCategory = "all" | "perfumer" | "marketing" | "production" | "research" | "sales" | "quality";

export default function JobsBoard() {
  const [category, setCategory] = useState<JobCategory>("all");
  const filtered = category === "all" ? mockJobs : mockJobs.filter((j) => j.category === category);

  const categories: { label: string; value: JobCategory }[] = [
    { label: "All", value: "all" },
    { label: "Perfumer", value: "perfumer" },
    { label: "Marketing", value: "marketing" },
    { label: "R&D", value: "research" },
    { label: "Sales", value: "sales" },
  ];

  const typeColors: Record<string, string> = {
    "full-time": "badge-green",
    "part-time": "badge-blue",
    contract: "badge-amber",
    freelance: "badge-purple",
  };

  return (
    <WidgetWrapper
      title="Industry Jobs"
      badge={<CountBadge count={mockJobs.length} />}
      info="Browse open positions at major fragrance houses and brands. Click any listing to view details on the company's careers page."
    >
      <div className="flex gap-1.5 mb-3 flex-wrap">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`text-[10px] font-mono font-semibold px-2 py-1 rounded transition-colors ${
              category === c.value
                ? "bg-scent-accent/20 text-scent-accent"
                : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
            }`}
          >
            {c.label.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="space-y-2.5">
        {filtered.map((job) => (
          <a
            key={job.id}
            href={job.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group block hover:bg-white/[0.02] rounded p-2 -mx-2 cursor-pointer border border-transparent hover:border-scent-border/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-1">
              <div>
                <span className="text-[13px] text-gray-200 font-medium group-hover:text-white transition-colors flex items-center gap-1.5">
                  {job.title}
                  <ExternalLink size={10} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-1 text-[11px] text-scent-accent font-semibold">
                    <Briefcase size={10} /> {job.company}
                  </span>
                </div>
              </div>
              <span className={`badge ${typeColors[job.type] || "badge-blue"}`}>{job.type}</span>
            </div>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="flex items-center gap-1 text-[10px] text-gray-500">
                <MapPin size={9} /> {job.location}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-gray-500">
                <Clock size={9} /> {job.posted}
              </span>
              {job.salary && (
                <span className="text-[10px] font-mono text-emerald-400">{job.salary}</span>
              )}
            </div>
          </a>
        ))}
      </div>
    </WidgetWrapper>
  );
}
