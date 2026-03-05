import { NextResponse } from "next/server";
import Parser from "rss-parser";
import { stripHtml, sanitizeUrl } from "@/lib/sanitize";

const parser = new Parser({
  timeout: 8000,
  headers: {
    "User-Agent": "ScentDesk/1.0 (Fragrance Industry Terminal)",
  },
});

interface FeedSource {
  url: string;
  source: string;
  category: string;
}

const RSS_FEEDS: FeedSource[] = [
  // Fragrance & beauty industry feeds
  { url: "https://www.perfumerflavorist.com/rss/all", source: "Perfumer & Flavorist", category: "Industry" },
  { url: "https://www.cosmeticsdesign.com/var/plain_site/storage/rss/news.rss", source: "Cosmetics Design", category: "Industry" },
  { url: "https://www.cosmeticsdesign-europe.com/var/plain_site/storage/rss/news.rss", source: "Cosmetics Design EU", category: "Regulatory" },
  { url: "https://www.globalcosmeticsnews.com/feed/", source: "Global Cosmetics News", category: "Market" },
  { url: "https://www.premiumbeautynews.com/en/?format=feed&type=rss", source: "Premium Beauty News", category: "Launches" },
  // Business/market feeds — beauty-specific only (no general fashion)
  { url: "https://www.businessoffashion.com/feed/beauty", source: "BoF Beauty", category: "Industry" },
  { url: "https://wwd.com/beauty-industry-news/feed/", source: "WWD Beauty", category: "Industry" },
  { url: "https://feeds.feedburner.com/beautypackaging/dOWj", source: "Beauty Packaging", category: "Supply Chain" },
  // General Reuters business (filtered for fragrance)
  { url: "https://news.google.com/rss/search?q=fragrance+industry+OR+perfume+market+OR+essential+oils+market&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "Market" },
  { url: "https://news.google.com/rss/search?q=IFRA+OR+fragrance+regulation+OR+cosmetics+regulation+OR+CTPA+OR+CLP+cosmetics&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "Regulatory" },
  { url: "https://news.google.com/rss/search?q=Givaudan+OR+IFF+OR+Firmenich+OR+Symrise+fragrance&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "M&A" },
  { url: "https://news.google.com/rss/search?q=new+perfume+launch+2026+OR+fragrance+launch&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "Launches" },
  { url: "https://news.google.com/rss/search?q=%22essential+oils%22+price+fragrance+-crude+-petroleum+-OPEC+-gasoline&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "Raw Materials" },
  { url: "https://news.google.com/rss/search?q=vanilla+price+OR+sandalwood+price+OR+%22oud+oil%22+price+-crude+-petroleum&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "Raw Materials" },
  { url: "https://news.google.com/rss/search?q=sandalwood+harvest+OR+vetiver+oil+fragrance+OR+patchouli+oil+OR+%22rose+oil%22+Bulgaria+OR+%22aroma+chemicals%22&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "Raw Materials" },
  { url: "https://news.google.com/rss/search?q=vanilla+Madagascar+harvest+OR+lavender+Provence+OR+bergamot+Calabria+OR+jasmine+Grasse+OR+ylang+ylang+OR+tonka+bean&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "Raw Materials" },
  { url: "https://news.google.com/rss/search?q=%22synthetic+fragrance%22+ingredient+OR+%22lab+grown+musk%22+OR+%22sustainable+sourcing%22+perfume&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "Raw Materials" },
  { url: "https://news.google.com/rss/search?q=%22aroma+chemicals%22+market+OR+%22fragrance+raw+material%22+OR+%22natural+ingredient%22+perfume&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "Raw Materials" },
  { url: "https://news.google.com/rss/search?q=%22fragrance+ingredient%22+OR+%22perfume+ingredient%22+OR+%22cosmetic+raw+material%22&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "Raw Materials" },
  // Home fragrance — candles, diffusers, room sprays
  { url: "https://news.google.com/rss/search?q=scented+candle+market+OR+candle+industry+OR+luxury+candles+brand&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "Home Fragrance" },
  { url: "https://news.google.com/rss/search?q=reed+diffuser+market+OR+room+spray+market+OR+home+fragrance+industry&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "Home Fragrance" },
  { url: "https://news.google.com/rss/search?q=Bath+%26+Body+Works+OR+Yankee+Candle+OR+Diptyque+candle+OR+Jo+Malone+home&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "Home Fragrance" },
  { url: "https://news.google.com/rss/search?q=home+fragrance+brand+OR+luxury+candle+launch+OR+wax+melt+market+OR+car+fragrance+market&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "Home Fragrance" },
  { url: "https://news.google.com/rss/search?q=candle+making+business+OR+soy+wax+market+OR+fragrance+oil+supplier+OR+candle+trend+2026&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "Home Fragrance" },
  // Candle industry associations
  { url: "https://candleseurope.com/feed/", source: "ECMA", category: "Home Fragrance" },
  { url: "https://candles.org/feed/", source: "National Candle Association", category: "Home Fragrance" },
  // Specialist fragrance publications
  { url: "https://perfumesociety.org/feed", source: "The Perfume Society", category: "Launches" },
  { url: "https://cosmeticsbusiness.com/rss", source: "Cosmetics Business", category: "Industry" },
];

function getTimeSince(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function guessSentiment(title: string): "positive" | "negative" | "neutral" {
  const posWords = ["growth", "record", "surge", "boost", "rise", "gain", "expand", "success", "launch", "innovation", "award", "sustainable"];
  const negWords = ["decline", "drop", "fall", "crisis", "restrict", "ban", "shortage", "concern", "risk", "recall", "warning", "loss"];
  const lower = title.toLowerCase();
  const posScore = posWords.filter((w) => lower.includes(w)).length;
  const negScore = negWords.filter((w) => lower.includes(w)).length;
  if (posScore > negScore) return "positive";
  if (negScore > posScore) return "negative";
  return "neutral";
}

/**
 * Smart auto-categorization — overrides the feed's default category
 * when article title clearly matches a different topic.
 * Only overrides for non-Google News feeds (Google feeds are already topic-specific).
 */
/**
 * Relevance filter for the fragrance industry terminal.
 * Two-tier keyword system:
 *  - STRONG: always fragrance-relevant (perfume, candle, IFRA brands, etc.)
 *  - WEAK: ambiguous ingredient names (vanilla, lavender) that need fragrance context
 * Returns true if the article should be EXCLUDED.
 */
// Strong signals — always relevant on their own
const STRONG_RELEVANCE = /\b(fragranc|perfum|cologne|scent(?!ed candle)|aroma(?!tic rice)|olfact|parfum|eau de|candle|diffuser|room spray|home fragranc|wax melt|air freshener|incense|essential oil|flavor.*fragranc|fragranc.*flavor|cosmetic|beauty|skincare|skin care|makeup|personal care|body care|body wash|body lotion|bath bomb|deodorant|antiperspirant|shampoo|conditioner|hair care|grooming|toiletries|aftershave|laundry.*scent|fabric.*fragranc|reed diffuser|car fragranc|air care|fine fragranc|niche perfum|perfumer|accord|top note|base note|middle note|sillage|longevity|aroma chemical|raw material.*fragranc|fragranc.*raw material|Givaudan|IFF|Symrise|Firmenich|dsm.firmenich|Robertet|LVMH|Estée Lauder|Coty|Inter Parfums|Puig|Shiseido|L'Oréal|Bath & Body Works|Yankee Candle|Diptyque|Jo Malone|Byredo|Le Labo|Creed|Tom Ford|Chanel|Dior|Guerlain|Hermès|IFRA|ECHA|CLP|CTPA)\b/i;

// Weak signals — ingredient names that are ambiguous without fragrance context
const WEAK_INGREDIENT = /\b(vanilla|sandalwood|vetiver|patchouli|jasmine|rose oil|bergamot|lavender|ylang|tonka|frankincense|myrrh|cedar|oud|musk|amber)\b/i;

// Fragrance context required alongside weak ingredient matches
const FRAGRANCE_CONTEXT = /\b(fragranc|perfum|scent|aroma|parfum|cosmetic|beauty|candle|oil|harvest|crop|price|market|shortage|sourcing|ingredient|extract|distill|supplier|raw material|essential|accord|note)\b/i;

const HARD_EXCLUDE = /\b(crude oil|petroleum|gasoline|opec|brent crude|barrel.*oil|refinery|natural gas|lng|shale|fracking|oil rig|oil field|oil well|oil pipeline|oil tanker|military|troops|missile|weapons|ammunition|drone strike|air strike|nuclear warhead)\b/i;

// Noise: food, tech, finance, gaming articles that happen to mention ingredients
const NOISE_EXCLUDE = /\b(recipe|baking|baker|bakery|cookbook|ice cream|iced coffee|grocery store|cooking|kitchen hack|keyboard|gaming|laptop|smartphone|stock option|call option|put option|financial option|vape|vaping|e.liquid|nicotine|salt nic|custard monster|monster energy)\b/i;

function isIrrelevant(title: string, source: string): boolean {
  // Always exclude hard off-topic
  if (HARD_EXCLUDE.test(title)) return true;
  // Exclude food/tech/finance/vape noise
  if (NOISE_EXCLUDE.test(title)) return true;

  // Specialist fragrance publications are always relevant
  const trustedSources = ["Perfumer & Flavorist", "Cosmetics Design", "Cosmetics Design EU",
    "Global Cosmetics News", "Premium Beauty News", "BoF Beauty", "WWD Beauty",
    "Beauty Packaging", "The Perfume Society", "Cosmetics Business", "ECMA",
    "National Candle Association"];
  if (trustedSources.includes(source)) return false;

  // Strong signal = always pass
  if (STRONG_RELEVANCE.test(title)) return false;

  // Weak ingredient signal = needs fragrance context
  if (WEAK_INGREDIENT.test(title) && FRAGRANCE_CONTEXT.test(title)) return false;

  // No relevant signal found
  return true;
}

function smartCategory(title: string, defaultCategory: string, isGoogleNews: boolean): string {
  const t = title.toLowerCase();

  // Market research reports — catch these FIRST to prevent misclassification
  // Articles like "Europe Cologne Market Size & Share Report, 2034" should be Market, not Raw Materials
  if (/\b(market size|market share|market value|market report|industry report|market forecast|market analysis|market outlook|market revenue)\b/.test(t))
    return "Market";

  // For Google News: only override when a specific-ingredient keyword is found
  // but the article landed in a generic feed (e.g. "sandalwood" in Market feed)
  if (isGoogleNews) {
    if (/\b(sandalwood|vetiver|oud|patchouli|vanilla|rose oil|musk|amber|essential oil|harvest|shortage|crop|distill|aroma chemical|jasmine|ylang|bergamot|lavender|tonka|frankincense|myrrh|cedar|synthetic musk|lab.grown|sourcing)\b/.test(t)
        && defaultCategory !== "Raw Materials") {
      return "Raw Materials";
    }
    return defaultCategory;
  }

  // M&A / Deals — acquisitions, mergers, partnerships
  if (/\b(acqui|merger|deal|buyout|takeover|partnership|joint venture|stake|invest[sm]|ipo|valuation|revenue|earning|fiscal|quarterly)\b/.test(t))
    return "M&A";

  // Regulatory — IFRA, bans, compliance, EU/FDA, CTPA, CLP
  if (/\b(ifra|regulation|regulatory|compliance|restrict|ban|amendment|directive|eu cosmetics|fda|reach|echa|safety assessment|anti.dumping|dut(?:y|ies)|tariff|ctpa|clp|labelling)\b/.test(t))
    return "Regulatory";

  // Raw Materials / Supply Chain
  if (/\b(raw material|essential oil|ingredient|vanilla|sandalwood|vetiver|oud|musk|amber|patchouli|rose oil|supply chain|shortage|pricing|sourcing|harvest|crop|distill|jasmine|ylang|bergamot|lavender|tonka|frankincense|myrrh|cedar|aroma chemical|synthetic musk|lab.grown|sustainable sourcing)\b/.test(t))
    return "Raw Materials";

  // Launches — new products, collections
  if (/\b(launch|new fragrance|new perfume|debut|collection|release|unveil|introduce|limited edition)\b/.test(t))
    return "Launches";

  // Home Fragrance — candles, diffusers
  if (/\b(candle|diffuser|room spray|home fragrance|home scent|wax melt|reed diffuser|air freshener)\b/.test(t))
    return "Home Fragrance";

  // Market — market size, trends, growth, reports
  if (/\b(market size|market share|market growth|forecast|trend|billion|million|cagr|report|analysis|outlook|expansion)\b/.test(t))
    return "Market";

  return defaultCategory;
}

function guessRegion(title: string, content?: string): string {
  const text = `${title} ${content || ""}`.toLowerCase();
  if (/europe|eu |france|germany|uk |italy|spain|grasse/i.test(text)) return "Europe";
  if (/us |usa|america|new york|california/i.test(text)) return "North America";
  if (/china|japan|india|asia|korea|singapore/i.test(text)) return "Asia";
  if (/middle east|uae|dubai|saudi|qatar/i.test(text)) return "Middle East";
  if (/brazil|latin|mexico|argentina/i.test(text)) return "Latin America";
  if (/africa|nigeria|south africa|egypt/i.test(text)) return "Africa";
  return "Global";
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date"); // YYYY-MM-DD

    // Build feeds — for Google News, inject date range if requested
    const feeds = dateParam
      ? RSS_FEEDS.map((feed) => {
          if (feed.source !== "Google News") return feed;
          const sep = feed.url.includes("?") ? "+" : "?q=";
          const dateUrl = feed.url.replace(
            /(&hl=)/,
            `+after:${dateParam}+before:${dateParam}$1`
          );
          return { ...feed, url: dateUrl };
        })
      : RSS_FEEDS;

    const feedPromises = feeds.map(async (feed) => {
      try {
        const parsed = await parser.parseURL(feed.url);
        return (parsed.items || []).slice(0, 5).map((item, idx) => {
          const rawTitle = stripHtml(item.title || "") || "Untitled";
          // Google News titles end with " - Source Name" — extract real source
          const isGoogleNews = feed.source === "Google News";
          const dashIdx = rawTitle.lastIndexOf(" - ");
          const realSource = isGoogleNews && dashIdx > 0 ? rawTitle.slice(dashIdx + 3).trim() : "";
          const cleanTitle = isGoogleNews && dashIdx > 0 ? rawTitle.slice(0, dashIdx).trim() : rawTitle;

          return ({
          id: `${feed.source}-${idx}-${Date.now()}`,
          title: cleanTitle,
          source: realSource || stripHtml(item.creator || "") || feed.source,
          category: smartCategory(cleanTitle, feed.category, isGoogleNews),
          timestamp: getTimeSince(item.pubDate || item.isoDate || new Date().toISOString()),
          pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
          url: sanitizeUrl(item.link || "#"),
          sentiment: guessSentiment(cleanTitle),
          region: guessRegion(cleanTitle, item.contentSnippet),
        });
        });
      } catch {
        return [];
      }
    });

    const results = await Promise.allSettled(feedPromises);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allNews = (results as any[])
      .filter((r) => r.status === "fulfilled")
      .flatMap((r) => r.value)
      .filter((item: { title: string; source: string }) => !isIrrelevant(item.title, item.source))
      .filter((item: { title: string }, idx: number, arr: { title: string }[]) => {
        // Deduplicate by normalized title (case-insensitive, trimmed)
        const norm = item.title.toLowerCase().trim();
        return arr.findIndex((a) => a.title.toLowerCase().trim() === norm) === idx;
      })
      .sort((a: { pubDate: string }, b: { pubDate: string }) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, 50);

    return NextResponse.json({
      news: allNews,
      lastUpdated: new Date().toISOString(),
      count: allNews.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news", news: [], lastUpdated: new Date().toISOString() },
      { status: 500 }
    );
  }
}
