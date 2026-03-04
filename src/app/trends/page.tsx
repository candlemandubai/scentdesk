import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Fragrance Trends 2026 — Perfume Industry Consumer & Social Trends",
  description:
    "Discover the top perfume and fragrance trends for 2026. Clean fragrances, gender-neutral scents, PerfumeTok viral perfumes, niche discovery, oud influences, and consumer demographics data.",
  keywords: [
    "perfume trends 2026",
    "fragrance trends 2026",
    "niche perfume trends",
    "clean fragrance",
    "gender neutral fragrance",
    "PerfumeTok",
    "FragranceTok",
    "viral perfume",
    "fragrance consumer trends",
    "perfume dupe",
    "fragrance layering",
    "sustainable perfume",
    "vegan perfume",
    "natural perfume trends",
    "gourmand fragrance trend",
    "oud fragrance trend",
    "seasonal fragrance trends",
    "fragrance families",
    "woody fragrance",
    "floral fragrance",
    "oriental perfume",
  ],
  alternates: { canonical: "https://scentdesk.com/trends" },
  openGraph: {
    title: "Fragrance Trends 2026 | ScentDesk",
    description: "Top perfume trends: clean fragrances, PerfumeTok viral scents, niche discovery, gender-neutral, and more.",
    url: "https://scentdesk.com/trends",
  },
};

const trendFaqs = [
  {
    question: "What are the top perfume trends in 2026?",
    answer: "The top perfume trends in 2026 include clean/natural fragrances (+12% growth), gender-neutral scents (+18%), niche discovery sets (+22%), oud and Middle Eastern influences (+15%), layerable collections (+9%), and gourmand fragrances. PerfumeTok continues to drive viral discovery with #NichePerfume at 124K posts/week.",
  },
  {
    question: "What is PerfumeTok?",
    answer: "PerfumeTok is the fragrance community on TikTok, with over 2.3 billion views. It has become the #1 discovery platform for new fragrances, driving viral trends like perfume dupes, blind buys, and niche brand discovery. Key hashtags include #PerfumeTok, #FragranceCollection, and #ScentOfTheDay.",
  },
  {
    question: "What fragrance families are most popular in 2026?",
    answer: "The most popular fragrance families in 2026 are Woody (22% market share, +8.5% growth), Floral (20%, +3.2%), Oriental (16%, +11.4%), Fresh (15%, +5.1%), Gourmand (12%, -2.8%), Aromatic (8%, +4.7%), and Chypre (7%, +6.3%).",
  },
];

export default function TrendsPage() {
  return (
    <div className="min-h-screen bg-scent-bg text-scent-text">
      <BreadcrumbJsonLd
        items={[
          { name: "ScentDesk", url: "https://scentdesk.com" },
          { name: "Trends", url: "https://scentdesk.com/trends" },
        ]}
      />
      <FAQJsonLd faqs={trendFaqs} />

      <header className="border-b border-scent-border px-4 sm:px-8 py-6">
        <Link href="/" className="text-[13px] font-mono font-bold tracking-wider text-white hover:text-scent-accent transition-colors">
          SCENT<span className="text-scent-accent">DESK</span>
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Fragrance & Perfume Trends 2026
        </h1>
        <p className="text-gray-400 text-[15px] leading-relaxed mb-8 max-w-2xl">
          Comprehensive analysis of consumer, social, and seasonal trends shaping the fragrance industry in 2026 and beyond.
        </p>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Consumer Trend Categories</h2>
          <div className="space-y-3">
            {[
              { name: "Niche Discovery Sets", growth: "+22%", status: "Accelerating" },
              { name: "Gender-Neutral Scents", growth: "+18%", status: "Accelerating" },
              { name: "Oud / Middle Eastern", growth: "+15%", status: "Growing" },
              { name: "Clean / Natural Fragrances", growth: "+12%", status: "Growing" },
              { name: "Layerable Collections", growth: "+9%", status: "Growing" },
              { name: "Gourmand Fragrances", growth: "-3%", status: "Cooling" },
              { name: "Celebrity Scents", growth: "-8%", status: "Declining" },
            ].map((trend) => (
              <div key={trend.name} className="flex items-center justify-between py-2 border-b border-scent-border">
                <span className="text-[14px] text-gray-300">{trend.name}</span>
                <div className="flex items-center gap-3">
                  <span className={`text-[12px] font-mono ${trend.growth.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>{trend.growth}</span>
                  <span className="text-[11px] text-gray-500">{trend.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Social Media Buzz — PerfumeTok & Beyond</h2>
          <div className="space-y-3">
            {[
              { tag: "#NichePerfume", posts: "124K/week", growth: "+32%", platform: "TikTok" },
              { tag: "#PerfumeTok", posts: "89K/week", growth: "+18%", platform: "TikTok" },
              { tag: "#FragranceCollection", posts: "67K/week", growth: "+12%", platform: "Instagram" },
              { tag: "#DupeFragrance", posts: "31K/week", growth: "+45%", platform: "TikTok" },
              { tag: "#CleanPerfumery", posts: "22K/week", growth: "+28%", platform: "Twitter" },
            ].map((item) => (
              <div key={item.tag} className="flex items-center justify-between py-2 border-b border-scent-border">
                <span className="text-[14px] font-mono text-white">{item.tag}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] text-gray-400">{item.posts}</span>
                  <span className="text-[12px] font-mono text-emerald-400">{item.growth}</span>
                  <span className="text-[10px] bg-scent-surface px-2 py-0.5 rounded text-gray-400 border border-scent-border">{item.platform}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Fragrance Families Market Share</h2>
          <div className="space-y-3">
            {[
              { family: "Woody", share: "22%", growth: "+8.5%" },
              { family: "Floral", share: "20%", growth: "+3.2%" },
              { family: "Oriental", share: "16%", growth: "+11.4%" },
              { family: "Fresh", share: "15%", growth: "+5.1%" },
              { family: "Gourmand", share: "12%", growth: "-2.8%" },
              { family: "Aromatic", share: "8%", growth: "+4.7%" },
              { family: "Chypre", share: "7%", growth: "+6.3%" },
            ].map((f) => (
              <div key={f.family} className="flex items-center justify-between py-2 border-b border-scent-border">
                <span className="text-[14px] text-gray-300">{f.family}</span>
                <div className="flex items-center gap-4">
                  <span className="text-[14px] font-mono text-white">{f.share}</span>
                  <span className={`text-[12px] font-mono ${f.growth.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>{f.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-scent-surface rounded-lg p-6 border border-scent-border text-center">
          <h3 className="text-lg font-bold text-white mb-2">Explore All Trends Live</h3>
          <p className="text-gray-500 text-[13px] mb-4">Interactive seasonal trends, demographic data, and social buzz analysis.</p>
          <Link href="/" className="inline-block px-6 py-2.5 bg-scent-accent/20 text-scent-accent border border-scent-accent/30 rounded-lg text-[13px] font-mono hover:bg-scent-accent/30 transition-colors">
            Open ScentDesk Terminal
          </Link>
        </div>
      </main>
    </div>
  );
}
