"use client";
import WidgetWrapper from "./WidgetWrapper";
import { Heart, Droplets, ExternalLink } from "lucide-react";

const fragrances = [
  {
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    year: 2015,
    family: "Amber Floral",
    topNotes: ["Saffron", "Jasmine"],
    heartNotes: ["Ambergris", "Cedar"],
    baseNotes: ["Fir Resin", "Musk"],
    occasion: "Evening / Special",
    season: "Fall & Winter",
    rating: 4.8,
    votes: 12400,
    url: "https://www.fragrantica.com/perfume/Maison-Francis-Kurkdjian/Baccarat-Rouge-540-33519.html",
  },
  {
    name: "Aventus",
    brand: "Creed",
    year: 2010,
    family: "Woody Fruity",
    topNotes: ["Pineapple", "Bergamot", "Apple"],
    heartNotes: ["Birch", "Jasmine", "Rose"],
    baseNotes: ["Musk", "Oakmoss", "Ambergris"],
    occasion: "Versatile / Office",
    season: "All Seasons",
    rating: 4.7,
    votes: 18200,
    url: "https://www.fragrantica.com/perfume/Creed/Aventus-9828.html",
  },
  {
    name: "Oud Wood",
    brand: "Tom Ford",
    year: 2007,
    family: "Woody Spicy",
    topNotes: ["Oud", "Rosewood", "Cardamom"],
    heartNotes: ["Sandalwood", "Vetiver"],
    baseNotes: ["Tonka Bean", "Amber"],
    occasion: "Evening / Formal",
    season: "Fall & Winter",
    rating: 4.6,
    votes: 9800,
    url: "https://www.fragrantica.com/perfume/Tom-Ford/Oud-Wood-1826.html",
  },
  {
    name: "Bleu de Chanel",
    brand: "Chanel",
    year: 2010,
    family: "Woody Aromatic",
    topNotes: ["Grapefruit", "Lemon", "Mint"],
    heartNotes: ["Ginger", "Nutmeg", "Jasmine"],
    baseNotes: ["Incense", "Cedar", "Sandalwood"],
    occasion: "Daily / Office",
    season: "All Seasons",
    rating: 4.5,
    votes: 22000,
    url: "https://www.fragrantica.com/perfume/Chanel/Bleu-de-Chanel-Eau-de-Parfum-25967.html",
  },
  {
    name: "Lost Cherry",
    brand: "Tom Ford",
    year: 2018,
    family: "Gourmand Fruity",
    topNotes: ["Cherry", "Almond"],
    heartNotes: ["Turkish Rose", "Jasmine"],
    baseNotes: ["Tonka Bean", "Sandalwood", "Vanilla"],
    occasion: "Evening / Date Night",
    season: "Fall & Winter",
    rating: 4.4,
    votes: 7600,
    url: "https://www.fragrantica.com/perfume/Tom-Ford/Lost-Cherry-52012.html",
  },
  {
    name: "La Nuit de L'Homme",
    brand: "Yves Saint Laurent",
    year: 2009,
    family: "Floral Spicy",
    topNotes: ["Cardamom", "Bergamot"],
    heartNotes: ["Lavender", "Cedar", "Virginian Cedar"],
    baseNotes: ["Vetiver", "Caraway"],
    occasion: "Evening / Romantic",
    season: "Spring & Fall",
    rating: 4.5,
    votes: 15300,
    url: "https://www.fragrantica.com/perfume/Yves-Saint-Laurent/La-Nuit-de-L-Homme-5521.html",
  },
  {
    name: "Tobacco Vanille",
    brand: "Tom Ford",
    year: 2007,
    family: "Oriental Spicy",
    topNotes: ["Tobacco", "Spicy Notes"],
    heartNotes: ["Vanilla", "Cacao", "Tonka Bean"],
    baseNotes: ["Dried Fruits", "Woody Notes"],
    occasion: "Evening / Winter",
    season: "Fall & Winter",
    rating: 4.6,
    votes: 11200,
    url: "https://www.fragrantica.com/perfume/Tom-Ford/Tobacco-Vanille-1825.html",
  },
];

function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default function FragranceOfTheDay() {
  const dayIndex = getDayOfYear() % fragrances.length;
  const frag = fragrances[dayIndex];

  return (
    <WidgetWrapper title="Fragrance of the Day" info="A daily spotlight on an iconic fragrance with notes breakdown, ratings, and occasion recommendations.">
      <a
        href={frag.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-rose-500/20 flex items-center justify-center shrink-0 border border-amber-500/20">
            <Droplets size={18} className="text-amber-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[14px] font-semibold text-white group-hover:text-scent-accent transition-colors">{frag.name}</span>
              <ExternalLink size={10} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-[11px] text-scent-accent font-mono">{frag.brand}</div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-gray-500">{frag.year}</span>
              <span className="text-[10px] text-gray-600">|</span>
              <span className="text-[10px] text-gray-500">{frag.family}</span>
            </div>
          </div>
          <div className="ml-auto text-right shrink-0">
            <div className="flex items-center gap-1 text-amber-400">
              <Heart size={10} fill="currentColor" />
              <span className="text-[12px] font-mono font-bold">{frag.rating}</span>
            </div>
            <div className="text-[9px] text-gray-600 font-mono">{(frag.votes / 1000).toFixed(1)}K votes</div>
          </div>
        </div>

        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-gray-600 uppercase w-10 shrink-0">TOP</span>
            <div className="flex flex-wrap gap-1">
              {frag.topNotes.map((n) => (
                <span key={n} className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{n}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-gray-600 uppercase w-10 shrink-0">MID</span>
            <div className="flex flex-wrap gap-1">
              {frag.heartNotes.map((n) => (
                <span key={n} className="px-1.5 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20">{n}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-gray-600 uppercase w-10 shrink-0">BASE</span>
            <div className="flex flex-wrap gap-1">
              {frag.baseNotes.map((n) => (
                <span key={n} className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20">{n}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-600 font-mono">OCCASION</span>
            <span className="text-gray-400">{frag.occasion}</span>
          </div>
          <span className="text-gray-700">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-gray-600 font-mono">SEASON</span>
            <span className="text-gray-400">{frag.season}</span>
          </div>
        </div>
      </a>
    </WidgetWrapper>
  );
}
