"use client";
import WidgetWrapper, { CountBadge } from "./WidgetWrapper";
import { mockSchools } from "@/data/mockData";
import { GraduationCap, MapPin, ExternalLink, Instagram } from "lucide-react";

const typeColors: Record<string, string> = {
  university: "badge-blue",
  institute: "badge-gold",
  online: "badge-purple",
  workshop: "badge-green",
};

const typeIconColors: Record<string, string> = {
  university: "bg-blue-400/15 text-blue-400",
  institute: "bg-amber-400/15 text-amber-400",
  online: "bg-purple-400/15 text-purple-400",
  workshop: "bg-emerald-400/15 text-emerald-400",
};

export default function Schools() {
  return (
    <WidgetWrapper
      title="Schools & Programs"
      badge={<CountBadge count={mockSchools.length} />}
      info="Top perfumery schools and training programs worldwide. Click any school to visit their website and learn about admissions."
    >
      <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
        {mockSchools.map((school) => (
          <div
            key={school.id}
            className="group block hover:bg-white/[0.02] rounded p-2 -mx-2 cursor-pointer"
            onClick={() => window.open(school.url || "#", "_blank", "noopener,noreferrer")}
          >
            <div className="flex items-start gap-2.5">
              <img
                src={`https://www.google.com/s2/favicons?domain=${school.url ? new URL(school.url).hostname : ''}&sz=32`}
                alt={school.name}
                width={32}
                height={32}
                className={`w-8 h-8 rounded shrink-0 object-contain p-0.5 ${typeIconColors[school.type] || "bg-scent-accent/15 text-scent-accent"}`}
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  el.style.display = 'none';
                  const fallback = el.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className={`w-8 h-8 rounded items-center justify-center shrink-0 hidden ${typeIconColors[school.type] || "bg-scent-accent/15 text-scent-accent"}`}>
                <GraduationCap size={14} />
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
                  {school.instagram && (
                    <a
                      href={school.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-scent-accent transition-colors ml-auto"
                      onClick={(e) => e.stopPropagation()}
                      title="Instagram"
                    >
                      <Instagram size={11} />
                    </a>
                  )}
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
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}
