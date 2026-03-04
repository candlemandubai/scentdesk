"use client";
import { useMonetization } from "@/hooks/useMonetization";
import { Megaphone } from "lucide-react";

export interface SponsoredItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  imageUrl?: string;
  cta: string;
  /** Which widget slot to show in: "brand-launches" | "suppliers" | "top-sellers" */
  slot: string;
}

// Admin-configurable sponsored listings
// In production, these would come from an API/CMS
const SPONSORED_ITEMS: SponsoredItem[] = [
  {
    id: "sp-1",
    title: "Givaudan Active Beauty",
    subtitle: "Discover the latest sustainable ingredients for your next creation",
    url: "https://www.givaudan.com/fragrance-beauty",
    cta: "Learn More",
    slot: "brand-launches",
  },
  {
    id: "sp-2",
    title: "Perfumer Supply House",
    subtitle: "Premium aroma chemicals & essential oils — 15% off first order",
    url: "https://perfumerssupplyhouse.com",
    cta: "Shop Now",
    slot: "suppliers",
  },
];

interface SponsoredCardProps {
  /** Which widget slot to filter by */
  slot: string;
}

/**
 * Renders a sponsored/promoted card when m-sponsored is enabled.
 * Insert this inside any widget that supports sponsored content.
 *
 * Usage: <SponsoredCard slot="brand-launches" />
 */
export default function SponsoredCard({ slot }: SponsoredCardProps) {
  const { isEnabled } = useMonetization("m-sponsored");

  if (!isEnabled) return null;

  const items = SPONSORED_ITEMS.filter((item) => item.slot === slot);
  if (items.length === 0) return null;

  // Show one random sponsored item per slot
  const item = items[Math.floor(Math.random() * items.length)];

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="block border border-scent-accent/20 bg-scent-accent/5 rounded-lg p-3 hover:bg-scent-accent/10 transition-colors group"
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <Megaphone size={9} className="text-scent-accent shrink-0" />
            <span className="text-[8px] font-mono text-scent-accent/70 uppercase tracking-wider">
              Sponsored
            </span>
          </div>
          <p className="text-[12px] font-mono font-semibold text-white group-hover:text-scent-accent transition-colors truncate">
            {item.title}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-2">
            {item.subtitle}
          </p>
        </div>
        <span className="text-[9px] font-mono font-bold text-scent-accent border border-scent-accent/30 px-2 py-1 rounded shrink-0 group-hover:bg-scent-accent group-hover:text-black transition-colors">
          {item.cta}
        </span>
      </div>
    </a>
  );
}

/**
 * Get all sponsored items for a slot (for admin display).
 */
export function getSponsoredItems(slot: string): SponsoredItem[] {
  return SPONSORED_ITEMS.filter((item) => item.slot === slot);
}
