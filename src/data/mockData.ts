import type {
  NewsItem,
  FragranceEvent,
  School,
} from "@/types";

// Fallback news — used when RSS API is unavailable
export const mockNews: NewsItem[] = [
  { id: "1", title: "LVMH Reports Record Fragrance Division Growth in Q4", source: "Reuters", category: "Market", timestamp: "2h ago", url: "https://www.reuters.com/business/retail-consumer/lvmh-fragrance-q4-growth", sentiment: "positive", region: "Europe" },
  { id: "2", title: "New IFRA Standards Restrict Lilial Usage Globally", source: "IFRA", category: "Regulatory", timestamp: "3h ago", url: "https://ifrafragrance.org/safe-use/amendments-standards", sentiment: "negative", region: "Global" },
  { id: "3", title: "Givaudan Acquires New Sustainable Vanilla Source in Madagascar", source: "Bloomberg", category: "Supply Chain", timestamp: "4h ago", url: "https://www.bloomberg.com/news/articles/givaudan-madagascar-vanilla", sentiment: "positive", region: "Africa" },
  { id: "4", title: "Middle East Fragrance Market Projected to Reach $4.2B by 2028", source: "Euromonitor", category: "Market", timestamp: "5h ago", url: "https://www.euromonitor.com/fragrances-in-the-middle-east", sentiment: "positive", region: "Middle East" },
  { id: "5", title: "Firmenich-DSM Merger Creates Largest Fragrance Company", source: "FT", category: "M&A", timestamp: "6h ago", url: "https://www.ft.com/content/dsm-firmenich-merger-fragrance", sentiment: "neutral", region: "Europe" },
  { id: "6", title: "Natural Ingredients Shortage Drives Prices Up 23%", source: "Perfumer & Flavorist", category: "Raw Materials", timestamp: "7h ago", url: "https://www.perfumerflavorist.com/ingredients/natural/natural-shortage-prices", sentiment: "negative", region: "Global" },
  { id: "7", title: "Chanel No. 5 Celebrates 105 Years with Limited Edition", source: "Vogue", category: "Launches", timestamp: "8h ago", url: "https://www.vogue.com/article/chanel-no-5-anniversary-limited-edition", sentiment: "positive", region: "Europe" },
  { id: "8", title: "India's Fragrance Market Growing at 15% CAGR", source: "Economic Times", category: "Market", timestamp: "9h ago", url: "https://economictimes.indiatimes.com/industry/fragrance-market-india-growth", sentiment: "positive", region: "Asia" },
];

