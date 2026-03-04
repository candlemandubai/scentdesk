"use client";
import { useState } from "react";
import WidgetWrapper, { LiveBadge, CountBadge } from "./WidgetWrapper";
import { useLiveData } from "@/hooks/useLiveData";
import { mockNews } from "@/data/mockData";
import { RefreshCw, Calendar } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  category: string;
  timestamp: string;
  url: string;
  pubDate?: string;
  sentiment?: "positive" | "negative" | "neutral";
  region?: string;
}

interface NewsResponse {
  news: NewsItem[];
  lastUpdated: string;
  count: number;
}

function toDateStr(d: Date): string {
  return d.toISOString().split("T")[0];
}

interface NewsFeedBaseProps {
  title: string;
  categories: string[];
  info: string;
}

function NewsFeedBase({ title, categories, info }: NewsFeedBaseProps) {
  const today = toDateStr(new Date());
  const [selectedDate, setSelectedDate] = useState(today);

  const apiUrl = selectedDate === today
    ? "/api/news"
    : `/api/news?date=${selectedDate}`;

  const { data, loading, refetch, isStale } = useLiveData<NewsResponse>({
    url: apiUrl,
    refreshInterval: selectedDate === today ? 120000 : 0,
    fallbackData: { news: mockNews as NewsItem[], lastUpdated: "", count: mockNews.length },
  });

  const newsItems = data.news.length > 0 ? data.news : (mockNews as NewsItem[]);
  const filtered = newsItems.filter((n) => categories.includes(n.category));

  // When a specific date is selected, also filter by pubDate
  const dateFiltered = selectedDate === today
    ? filtered
    : filtered.filter((n) => {
        if (!n.pubDate) return true;
        return n.pubDate.startsWith(selectedDate);
      });

  return (
    <WidgetWrapper
      title={title}
      badge={<><LiveBadge /><CountBadge count={dateFiltered.length} /></>}
      info={info}
      headerRight={
        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            <Calendar size={10} className="absolute left-1.5 text-gray-500 pointer-events-none" />
            <input
              type="date"
              value={selectedDate}
              max={today}
              onChange={(e) => setSelectedDate(e.target.value || today)}
              className="text-[9px] font-mono bg-transparent border border-scent-border/50 rounded pl-5 pr-1 py-0.5 text-gray-400 hover:border-scent-accent/30 focus:border-scent-accent/50 focus:outline-none cursor-pointer [color-scheme:dark]"
            />
          </div>
          <button
            onClick={refetch}
            className={`text-gray-500 hover:text-gray-300 transition-colors ${isStale ? "animate-spin" : ""}`}
            title="Refresh"
          >
            <RefreshCw size={11} />
          </button>
        </div>
      }
    >
      {loading && newsItems.length <= mockNews.length && (
        <div className="flex items-center gap-2 py-2 mb-2 px-2 bg-scent-accent/5 rounded border border-scent-accent/10">
          <RefreshCw size={10} className="animate-spin text-scent-accent" />
          <span className="text-[10px] text-scent-accent font-mono">Fetching live feeds...</span>
        </div>
      )}

      <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
        {dateFiltered.length === 0 && !loading && (
          <p className="text-[11px] text-gray-500 text-center py-4 font-mono">No articles found for this date.</p>
        )}
        {dateFiltered.slice(0, 15).map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer block"
          >
            <div className="flex items-start gap-2">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                item.sentiment === "positive" ? "bg-emerald-400" :
                item.sentiment === "negative" ? "bg-red-400" : "bg-gray-500"
              }`} />
              <div className="min-w-0">
                <p className="text-[13px] text-gray-200 group-hover:text-white leading-tight transition-colors">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-[10px] font-mono text-scent-accent font-semibold">{item.source}</span>
                  <span className="text-[10px] text-gray-600">|</span>
                  <span className="text-[10px] text-gray-500">{item.timestamp}</span>
                  {item.region && item.region !== "Global" && (
                    <>
                      <span className="text-[10px] text-gray-600">|</span>
                      <span className="text-[10px] text-gray-500">{item.region}</span>
                    </>
                  )}
                </div>
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

// Factory: create a zero-props widget component for specific categories
export function createNewsFeed(title: string, categories: string[], info: string) {
  return function CategoryNewsFeed() {
    return <NewsFeedBase title={title} categories={categories} info={info} />;
  };
}

// Pre-built category widgets
export const NewsMarket = createNewsFeed(
  "Market & M&A",
  ["Market", "M&A"],
  "Market intelligence, mergers & acquisitions in the fragrance industry."
);

export const NewsLaunches = createNewsFeed(
  "Launches & Industry",
  ["Launches", "Industry"],
  "New fragrance launches, brand news, and industry developments."
);

export const NewsMaterials = createNewsFeed(
  "Raw Materials & Supply",
  ["Raw Materials", "Supply Chain"],
  "Raw material prices, supply chain updates, and ingredient sourcing news."
);

export const NewsHome = createNewsFeed(
  "Home Fragrance",
  ["Home Fragrance"],
  "Candles, diffusers, room sprays — home fragrance market news."
);

// Default export for backwards compat (all categories)
export default createNewsFeed(
  "Industry News",
  ["Market", "Regulatory", "Supply Chain", "Launches", "M&A", "Industry", "Raw Materials", "Home Fragrance"],
  "Live news from 12+ RSS feeds covering the fragrance industry. Auto-refreshes every 2 minutes."
);
