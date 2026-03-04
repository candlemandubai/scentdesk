/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║                                                              ║
 * ║   Hey there, fellow code reader.                            ║
 * ║                                                              ║
 * ║   If you're poking around in here, you're our kind of       ║
 * ║   person. Welcome to ScentDesk — an open-source project     ║
 * ║   built for the fragrance community, by the fragrance       ║
 * ║   community.                                                 ║
 * ║                                                              ║
 * ║   We genuinely believe that making industry data accessible ║
 * ║   lifts everyone up — perfumers, brands, suppliers, and     ║
 * ║   enthusiasts alike. That's why this is open source.        ║
 * ║                                                              ║
 * ║   Want to contribute, collaborate, or just say hi?          ║
 * ║                                                              ║
 * ║   → hello@olfactal.com                                      ║
 * ║   → @candlemandubai on Instagram                            ║
 * ║   → candlestart.com | olfactal.com                          ║
 * ║                                                              ║
 * ║   Built with love from Dubai.                               ║
 * ║                                                              ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://scentdesk.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ScentDesk — Fragrance Industry Intelligence Terminal | Market Data & Trends",
    template: "%s | ScentDesk",
  },
  description:
    "Real-time fragrance industry intelligence platform. Track perfume market size ($125B+), raw material prices, IFRA regulatory updates, fragrance trends, new launches, and industry jobs. The Bloomberg Terminal for fragrance professionals.",
  keywords: [
    "fragrance market size",
    "perfume market trends",
    "fragrance industry analysis",
    "perfume industry report",
    "fragrance market data",
    "fragrance market forecast",
    "perfume trends 2026",
    "fragrance trends 2026",
    "niche perfume market",
    "essential oil prices",
    "aroma chemicals market",
    "fragrance ingredients market",
    "fragrance raw material pricing",
    "IFRA standards",
    "fragrance allergens EU",
    "fragrance regulatory compliance",
    "home fragrance market",
    "scented candle market",
    "reed diffuser market",
    "candle market size",
    "perfumer jobs",
    "fragrance industry jobs",
    "how to become a perfumer",
    "perfumery schools",
    "World Perfumery Congress",
    "fragrance trade shows",
    "fragrance supply chain",
    "clean fragrance",
    "sustainable perfume",
    "PerfumeTok",
    "fragrance industry intelligence",
    "perfume market share",
    "fragrance consumer trends",
    "fragrance industry statistics",
    "perfume industry data",
    "Givaudan",
    "IFF",
    "Symrise",
    "dsm-firmenich",
    "fragrance house",
    "raw materials prices",
    "oud oil price",
    "sandalwood oil price",
    "fragrance index",
  ],
  authors: [{ name: "ScentDesk", url: siteUrl }],
  creator: "ScentDesk",
  publisher: "ScentDesk",
  formatDetection: { email: false, telephone: false },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "ScentDesk",
    title: "ScentDesk — Fragrance Industry Intelligence Terminal",
    description:
      "Real-time fragrance market data, raw material prices, IFRA regulatory updates, perfume trends, new launches, and industry jobs. The #1 intelligence platform for fragrance professionals.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ScentDesk — Fragrance Industry Intelligence Terminal showing market data, trends, and real-time pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScentDesk — Fragrance Industry Intelligence Terminal",
    description:
      "Real-time fragrance market data, raw material prices, trends & regulatory updates. The Bloomberg Terminal for perfume professionals.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@candlemandubai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these once you have the actual verification codes
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  category: "Business & Finance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0f1a" />
      </head>
      <body className="bg-scent-bg text-scent-text antialiased">
        {children}
      </body>
    </html>
  );
}
