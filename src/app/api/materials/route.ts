import { NextResponse } from "next/server";

// Simulated real-time price fluctuations around base prices
// In production, these would come from commodity APIs like Quandl, Bloomberg, etc.
const baseMaterials = [
  { id: "1", name: "Rose Absolute (Turkey)", category: "natural" as const, basePrice: 7200, unit: "$/kg", origin: "Turkey", baseSupply: "tight" as const },
  { id: "2", name: "Oud Oil (Assam)", category: "natural" as const, basePrice: 28500, unit: "$/kg", origin: "India", baseSupply: "critical" as const },
  { id: "3", name: "Lavender (Provence)", category: "essential-oil" as const, basePrice: 180, unit: "$/kg", origin: "France", baseSupply: "normal" as const },
  { id: "4", name: "Bergamot (Calabria)", category: "essential-oil" as const, basePrice: 320, unit: "$/kg", origin: "Italy", baseSupply: "normal" as const },
  { id: "5", name: "ISO E Super", category: "aroma-chemical" as const, basePrice: 42, unit: "$/kg", origin: "Germany", baseSupply: "abundant" as const },
  { id: "6", name: "Ambroxan", category: "synthetic" as const, basePrice: 185, unit: "$/kg", origin: "Switzerland", baseSupply: "normal" as const },
  { id: "7", name: "Vetiver (Haiti)", category: "essential-oil" as const, basePrice: 420, unit: "$/kg", origin: "Haiti", baseSupply: "tight" as const },
  { id: "8", name: "Sandalwood (Australia)", category: "natural" as const, basePrice: 2800, unit: "$/kg", origin: "Australia", baseSupply: "tight" as const },
  { id: "9", name: "Vanilla Absolute (Madagascar)", category: "natural" as const, basePrice: 3200, unit: "$/kg", origin: "Madagascar", baseSupply: "tight" as const },
  { id: "10", name: "Linalool", category: "aroma-chemical" as const, basePrice: 18, unit: "$/kg", origin: "China", baseSupply: "abundant" as const },
  { id: "11", name: "Jasmine Absolute (Egypt)", category: "natural" as const, basePrice: 5400, unit: "$/kg", origin: "Egypt", baseSupply: "normal" as const },
  { id: "12", name: "Patchouli (Indonesia)", category: "essential-oil" as const, basePrice: 95, unit: "$/kg", origin: "Indonesia", baseSupply: "abundant" as const },
  { id: "13", name: "Hedione", category: "aroma-chemical" as const, basePrice: 65, unit: "$/kg", origin: "Germany", baseSupply: "abundant" as const },
  { id: "14", name: "Musk Ketone", category: "synthetic" as const, basePrice: 210, unit: "$/kg", origin: "China", baseSupply: "normal" as const },
  { id: "15", name: "Ylang Ylang Extra (Comoros)", category: "essential-oil" as const, basePrice: 480, unit: "$/kg", origin: "Comoros", baseSupply: "tight" as const },
  { id: "16", name: "Frankincense (Somalia)", category: "natural" as const, basePrice: 85, unit: "$/kg", origin: "Somalia", baseSupply: "normal" as const },
  { id: "17", name: "Neroli (Tunisia)", category: "essential-oil" as const, basePrice: 4800, unit: "$/kg", origin: "Tunisia", baseSupply: "tight" as const },
  { id: "18", name: "Geranium (Egypt)", category: "essential-oil" as const, basePrice: 220, unit: "$/kg", origin: "Egypt", baseSupply: "normal" as const },
  { id: "19", name: "Coumarin", category: "aroma-chemical" as const, basePrice: 28, unit: "$/kg", origin: "China", baseSupply: "abundant" as const },
  { id: "20", name: "Tonka Bean Absolute", category: "natural" as const, basePrice: 340, unit: "$/kg", origin: "Venezuela", baseSupply: "tight" as const },
];

function generateRealisticChange(basePrice: number, supply: string): { price: number; change24h: number; change7d: number } {
  // Use current time as seed for deterministic-ish but changing prices
  const hourSeed = Math.floor(Date.now() / 3600000);
  const daySeed = Math.floor(Date.now() / 86400000);

  // Volatile materials (tight/critical supply) fluctuate more
  const volatility = supply === "critical" ? 0.03 : supply === "tight" ? 0.02 : supply === "normal" ? 0.01 : 0.005;

  // Pseudo-random based on time seed
  const hash24h = Math.sin(hourSeed * 0.1 + basePrice * 0.001) * volatility;
  const hash7d = Math.sin(daySeed * 0.3 + basePrice * 0.002) * volatility * 3;

  const change24h = Math.round(hash24h * 1000) / 10;
  const change7d = Math.round(hash7d * 1000) / 10;
  const price = Math.round(basePrice * (1 + hash7d / 100) * 100) / 100;

  return { price, change24h, change7d };
}

export async function GET() {
  const materials = baseMaterials.map((mat) => {
    const { price, change24h, change7d } = generateRealisticChange(mat.basePrice, mat.baseSupply);
    return {
      id: mat.id,
      name: mat.name,
      category: mat.category,
      price,
      unit: mat.unit,
      change24h,
      change7d,
      origin: mat.origin,
      supply: mat.baseSupply,
    };
  });

  return NextResponse.json({
    materials,
    lastUpdated: new Date().toISOString(),
  });
}
