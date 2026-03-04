import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, DatasetJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Fragrance Raw Materials Prices — Essential Oils & Aroma Chemicals",
  description:
    "Track essential oil and aroma chemical prices in real-time. Oud oil, sandalwood, rose absolute, bergamot, vetiver, ambroxan pricing with supply chain status and sourcing intelligence.",
  keywords: [
    "essential oil prices",
    "aroma chemicals market",
    "fragrance ingredients market",
    "oud oil price",
    "sandalwood oil price",
    "rose absolute price",
    "bergamot oil price",
    "vetiver oil price",
    "ambroxan price",
    "fragrance raw material pricing",
    "essential oil market size",
    "natural fragrance ingredients",
    "synthetic fragrance ingredients",
    "fragrance supply chain",
    "aroma chemical suppliers",
    "Givaudan ingredients",
    "IFF ingredients",
  ],
  alternates: { canonical: "https://scentdesk.com/raw-materials" },
  openGraph: {
    title: "Fragrance Raw Materials Prices | ScentDesk",
    description: "Real-time essential oil and aroma chemical pricing. Track oud, sandalwood, rose, bergamot, vetiver, and 200+ ingredients.",
    url: "https://scentdesk.com/raw-materials",
  },
};

export default function RawMaterialsPage() {
  return (
    <div className="min-h-screen bg-scent-bg text-scent-text">
      <BreadcrumbJsonLd
        items={[
          { name: "ScentDesk", url: "https://scentdesk.com" },
          { name: "Raw Materials", url: "https://scentdesk.com/raw-materials" },
        ]}
      />
      <DatasetJsonLd
        name="Fragrance Raw Materials Price Index"
        description="Real-time pricing data for essential oils, aroma chemicals, and fragrance ingredients including oud, sandalwood, rose absolute, and synthetic molecules."
        keywords={["essential oil prices", "aroma chemicals", "fragrance ingredients pricing"]}
      />

      <header className="border-b border-scent-border px-4 sm:px-8 py-6">
        <Link href="/" className="text-[13px] font-mono font-bold tracking-wider text-white hover:text-scent-accent transition-colors">
          SCENT<span className="text-scent-accent">DESK</span>
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Fragrance Raw Materials & Ingredient Prices
        </h1>
        <p className="text-gray-400 text-[15px] leading-relaxed mb-8 max-w-2xl">
          Real-time price tracking for essential oils, aroma chemicals, and natural fragrance ingredients. Monitor supply chain disruptions and sourcing data worldwide.
        </p>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Essential Oil & Aroma Chemical Prices</h2>
          <div className="space-y-3">
            {[
              { name: "Oud Oil (Agarwood)", price: "$28,500/kg", change: "-1.2%", supply: "Tight" },
              { name: "Rose Absolute (Bulgarian)", price: "$7,200/kg", change: "+2.3%", supply: "Normal" },
              { name: "Sandalwood (Indian)", price: "$2,800/kg", change: "+1.1%", supply: "Tight" },
              { name: "Vetiver (Haiti)", price: "$420/kg", change: "+3.5%", supply: "Critical" },
              { name: "Bergamot (Calabria)", price: "$320/kg", change: "-0.1%", supply: "Normal" },
              { name: "Ambroxan (Synthetic)", price: "$185/kg", change: "-0.3%", supply: "Normal" },
              { name: "Lavender (France)", price: "$180/kg", change: "+0.5%", supply: "Normal" },
              { name: "ISO E Super", price: "$42/kg", change: "0.0%", supply: "Abundant" },
            ].map((mat) => (
              <div key={mat.name} className="flex items-center justify-between py-2 border-b border-scent-border">
                <div>
                  <span className="text-[14px] text-gray-300">{mat.name}</span>
                  <span className={`ml-3 text-[11px] font-mono px-1.5 py-0.5 rounded ${
                    mat.supply === "Critical" ? "bg-red-500/10 text-red-400" :
                    mat.supply === "Tight" ? "bg-amber-500/10 text-amber-400" :
                    "bg-emerald-500/10 text-emerald-400"
                  }`}>{mat.supply}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[14px] font-mono text-white">{mat.price}</span>
                  <span className={`text-[12px] font-mono ${mat.change.startsWith("+") ? "text-emerald-400" : mat.change.startsWith("-") ? "text-red-400" : "text-gray-500"}`}>{mat.change}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Supply Chain Intelligence</h2>
          <p className="text-gray-500 text-[13px] leading-relaxed mb-4">
            ScentDesk monitors fragrance supply chains across 8 major sourcing regions, tracking geopolitical risks, harvest conditions, and logistics disruptions that affect ingredient availability and pricing.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["Haiti (Vetiver)", "Madagascar (Vanilla)", "India (Sandalwood)", "Somalia (Frankincense)", "France (Lavender)", "Italy (Bergamot)", "Indonesia (Patchouli)", "Egypt (Geranium)"].map((region) => (
              <div key={region} className="bg-scent-surface rounded p-3 border border-scent-border text-center">
                <span className="text-[11px] text-gray-400">{region}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-scent-surface rounded-lg p-6 border border-scent-border text-center">
          <h3 className="text-lg font-bold text-white mb-2">Track Prices Live</h3>
          <p className="text-gray-500 text-[13px] mb-4">Access real-time pricing, historical charts, and supply chain alerts.</p>
          <Link href="/" className="inline-block px-6 py-2.5 bg-scent-accent/20 text-scent-accent border border-scent-accent/30 rounded-lg text-[13px] font-mono hover:bg-scent-accent/30 transition-colors">
            Open ScentDesk Terminal
          </Link>
        </div>
      </main>
    </div>
  );
}
