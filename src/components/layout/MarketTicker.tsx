"use client";
import { useState, useEffect, useMemo } from "react";
import { Newspaper, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface TickerItem {
  title: string;
  source: string;
  url: string;
  category: string;
}

// Stock tickers to intersperse with news headlines
interface StockTicker {
  symbol: string;
  name: string;
  exchange: string;
  url: string;
}

const STOCK_TICKERS: StockTicker[] = [
  { symbol: "GIVN", name: "Givaudan", exchange: "SIX", url: "https://www.tradingview.com/symbols/SIX-GIVN/" },
  { symbol: "IFF", name: "IFF", exchange: "NYSE", url: "https://www.tradingview.com/symbols/NYSE-IFF/" },
  { symbol: "SY1", name: "Symrise", exchange: "XETR", url: "https://www.tradingview.com/symbols/XETR-SY1/" },
  { symbol: "DSFIR", name: "dsm-firmenich", exchange: "EURONEXT", url: "https://www.tradingview.com/symbols/EURONEXT-DSFIR/" },
  { symbol: "MC", name: "LVMH", exchange: "EURONEXT", url: "https://www.tradingview.com/symbols/EURONEXT-MC/" },
  { symbol: "EL", name: "Estée Lauder", exchange: "NYSE", url: "https://www.tradingview.com/symbols/NYSE-EL/" },
  { symbol: "COTY", name: "Coty", exchange: "NYSE", url: "https://www.tradingview.com/symbols/NYSE-COTY/" },
  { symbol: "IPAR", name: "Inter Parfums", exchange: "NASDAQ", url: "https://www.tradingview.com/symbols/NASDAQ-IPAR/" },
  { symbol: "PUIG", name: "Puig", exchange: "BME", url: "https://www.tradingview.com/symbols/BME-PUIG/" },
];

type MixedItem =
  | { type: "news"; item: TickerItem }
  | { type: "stock"; item: StockTicker };

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

  // Interleave stock tickers with news: insert a stock ticker every 3 headlines
  const mixedItems = useMemo<MixedItem[]>(() => {
    if (!headlines.length) return [];
    const result: MixedItem[] = [];
    let stockIdx = 0;
    for (let i = 0; i < headlines.length; i++) {
      result.push({ type: "news", item: headlines[i] });
      if ((i + 1) % 3 === 0 && stockIdx < STOCK_TICKERS.length) {
        result.push({ type: "stock", item: STOCK_TICKERS[stockIdx] });
        stockIdx++;
      }
    }
    return result;
  }, [headlines]);

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
      {mixedItems.map((entry, i) =>
        entry.type === "news" ? (
          <a
            key={`n-${i}`}
            href={entry.item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mx-4 whitespace-nowrap group"
          >
            <span className="text-[10px] font-mono text-scent-accent font-semibold">
              {(entry.item as TickerItem).source}
            </span>
            <span className="text-[10px] text-gray-400 group-hover:text-gray-200 transition-colors">
              {(entry.item as TickerItem).title}
            </span>
          </a>
        ) : (
          <a
            key={`s-${i}`}
            href={(entry.item as StockTicker).url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mx-4 whitespace-nowrap group"
          >
            <span className="text-[10px] font-mono font-bold text-emerald-400">
              {(entry.item as StockTicker).symbol}
            </span>
            <span className="text-[9px] font-mono text-gray-500 group-hover:text-gray-300 transition-colors">
              {(entry.item as StockTicker).name}
            </span>
            <span className="text-[9px] font-mono text-gray-600">
              {(entry.item as StockTicker).exchange}
            </span>
          </a>
        )
      )}
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
