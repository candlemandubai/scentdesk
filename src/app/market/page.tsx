import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, DatasetJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Fragrance Market Data & Analysis — Size, Growth, Trends",
  description:
    "Real-time fragrance market intelligence. Global perfume market size ($125B+), segment analysis, fragrance house revenues (Givaudan, IFF, Symrise, Firmenich), growth forecasts, and competitive landscape.",
  keywords: [
    "fragrance market size",
    "perfume market trends",
    "fragrance industry analysis",
    "global fragrance market",
    "perfume industry report",
    "fragrance market forecast",
    "fragrance market data",
    "perfume market share",
    "niche perfume market size",
    "fine fragrance market",
    "fragrance industry statistics",
    "perfume industry growth",
    "Givaudan revenue",
    "IFF fragrance",
    "Symrise fragrance",
    "dsm-firmenich revenue",
  ],
  alternates: { canonical: "https://scentdesk.com/market" },
  openGraph: {
    title: "Fragrance Market Data & Analysis | ScentDesk",
    description: "Track the $125B+ global fragrance market. Segment analysis, house revenues, and growth forecasts updated in real-time.",
    url: "https://scentdesk.com/market",
  },
};

export default function MarketPage() {
  return (
    <div className="min-h-screen bg-scent-bg text-scent-text">
      <BreadcrumbJsonLd
        items={[
          { name: "ScentDesk", url: "https://scentdesk.com" },
          { name: "Market Data", url: "https://scentdesk.com/market" },
        ]}
      />
      <DatasetJsonLd
        name="Global Fragrance Market Data"
        description="Comprehensive fragrance market data including segment sizes, growth rates, fragrance house revenues, and competitive analysis."
        keywords={["fragrance market size", "perfume market data", "fragrance industry statistics"]}
      />

      <header className="border-b border-scent-border px-4 sm:px-8 py-6">
        <Link href="/" className="text-[13px] font-mono font-bold tracking-wider text-white hover:text-scent-accent transition-colors">
          SCENT<span className="text-scent-accent">DESK</span>
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Fragrance Market Data & Analysis
        </h1>
        <p className="text-gray-400 text-[15px] leading-relaxed mb-8 max-w-2xl">
          Real-time intelligence on the global fragrance industry. Track market size, segment performance, fragrance house revenues, and growth forecasts.
        </p>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Global Fragrance Market Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-scent-surface rounded-lg p-4 border border-scent-border">
              <div className="text-[10px] font-mono text-gray-500 uppercase">Market Size</div>
              <div className="text-2xl font-bold text-white mt-1">$125.2B</div>
              <div className="text-[11px] text-emerald-400">+7.0% YoY</div>
            </div>
            <div className="bg-scent-surface rounded-lg p-4 border border-scent-border">
              <div className="text-[10px] font-mono text-gray-500 uppercase">Forecast 2030</div>
              <div className="text-2xl font-bold text-scent-accent mt-1">$180B+</div>
              <div className="text-[11px] text-gray-500">6.5% CAGR</div>
            </div>
            <div className="bg-scent-surface rounded-lg p-4 border border-scent-border">
              <div className="text-[10px] font-mono text-gray-500 uppercase">Fastest Growing</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">Niche</div>
              <div className="text-[11px] text-emerald-400">+15.3% CAGR</div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Market Segments</h2>
          <div className="space-y-3">
            {[
              { name: "Fine Fragrance", size: "$52.2B", growth: "+8.2%" },
              { name: "Personal Care", size: "$28.3B", growth: "+5.1%" },
              { name: "Raw Materials", size: "$18.7B", growth: "+3.8%" },
              { name: "Home Fragrance", size: "$12.7B", growth: "+11.5%" },
              { name: "Niche/Artisan", size: "$8.9B", growth: "+15.3%" },
              { name: "Celebrity/Collab", size: "$4.2B", growth: "-2.1%" },
            ].map((seg) => (
              <div key={seg.name} className="flex items-center justify-between py-2 border-b border-scent-border">
                <span className="text-[14px] text-gray-300">{seg.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-[14px] font-mono text-white">{seg.size}</span>
                  <span className={`text-[12px] font-mono ${seg.growth.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>{seg.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Top Fragrance Houses by Revenue</h2>
          <p className="text-gray-500 text-[13px] mb-4">Annual revenue figures for the world's largest fragrance and flavor companies.</p>
          <div className="space-y-3">
            {[
              { name: "dsm-firmenich", revenue: "€12.4B", growth: "+5.8%" },
              { name: "IFF", revenue: "$11.3B", growth: "-1.2%" },
              { name: "Givaudan", revenue: "CHF 7.1B", growth: "+4.2%" },
              { name: "Symrise", revenue: "€4.7B", growth: "+5.3%" },
              { name: "Mane SA", revenue: "€1.9B", growth: "+7.1%" },
              { name: "Takasago", revenue: "$1.6B", growth: "+2.8%" },
              { name: "Robertet", revenue: "€700M", growth: "+3.4%" },
            ].map((house) => (
              <div key={house.name} className="flex items-center justify-between py-2 border-b border-scent-border">
                <span className="text-[14px] text-gray-300">{house.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-[14px] font-mono text-white">{house.revenue}</span>
                  <span className={`text-[12px] font-mono ${house.growth.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>{house.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-scent-surface rounded-lg p-6 border border-scent-border text-center">
          <h3 className="text-lg font-bold text-white mb-2">Access the Full Dashboard</h3>
          <p className="text-gray-500 text-[13px] mb-4">Get real-time updates, AI insights, and interactive charts.</p>
          <Link href="/" className="inline-block px-6 py-2.5 bg-scent-accent/20 text-scent-accent border border-scent-accent/30 rounded-lg text-[13px] font-mono hover:bg-scent-accent/30 transition-colors">
            Open ScentDesk Terminal
          </Link>
        </div>
      </main>
    </div>
  );
}
