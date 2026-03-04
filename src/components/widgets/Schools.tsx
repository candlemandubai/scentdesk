"use client";
import WidgetWrapper, { CountBadge } from "./WidgetWrapper";
import { mockSchools } from "@/data/mockData";
import { GraduationCap, MapPin, ExternalLink } from "lucide-react";

const typeColors: Record<string, string> = {
  university: "badge-blue",
  institute: "badge-gold",
  online: "badge-purple",
  workshop: "badge-green",
};

export default function Schools() {
  return (
    <WidgetWrapper
      title="Schools & Programs"
      badge={<CountBadge count={mockSchools.length} />}
      info="Top perfumery schools and training programs worldwide. Click any school to visit their website and learn about admissions."
    >
      <div className="space-y-3">
        {mockSchools.map((school) => (
          <a
            key={school.id}
            href={school.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group block hover:bg-white/[0.02] rounded p-2 -mx-2 cursor-pointer"
          >
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-scent-accent/20 to-scent-accent/5 flex items-center justify-center shrink-0">
                <GraduationCap size={14} className="text-scent-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[13px] text-gray-200 font-medium group-hover:text-white transition-colors">{school.name}</span>
                  <ExternalLink size={10} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="flex items-center gap-1 text-[10px] text-gray-500">
                    <MapPin size={9} /> {school.location}, {school.country}
                  </span>
                  <span className={`badge ${typeColors[school.type] || "badge-blue"}`}>{school.type}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {school.programs.map((program) => (
                    <span key={program} className="text-[9px] font-mono text-gray-400 bg-scent-bg/50 border border-scent-border/50 px-1.5 py-0.5 rounded">
                      {program}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </WidgetWrapper>
  );
}
