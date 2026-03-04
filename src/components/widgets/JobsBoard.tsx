"use client";
import { useState } from "react";
import WidgetWrapper, { CountBadge } from "./WidgetWrapper";
import { ExternalLink, Briefcase, Search, Building2 } from "lucide-react";

interface CareerLink {
  company: string;
  url: string;
  type: "house" | "brand" | "supplier" | "platform";
}

const careerPages: CareerLink[] = [
  // Major houses — direct career pages
  { company: "Givaudan", url: "https://www.givaudan.com/careers", type: "house" },
  { company: "dsm-firmenich", url: "https://www.dsm-firmenich.com/corporate/careers.html", type: "house" },
  { company: "IFF", url: "https://jobs.iff.com", type: "house" },
  { company: "Symrise", url: "https://www.symrise.com/career", type: "house" },
  { company: "Mane", url: "https://www.mane.com/careers", type: "house" },
  { company: "Robertet", url: "https://www.robertet.com/en/join-us", type: "house" },
  { company: "Takasago", url: "https://www.takasago.com/en/careers", type: "house" },
  // Brand groups
  { company: "LVMH", url: "https://www.lvmh.com/join-us", type: "brand" },
  { company: "Estée Lauder", url: "https://www.elcompanies.com/en/careers", type: "brand" },
  { company: "Puig", url: "https://www.puig.com/en/careers", type: "brand" },
  { company: "L'Oréal", url: "https://careers.loreal.com", type: "brand" },
  { company: "Coty", url: "https://www.coty.com/careers", type: "brand" },
  // Suppliers
  { company: "Albert Vieille", url: "https://www.albertvieille.com/en/careers", type: "supplier" },
  { company: "Biolandes", url: "https://www.biolandes.com/en/careers", type: "supplier" },
];

interface JobSearch {
  platform: string;
  label: string;
  url: string;
  icon: string;
}

const jobSearches: JobSearch[] = [
  { platform: "LinkedIn", label: "Perfumer jobs", url: "https://www.linkedin.com/jobs/search/?keywords=perfumer%20OR%20fragrance%20OR%20flavorist", icon: "in" },
  { platform: "LinkedIn", label: "Fragrance chemist", url: "https://www.linkedin.com/jobs/search/?keywords=fragrance%20chemist%20OR%20aroma%20chemist", icon: "in" },
  { platform: "Indeed", label: "Fragrance industry", url: "https://www.indeed.com/jobs?q=fragrance+industry+OR+perfumer+OR+flavorist", icon: "id" },
  { platform: "Glassdoor", label: "Fragrance companies", url: "https://www.glassdoor.com/Job/fragrance-jobs-SRCH_KO0,9.htm", icon: "gd" },
];

type ViewMode = "careers" | "search";

const typeLabels: Record<string, string> = {
  house: "Fragrance House",
  brand: "Brand Group",
  supplier: "Supplier",
  platform: "Job Board",
};

const typeBadge: Record<string, string> = {
  house: "badge-gold",
  brand: "badge-blue",
  supplier: "badge-green",
  platform: "badge-purple",
};

export default function JobsBoard() {
  const [view, setView] = useState<ViewMode>("careers");

  return (
    <WidgetWrapper
      title="Jobs & Careers"
      badge={<CountBadge count={careerPages.length} />}
      info="Direct links to career pages of major fragrance houses, brand groups, and suppliers. Also includes pre-filtered job searches on LinkedIn, Indeed, and Glassdoor."
    >
      <div className="flex gap-1.5 mb-3">
        <button
          onClick={() => setView("careers")}
          className={`flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-1 rounded transition-colors ${
            view === "careers"
              ? "bg-scent-accent/20 text-scent-accent"
              : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
          }`}
        >
          <Building2 size={10} /> CAREER PAGES
        </button>
        <button
          onClick={() => setView("search")}
          className={`flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-1 rounded transition-colors ${
            view === "search"
              ? "bg-scent-accent/20 text-scent-accent"
              : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
          }`}
        >
          <Search size={10} /> JOB SEARCHES
        </button>
      </div>

      {view === "careers" && (
        <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
          {careerPages.map((career) => (
            <div
              key={career.company}
              className="flex items-center gap-2.5 p-1.5 rounded hover:bg-white/[0.03] transition-colors group cursor-pointer"
              onClick={() => window.open(career.url, "_blank", "noopener,noreferrer")}
            >
              <img
                src={`https://www.google.com/s2/favicons?domain=${new URL(career.url).hostname}&sz=32`}
                alt={career.company}
                width={24}
                height={24}
                className="w-6 h-6 rounded bg-white/10 shrink-0 object-contain p-0.5"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-gray-200 font-medium group-hover:text-white transition-colors">
                    {career.company}
                  </span>
                  <span className={`badge ${typeBadge[career.type]}`}>{typeLabels[career.type]}</span>
                  <ExternalLink size={9} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity ml-auto shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "search" && (
        <div className="space-y-2">
          <p className="text-[10px] text-gray-500 mb-3">Pre-filtered searches for fragrance industry jobs on major platforms.</p>
          {jobSearches.map((search, i) => (
            <a
              key={i}
              href={search.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-lg border border-scent-border/50 hover:border-scent-accent/30 hover:bg-white/[0.02] transition-colors group"
            >
              <img
                src={`https://www.google.com/s2/favicons?domain=${new URL(search.url).hostname}&sz=32`}
                alt={search.platform}
                width={28}
                height={28}
                className="w-7 h-7 rounded bg-white/10 shrink-0 object-contain p-0.5"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="flex-1">
                <span className="text-[12px] text-gray-200 font-medium group-hover:text-white transition-colors block">
                  {search.label}
                </span>
                <span className="text-[10px] text-gray-500">{search.platform}</span>
              </div>
              <Briefcase size={12} className="text-gray-600 group-hover:text-scent-accent transition-colors shrink-0" />
            </a>
          ))}
        </div>
      )}
    </WidgetWrapper>
  );
}
