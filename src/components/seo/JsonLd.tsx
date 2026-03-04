export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ScentDesk",
    url: "https://scentdesk.com",
    logo: "https://scentdesk.com/logo.png",
    description:
      "The fragrance industry intelligence terminal. Real-time market data, raw material prices, trends, and insights for perfumers, brands, and enthusiasts.",
    sameAs: ["https://instagram.com/candlemandubai"],
    foundingDate: "2026",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebApplicationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ScentDesk",
    url: "https://scentdesk.com",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Real-time fragrance industry intelligence platform tracking perfume market size, raw material prices, IFRA regulatory updates, fragrance trends, new launches, and industry jobs.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Real-time fragrance market data and size tracking ($125B+ global market)",
      "Raw material and essential oil price index (Oud, Sandalwood, Rose, Bergamot)",
      "IFRA and EU regulatory compliance updates",
      "New fragrance launches and hype scores",
      "Fragrance industry jobs board (Givaudan, IFF, Symrise, Firmenich)",
      "Perfumery schools and education directory",
      "Home fragrance market tracking (candles, diffusers, room sprays)",
      "Consumer and seasonal trend analysis",
      "Social media buzz tracking (PerfumeTok, FragranceTok)",
      "Supply chain status monitoring",
      "Fragrance trade show and event calendar",
      "AI-powered market insights",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FAQJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function DatasetJsonLd({
  name,
  description,
  keywords,
}: {
  name: string;
  description: string;
  keywords: string[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name,
    description,
    keywords,
    creator: {
      "@type": "Organization",
      name: "ScentDesk",
    },
    temporalCoverage: "2024/..",
    isAccessibleForFree: true,
    license: "https://scentdesk.com/terms",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
