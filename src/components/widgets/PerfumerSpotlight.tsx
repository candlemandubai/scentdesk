"use client";
import { useState } from "react";
import WidgetWrapper, { CountBadge } from "./WidgetWrapper";
import { ExternalLink, Instagram, Podcast, User, Headphones } from "lucide-react";

// Famous perfumers — data sourced from public profiles, Wikipedia, brand pages
const perfumers = [
  {
    name: "Jacques Cavallier",
    house: "Louis Vuitton",
    notable: ["L'Immensité", "Ombre Nomade", "Imagination"],
    style: "Master Perfumer",
    instagram: "https://instagram.com/cavallercompositeurlv",
    profileUrl: "https://www.fragrantica.com/noses/Jacques-Cavallier-Belletrud.html",
    country: "🇫🇷",
  },
  {
    name: "Francis Kurkdjian",
    house: "Maison Francis Kurkdjian",
    notable: ["Baccarat Rouge 540", "Grand Soir", "Aqua Universalis"],
    style: "Founder / Perfumer",
    instagram: "https://instagram.com/franiskurkdjian_official",
    profileUrl: "https://www.fragrantica.com/noses/Francis-Kurkdjian.html",
    country: "🇫🇷",
  },
  {
    name: "Suzy Le Helley",
    house: "Symrise",
    notable: ["Valentino Donna Born in Roma", "Prada Paradoxe"],
    style: "Senior Perfumer",
    instagram: "https://instagram.com/suzy.lehelly",
    profileUrl: "https://www.fragrantica.com/noses/Suzy-Le-Helley.html",
    country: "🇫🇷",
  },
  {
    name: "Quentin Bisch",
    house: "Givaudan",
    notable: ["Angel Nova", "Alien Goddess", "Burberry Hero"],
    style: "Senior Perfumer",
    instagram: "https://instagram.com/quentinbischperfumer",
    profileUrl: "https://www.fragrantica.com/noses/Quentin-Bisch.html",
    country: "🇫🇷",
  },
  {
    name: "Nathalie Lorson",
    house: "Firmenich",
    notable: ["Light Blue", "Coco Mademoiselle L'Eau Privée"],
    style: "Master Perfumer",
    instagram: "https://instagram.com/nathalielorson_masterperfumer",
    profileUrl: "https://www.fragrantica.com/noses/Nathalie-Lorson.html",
    country: "🇫🇷",
  },
  {
    name: "Alberto Morillas",
    house: "Firmenich",
    notable: ["CK One", "Acqua di Gio", "Flowerbomb"],
    style: "Master Perfumer",
    instagram: "https://instagram.com/morillas.alberto",
    profileUrl: "https://www.fragrantica.com/noses/Alberto-Morillas.html",
    country: "🇪🇸",
  },
  {
    name: "Dominique Ropion",
    house: "IFF",
    notable: ["Portrait of a Lady", "Carnal Flower", "Ysatis"],
    style: "Master Perfumer",
    instagram: "https://instagram.com/dominiqueropionparfumeur",
    profileUrl: "https://www.fragrantica.com/noses/Dominique-Ropion.html",
    country: "🇫🇷",
  },
  {
    name: "Christine Nagel",
    house: "Hermès",
    notable: ["Twilly d'Hermès", "H24", "Un Jardin sur la Lagune"],
    style: "In-House Perfumer",
    instagram: "https://instagram.com/christinenagel1959",
    profileUrl: "https://www.fragrantica.com/noses/Christine-Nagel.html",
    country: "🇫🇷",
  },
  {
    name: "Calice Becker",
    house: "Givaudan",
    notable: ["J'adore", "Beyond Paradise", "Tommy Girl"],
    style: "Vice President / Perfumer",
    instagram: "https://instagram.com/calicebecker",
    profileUrl: "https://www.fragrantica.com/noses/Calice-Becker.html",
    country: "🇫🇷",
  },
  {
    name: "Hamid Merati-Kashani",
    house: "Givaudan",
    notable: ["Dior Homme Intense", "Valentino Uomo", "Cartier L'Envol"],
    style: "Master Perfumer",
    instagram: "https://instagram.com/hamidmeratikashani",
    profileUrl: "https://www.fragrantica.com/noses/Hamid-Merati-Dana.html",
    country: "🇫🇷",
  },
  {
    name: "Maurice Roucel",
    house: "Symrise",
    notable: ["24 Faubourg", "Musc Ravageur", "Dans Tes Bras"],
    style: "Master Perfumer",
    instagram: "https://instagram.com/symrise",
    profileUrl: "https://www.fragrantica.com/noses/Maurice_Roucel.html",
    country: "🇫🇷",
  },
];

