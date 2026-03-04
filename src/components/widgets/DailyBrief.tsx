"use client";
import { useState } from "react";
import WidgetWrapper from "./WidgetWrapper";
import { useLiveData } from "@/hooks/useLiveData";
import { RefreshCw, Sparkles, Clock } from "lucide-react";

interface BriefInsight {
  emoji: string;
  category: string;
  headline: string;
  detail: string;
}

interface DailyBriefData {
  generatedAt: string;
  insights: BriefInsight[];
  summary: string;
  newsCount: number;
}

const fallbackBrief: DailyBriefData = {
  generatedAt: new Date().toISOString(),
  insights: [
    {
      emoji: "📈",
      category: "Market",
      headline: "Global fragrance market continues growth trajectory",
      detail:
        "Industry analysts project steady expansion across premium and niche segments through 2026.",
    },
    {
      emoji: "⚖️",
      category: "Regulatory",
      headline: "IFRA standards update cycle ongoing",
      detail:
        "The 50th Amendment is expected later this year with new ingredient restrictions under review.",
    },
    {
      emoji: "🧪",
      category: "Raw Materials",
      headline: "Natural ingredient sourcing under pressure",
      detail:
        "Climate and supply chain factors continue to impact vanilla, sandalwood, and vetiver availability.",
    },
    {
      emoji: "🚀",
      category: "Launches",
      headline: "Niche perfumery driving innovation",
      detail:
        "Independent houses are leading with novel ingredient combinations and sustainable formulations.",
    },
  ],
  summary:
    "Fragrance industry balances growth momentum with regulatory and supply chain headwinds.",
  newsCount: 0,
};

function formatBriefTime(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const diffH = Math.floor(
      (now.getTime() - d.getTime()) / (1000 * 60 * 60)
    );

    if (diffH < 1) return "Just now";
    if (diffH < 24) return `${diffH}h ago`;

    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

export default function DailyBrief() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const { data, loading, refetch, isStale } = useLiveData<DailyBriefData>({
    url: "/api/cron/daily-brief",
    refreshInterval: 3600000, // Check for new brief every hour
    fallbackData: fallbackBrief,
  });

  const brief = data.insights?.length > 0 ? data : fallbackBrief;
  const isAI = brief.newsCount > 0;

  return (
    <WidgetWrapper
      title="Intelligence Brief"
      badge={
        <span className="flex items-center gap-1 text-[9px] font-mono text-amber-400/80">
          <Sparkles size={9} />
          AI
        </span>
      }
      info="AI-generated daily summary of fragrance industry news. Powered by Claude — refreshed twice daily from live RSS feeds."
      headerRight={
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[9px] font-mono text-gray-600">
            <Clock size={9} />
            <span>{formatBriefTime(brief.generatedAt)}</span>
          </div>
          <button
            onClick={refetch}
            className={`text-gray-500 hover:text-gray-300 transition-colors ${isStale ? "animate-spin" : ""}`}
            title="Refresh brief"
          >
            <RefreshCw size={11} />
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-1">
        {/* Summary line */}
        <p className="text-[11px] text-gray-400 leading-relaxed pb-2 border-b border-scent-border/50">
          {brief.summary}
        </p>

        {/* Insights */}
        <div className="flex flex-col gap-0.5 pt-1">
          {brief.insights.map((insight, i) => (
            <button
              key={i}
              onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
              className="text-left w-full group"
            >
              <div className="flex items-start gap-2 px-1.5 py-1.5 rounded hover:bg-white/[0.02] transition-colors">
                <span className="text-[13px] mt-0.5 shrink-0">{insight.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-gray-600 uppercase tracking-wider shrink-0">
                      {insight.category}
                    </span>
                  </div>
                  <p className="text-[12px] text-gray-200 font-medium leading-snug mt-0.5">
                    {insight.headline}
                  </p>
                  {expandedIdx === i && (
                    <p className="text-[11px] text-gray-500 leading-relaxed mt-1">
                      {insight.detail}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 mt-1 border-t border-scent-border/50">
          <span className="text-[9px] font-mono text-gray-600">
            {isAI
              ? `Analyzed ${brief.newsCount} sources`
              : "Awaiting first AI analysis"}
          </span>
          <span className="text-[9px] font-mono text-gray-700">
            Powered by Claude
          </span>
        </div>
      </div>
    </WidgetWrapper>
  );
}
