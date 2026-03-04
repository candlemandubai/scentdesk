import type {
  NewsItem,
  RawMaterial,
  MarketData,
  FragranceEvent,
  Job,
  School,
  HomeFragranceProduct,
} from "@/types";

export const mockNews: NewsItem[] = [
  { id: "1", title: "LVMH Reports Record Fragrance Division Growth in Q4", source: "Reuters", category: "Market", timestamp: "2h ago", url: "https://www.reuters.com/business/retail-consumer/lvmh-fragrance-q4-growth", sentiment: "positive", region: "Europe" },
  { id: "2", title: "New IFRA Standards Restrict Lilial Usage Globally", source: "IFRA", category: "Regulatory", timestamp: "3h ago", url: "https://ifrafragrance.org/safe-use/amendments-standards", sentiment: "negative", region: "Global" },
  { id: "3", title: "Givaudan Acquires New Sustainable Vanilla Source in Madagascar", source: "Bloomberg", category: "Supply Chain", timestamp: "4h ago", url: "https://www.bloomberg.com/news/articles/givaudan-madagascar-vanilla", sentiment: "positive", region: "Africa" },
  { id: "4", title: "Middle East Fragrance Market Projected to Reach $4.2B by 2028", source: "Euromonitor", category: "Market", timestamp: "5h ago", url: "https://www.euromonitor.com/fragrances-in-the-middle-east", sentiment: "positive", region: "Middle East" },
  { id: "5", title: "Firmenich-DSM Merger Creates Largest Fragrance Company", source: "FT", category: "M&A", timestamp: "6h ago", url: "https://www.ft.com/content/dsm-firmenich-merger-fragrance", sentiment: "neutral", region: "Europe" },
  { id: "6", title: "Natural Ingredients Shortage Drives Prices Up 23%", source: "Perfumer & Flavorist", category: "Raw Materials", timestamp: "7h ago", url: "https://www.perfumerflavorist.com/ingredients/natural/natural-shortage-prices", sentiment: "negative", region: "Global" },
  { id: "7", title: "Chanel No. 5 Celebrates 105 Years with Limited Edition", source: "Vogue", category: "Launches", timestamp: "8h ago", url: "https://www.vogue.com/article/chanel-no-5-anniversary-limited-edition", sentiment: "positive", region: "Europe" },
  { id: "8", title: "India's Fragrance Market Growing at 15% CAGR", source: "Economic Times", category: "Market", timestamp: "9h ago", url: "https://economictimes.indiatimes.com/industry/fragrance-market-india-growth", sentiment: "positive", region: "Asia" },
  { id: "9", title: "Synthetic Musk Alternatives Gain Traction After EU Review", source: "Chemical Watch", category: "Regulatory", timestamp: "10h ago", url: "https://chemicalwatch.com/eu-musk-alternatives-review", sentiment: "neutral", region: "Europe" },
  { id: "10", title: "Creed's New Owner Kering Expands to Asian Markets", source: "Business of Fashion", category: "Market", timestamp: "11h ago", url: "https://www.businessoffashion.com/articles/kering-creed-asia-expansion", sentiment: "positive", region: "Asia" },
  { id: "11", title: "Sandalwood Supply Crisis Deepens as India Limits Exports", source: "Spice & Herb Times", category: "Raw Materials", timestamp: "12h ago", url: "https://www.perfumerflavorist.com/ingredients/sandalwood-india-export-limits", sentiment: "negative", region: "Asia" },
  { id: "12", title: "AI-Designed Fragrances Challenge Traditional Perfumers", source: "Wired", category: "Tech", timestamp: "14h ago", url: "https://www.wired.com/story/ai-designed-fragrances-perfumery", sentiment: "neutral", region: "Global" },
];

