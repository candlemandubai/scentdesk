import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Fragrance Events, Trade Shows & Industry Jobs 2026",
  description:
    "Complete calendar of fragrance industry events, trade shows, and conferences for 2026. World Perfumery Congress, Esxence, Beautyworld, TFWA, in-cosmetics. Plus perfumer jobs at Givaudan, IFF, Symrise, and more.",
  keywords: [
    "fragrance trade shows 2026",
    "World Perfumery Congress",
    "Esxence Milan",
    "Beautyworld Middle East",
    "TFWA World Exhibition",
    "in-cosmetics Global",
    "Pitti Fragranze",
    "fragrance events",
    "perfume exhibitions",
    "cosmetics trade shows 2026",
    "perfumer jobs",
    "fragrance jobs",
    "how to become a perfumer",
    "perfumery schools",
    "ISIPCA",
    "Grasse Institute of Perfumery",
    "perfumer salary",
    "fragrance industry careers",
  ],
  alternates: { canonical: "https://scentdesk.com/events" },
  openGraph: {
    title: "Fragrance Events & Industry Jobs 2026 | ScentDesk",
    description: "Complete fragrance industry event calendar and job board. Trade shows, conferences, perfumer positions, and education.",
    url: "https://scentdesk.com/events",
  },
};

const eventFaqs = [
  {
    question: "What are the major fragrance trade shows in 2026?",
    answer: "The major fragrance trade shows in 2026 include Esxence Milan (March), in-cosmetics Global Amsterdam (April), SIMPPAR Brazil (May), World Perfumery Congress Cannes (June), Pitti Fragranze Florence (September), TFWA World Exhibition Cannes (September), Beautyworld Middle East Dubai (October), and IFEAT Conference Singapore (November).",
  },
  {
    question: "How do I become a perfumer?",
    answer: "To become a perfumer, study at a recognized perfumery school such as ISIPCA (Versailles, France), Grasse Institute of Perfumery (France), or Givaudan Perfumery School (Paris). Programs typically last 3-5 years. Key skills include olfactory training with 1,500+ raw materials, chemistry fundamentals, and creative composition. Entry-level roles include fragrance evaluator and junior perfumer, with starting salaries of $50K-80K depending on location.",
  },
  {
    question: "What is the average perfumer salary?",
    answer: "Perfumer salaries vary by experience and location. Junior perfumers earn $45K-80K, mid-level perfumers $80K-120K, and senior perfumers at top fragrance houses (Givaudan, IFF, Symrise) can earn $120K-200K+. Master perfumers at major houses may earn $200K-500K+ including bonuses.",
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-scent-bg text-scent-text">
      <BreadcrumbJsonLd
        items={[
          { name: "ScentDesk", url: "https://scentdesk.com" },
          { name: "Events & Jobs", url: "https://scentdesk.com/events" },
        ]}
      />
      <FAQJsonLd faqs={eventFaqs} />

      <header className="border-b border-scent-border px-4 sm:px-8 py-6">
        <Link href="/" className="text-[13px] font-mono font-bold tracking-wider text-white hover:text-scent-accent transition-colors">
          SCENT<span className="text-scent-accent">DESK</span>
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Fragrance Events, Trade Shows & Industry Jobs 2026
        </h1>
        <p className="text-gray-400 text-[15px] leading-relaxed mb-8 max-w-2xl">
          Complete calendar of fragrance industry events, perfumer job opportunities, and education programs for 2026.
        </p>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">2026 Fragrance Event Calendar</h2>
          <div className="space-y-3">
            {[
              { name: "Esxence Milan", date: "March 20, 2026", location: "Milan, Italy", type: "Trade Show" },
              { name: "in-cosmetics Global", date: "April 8, 2026", location: "Amsterdam, Netherlands", type: "Trade Show" },
              { name: "Perfume & Flavor Masterclass", date: "April 12, 2026", location: "Grasse, France", type: "Workshop" },
              { name: "SIMPPAR Brazil", date: "May 20, 2026", location: "São Paulo, Brazil", type: "Trade Show" },
              { name: "World Perfumery Congress", date: "June 15, 2026", location: "Cannes, France", type: "Conference" },
              { name: "Pitti Fragranze", date: "September 12, 2026", location: "Florence, Italy", type: "Trade Show" },
              { name: "TFWA World Exhibition", date: "September 27, 2026", location: "Cannes, France", type: "Trade Show" },
              { name: "Beautyworld Middle East", date: "October 28, 2026", location: "Dubai, UAE", type: "Trade Show" },
              { name: "IFEAT Conference", date: "November 5, 2026", location: "Singapore", type: "Conference" },
            ].map((event) => (
              <div key={event.name} className="flex items-center justify-between py-3 border-b border-scent-border">
                <div>
                  <div className="text-[14px] text-white font-semibold">{event.name}</div>
                  <div className="text-[12px] text-gray-500">{event.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-[12px] font-mono text-gray-400">{event.date}</div>
                  <div className="text-[10px] text-scent-accent">{event.type}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Top Perfumery Schools & Programs</h2>
          <div className="space-y-3">
            {[
              { name: "ISIPCA", location: "Versailles, France", programs: "Master Perfumer, Cosmetics, Aromas" },
              { name: "Grasse Institute of Perfumery", location: "Grasse, France", programs: "Perfumery Creation, Evaluation" },
              { name: "Givaudan Perfumery School", location: "Paris, France", programs: "Perfumer Training, Olfaction" },
              { name: "Cinquième Sens", location: "Paris, France", programs: "Olfactory Training, Raw Materials" },
              { name: "IFF Scent Design Program", location: "New York, USA", programs: "Scent Design, Consumer Insights" },
            ].map((school) => (
              <div key={school.name} className="flex items-center justify-between py-3 border-b border-scent-border">
                <div>
                  <div className="text-[14px] text-white">{school.name}</div>
                  <div className="text-[12px] text-gray-500">{school.location}</div>
                </div>
                <div className="text-[11px] text-gray-400 text-right max-w-[200px]">{school.programs}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-scent-surface rounded-lg p-6 border border-scent-border text-center">
          <h3 className="text-lg font-bold text-white mb-2">Browse Jobs & Events Live</h3>
          <p className="text-gray-500 text-[13px] mb-4">See open perfumer positions, event countdowns, and school details.</p>
          <Link href="/" className="inline-block px-6 py-2.5 bg-scent-accent/20 text-scent-accent border border-scent-accent/30 rounded-lg text-[13px] font-mono hover:bg-scent-accent/30 transition-colors">
            Open ScentDesk Terminal
          </Link>
        </div>
      </main>
    </div>
  );
}
