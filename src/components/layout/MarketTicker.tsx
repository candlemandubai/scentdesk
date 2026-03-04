"use client";
import { useState, useEffect } from "react";
import { Newspaper, ExternalLink } from "lucide-react";

interface TickerItem {
  title: string;
  source: string;
  url: string;
  category: string;
}

export default function MarketTicker() {
  const [headlines, setHeadlines] = useState<TickerItem[]>([]);

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((data) => {
        if (data.news?.length) {
          setHeadlines(
            data.news.slice(0, 20).map((n: TickerItem) => ({
              title: n.title,
              source: n.source,
              url: n.url,
              category: n.category,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  if (!headlines.length) {
    return (
      <div className="bg-scent-bg/80 border-b border-scent-border overflow-hidden h-7 flex items-center px-4">
        <Newspaper size={10} className="text-scent-accent mr-2" />
        <span className="text-[10px] font-mono text-gray-500">Loading live headlines...</span>
      </div>
    );
  }

  const tickerContent = (
    <>
      {headlines.map((item, i) => (
        <a
          key={i}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mx-4 whitespace-nowrap group"
        >
          <span className="text-[10px] font-mono text-scent-accent font-semibold">{item.source}</span>
          <span className="text-[10px] text-gray-400 group-hover:text-gray-200 transition-colors">{item.title}</span>
        </a>
      ))}
    </>
  );

  return (
    <div className="bg-scent-bg/80 border-b border-scent-border overflow-hidden h-7 flex items-center">
      <div className="ticker-scroll inline-flex">
        {tickerContent}
        {tickerContent}
      </div>
    </div>
  );
}
