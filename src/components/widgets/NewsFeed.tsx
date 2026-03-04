"use client";
import { useState } from "react";
import WidgetWrapper, { LiveBadge, CountBadge } from "./WidgetWrapper";
import { useLiveData } from "@/hooks/useLiveData";
import { mockNews } from "@/data/mockData";
import { RefreshCw } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  category: string;
  timestamp: string;
  url: string;
  sentiment?: "positive" | "negative" | "neutral";
  region?: string;
}

interface NewsResponse {
  news: NewsItem[];
  lastUpdated: string;
  count: number;
}

const categories = ["All", "Market", "Regulatory", "Supply Chain", "Launches", "M&A", "Industry", "Raw Materials"];

export default function NewsFeed() {
  const [activeCategory, setActiveCategory] = useState("All");

  const { data, loading, refetch, isStale } = useLiveData<NewsResponse>({
    url: "/api/news",
    refreshInterval: 120000,
    fallbackData: { news: mockNews as NewsItem[], lastUpdated: "", count: mockNews.length },
  });

  const newsItems = data.news.length > 0 ? data.news : (mockNews as NewsItem[]);
  const filtered = activeCategory === "All"
    ? newsItems
    : newsItems.filter((n) => n.category === activeCategory);

  return (
    <WidgetWrapper
      title="Industry News"
      badge={<><LiveBadge /><CountBadge count={newsItems.length} /></>}
      info="Live news from 12+ RSS feeds covering fragrance industry, regulatory changes, market data, and new launches. Auto-refreshes every 2 minutes."
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
      <div className="flex gap-1.5 mb-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-[10px] font-mono font-semibold px-2 py-1 rounded transition-colors ${
              activeCategory === cat
                ? "bg-scent-accent/20 text-scent-accent"
                : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {loading && newsItems.length <= mockNews.length && (
        <div className="flex items-center gap-2 py-2 mb-2 px-2 bg-scent-accent/5 rounded border border-scent-accent/10">
          <RefreshCw size={10} className="animate-spin text-scent-accent" />
          <span className="text-[10px] text-scent-accent font-mono">Fetching live feeds...</span>
        </div>
      )}

      <div className="space-y-2.5">
        {filtered.slice(0, 15).map((item) => (
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
                  <span className="badge badge-blue">{item.category}</span>
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
