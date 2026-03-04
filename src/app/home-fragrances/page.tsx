import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, DatasetJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Home Fragrance Market Data — Candles, Diffusers, Room Sprays",
  description:
    "Track the $12.8B home fragrance market. Scented candle market size, reed diffuser trends, room spray data, wax melt analysis, and incense market growth with top product rankings.",
  keywords: [
    "home fragrance market",
    "home fragrance market size",
    "scented candle market",
    "candle market size",
    "candle industry trends",
    "reed diffuser market",
    "room spray market",
    "wax melts market",
    "incense market",
    "luxury candles",
    "home fragrance trends 2026",
    "Le Labo candles",
    "Diptyque candles",
    "Jo Malone candles",
    "soy candles",
    "home scent trends",
  ],
  alternates: { canonical: "https://scentdesk.com/home-fragrances" },
  openGraph: {
    title: "Home Fragrance Market Data | ScentDesk",
    description: "Track the $12.8B home fragrance market — candles, diffusers, room sprays, wax melts, and incense.",
    url: "https://scentdesk.com/home-fragrances",
  },
};

export default function HomeFragrancesPage() {
  return (
    <div className="min-h-screen bg-scent-bg text-scent-text">
      <BreadcrumbJsonLd
        items={[
          { name: "ScentDesk", url: "https://scentdesk.com" },
          { name: "Home Fragrances", url: "https://scentdesk.com/home-fragrances" },
        ]}
      />
      <DatasetJsonLd
        name="Home Fragrance Market Data"
        description="Market data for scented candles, reed diffusers, room sprays, wax melts, and incense including pricing, brand rankings, and growth rates."
        keywords={["home fragrance market", "candle market size", "reed diffuser market"]}
      />

      <header className="border-b border-scent-border px-4 sm:px-8 py-6">
        <Link href="/" className="text-[13px] font-mono font-bold tracking-wider text-white hover:text-scent-accent transition-colors">
          SCENT<span className="text-scent-accent">DESK</span>
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Home Fragrance Market — Candles, Diffusers & Room Sprays
        </h1>
        <p className="text-gray-400 text-[15px] leading-relaxed mb-8 max-w-2xl">
          Comprehensive data on the $12.8B home fragrance market. Track segment performance, top brands, pricing, and growth across all product categories.
        </p>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Market Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-scent-surface rounded-lg p-4 border border-scent-border">
              <div className="text-[10px] font-mono text-gray-500 uppercase">Market Size</div>
              <div className="text-2xl font-bold text-white mt-1">$12.8B</div>
              <div className="text-[11px] text-emerald-400">+11.5% YoY</div>
            </div>
            <div className="bg-scent-surface rounded-lg p-4 border border-scent-border">
              <div className="text-[10px] font-mono text-gray-500 uppercase">Projected 2028</div>
              <div className="text-2xl font-bold text-scent-accent mt-1">$18.9B</div>
              <div className="text-[11px] text-gray-500">10.2% CAGR</div>
            </div>
            <div className="bg-scent-surface rounded-lg p-4 border border-scent-border">
              <div className="text-[10px] font-mono text-gray-500 uppercase">Fastest Segment</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">Incense</div>
              <div className="text-[11px] text-emerald-400">+15.1%</div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Segments</h2>
          <div className="space-y-3">
            {[
              { name: "Scented Candles", size: "$5.2B", growth: "+9.4%" },
              { name: "Reed Diffusers", size: "$2.8B", growth: "+12.7%" },
              { name: "Room Sprays", size: "$1.9B", growth: "+7.8%" },
              { name: "Wax Melts", size: "$1.4B", growth: "+6.2%" },
              { name: "Incense", size: "$0.9B", growth: "+15.1%" },
              { name: "Other", size: "$0.6B", growth: "+4.3%" },
            ].map((seg) => (
              <div key={seg.name} className="flex items-center justify-between py-2 border-b border-scent-border">
                <span className="text-[14px] text-gray-300">{seg.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-[14px] font-mono text-white">{seg.size}</span>
                  <span className="text-[12px] font-mono text-emerald-400">{seg.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-scent-surface rounded-lg p-6 border border-scent-border text-center">
          <h3 className="text-lg font-bold text-white mb-2">Explore Home Fragrance Data</h3>
          <p className="text-gray-500 text-[13px] mb-4">Product rankings, brand comparisons, and regional performance.</p>
          <Link href="/" className="inline-block px-6 py-2.5 bg-scent-accent/20 text-scent-accent border border-scent-accent/30 rounded-lg text-[13px] font-mono hover:bg-scent-accent/30 transition-colors">
            Open ScentDesk Terminal
          </Link>
        </div>
      </main>
    </div>
  );
}
