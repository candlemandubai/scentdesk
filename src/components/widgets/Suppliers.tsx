"use client";
import { useState } from "react";
import WidgetWrapper, { CountBadge } from "./WidgetWrapper";
import { ExternalLink, Building2, Globe, TrendingUp } from "lucide-react";

type HouseCategory = "all" | "major" | "niche" | "supplier" | "ingredient";

interface FragranceHouse {
  name: string;
  type: "major" | "niche" | "supplier" | "ingredient";
  hq: string;
  revenue?: string;
  speciality: string;
  url: string;
  brands?: string[];
}

const fragranceHouses: FragranceHouse[] = [
  { name: "Givaudan", type: "major", hq: "Vernier, Switzerland", revenue: "$7.1B", speciality: "Full-service fragrance & flavor house", url: "https://www.givaudan.com", brands: ["Fine Fragrance", "Consumer Products"] },
  { name: "dsm-firmenich", type: "major", hq: "Kaiseraugst, Switzerland", revenue: "$13.2B", speciality: "Nutrition, health, beauty", url: "https://www.dsm-firmenich.com", brands: ["Perfumery", "Taste & Beyond"] },
  { name: "IFF", type: "major", hq: "New York, USA", revenue: "$11.3B", speciality: "Scent, taste, nutrition", url: "https://www.iff.com", brands: ["Nourish", "Scent", "Health"] },
  { name: "Symrise", type: "major", hq: "Holzminden, Germany", revenue: "$4.6B", speciality: "Flavor, fragrance, nutrition", url: "https://www.symrise.com", brands: ["Scent & Care", "Flavor"] },
  { name: "Mane", type: "major", hq: "Le Bar-sur-Loup, France", revenue: "$2.1B", speciality: "Fragrance, flavor, ingredients", url: "https://www.mane.com", brands: ["Fine Fragrance", "Functional"] },
  { name: "Robertet", type: "supplier", hq: "Grasse, France", revenue: "$710M", speciality: "Natural raw materials specialist", url: "https://www.robertet.com", brands: ["Naturals", "Organic"] },
  { name: "Takasago", type: "major", hq: "Tokyo, Japan", revenue: "$1.8B", speciality: "Fragrance & flavor", url: "https://www.takasago.com", brands: ["Fragrance", "Flavor"] },
  { name: "Sensient", type: "ingredient", hq: "Milwaukee, USA", revenue: "$1.5B", speciality: "Colors, flavors, fragrances", url: "https://www.sensient.com" },
  { name: "Prolitec", type: "supplier", hq: "Baltimore, USA", speciality: "Ambient scenting solutions", url: "https://www.prolitec.com" },
  { name: "Albert Vieille", type: "supplier", hq: "Grasse, France", speciality: "Natural essential oils & absolutes", url: "https://www.albertvieille.com" },
  { name: "Biolandes", type: "supplier", hq: "Le Sen, France", speciality: "Organic & conventional essential oils", url: "https://www.biolandes.com" },
  { name: "Payan Bertrand", type: "supplier", hq: "Grasse, France", speciality: "Naturals, absolutes, concretes", url: "https://www.payanbertrand.com" },
  { name: "LVMH (Parfums)", type: "niche", hq: "Paris, France", revenue: "$86.2B*", speciality: "Dior, Givenchy, Guerlain, Kenzo", url: "https://www.lvmh.com", brands: ["Dior", "Guerlain", "Givenchy"] },
  { name: "Puig", type: "niche", hq: "Barcelona, Spain", revenue: "$4.3B", speciality: "Byredo, Penhaligon's, L'Artisan Parfumeur", url: "https://www.puig.com", brands: ["Byredo", "Penhaligon's"] },
  { name: "Kering (Beauté)", type: "niche", hq: "Paris, France", speciality: "Creed, Bottega Veneta, Balenciaga", url: "https://www.kering.com", brands: ["Creed", "Bottega Veneta"] },
  { name: "Estée Lauder", type: "niche", hq: "New York, USA", revenue: "$15.9B", speciality: "Le Labo, Jo Malone, Tom Ford", url: "https://www.elcompanies.com", brands: ["Le Labo", "Jo Malone", "Tom Ford"] },
];

const categoryLabels: Record<HouseCategory, string> = {
  all: "All",
  major: "Major Houses",
  niche: "Brand Groups",
  supplier: "Suppliers",
  ingredient: "Ingredient Cos.",
};

export default function Suppliers() {
  const [category, setCategory] = useState<HouseCategory>("all");
  const filtered = category === "all" ? fragranceHouses : fragranceHouses.filter((h) => h.type === category);

  return (
    <WidgetWrapper
      title="Suppliers & Houses"
      badge={<CountBadge count={fragranceHouses.length} />}
      info="Major fragrance houses, ingredient suppliers, and brand groups. Click any company to visit their website."
    >
      <div className="flex gap-1.5 mb-3 flex-wrap">
        {(Object.keys(categoryLabels) as HouseCategory[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`text-[10px] font-mono font-semibold px-2 py-1 rounded transition-colors ${
              category === cat
                ? "bg-scent-accent/20 text-scent-accent"
                : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
            }`}
          >
            {categoryLabels[cat].toUpperCase()}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((house) => (
          <a
            key={house.name}
            href={house.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block hover:bg-white/[0.02] rounded p-2 -mx-2 border border-transparent hover:border-scent-border/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-gradient-to-br from-scent-accent/20 to-scent-accent/5 flex items-center justify-center shrink-0">
                  <Building2 size={12} className="text-scent-accent" />
                </div>
                <div>
                  <span className="text-[12px] text-gray-200 font-medium group-hover:text-white transition-colors flex items-center gap-1.5">
                    {house.name}
                    <ExternalLink size={9} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-1 text-[9px] text-gray-500">
                      <Globe size={8} /> {house.hq}
                    </span>
                  </div>
                </div>
              </div>
              {house.revenue && (
                <span className="flex items-center gap-0.5 text-[10px] font-mono text-emerald-400 shrink-0">
                  <TrendingUp size={9} /> {house.revenue}
                </span>
              )}
            </div>
            <p className="text-[10px] text-gray-500 ml-9">{house.speciality}</p>
            {house.brands && (
              <div className="flex flex-wrap gap-1 ml-9 mt-1">
                {house.brands.map((b) => (
                  <span key={b} className="text-[8px] font-mono text-gray-500 bg-white/5 px-1.5 py-0.5 rounded">{b}</span>
                ))}
              </div>
            )}
          </a>
        ))}
      </div>
    </WidgetWrapper>
  );
}
