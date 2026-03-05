"use client";
import { useCallback, useRef, useState, useEffect, memo } from "react";
import WidgetWrapper, { LiveBadge, CountBadge } from "./WidgetWrapper";
import { useLiveData } from "@/hooks/useLiveData";
import { RefreshCw, TrendingUp, TrendingDown, Minus, ExternalLink, BarChart3 } from "lucide-react";
import type { StockQuote } from "@/app/api/stocks/route";

interface StocksResponse {
  quotes: StockQuote[];
  lastUpdated: string;
  live: boolean;
}

const fallback: StocksResponse = { quotes: [], lastUpdated: "", live: false };

/* ─── Mini sparkline SVG ─── */
function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 48;
  const h = 16;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ");

  return (
    <svg width={w} height={h} className="shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "#34d399" : "#f87171"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Single stock row ─── */
function StockRow({ quote }: { quote: StockQuote }) {
  const isPositive = (quote.changePercent ?? 0) >= 0;
  const hasData = quote.price !== null;

  const changeColor = !hasData
    ? "text-gray-600"
    : isPositive
      ? "text-emerald-400"
      : "text-red-400";

  const ChangeIcon = !hasData ? Minus : isPositive ? TrendingUp : TrendingDown;

  // Format price with appropriate decimals
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <a
      href={quote.tvUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-scent-border/30 transition-colors group"
    >
      {/* Ticker */}
      <span className="text-[11px] font-mono font-bold text-scent-accent w-[44px] shrink-0">
        {quote.symbol}
      </span>

      {/* Name */}
      <span className="text-[11px] text-gray-400 flex-1 truncate group-hover:text-gray-200 transition-colors min-w-0">
        {quote.name}
      </span>

      {/* Sparkline */}
      {quote.sparkline.length >= 2 && (
        <Sparkline data={quote.sparkline} positive={isPositive} />
      )}

      {/* Price */}
      <span className="text-[11px] font-mono text-gray-200 w-[72px] text-right shrink-0 tabular-nums">
        {hasData ? formatPrice(quote.price!, quote.currency) : "—"}
      </span>

      {/* Currency */}
      <span className="text-[8px] font-mono text-gray-600 w-[24px] shrink-0">
        {hasData ? quote.currency : ""}
      </span>

      {/* Change */}
      <span className={`text-[10px] font-mono w-[56px] text-right shrink-0 tabular-nums flex items-center justify-end gap-0.5 ${changeColor}`}>
        {hasData ? (
          <>
            <ChangeIcon size={8} />
            {isPositive ? "+" : ""}{quote.changePercent}%
          </>
        ) : (
          <span className="text-gray-600">—</span>
        )}
      </span>

      {/* Exchange */}
      <span className="text-[8px] font-mono text-gray-600 w-[52px] text-right shrink-0 hidden sm:block">
        {quote.exchange}
      </span>

      {/* External link */}
      <ExternalLink size={9} className="text-gray-700 group-hover:text-scent-accent transition-colors shrink-0" />
    </a>
  );
}

/* ─── TradingView mini chart modal ─── */
function TradingViewChart({ symbol, onClose }: { symbol: string; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const wrapper = document.createElement("div");
    wrapper.className = "tradingview-widget-container";
    wrapper.style.height = "100%";
    wrapper.style.width = "100%";

    const inner = document.createElement("div");
    inner.className = "tradingview-widget-container__widget";
    inner.style.height = "100%";
    inner.style.width = "100%";
    wrapper.appendChild(inner);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.textContent = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      backgroundColor: "rgba(0, 0, 0, 0)",
      gridColor: "rgba(255, 255, 255, 0.04)",
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      support_host: "https://www.tradingview.com",
    });

    wrapper.appendChild(script);
    node.appendChild(wrapper);

    return () => {
      node.innerHTML = "";
    };
  }, [symbol]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-scent-card border border-scent-border rounded-lg w-[90vw] max-w-[900px] h-[70vh] max-h-[600px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-scent-border">
          <span className="text-[11px] font-mono text-scent-accent font-bold">{symbol}</span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white text-xs px-2 py-1 rounded hover:bg-scent-border/50 transition-colors"
          >
            ✕ Close
          </button>
        </div>
        <div ref={containerRef} className="w-full h-[calc(100%-40px)]" />
      </div>
    </div>
  );
}