export const mockRawMaterials: RawMaterial[] = [
  { id: "1", name: "Rose Absolute (Turkey)", category: "natural", price: 7200, unit: "$/kg", change24h: 2.3, change7d: 5.1, origin: "Turkey", supply: "tight" },
  { id: "2", name: "Oud Oil (Assam)", category: "natural", price: 28500, unit: "$/kg", change24h: -1.2, change7d: 3.8, origin: "India", supply: "critical" },
  { id: "3", name: "Lavender (France)", category: "essential-oil", price: 180, unit: "$/kg", change24h: 0.5, change7d: -1.2, origin: "France", supply: "normal" },
  { id: "4", name: "Bergamot (Italy)", category: "essential-oil", price: 320, unit: "$/kg", change24h: 1.8, change7d: 4.2, origin: "Italy", supply: "normal" },
  { id: "5", name: "ISO E Super", category: "aroma-chemical", price: 42, unit: "$/kg", change24h: 0.0, change7d: -0.5, origin: "Germany", supply: "abundant" },
  { id: "6", name: "Ambroxan", category: "synthetic", price: 185, unit: "$/kg", change24h: -0.3, change7d: 1.2, origin: "Switzerland", supply: "normal" },
  { id: "7", name: "Vetiver (Haiti)", category: "essential-oil", price: 420, unit: "$/kg", change24h: 3.5, change7d: 8.1, origin: "Haiti", supply: "tight" },
  { id: "8", name: "Sandalwood (Australia)", category: "natural", price: 2800, unit: "$/kg", change24h: 1.1, change7d: 6.5, origin: "Australia", supply: "tight" },
  { id: "9", name: "Vanilla Absolute", category: "natural", price: 3200, unit: "$/kg", change24h: -2.1, change7d: -4.3, origin: "Madagascar", supply: "tight" },
  { id: "10", name: "Linalool", category: "aroma-chemical", price: 18, unit: "$/kg", change24h: 0.2, change7d: 0.8, origin: "China", supply: "abundant" },
  { id: "11", name: "Jasmine Absolute", category: "natural", price: 5400, unit: "$/kg", change24h: 1.7, change7d: 3.2, origin: "Egypt", supply: "normal" },
  { id: "12", name: "Patchouli", category: "essential-oil", price: 95, unit: "$/kg", change24h: -0.8, change7d: 2.1, origin: "Indonesia", supply: "abundant" },
  { id: "13", name: "Hedione", category: "aroma-chemical", price: 65, unit: "$/kg", change24h: 0.1, change7d: -0.2, origin: "Germany", supply: "abundant" },
  { id: "14", name: "Musk Ketone", category: "synthetic", price: 210, unit: "$/kg", change24h: 0.0, change7d: -1.5, origin: "China", supply: "normal" },
  { id: "15", name: "Ylang Ylang Extra", category: "essential-oil", price: 480, unit: "$/kg", change24h: 2.2, change7d: 5.7, origin: "Comoros", supply: "tight" },
];

export const mockMarketData: MarketData[] = [
  { segment: "Fine Fragrance", value: 52.4, growth: 8.2, trend: "up" },
  { segment: "Home Fragrance", value: 12.8, growth: 11.5, trend: "up" },
  { segment: "Personal Care", value: 28.3, growth: 5.1, trend: "up" },
  { segment: "Raw Materials", value: 18.7, growth: 3.8, trend: "stable" },
  { segment: "Niche/Artisan", value: 8.9, growth: 15.3, trend: "up" },
  { segment: "Celebrity/Collab", value: 4.2, growth: -2.1, trend: "down" },
];

export const mockEvents: FragranceEvent[] = [
  { id: "1", name: "World Perfumery Congress 2026", type: "conference", date: "2026-06-15", location: "Palais des Festivals", city: "Cannes", country: "France", lat: 43.5528, lng: 7.0174, url: "https://www.worldperfumerycongress.com" },
  { id: "2", name: "Beautyworld Middle East", type: "trade-show", date: "2026-10-28", location: "Dubai World Trade Centre", city: "Dubai", country: "UAE", lat: 25.2285, lng: 55.2872, url: "https://beautyworld-middle-east.ae.messefrankfurt.com" },
  { id: "3", name: "SIMPPAR Brazil", type: "trade-show", date: "2026-05-20", location: "Expo Center Norte", city: "São Paulo", country: "Brazil", lat: -23.5157, lng: -46.6369, url: "https://www.simppar.com.br" },
  { id: "4", name: "in-cosmetics Global", type: "trade-show", date: "2026-04-08", location: "RAI Amsterdam", city: "Amsterdam", country: "Netherlands", lat: 52.3388, lng: 4.8884, url: "https://www.in-cosmetics.com/global" },
  { id: "5", name: "Esxence Milan", type: "trade-show", date: "2026-03-20", location: "MiCo Milano", city: "Milan", country: "Italy", lat: 45.4773, lng: 9.1533, url: "https://www.esxence.com" },
  { id: "6", name: "Perfume & Flavor Masterclass", type: "workshop", date: "2026-04-12", location: "Grasse Institute", city: "Grasse", country: "France", lat: 43.6601, lng: 6.9232, url: "https://www.grfrenchriviera.com" },
  { id: "7", name: "IFEAT Conference", type: "conference", date: "2026-11-05", location: "Hilton Singapore", city: "Singapore", country: "Singapore", lat: 1.3048, lng: 103.8318, url: "https://www.ifeat.org" },
  { id: "8", name: "Pitti Fragranze", type: "trade-show", date: "2026-09-12", location: "Fortezza da Basso", city: "Florence", country: "Italy", lat: 43.7782, lng: 11.2458, url: "https://www.pittimmagine.com/en/fairs/fragranze" },
  { id: "9", name: "TFWA World Exhibition", type: "trade-show", date: "2026-09-27", location: "Palais des Festivals", city: "Cannes", country: "France", lat: 43.5528, lng: 7.0174, url: "https://www.tfwa.com" },
];

