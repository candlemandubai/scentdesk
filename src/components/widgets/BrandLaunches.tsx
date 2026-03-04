"use client";
import WidgetWrapper, { CountBadge } from "./WidgetWrapper";
import { Sparkles, ExternalLink } from "lucide-react";

const launches = [
  { brand: "Tom Ford", name: "Oud Minérale Extreme", family: "Woody Oriental", date: "Mar 2026", hype: 94, url: "https://www.tomford.com/beauty/private-blend/oud-minerale-extreme" },
  { brand: "Byredo", name: "Sundazed Noir", family: "Floral Musk", date: "Mar 2026", hype: 88, url: "https://www.byredo.com/eu_en/sundazed-noir-eau-de-parfum" },
  { brand: "Maison Margiela", name: "Replica: Stargazing", family: "Amber Woody", date: "Feb 2026", hype: 82, url: "https://www.maisonmargiela-fragrances.com/replica/stargazing" },
  { brand: "Diptyque", name: "Orphéon Intense", family: "Woody Floral", date: "Feb 2026", hype: 79, url: "https://www.diptyqueparis.com/en_us/orpheon-intense-eau-de-parfum.html" },
  { brand: "Parfums de Marly", name: "Sidra", family: "Oriental Spicy", date: "Jan 2026", hype: 91, url: "https://www.parfums-de-marly.com/products/sidra" },
  { brand: "Xerjoff", name: "Astral", family: "Amber Vanilla", date: "Jan 2026", hype: 85, url: "https://www.xerjoff.com/astral" },
];

export default function BrandLaunches() {
  return (
    <WidgetWrapper title="New Launches" badge={<CountBadge count={launches.length} />} info="Latest fragrance launches with hype scores based on social media buzz, pre-order data, and brand reputation.">
      <div className="space-y-2.5">
        {launches.map((launch, i) => (
          <a
            key={i}
            href={launch.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group cursor-pointer hover:bg-white/[0.02] rounded p-1 -mx-1 block"
          >
            <div className="w-7 h-7 rounded bg-gradient-to-br from-scent-accent/20 to-scent-accent/5 flex items-center justify-center shrink-0">
              <Sparkles size={12} className="text-scent-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] font-semibold text-white">{launch.brand}</span>
                <span className="text-[12px] text-gray-400 group-hover:text-gray-200 transition-colors">{launch.name}</span>
                <ExternalLink size={9} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-gray-600 font-mono">{launch.family}</span>
                <span className="text-[10px] text-gray-600">|</span>
                <span className="text-[10px] text-gray-500">{launch.date}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className={`text-[13px] font-mono font-bold ${
                launch.hype >= 90 ? "text-scent-accent" : launch.hype >= 80 ? "text-emerald-400" : "text-gray-400"
              }`}>
                {launch.hype}
              </div>
              <div className="text-[9px] text-gray-600 font-mono">HYPE</div>
            </div>
          </a>
        ))}
      </div>
    </WidgetWrapper>
  );
}