/* ─── Main stock tracker widget ─── */
export default function StockTracker() {
  const { data, loading, refetch, isStale } = useLiveData<StocksResponse>({
    url: "/api/stocks",
    refreshInterval: 300000, // 5 min
    fallbackData: fallback,
  });

  const [chartSymbol, setChartSymbol] = useState<string | null>(null);

  const quotes = data.quotes || [];
  const houses = quotes.filter((q) => q.section === "houses");
  const luxury = quotes.filter((q) => q.section === "luxury");
  const beauty = quotes.filter((q) => q.section === "beauty");
  const hasLiveData = quotes.some((q) => q.price !== null);

  return (
    <WidgetWrapper
      title="Industry Stocks"
      badge={
        <>
          <LiveBadge />
          <CountBadge count={quotes.length || 16} />
        </>
      }
      info="Live stock prices for 16 fragrance industry stocks: F&F houses (Givaudan, IFF, Symrise, dsm-firmenich, Robertet, Croda), luxury conglomerates (LVMH, Kering, Hermès, L'Oréal), and beauty/consumer brands (Estée Lauder, Coty, Inter Parfums, Puig, Bath & Body Works, Shiseido). Refreshes every 5 minutes."
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
      {/* Loading state */}
      {loading && quotes.length === 0 && (
        <div className="flex items-center gap-2 py-2 mb-2 px-2 bg-scent-accent/5 rounded border border-scent-accent/10">
          <RefreshCw size={10} className="animate-spin text-scent-accent" />
          <span className="text-[10px] text-scent-accent font-mono">Fetching stock data...</span>
        </div>
      )}

      {/* Market status */}
      {!loading && hasLiveData && (
        <div className="flex items-center gap-2 px-2 mb-2">
          <span className="text-[9px] font-mono text-gray-600">
            {quotes[0]?.marketState === "regular" ? "🟢 Market Open" : "🔴 Market Closed"}
          </span>
        </div>
      )}

      {/* No data fallback */}
      {!loading && !hasLiveData && quotes.length > 0 && (
        <div className="flex items-center gap-2 py-2 mb-3 px-2.5 bg-amber-500/5 rounded border border-amber-500/10">
          <TrendingUp size={12} className="text-amber-400 shrink-0" />
          <span className="text-[10px] text-amber-300/80 font-mono leading-tight">
            Live prices temporarily unavailable — click any ticker to view on TradingView.
          </span>
        </div>
      )}

      <div className="space-y-1 max-h-[420px] overflow-y-auto pr-1">
        {/* Section: Fragrance Houses */}
        {houses.length > 0 && (
          <>
            <div className="text-[9px] font-mono font-semibold text-gray-500 uppercase tracking-wider mb-0.5 px-2 pt-1">
              Fragrance & Flavor Houses
            </div>
            <div className="space-y-0">
              {houses.map((quote) => (
                <StockRow key={quote.symbol} quote={quote} />
              ))}
            </div>
          </>
        )}

        {/* Section: Luxury Conglomerates */}
        {luxury.length > 0 && (
          <>
            <div className="text-[9px] font-mono font-semibold text-gray-500 uppercase tracking-wider mb-0.5 px-2 pt-2">
              Luxury Conglomerates
            </div>
            <div className="space-y-0">
              {luxury.map((quote) => (
                <StockRow key={quote.symbol} quote={quote} />
              ))}
            </div>
          </>
        )}

        {/* Section: Beauty & Consumer */}
        {beauty.length > 0 && (
          <>
            <div className="text-[9px] font-mono font-semibold text-gray-500 uppercase tracking-wider mb-0.5 px-2 pt-2">
              Beauty & Consumer
            </div>
            <div className="space-y-0">
              {beauty.map((quote) => (
                <StockRow key={quote.symbol} quote={quote} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      {data.lastUpdated && (
        <div className="mt-3 pt-2 border-t border-scent-border flex items-center justify-between">
          <span className="text-[9px] font-mono text-gray-600">
            Updated: {new Date(data.lastUpdated).toLocaleTimeString()}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={refetch}
              className="flex items-center gap-1 text-[9px] font-mono text-gray-500 hover:text-scent-accent transition-colors"
            >
              <RefreshCw size={8} />
              Refresh
            </button>
          </div>
        </div>
      )}

      {/* TradingView chart modal */}
      {chartSymbol && (
        <TradingViewChart symbol={chartSymbol} onClose={() => setChartSymbol(null)} />
      )}
    </WidgetWrapper>
  );
}
