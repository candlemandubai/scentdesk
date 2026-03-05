import { NextResponse } from "next/server";

interface StockConfig {
  yahoo: string;
  display: string;
  name: string;
  exchange: string;
  section: "houses" | "luxury";
  tvSymbol: string;
}

const STOCKS: StockConfig[] = [
  { yahoo: "GIVN.SW", display: "GIVN", name: "Givaudan", exchange: "SIX", section: "houses", tvSymbol: "SIX-GIVN" },
  { yahoo: "IFF", display: "IFF", name: "IFF", exchange: "NYSE", section: "houses", tvSymbol: "NYSE-IFF" },
  { yahoo: "SY1.DE", display: "SY1", name: "Symrise", exchange: "XETR", section: "houses", tvSymbol: "XETR-SY1" },
  { yahoo: "DSFIR.AS", display: "DSFIR", name: "dsm-firmenich", exchange: "EURONEXT", section: "houses", tvSymbol: "EURONEXT-DSFIR" },
  { yahoo: "MC.PA", display: "MC", name: "LVMH", exchange: "EURONEXT", section: "luxury", tvSymbol: "EURONEXT-MC" },
  { yahoo: "EL", display: "EL", name: "Estée Lauder", exchange: "NYSE", section: "luxury", tvSymbol: "NYSE-EL" },
  { yahoo: "COTY", display: "COTY", name: "Coty", exchange: "NYSE", section: "luxury", tvSymbol: "NYSE-COTY" },
  { yahoo: "IPAR", display: "IPAR", name: "Inter Parfums", exchange: "NASDAQ", section: "luxury", tvSymbol: "NASDAQ-IPAR" },
  { yahoo: "PUIG.MC", display: "PUIG", name: "Puig", exchange: "BME", section: "luxury", tvSymbol: "BME-PUIG" },
];

export interface StockQuote {
  symbol: string;
  name: string;
  exchange: string;
  section: "houses" | "luxury";
  price: number | null;
  change: number | null;
  changePercent: number | null;
  currency: string;
  sparkline: number[];
  tvUrl: string;
  marketState: string;
}

// In-memory cache for serverless (survives warm invocations)
let cachedData: { quotes: StockQuote[]; lastUpdated: string } | null = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function fetchStockData(stock: StockConfig): Promise<StockQuote> {
  const base: StockQuote = {
    symbol: stock.display,
    name: stock.name,
    exchange: stock.exchange,
    section: stock.section,
    price: null,
    change: null,
    changePercent: null,
    currency: "USD",
    sparkline: [],
    tvUrl: `https://www.tradingview.com/symbols/${stock.tvSymbol}/`,
    marketState: "closed",
  };

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(stock.yahoo)}?range=5d&interval=1d&includePrePost=false`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json",
      },
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const result = data.chart?.result?.[0];
    if (!result) throw new Error("No data");

    const meta = result.meta;
    const closes: number[] = (result.indicators?.quote?.[0]?.close || []).filter((c: number | null) => c !== null);

    const price = meta.regularMarketPrice;
    const prevClose = meta.chartPreviousClose || (closes.length > 1 ? closes[closes.length - 2] : null);

    base.price = price ? +price.toFixed(2) : null;
    base.currency = meta.currency || "USD";
    base.sparkline = closes.slice(-5).map((c: number) => +c.toFixed(2));
    base.marketState = meta.marketState?.toLowerCase() || "closed";

    if (price && prevClose) {
      base.change = +(price - prevClose).toFixed(2);
      base.changePercent = +((base.change / prevClose) * 100).toFixed(2);
    }

    return base;
  } catch {
    return base;
  }
}

export async function GET() {
  // Return cache if fresh
  if (cachedData && Date.now() - cacheTime < CACHE_TTL) {
    return NextResponse.json(cachedData, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  }

  try {
    // Fetch all stocks in parallel
    const quotes = await Promise.all(STOCKS.map(fetchStockData));
    const hasAnyPrice = quotes.some((q) => q.price !== null);

    const response = {
      quotes,
      lastUpdated: new Date().toISOString(),
      live: hasAnyPrice,
    };

    // Update cache
    cachedData = response;
    cacheTime = Date.now();

    return NextResponse.json(response, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch {
    // Return stale cache if available
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    // Last resort: return empty quotes
    return NextResponse.json({
      quotes: STOCKS.map((s) => ({
        symbol: s.display,
        name: s.name,
        exchange: s.exchange,
        section: s.section,
        price: null,
        change: null,
        changePercent: null,
        currency: "USD",
        sparkline: [],
        tvUrl: `https://www.tradingview.com/symbols/${s.tvSymbol}/`,
        marketState: "closed",
      })),
      lastUpdated: new Date().toISOString(),
      live: false,
    });
  }
}