export const mockJobs: Job[] = [
  { id: "1", title: "Senior Perfumer", company: "Givaudan", location: "Paris, France", type: "full-time", category: "perfumer", posted: "2d ago", salary: "$120K-160K", url: "https://www.givaudan.com/careers" },
  { id: "2", title: "Fragrance Evaluator", company: "IFF", location: "New York, USA", type: "full-time", category: "quality", posted: "3d ago", salary: "$85K-110K", url: "https://www.iff.com/careers" },
  { id: "3", title: "Raw Materials Buyer", company: "Firmenich", location: "Geneva, Switzerland", type: "full-time", category: "production", posted: "1d ago", salary: "CHF 90K-120K", url: "https://www.dsm-firmenich.com/careers.html" },
  { id: "4", title: "Marketing Manager - Luxury Fragrances", company: "LVMH", location: "Paris, France", type: "full-time", category: "marketing", posted: "5d ago", salary: "€70K-95K", url: "https://www.lvmh.com/join-us" },
  { id: "5", title: "R&D Scientist - Natural Ingredients", company: "Symrise", location: "Holzminden, Germany", type: "full-time", category: "research", posted: "1w ago", salary: "€65K-85K", url: "https://www.symrise.com/careers" },
  { id: "6", title: "Freelance Nose for Niche Brand", company: "Confidential", location: "Remote", type: "freelance", category: "perfumer", posted: "4d ago" },
  { id: "7", title: "Sales Director - Middle East", company: "Robertet", location: "Dubai, UAE", type: "full-time", category: "sales", posted: "2d ago", salary: "AED 35K-50K/mo", url: "https://www.robertet.com/careers" },
  { id: "8", title: "Junior Perfumer Trainee", company: "Mane", location: "Grasse, France", type: "full-time", category: "perfumer", posted: "6d ago", salary: "€35K-45K", url: "https://www.mane.com/careers" },
];

export const mockSchools: School[] = [
  { id: "1", name: "ISIPCA", location: "Versailles", country: "France", type: "university", programs: ["Master Perfumer", "Cosmetics", "Aromas"], url: "https://www.isipca.fr" },
  { id: "2", name: "Grasse Institute of Perfumery", location: "Grasse", country: "France", type: "institute", programs: ["Perfumery Creation", "Evaluation", "Raw Materials"], url: "https://www.grfrenchriviera.com" },
  { id: "3", name: "Givaudan Perfumery School", location: "Paris", country: "France", type: "institute", programs: ["Perfumer Training", "Advanced Olfaction"], url: "https://www.givaudan.com" },
  { id: "4", name: "Perfumery Art School (PAS)", location: "Florence", country: "Italy", type: "institute", programs: ["Artisan Perfumery", "Natural Perfumery"], url: "https://www.perfumeryartschool.com" },
  { id: "5", name: "IFF Scent Design Program", location: "New York", country: "USA", type: "institute", programs: ["Scent Design", "Consumer Insights"], url: "https://www.iff.com" },
  { id: "6", name: "Cinquième Sens", location: "Paris", country: "France", type: "workshop", programs: ["Olfactory Training", "Raw Materials Discovery"], url: "https://www.cinquiemesens.com" },
  { id: "7", name: "The Perfume Foundation", location: "London", country: "UK", type: "online", programs: ["Online Perfumery Diploma", "History of Perfume"], url: "https://www.theperfumefoundation.com" },
];