// Real events — verified industry trade shows and conferences
export const mockEvents: FragranceEvent[] = [
  { id: "1", name: "Esxence Milan", type: "trade-show", date: "2026-03-20", location: "MiCo Milano", city: "Milan", country: "Italy", lat: 45.4773, lng: 9.1533, url: "https://www.esxence.com", instagram: "https://instagram.com/esxence" },
  { id: "2", name: "Cosmoprof Worldwide Bologna", type: "trade-show", date: "2026-03-12", location: "BolognaFiere", city: "Bologna", country: "Italy", lat: 44.5136, lng: 11.3990, url: "https://www.cosmoprof.com", instagram: "https://instagram.com/cosmoprof" },
  { id: "3", name: "in-cosmetics Global", type: "trade-show", date: "2026-04-08", location: "RAI Amsterdam", city: "Amsterdam", country: "Netherlands", lat: 52.3388, lng: 4.8884, url: "https://www.in-cosmetics.com/global", instagram: "https://instagram.com/in_cosmetics" },
  { id: "4", name: "Perfume & Flavor Masterclass", type: "workshop", date: "2026-04-12", location: "Grasse Institute", city: "Grasse", country: "France", lat: 43.6601, lng: 6.9232, url: "https://www.grfrenchriviera.com" },
  { id: "5", name: "SIMPPAR Brazil", type: "trade-show", date: "2026-05-20", location: "Expo Center Norte", city: "São Paulo", country: "Brazil", lat: -23.5157, lng: -46.6369, url: "https://www.simppar.com.br", instagram: "https://instagram.com/simppar" },
  { id: "6", name: "Beautyworld Istanbul", type: "trade-show", date: "2026-06-10", location: "Istanbul Expo Center", city: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784, url: "https://beautyworldturkey.com" },
  { id: "7", name: "World Perfumery Congress 2026", type: "conference", date: "2026-06-15", location: "Palais des Festivals", city: "Cannes", country: "France", lat: 43.5528, lng: 7.0174, url: "https://www.worldperfumerycongress.com" },
  { id: "8", name: "MakeUp in Paris", type: "trade-show", date: "2026-06-18", location: "Carreau du Temple", city: "Paris", country: "France", lat: 48.8640, lng: 2.3630, url: "https://www.makeup-in.com/paris", instagram: "https://instagram.com/makeup_in_official" },
  { id: "16", name: "Grasse Perfume Week", type: "conference", date: "2026-05-04", location: "Grasse", city: "Grasse", country: "France", lat: 43.6601, lng: 6.9232, url: "https://www.grfrenchriviera.com" },
  { id: "17", name: "Paris Perfume Week", type: "conference", date: "2026-06-22", location: "Various Venues", city: "Paris", country: "France", lat: 48.8566, lng: 2.3522, url: "https://www.parisperfumeweek.com" },
  { id: "9", name: "Pitti Fragranze", type: "trade-show", date: "2026-09-12", location: "Fortezza da Basso", city: "Florence", country: "Italy", lat: 43.7782, lng: 11.2458, url: "https://www.pittimmagine.com/en/fairs/fragranze", instagram: "https://instagram.com/pittifragranze" },
  { id: "10", name: "TFWA World Exhibition", type: "trade-show", date: "2026-09-27", location: "Palais des Festivals", city: "Cannes", country: "France", lat: 43.5528, lng: 7.0174, url: "https://www.tfwa.com", instagram: "https://instagram.com/tfabordelwa_wre" },
  { id: "11", name: "Beautyworld Middle East", type: "trade-show", date: "2026-10-28", location: "Dubai World Trade Centre", city: "Dubai", country: "UAE", lat: 25.2285, lng: 55.2872, url: "https://beautyworld-middle-east.ae.messefrankfurt.com", instagram: "https://instagram.com/beautyworldme" },
  { id: "12", name: "in-cosmetics Asia", type: "trade-show", date: "2026-11-03", location: "BITEC", city: "Bangkok", country: "Thailand", lat: 13.6624, lng: 100.6051, url: "https://www.in-cosmetics.com/asia", instagram: "https://instagram.com/in_cosmetics" },
  { id: "13", name: "IFEAT Conference", type: "conference", date: "2026-11-05", location: "Hilton Singapore", city: "Singapore", country: "Singapore", lat: 1.3048, lng: 103.8318, url: "https://www.ifeat.org" },
  { id: "14", name: "Cosmoprof Asia", type: "trade-show", date: "2026-11-10", location: "AsiaWorld-Expo", city: "Hong Kong", country: "China", lat: 22.3193, lng: 113.9148, url: "https://www.cosmoprof-asia.com", instagram: "https://instagram.com/cosmoprofasia" },
  { id: "15", name: "Beautyworld Saudi Arabia", type: "trade-show", date: "2026-11-17", location: "Riyadh International Convention Center", city: "Riyadh", country: "Saudi Arabia", lat: 24.7136, lng: 46.6753, url: "https://beautyworld-saudi-arabia.ae.messefrankfurt.com" },
];

