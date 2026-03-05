"use client";
import WidgetWrapper from "./WidgetWrapper";
import { ExternalLink, Instagram, Twitter, Youtube, Facebook } from "lucide-react";

interface SocialLink {
  type: "instagram" | "twitter" | "youtube" | "facebook";
  url: string;
}

interface AppLink {
  name: string;
  description: string;
  url: string;
  category: "community" | "reference" | "app" | "regulation" | "marketplace" | "software";
  icon: string;
  socials?: SocialLink[];
}

const apps: AppLink[] = [
  // Olfactal
  { name: "Olfactal", description: "Perfume Formulation Software", url: "https://olfactal.com", category: "software", icon: "O", socials: [
    { type: "instagram", url: "https://instagram.com/olfactal" },
  ]},

  // Community & Reviews
  { name: "Fragrantica", description: "World's largest fragrance database & reviews", url: "https://www.fragrantica.com", category: "community", icon: "F", socials: [
    { type: "instagram", url: "https://instagram.com/fragrantica" },
    { type: "youtube", url: "https://youtube.com/@fragrantica" },
    { type: "facebook", url: "https://facebook.com/fragrantica" },
  ]},
  { name: "Basenotes", description: "Fragrance community, forums & encyclopedia", url: "https://basenotes.com", category: "community", icon: "B", socials: [
    { type: "instagram", url: "https://instagram.com/basenotes" },
    { type: "youtube", url: "https://youtube.com/@basenotes" },
  ]},
  { name: "Parfumo", description: "Fragrance ratings, wardrobe & collection tracker", url: "https://www.parfumo.com", category: "community", icon: "P", socials: [
    { type: "instagram", url: "https://instagram.com/parfumo_com" },
  ]},

  // Apps
  { name: "Sniff", description: "Discover & track fragrances, get recommendations", url: "https://sniff.me", category: "app", icon: "S", socials: [
    { type: "instagram", url: "https://instagram.com/sniff.app" },
  ]},
  // Reference & Regulation
  { name: "IFRA", description: "International Fragrance Association — standards & safety", url: "https://ifrafragrance.org", category: "regulation", icon: "I" },
  { name: "The Good Scents Company", description: "Aroma chemical & ingredient data reference", url: "http://www.thegoodscentscompany.com", category: "reference", icon: "G" },

  // Marketplaces
  { name: "CandleStart", description: "Perfume & candle making materials (Dubai/GCC)", url: "https://candlestart.com", category: "marketplace", icon: "CS", socials: [
    { type: "instagram", url: "https://instagram.com/candlestart" },
  ]},
  { name: "Perfumer Supply House", description: "Raw materials & aroma chemicals supplier", url: "https://www.perfumersupplyhouse.com", category: "marketplace", icon: "PS", socials: [
    { type: "instagram", url: "https://instagram.com/perfumersupplyhouse" },
  ]},
  { name: "Pellwall Perfumes", description: "Raw materials & perfumery supplies (UK)", url: "https://www.pellwall.com", category: "marketplace", icon: "PW" },
];

const categoryColors: Record<string, string> = {
  community: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  reference: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  app: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  regulation: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  marketplace: "text-pink-400 bg-pink-400/10 border-pink-400/20",
  software: "text-scent-accent bg-scent-accent/10 border-scent-accent/20",
};

const iconColors: Record<string, string> = {
  community: "bg-blue-400/15 text-blue-400",
  reference: "bg-purple-400/15 text-purple-400",
  app: "bg-emerald-400/15 text-emerald-400",
  regulation: "bg-amber-400/15 text-amber-400",
  marketplace: "bg-pink-400/15 text-pink-400",
  software: "bg-scent-accent/15 text-scent-accent",
};

const socialIcons = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  facebook: Facebook,
};

export default function UsefulApps() {
  return (
    <WidgetWrapper title="Useful Apps & Resources" info="Curated tools, communities, and resources for fragrance professionals and enthusiasts.">
      <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1">
        {apps.map((app) => (
          <div
            key={app.name}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition-colors group"
          >
            <img
              src={`https://www.google.com/s2/favicons?domain=${new URL(app.url).hostname}&sz=32`}
              alt={app.name}
              width={32}
              height={32}
              className={`w-8 h-8 rounded-lg shrink-0 object-contain p-0.5 ${iconColors[app.category]}`}
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.display = 'none';
                const fallback = el.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className={`w-8 h-8 rounded-lg items-center justify-center text-[11px] font-mono font-bold shrink-0 hidden ${iconColors[app.category]}`}>
              {app.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] font-semibold text-white hover:text-scent-accent transition-colors"
                >
                  {app.name}
                </a>
                <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded border ${categoryColors[app.category]}`}>
                  {app.category}
                </span>
                {app.socials && (
                  <div className="flex items-center gap-1.5 ml-auto">
                    {app.socials.map((social) => {
                      const Icon = socialIcons[social.type];
                      return (
                        <a
                          key={social.type}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-scent-accent transition-colors"
                          title={social.type}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Icon size={11} />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
              <p className="text-[10px] text-gray-500 truncate">{app.description}</p>
            </div>
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-scent-accent transition-colors shrink-0"
            >
              <ExternalLink size={11} />
            </a>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}
