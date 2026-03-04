"use client";
import { useState, useEffect } from "react";
import WidgetWrapper, { LiveBadge } from "./WidgetWrapper";

const insights = [
  {
    category: "MARKET BRIEF",
    text: "Global fragrance market continues strong momentum into 2026, driven by premiumization in emerging markets and the rise of niche/artisan brands. The Middle East and Asian markets are showing above-average growth rates, with Gen Z consumers driving demand for unique, personal scent signatures.",
  },
  {
    category: "SUPPLY ALERT",
    text: "Haitian vetiver supply chain remains under severe strain due to political instability. Prices have surged 8.1% in the past week. Alternative sourcing from Java and Réunion unable to meet quality standards required by major houses. Expect continued volatility.",
  },
  {
    category: "TREND WATCH",
    text: "Oud continues its dominance in fine fragrance, now scoring 95 on the trending index. However, a notable shift toward sustainable and synthetic oud alternatives (like Javanol and Clearwood) is emerging among European brands responding to ESG pressures.",
  },
  {
    category: "REGULATORY IMPACT",
    text: "The IFRA 51st Amendment restricting Lilial will force reformulation of an estimated 2,000+ fragrances globally. Houses with large legacy portfolios face the highest compliance costs. Early movers who reformulated in 2024-2025 have a competitive advantage.",
  },
];

export default function AIInsights() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % insights.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const insight = insights[currentIndex];

  return (
    <WidgetWrapper title="AI Insights" badge={<LiveBadge />} info="AI-generated market insights covering supply alerts, sentiment analysis, and trend predictions for the fragrance industry.">
      <div className="space-y-3">
        <div className="badge badge-gold">{insight.category}</div>
        <p className="text-[13px] text-gray-300 leading-relaxed">{insight.text}</p>
        <div className="flex gap-1 mt-3">
          {insights.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1 rounded-full transition-all ${
                i === currentIndex ? "w-6 bg-scent-accent" : "w-2 bg-scent-border hover:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-scent-border">
        <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-2">Market Sentiment</div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="h-2 bg-scent-bg rounded-full overflow-hidden flex">
              <div className="h-full bg-emerald-400" style={{ width: "62%" }} />
              <div className="h-full bg-gray-500" style={{ width: "24%" }} />
              <div className="h-full bg-red-400" style={{ width: "14%" }} />
            </div>
          </div>
          <div className="flex gap-3 text-[10px] font-mono">
            <span className="text-emerald-400">62%</span>
            <span className="text-gray-500">24%</span>
            <span className="text-red-400">14%</span>
          </div>
        </div>
        <div className="flex justify-between text-[9px] text-gray-600 mt-1">
          <span>Bullish</span>
          <span>Neutral</span>
          <span>Bearish</span>
        </div>
      </div>
    </WidgetWrapper>
  );
}