export const mockHomeFragrances: HomeFragranceProduct[] = [
  { id: "1", category: "candle", brand: "Diptyque", name: "Baies Candle", price: 72, rating: 4.8, trend: "stable", region: "Europe", url: "https://www.diptyqueparis.com" },
  { id: "2", category: "candle", brand: "Jo Malone", name: "Peony & Blush Suede", price: 69, rating: 4.7, trend: "rising", region: "Europe", url: "https://www.jomalone.com" },
  { id: "3", category: "candle", brand: "Boy Smells", name: "Hinoki Fantôme", price: 39, rating: 4.6, trend: "rising", region: "North America", url: "https://www.boysmells.com" },
  { id: "4", category: "diffuser", brand: "Aesop", name: "Ptolemy Aromatique", price: 120, rating: 4.5, trend: "rising", region: "Asia", url: "https://www.aesop.com" },
  { id: "5", category: "diffuser", brand: "Rituals", name: "Sakura Reed Diffuser", price: 32, rating: 4.4, trend: "stable", region: "Europe", url: "https://www.rituals.com" },
  { id: "6", category: "room-spray", brand: "Byredo", name: "Gypsy Water Room Spray", price: 85, rating: 4.6, trend: "rising", region: "Europe", url: "https://www.byredo.com" },
  { id: "7", category: "room-spray", brand: "P.F. Candle Co.", name: "Amber & Moss", price: 22, rating: 4.5, trend: "stable", region: "North America", url: "https://pfcandleco.com" },
  { id: "8", category: "wax-melt", brand: "Yankee Candle", name: "Clean Cotton Melts", price: 8, rating: 4.2, trend: "falling", region: "North America", url: "https://www.yankeecandle.com" },
  { id: "9", category: "incense", brand: "Nippon Kodo", name: "Morning Star Sandalwood", price: 12, rating: 4.7, trend: "rising", region: "Asia", url: "https://www.nipponkodo.co.jp/english" },
  { id: "10", category: "candle", brand: "Le Labo", name: "Santal 26 Candle", price: 82, rating: 4.9, trend: "rising", region: "North America", url: "https://www.lelabofragrances.com" },
];

export const fragranceHubs = [
  { city: "Grasse", country: "France", timezone: "Europe/Paris", label: "Capital of Perfume", emoji: "🇫🇷" },
  { city: "New York", country: "USA", timezone: "America/New_York", label: "IFF & Estée Lauder HQ", emoji: "🇺🇸" },
  { city: "Geneva", country: "Switzerland", timezone: "Europe/Zurich", label: "Firmenich HQ", emoji: "🇨🇭" },
  { city: "Dubai", country: "UAE", timezone: "Asia/Dubai", label: "Middle East Hub", emoji: "🇦🇪" },
  { city: "Tokyo", country: "Japan", timezone: "Asia/Tokyo", label: "Asian Market Hub", emoji: "🇯🇵" },
  { city: "São Paulo", country: "Brazil", timezone: "America/Sao_Paulo", label: "Latin America Hub", emoji: "🇧🇷" },
];

export const trendingIngredients = [
  { name: "Oud", score: 95, change: 3, direction: "up" as const, category: "Natural" },
  { name: "Ambroxan", score: 89, change: 7, direction: "up" as const, category: "Synthetic" },
  { name: "Iris/Orris", score: 87, change: -2, direction: "down" as const, category: "Natural" },
  { name: "Vetiver", score: 84, change: 5, direction: "up" as const, category: "Natural" },
  { name: "Molecule 01", score: 82, change: 1, direction: "up" as const, category: "Synthetic" },
  { name: "Saffron", score: 79, change: 12, direction: "up" as const, category: "Natural" },
  { name: "Tonka Bean", score: 76, change: -1, direction: "down" as const, category: "Natural" },
  { name: "Musk (White)", score: 74, change: 0, direction: "up" as const, category: "Synthetic" },
  { name: "Pink Pepper", score: 71, change: 8, direction: "up" as const, category: "Natural" },
  { name: "Agar", score: 68, change: 4, direction: "up" as const, category: "Natural" },
];

