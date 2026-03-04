"use client";
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import MarketTicker from "@/components/layout/MarketTicker";
import DashboardGrid from "@/components/layout/DashboardGrid";
import Footer from "@/components/layout/Footer";
import { OrganizationJsonLd, WebApplicationJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";
import { useAnalyticsStore } from "@/store/analyticsStore";
import { createEvent } from "@/lib/analytics";

const homeFaqs = [
  {
    question: "What is the global fragrance market size?",
    answer:
      "The global fragrance market is valued at over $125 billion in 2026, with a compound annual growth rate (CAGR) of 7%. Key segments include Fine Fragrance ($52B), Personal Care ($28B), Raw Materials ($18.7B), Home Fragrance ($12.7B), and Niche/Artisan ($8.9B).",
  },
  {
    question: "What are the biggest fragrance industry trends in 2026?",
    answer:
      "Top fragrance trends in 2026 include clean/natural fragrances (+12% growth), gender-neutral scents (+18%), niche discovery sets (+22%), oud and Middle Eastern influences (+15%), and layerable collections (+9%). PerfumeTok and social media continue to drive consumer discovery.",
  },
  {
    question: "What are IFRA standards for fragrances?",
    answer:
      "IFRA (International Fragrance Association) standards are safety guidelines that regulate the use of fragrance ingredients worldwide. They set maximum usage levels for ingredients based on scientific safety assessments, covering over 180 materials with specific limits by product category.",
  },
  {
    question: "How do I become a perfumer?",
    answer:
      "To become a perfumer, study at a recognized school such as ISIPCA (France), Grasse Institute of Perfumery, or Givaudan Perfumery School. Programs typically last 3-5 years. Key skills include olfactory training, knowledge of 1,500+ raw materials, and chemistry fundamentals. Entry-level positions include fragrance evaluator and junior perfumer.",
  },
  {
    question: "What are the top fragrance houses in the world?",
    answer:
      "The largest fragrance houses by revenue are Givaudan (CHF 7.1B), dsm-firmenich (€12.4B combined), IFF (International Flavors & Fragrances, $11.3B), Symrise (€4.7B), Mane SA (€1.9B), and Robertet (€700M). These companies create fragrances for major consumer brands worldwide.",
  },
  {
    question: "What is ScentDesk?",
    answer:
      "ScentDesk is a real-time fragrance industry intelligence terminal that provides market data, raw material prices, regulatory updates (IFRA, EU), trend analysis, new launches, industry jobs, events calendar, and AI-powered insights for perfumers, brands, and fragrance professionals.",
  },
];

export default function Home() {
  const { trackEvent } = useAnalyticsStore();

  useEffect(() => {
    trackEvent(createEvent("page_view"));
  }, [trackEvent]);

  return (
    <main className="min-h-screen bg-scent-bg">
      <OrganizationJsonLd />
      <WebApplicationJsonLd />
      <FAQJsonLd faqs={homeFaqs} />
      <Header />
      <MarketTicker />
      <DashboardGrid />
      <Footer />
    </main>
  );
}
