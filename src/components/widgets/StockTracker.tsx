"use client";
import { useEffect, useRef, useState, memo, useCallback } from "react";
import WidgetWrapper, { LiveBadge, CountBadge } from "./WidgetWrapper";
import { RefreshCw, TrendingUp, ExternalLink } from "lucide-react";

// TradingView Market Overview widget config
const WIDGET_CONFIG = {
  colorTheme: "dark",
  dateRange: "12M",
  showChart: true,
  locale: "en",
  isTransparent: true,
  showSymbolLogo: true,
  showFloatingTooltip: true,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0)",
  scaleFontColor: "#9ca3af",
  tabs: [
    {
      title: "Fragrance Houses",
      symbols: [
        { s: "SIX:GIVN", d: "Givaudan SA" },
        { s: "NYSE:IFF", d: "Intl Flavors & Fragrances" },
        { s: "XETR:SY1", d: "Symrise AG" },
        { s: "EURONEXT:DSFIR", d: "dsm-firmenich" },
      ],
    },
    {
      title: "Luxury & Consumer",
      symbols: [
        { s: "EURONEXT:MC", d: "LVMH" },
        { s: "NYSE:EL", d: "Estee Lauder" },
        { s: "NYSE:COTY", d: "Coty Inc" },
        { s: "NASDAQ:IPAR", d: "Inter Parfums" },
        { s: "BME:PUIG", d: "Puig Brands" },
      ],
    },
  ],
};

// Static fallback data for when TradingView is unavailable
const FALLBACK_STOCKS = [
  { ticker: "GIVN", name: "Givaudan SA", exchange: "SIX", url: "https://www.tradingview.com/symbols/SIX-GIVN/" },
  { ticker: "IFF", name: "Intl Flavors & Fragrances", exchange: "NYSE", url: "https://www.tradingview.com/symbols/NYSE-IFF/" },
  { ticker: "SY1", name: "Symrise AG", exchange: "XETR", url: "https://www.tradingview.com/symbols/XETR-SY1/" },
  { ticker: "DSFIR", name: "dsm-firmenich", exchange: "EURONEXT", url: "https://www.tradingview.com/symbols/EURONEXT-DSFIR/" },
  { ticker: "MC", name: "LVMH Moët Hennessy", exchange: "EURONEXT", url: "https://www.tradingview.com/symbols/EURONEXT-MC/" },
  { ticker: "EL", name: "Estée Lauder", exchange: "NYSE", url: "https://www.tradingview.com/symbols/NYSE-EL/" },
  { ticker: "COTY", name: "Coty Inc", exchange: "NYSE", url: "https://www.tradingview.com/symbols/NYSE-COTY/" },
  { ticker: "IPAR", name: "Inter Parfums", exchange: "NASDAQ", url: "https://www.tradingview.com/symbols/NASDAQ-IPAR/" },
  { ticker: "PUIG", name: "Puig Brands", exchange: "BME", url: "https://www.tradingview.com/symbols/BME-PUIG/" },
];