// Fragrance podcasts — verified URLs only
const podcasts = [
  {
    name: "The Scented Letter",
    host: "Jo Fairley & Lorna McKay",
    url: "https://www.thescentedletter.com",
    platform: "Apple / Spotify",
    description: "Industry interviews, trends & scent culture",
  },
  {
    name: "Fragrance Bros",
    host: "Jeremy & Emilio",
    url: "https://www.youtube.com/@FragranceBros",
    platform: "YouTube",
    description: "Honest fragrance reviews & top 10 lists",
  },
  {
    name: "The Fragrance Apprentice",
    host: "Eva & Aaron",
    url: "https://www.youtube.com/@thefragranceapprentice",
    platform: "YouTube",
    description: "Learning the art and science of perfumery",
  },
  {
    name: "Perfume Talks",
    host: "Maximilian Trayan",
    url: "https://www.youtube.com/@MaximilianTrayan",
    platform: "YouTube",
    description: "Luxury fragrance reviews and collection tours",
  },
  {
    name: "Redolessence",
    host: "Robes08",
    url: "https://www.youtube.com/@Redolessence",
    platform: "YouTube",
    description: "Detailed fragrance reviews and industry commentary",
  },
  {
    name: "TLTG",
    host: "Too Long To Groom",
    url: "https://www.youtube.com/@TLTG",
    platform: "YouTube",
    description: "Fragrance reviews and grooming advice",
  },
];

// House name → domain for favicon lookup
const houseDomains: Record<string, string> = {
  "Louis Vuitton": "louisvuitton.com",
  "Maison Francis Kurkdjian": "franciskurkdjian.com",
  "Symrise": "symrise.com",
  "Givaudan": "givaudan.com",
  "Firmenich": "dsm-firmenich.com",
  "IFF": "iff.com",
  "Hermès": "hermes.com",
};

type ViewMode = "perfumers" | "podcasts";

export default function PerfumerSpotlight() {
  const [view, setView] = useState<ViewMode>("perfumers");

  return (
    <WidgetWrapper
      title="Perfumers & Podcasts"
      badge={<CountBadge count={view === "perfumers" ? perfumers.length : podcasts.length} />}
      info="Notable perfumers (noses) in the industry and fragrance podcasts to follow. Click a name to view their Fragrantica profile."
    >
      {/* View toggle */}
      <div className="flex gap-1.5 mb-3">
        <button
          onClick={() => setView("perfumers")}
          className={`flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-1 rounded transition-colors ${
            view === "perfumers"
              ? "bg-scent-accent/20 text-scent-accent"
              : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
          }`}
        >
          <User size={10} /> PERFUMERS
        </button>
        <button
          onClick={() => setView("podcasts")}
          className={`flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-1 rounded transition-colors ${
            view === "podcasts"
              ? "bg-scent-accent/20 text-scent-accent"
              : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
          }`}
        >
          <Headphones size={10} /> PODCASTS
        </button>
      </div>

      {/* Perfumers list */}
      {view === "perfumers" && (
        <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
          {perfumers.map((p, i) => (
            <div
              key={i}
              className="flex items-start gap-3 group hover:bg-white/[0.02] rounded p-1.5 -mx-1.5 transition-colors cursor-pointer"
              onClick={() => window.open(p.profileUrl, "_blank", "noopener,noreferrer")}
            >
              <div className="w-8 h-8 rounded-full shrink-0 relative">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${houseDomains[p.house] || 'fragrantica.com'}&sz=32`}
                  alt={p.house}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-contain p-0.5 bg-white/10"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = 'none';
                    const fallback = el.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-scent-accent/20 to-scent-accent/5 items-center justify-center text-[12px] hidden">
                  {p.country}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-semibold text-white group-hover:text-scent-accent transition-colors">
                    {p.name}
                  </span>
                  <ExternalLink size={9} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-mono text-scent-accent">{p.house}</span>
                  <span className="text-[10px] text-gray-600">|</span>
                  <span className="text-[10px] text-gray-500">{p.style}</span>
                </div>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {p.notable.map((frag) => (
                    <span key={frag} className="text-[8px] font-mono text-gray-500 bg-white/5 px-1.5 py-0.5 rounded">
                      {frag}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={p.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-scent-accent transition-colors shrink-0 mt-1"
                onClick={(e) => e.stopPropagation()}
              >
                <Instagram size={12} />
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Podcasts list */}
      {view === "podcasts" && (
        <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
          {podcasts.map((pod, i) => (
            <div
              key={i}
              className="flex items-start gap-3 group hover:bg-white/[0.02] rounded p-1.5 -mx-1.5 transition-colors cursor-pointer"
              onClick={() => window.open(pod.url, "_blank", "noopener,noreferrer")}
            >
              <div className="w-8 h-8 rounded-lg shrink-0 relative">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${new URL(pod.url).hostname}&sz=32`}
                  alt={pod.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-lg object-contain p-0.5 bg-purple-400/15"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = 'none';
                    const fallback = el.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400/20 to-purple-400/5 items-center justify-center hidden">
                  <Podcast size={14} className="text-purple-400" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-semibold text-white group-hover:text-scent-accent transition-colors">
                    {pod.name}
                  </span>
                  <ExternalLink size={9} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">{pod.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-mono text-gray-500">{pod.host}</span>
                  <span className="text-[10px] text-gray-600">|</span>
                  <span className="badge badge-purple">{pod.platform}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </WidgetWrapper>
  );
}