export const supplyChainData = [
  { region: "Grasse, France", status: "normal" as const, materials: ["Lavender", "Rose", "Jasmine"], risk: 15 },
  { region: "Madagascar", status: "tight" as const, materials: ["Vanilla", "Ylang Ylang", "Clove"], risk: 65 },
  { region: "India (Kannauj)", status: "tight" as const, materials: ["Sandalwood", "Vetiver", "Oud"], risk: 55 },
  { region: "Indonesia", status: "normal" as const, materials: ["Patchouli", "Vetiver", "Clove"], risk: 25 },
  { region: "Haiti", status: "critical" as const, materials: ["Vetiver"], risk: 82 },
  { region: "Egypt", status: "normal" as const, materials: ["Jasmine", "Geranium"], risk: 20 },
  { region: "Comoros Islands", status: "tight" as const, materials: ["Ylang Ylang"], risk: 60 },
  { region: "China", status: "normal" as const, materials: ["Linalool", "Menthol", "Camphor"], risk: 18 },
];

export const regulatoryUpdates = [
  { id: "1", title: "IFRA 49th Amendment - Lilial (BMHCA) Restricted in Cosmetics", body: "IFRA", date: "2026-02-15", severity: "high" as const, region: "Global", url: "https://ifrafragrance.org/standards/IFRA_STD_015.pdf" },
  { id: "2", title: "EU Cosmetics Regulation - Allergen Labeling Update", body: "EU Commission", date: "2026-02-28", severity: "medium" as const, region: "Europe", url: "https://single-market-economy.ec.europa.eu/sectors/cosmetics/legislation_en" },
  { id: "3", title: "California Prop 65 - Fragrance Ingredient Additions", body: "CA OEHHA", date: "2026-01-20", severity: "medium" as const, region: "North America", url: "https://oehha.ca.gov/proposition-65/chemicals/new-listings" },
  { id: "4", title: "REACH SVHC Candidate List Update", body: "ECHA", date: "2026-03-01", severity: "high" as const, region: "Europe", url: "https://echa.europa.eu/candidate-list-table" },
  { id: "5", title: "China NMPA - Cosmetics Ingredient Registration Guidance", body: "NMPA", date: "2026-02-10", severity: "low" as const, region: "Asia", url: "https://www.nmpa.gov.cn/xxgk/ggtg/index.html" },
];

export const seasonalTrendsData = {
  spring: { top: ["Floral", "Green", "Citrus", "Aquatic"], growth: 12 },
  summer: { top: ["Citrus", "Aquatic", "Coconut", "Tropical"], growth: 8 },
  autumn: { top: ["Woody", "Amber", "Spicy", "Gourmand"], growth: 15 },
  winter: { top: ["Oud", "Amber", "Vanilla", "Incense"], growth: 18 },
};

export const communityPosts = [
  { id: "1", author: "PerfumeAddict", content: "Just tested the new Maison Francis Kurkdjian — absolutely stunning sillage", time: "15m ago", likes: 24, platform: "reddit", url: "https://www.reddit.com/r/fragrance/comments/new_mfk_review" },
  { id: "2", author: "NoseTrainer", content: "Day 45 of training: finally can distinguish iso e super concentration levels", time: "32m ago", likes: 18, platform: "fragrantica", url: "https://www.fragrantica.com/board/viewtopic.php?id=iso-e-super-training" },
  { id: "3", author: "GrasseStudent", content: "Starting my second year at ISIPCA. Any tips from alumni?", time: "1h ago", likes: 42, platform: "basenotes", url: "https://www.basenotes.net/threads/isipca-second-year-tips.512847" },
  { id: "4", author: "NicheCollector", content: "Xerjoff Renaissance prediction: will the house pivot to sustainable naturals?", time: "2h ago", likes: 31, platform: "reddit", url: "https://www.reddit.com/r/fragrance/comments/xerjoff_sustainable_naturals" },
  { id: "5", author: "IndustryInsider", content: "Hearing rumors of a major acquisition in the niche space. Stay tuned.", time: "3h ago", likes: 67, platform: "twitter", url: "https://x.com/IndustryInsider/status/1897234567890" },
];