function FallbackView({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="px-1">
      {/* Friendly message */}
      <div className="flex items-center gap-2 py-2 mb-3 px-2.5 bg-amber-500/5 rounded border border-amber-500/10">
        <TrendingUp size={12} className="text-amber-400 shrink-0" />
        <span className="text-[10px] text-amber-300/80 font-mono leading-tight">
          Live chart temporarily unavailable — TradingView&apos;s servers are warming up. Click any ticker to view on TradingView.
        </span>
      </div>

      {/* Section: Fragrance Houses */}
      <div className="text-[9px] font-mono font-semibold text-gray-500 uppercase tracking-wider mb-1.5 px-1">
        Fragrance & Flavor Houses
      </div>
      <div className="space-y-0.5 mb-3">
        {FALLBACK_STOCKS.slice(0, 4).map((stock) => (
          <a
            key={stock.ticker}
            href={stock.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-scent-border/30 transition-colors group"
          >
            <span className="text-[11px] font-mono font-bold text-scent-accent w-[48px]">
              {stock.ticker}
            </span>
            <span className="text-[11px] text-gray-400 flex-1 truncate group-hover:text-gray-200 transition-colors">
              {stock.name}
            </span>
            <span className="text-[9px] font-mono text-gray-600">{stock.exchange}</span>
            <ExternalLink size={9} className="text-gray-600 group-hover:text-scent-accent transition-colors" />
          </a>
        ))}
      </div>

      {/* Section: Luxury & Consumer */}
      <div className="text-[9px] font-mono font-semibold text-gray-500 uppercase tracking-wider mb-1.5 px-1">
        Luxury & Consumer Brands
      </div>
      <div className="space-y-0.5 mb-3">
        {FALLBACK_STOCKS.slice(4).map((stock) => (
          <a
            key={stock.ticker}
            href={stock.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-scent-border/30 transition-colors group"
          >
            <span className="text-[11px] font-mono font-bold text-scent-accent w-[48px]">
              {stock.ticker}
            </span>
            <span className="text-[11px] text-gray-400 flex-1 truncate group-hover:text-gray-200 transition-colors">
              {stock.name}
            </span>
            <span className="text-[9px] font-mono text-gray-600">{stock.exchange}</span>
            <ExternalLink size={9} className="text-gray-600 group-hover:text-scent-accent transition-colors" />
          </a>
        ))}
      </div>

      {/* Retry button */}
      <button
        onClick={onRetry}
        className="flex items-center gap-1.5 mx-auto text-[10px] font-mono text-gray-500 hover:text-scent-accent transition-colors py-1.5 px-3 rounded border border-scent-border/50 hover:border-scent-accent/30"
      >
        <RefreshCw size={10} />
        Retry live chart
      </button>
    </div>
  );
}

function TradingViewEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const attemptRef = useRef(0);

  const loadWidget = useCallback(() => {
    const node = containerRef.current;
    if (!node) return;

    setStatus("loading");
    node.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.className = "tradingview-widget-container";
    wrapper.style.height = "100%";
    wrapper.style.width = "100%";

    const inner = document.createElement("div");
    inner.className = "tradingview-widget-container__widget";
    wrapper.appendChild(inner);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.textContent = JSON.stringify(WIDGET_CONFIG);

    // Detect script load failure
    script.onerror = () => {
      setStatus("error");
    };

    // Detect successful load — TradingView creates an iframe when it works
    script.onload = () => {
      // Give TradingView a moment to create the iframe
      setTimeout(() => {
        const iframe = node.querySelector("iframe");
        if (iframe) {
          setStatus("ready");
        } else {
          setStatus("error");
        }
      }, 2000);
    };

    wrapper.appendChild(script);
    node.appendChild(wrapper);

    // Timeout fallback — if nothing happens in 8 seconds, show error
    setTimeout(() => {
      const iframe = node.querySelector("iframe");
      if (!iframe) {
        setStatus((prev) => (prev === "loading" ? "error" : prev));
      }
    }, 8000);
  }, []);

  useEffect(() => {
    loadWidget();
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [loadWidget]);

  const handleRetry = useCallback(() => {
    attemptRef.current += 1;
    loadWidget();
  }, [loadWidget]);

  return (
    <>
      {/* Loading state */}
      {status === "loading" && (
        <div className="flex items-center gap-2 py-2 mb-2 px-2.5 bg-scent-accent/5 rounded border border-scent-accent/10">
          <RefreshCw size={10} className="animate-spin text-scent-accent" />
          <span className="text-[10px] text-scent-accent font-mono">Connecting to TradingView...</span>
        </div>
      )}

      {/* TradingView container — hidden when error */}
      <div
        ref={containerRef}
        className={`w-full min-h-[380px] h-full [&_.tradingview-widget-container]:h-full ${
          status === "error" ? "hidden" : ""
        }`}
      />

      {/* Error fallback */}
      {status === "error" && <FallbackView onRetry={handleRetry} />}
    </>
  );
}

const MemoizedTradingView = memo(TradingViewEmbed);

export default function StockTracker() {
  return (
    <WidgetWrapper
      title="Industry Stocks"
      badge={
        <>
          <LiveBadge />
          <CountBadge count={9} />
        </>
      }
      info="Live stock prices for fragrance & flavor houses (Givaudan, IFF, Symrise, dsm-firmenich) and luxury/consumer brands (LVMH, Estee Lauder, Coty, Inter Parfums, Puig). Data via TradingView with ~15min delay. Click any symbol for detailed chart."
    >
      <div className="h-full -mx-[14px] -mb-[12px] overflow-hidden px-[14px] pb-[12px]">
        <MemoizedTradingView />
      </div>
    </WidgetWrapper>
  );
}
