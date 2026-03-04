import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Fragrance Ingredient Glossary — Essential Oils, Aroma Chemicals & Notes",
  description:
    "Complete glossary of fragrance ingredients, essential oils, and aroma chemicals. Learn about oud, ambroxan, ISO E Super, musk, vetiver, sandalwood, bergamot, and 200+ perfume ingredients used by professional perfumers.",
  keywords: [
    "fragrance ingredients",
    "perfume notes",
    "essential oils list",
    "aroma chemicals list",
    "oud fragrance",
    "ambroxan",
    "ISO E Super",
    "musk aroma chemical",
    "vetiver essential oil",
    "sandalwood fragrance",
    "bergamot essential oil",
    "jasmine absolute",
    "rose absolute",
    "perfume ingredient glossary",
    "fragrance raw materials guide",
    "perfumery notes explained",
    "top notes middle notes base notes",
  ],
  alternates: { canonical: "https://scentdesk.com/glossary" },
  openGraph: {
    title: "Fragrance Ingredient Glossary | ScentDesk",
    description: "Complete guide to 200+ fragrance ingredients — essential oils, aroma chemicals, and perfume notes.",
    url: "https://scentdesk.com/glossary",
  },
};

const ingredients = [
  { name: "Ambroxan", type: "Synthetic", family: "Amber/Woody", description: "Key molecule derived from ambergris. Used in Dior Sauvage and many modern fragrances. Warm, woody, amber character with excellent longevity." },
  { name: "Bergamot", type: "Natural", family: "Citrus", description: "Cold-pressed essential oil from Calabria, Italy. The defining note of Earl Grey tea. Fresh, bright, slightly floral citrus used in almost every cologne." },
  { name: "Cashmeran", type: "Synthetic", family: "Woody/Musky", description: "Warm, musky, woody molecule with a velvety, cashmere-like softness. Created by IFF. Found in Donna Karan Cashmere Mist." },
  { name: "Coumarin", type: "Synthetic", family: "Gourmand", description: "Sweet, hay-like, vanilla-adjacent molecule. Originally found in tonka beans. One of the most widely used materials in perfumery since Fougère Royale (1882)." },
  { name: "Frankincense", type: "Natural", family: "Resinous", description: "Ancient resin from Boswellia trees, sourced primarily from Somalia and Oman. Sacred, smoky, balsamic character used in incense and luxury fragrances." },
  { name: "Geranium", type: "Natural", family: "Floral/Green", description: "Essential oil from Egypt and Réunion. Rosy, minty, green character. A perfumer's rose substitute that adds natural freshness to compositions." },
  { name: "Hedione", type: "Synthetic", family: "Floral", description: "Revolutionary jasmine molecule created by Firmenich. Used in Eau Sauvage (1966). Transparent, radiant floral with diffusive properties." },
  { name: "ISO E Super", type: "Synthetic", family: "Woody", description: "Smooth, velvety cedar-like molecule. The sole ingredient in Molecule 01 by Escentric Molecules. Adds woody warmth and skin-scent quality." },
  { name: "Jasmine Absolute", type: "Natural", family: "Floral", description: "Extracted from Jasminum grandiflorum flowers, primarily from Grasse and India. Rich, sensual, indolic floral. One of the most expensive natural ingredients." },
  { name: "Lavender", type: "Natural", family: "Aromatic", description: "Essential oil from Lavandula angustifolia, primarily from France and Bulgaria. Clean, herbal, calming character. Foundation of fougère fragrances." },
  { name: "Musk (Synthetic)", type: "Synthetic", family: "Musky", description: "Various synthetic musks (Galaxolide, Habanolide, Ethylene Brassylate) replaced animal-derived musk. Soft, clean, skin-like character essential to modern perfumery." },
  { name: "Oud (Agarwood)", type: "Natural", family: "Woody/Animalic", description: "Resinous heartwood from infected Aquilaria trees. The most expensive natural fragrance material ($28,500/kg). Rich, complex, smoky, leather-like character central to Middle Eastern perfumery." },
  { name: "Patchouli", type: "Natural", family: "Woody/Earthy", description: "Essential oil from Indonesian patchouli leaves. Dark, earthy, rich character. Essential base note that improves with age. Key to chypre and oriental compositions." },
  { name: "Rose Absolute", type: "Natural", family: "Floral", description: "Extracted from Rosa damascena (Turkey, Bulgaria) or Rosa centifolia (Grasse). The queen of flowers in perfumery. Rich, honeyed, complex floral." },
  { name: "Sandalwood", type: "Natural", family: "Woody", description: "Precious oil from Santalum album (India) and Santalum spicatum (Australia). Creamy, warm, milky woody character with exceptional longevity." },
  { name: "Tonka Bean", type: "Natural", family: "Gourmand", description: "From Dipteryx odorata trees in Venezuela and Brazil. Rich coumarin-laden aroma: vanilla, caramel, almond, and warm hay character." },
  { name: "Vetiver", type: "Natural", family: "Woody/Earthy", description: "Essential oil from vetiver grass roots, sourced from Haiti, Java, and Réunion. Earthy, smoky, woody-green character. Haiti supply chain is currently critical." },
];

export default function GlossaryPage() {
  return (
    <div className="min-h-screen bg-scent-bg text-scent-text">
      <BreadcrumbJsonLd
        items={[
          { name: "ScentDesk", url: "https://scentdesk.com" },
          { name: "Glossary", url: "https://scentdesk.com/glossary" },
        ]}
      />

      <header className="border-b border-scent-border px-4 sm:px-8 py-6">
        <Link href="/" className="text-[13px] font-mono font-bold tracking-wider text-white hover:text-scent-accent transition-colors">
          SCENT<span className="text-scent-accent">DESK</span>
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Fragrance Ingredient Glossary
        </h1>
        <p className="text-gray-400 text-[15px] leading-relaxed mb-8 max-w-2xl">
          A comprehensive reference guide to essential oils, aroma chemicals, and natural ingredients used in professional perfumery. Learn about top, middle, and base notes.
        </p>

        <div className="space-y-6">
          {ingredients.map((ing) => (
            <article key={ing.name} className="border-b border-scent-border pb-4">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-[16px] font-bold text-white">{ing.name}</h2>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  ing.type === "Natural" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                }`}>{ing.type}</span>
                <span className="text-[10px] text-gray-500 font-mono">{ing.family}</span>
              </div>
              <p className="text-[13px] text-gray-400 leading-relaxed">{ing.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 bg-scent-surface rounded-lg p-6 border border-scent-border text-center">
          <h3 className="text-lg font-bold text-white mb-2">Track Ingredient Prices Live</h3>
          <p className="text-gray-500 text-[13px] mb-4">Monitor real-time pricing, supply chain status, and trending ingredients.</p>
          <Link href="/" className="inline-block px-6 py-2.5 bg-scent-accent/20 text-scent-accent border border-scent-accent/30 rounded-lg text-[13px] font-mono hover:bg-scent-accent/30 transition-colors">
            Open ScentDesk Terminal
          </Link>
        </div>
      </main>
    </div>
  );
}