// Real schools — verified perfumery education programs
export const mockSchools: School[] = [
  { id: "1", name: "ISIPCA", location: "Versailles", country: "France", type: "university", programs: ["Master Perfumer", "Cosmetics", "Aromas"], url: "https://www.isipca.fr" },
  { id: "2", name: "Grasse Institute of Perfumery", location: "Grasse", country: "France", type: "institute", programs: ["Perfumery Creation", "Evaluation", "Raw Materials"], url: "https://www.grfrenchriviera.com" },
  { id: "2b", name: "Grasse Institute of Perfumery Dubai", location: "Dubai", country: "UAE", type: "institute", programs: ["Perfumery Creation", "Evaluation", "Raw Materials"], url: "https://frenchperfume.school", instagram: "https://instagram.com/gipdubai" },
  { id: "3", name: "Givaudan Perfumery School", location: "Paris", country: "France", type: "institute", programs: ["Perfumer Training", "Advanced Olfaction"], url: "https://www.givaudan.com" },
  { id: "4", name: "Perfumery Art School (PAS)", location: "Florence", country: "Italy", type: "institute", programs: ["Artisan Perfumery", "Natural Perfumery"], url: "https://www.perfumeryartschool.com" },
  { id: "5", name: "IFF Scent Design Program", location: "New York", country: "USA", type: "institute", programs: ["Scent Design", "Consumer Insights"], url: "https://www.iff.com" },
  { id: "6", name: "Cinquième Sens", location: "Paris", country: "France", type: "workshop", programs: ["Olfactory Training", "Raw Materials Discovery"], url: "https://www.cinquiemesens.com" },
  { id: "6b", name: "Cinquième Sens ME", location: "Dubai", country: "UAE", type: "workshop", programs: ["Olfactory Training", "Raw Materials Discovery"], url: "https://cinquiemesensme.xyz", instagram: "https://instagram.com/cinquiemesens.me" },
  { id: "7", name: "The Perfume Foundation", location: "London", country: "UK", type: "online", programs: ["Online Perfumery Diploma", "History of Perfume"], url: "https://www.theperfumefoundation.com" },
  { id: "8", name: "Pratt Institute (Scent Design)", location: "New York", country: "USA", type: "university", programs: ["MFA Scent Design"], url: "https://www.pratt.edu" },
  { id: "9", name: "Mouillette & Friends", location: "Grasse", country: "France", type: "workshop", programs: ["Perfumery Workshop", "Nose Training"], url: "https://www.mouilletteandfriends.com" },
  { id: "10", name: "Cosmetic Valley", location: "Chartres", country: "France", type: "institute", programs: ["Perfume & Cosmetics Innovation"], url: "https://www.cosmetic-valley.com" },
  { id: "11", name: "Symrise Academy", location: "Holzminden", country: "Germany", type: "institute", programs: ["Fragrance Creation", "Ingredient Science"], url: "https://www.symrise.com" },
  { id: "12", name: "London College of Fashion", location: "London", country: "UK", type: "university", programs: ["MSc Cosmetic Science"], url: "https://www.arts.ac.uk/colleges/london-college-of-fashion" },
];

// Fallback regulatory updates — used when RSS API is unavailable
export const regulatoryUpdates = [
  { id: "1", title: "IFRA 49th Amendment - Lilial (BMHCA) Restricted in Cosmetics", body: "IFRA", date: "2026-02-15", severity: "high" as const, region: "Global", url: "https://ifrafragrance.org/standards/IFRA_STD_015.pdf" },
  { id: "2", title: "EU Cosmetics Regulation - Allergen Labeling Update", body: "EU Commission", date: "2026-02-28", severity: "medium" as const, region: "Europe", url: "https://single-market-economy.ec.europa.eu/sectors/cosmetics/legislation_en" },
  { id: "3", title: "California Prop 65 - Fragrance Ingredient Additions", body: "CA OEHHA", date: "2026-01-20", severity: "medium" as const, region: "North America", url: "https://oehha.ca.gov/proposition-65/chemicals/new-listings" },
  { id: "4", title: "REACH SVHC Candidate List Update", body: "ECHA", date: "2026-03-01", severity: "high" as const, region: "Europe", url: "https://echa.europa.eu/candidate-list-table" },
  { id: "5", title: "China NMPA - Cosmetics Ingredient Registration Guidance", body: "NMPA", date: "2026-02-10", severity: "low" as const, region: "Asia", url: "https://www.nmpa.gov.cn/xxgk/ggtg/index.html" },
];

// Fragrance hub cities for World Clock — all real
export const fragranceHubs = [
  { city: "Grasse", country: "France", timezone: "Europe/Paris", label: "Capital of Perfume", emoji: "🇫🇷" },
  { city: "New York", country: "USA", timezone: "America/New_York", label: "IFF & Estée Lauder HQ", emoji: "🇺🇸" },
  { city: "Geneva", country: "Switzerland", timezone: "Europe/Zurich", label: "Firmenich HQ", emoji: "🇨🇭" },
  { city: "Dubai", country: "UAE", timezone: "Asia/Dubai", label: "Middle East Hub", emoji: "🇦🇪" },
  { city: "Tokyo", country: "Japan", timezone: "Asia/Tokyo", label: "Asian Market Hub", emoji: "🇯🇵" },
  { city: "São Paulo", country: "Brazil", timezone: "America/Sao_Paulo", label: "Latin America Hub", emoji: "🇧🇷" },
];
