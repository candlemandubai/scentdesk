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

// Real events — verified industry trade shows and conferences (last cross-checked: Mar 2026)
export const mockEvents: FragranceEvent[] = [
  // MARCH
  { id: "cs1", name: "Cinquième Sens — Bakhoor Workshop", type: "workshop", date: "2026-03-04", location: "Villa 515", city: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708, url: "https://cinquiemesensme.xyz/gallery/", instagram: "https://instagram.com/cinquiemesens.me" },
  { id: "cs2", name: "Cinquième Sens — Fragrance Creation", type: "workshop", date: "2026-03-06", location: "Villa 515", city: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708, url: "https://cinquiemesensme.xyz/gallery/", instagram: "https://instagram.com/cinquiemesens.me" },
  { id: "cs3", name: "Cinquième Sens — Level 2 Advanced Course", type: "workshop", date: "2026-03-23", location: "Villa 515", city: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708, url: "https://cinquiemesensme.xyz/gallery/", instagram: "https://instagram.com/cinquiemesens.me" },
  { id: "2", name: "Cosmoprof Worldwide Bologna", type: "trade-show", date: "2026-03-26", location: "BolognaFiere", city: "Bologna", country: "Italy", lat: 44.5136, lng: 11.3990, url: "https://www.cosmoprof.com", instagram: "https://instagram.com/cosmoprof" },
  // APRIL
  { id: "cs4", name: "Cinquième Sens — Level 1 Intro to Perfumery", type: "workshop", date: "2026-04-01", location: "Villa 515", city: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708, url: "https://cinquiemesensme.xyz/gallery/", instagram: "https://instagram.com/cinquiemesens.me" },
  { id: "cs5", name: "Cinquième Sens — Bakhoor Workshop", type: "workshop", date: "2026-04-01", location: "Villa 515", city: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708, url: "https://cinquiemesensme.xyz/gallery/", instagram: "https://instagram.com/cinquiemesens.me" },
  { id: "17", name: "Paris Perfume Week", type: "conference", date: "2026-04-09", location: "Palais Brongniart", city: "Paris", country: "France", lat: 48.8693, lng: 2.3411, url: "https://www.perfume-week.com/en/" },
  { id: "3", name: "in-cosmetics Global", type: "trade-show", date: "2026-04-14", location: "Paris Expo Porte de Versailles", city: "Paris", country: "France", lat: 48.8322, lng: 2.2876, url: "https://www.in-cosmetics.com/global", instagram: "https://instagram.com/in_cosmetics" },
  // MAY
  { id: "6", name: "BEAUTYISTANBUL", type: "trade-show", date: "2026-05-07", location: "TÜYAP Fair Center", city: "Istanbul", country: "Turkey", lat: 41.0024, lng: 28.6220, url: "https://beauty-istanbul.com", instagram: "https://instagram.com/beautyistanbul_" },
  { id: "15", name: "Beautyworld Saudi Arabia", type: "trade-show", date: "2026-05-18", location: "Riyadh International Convention & Exhibition Center", city: "Riyadh", country: "Saudi Arabia", lat: 24.7136, lng: 46.6753, url: "https://beautyworld-saudi-arabia.ae.messefrankfurt.com" },
  { id: "5", name: "SIMPPAR Grasse", type: "trade-show", date: "2026-05-26", location: "Cours Honoré Cresp", city: "Grasse", country: "France", lat: 43.6601, lng: 6.9232, url: "https://www.simppar.fr/en/", instagram: "https://instagram.com/simppar_officiel" },
  // JUNE
  { id: "1", name: "Esxence Milan", type: "trade-show", date: "2026-06-03", location: "MiCo Milano", city: "Milan", country: "Italy", lat: 45.4773, lng: 9.1533, url: "https://www.esxence.com", instagram: "https://instagram.com/esxence" },
  { id: "8", name: "MakeUp in Paris", type: "trade-show", date: "2026-06-17", location: "Carrousel du Louvre", city: "Paris", country: "France", lat: 48.8614, lng: 2.3356, url: "https://www.makeup-in-paris.com/en/", instagram: "https://instagram.com/makeup_in_official" },
  { id: "7", name: "World Perfumery Congress 2026", type: "conference", date: "2026-06-23", location: "Monterey Conference Center", city: "Monterey", country: "USA", lat: 36.6002, lng: -121.8947, url: "https://www.worldperfumerycongress.com" },
  // SEPTEMBER
  { id: "9", name: "Pitti Fragranze", type: "trade-show", date: "2026-09-11", location: "Stazione Leopolda", city: "Florence", country: "Italy", lat: 43.7710, lng: 11.2390, url: "https://fragranze.pittimmagine.com", instagram: "https://instagram.com/pittifragranze" },
  { id: "10", name: "TFWA World Exhibition", type: "trade-show", date: "2026-09-27", location: "Palais des Festivals", city: "Cannes", country: "France", lat: 43.5528, lng: 7.0174, url: "https://www.tfwa.com" },
  // OCTOBER
  { id: "11", name: "Beautyworld Middle East", type: "trade-show", date: "2026-10-06", location: "Dubai World Trade Centre", city: "Dubai", country: "UAE", lat: 25.2285, lng: 55.2872, url: "https://beautyworld-middle-east.ae.messefrankfurt.com", instagram: "https://instagram.com/beautyworldme" },
  { id: "13", name: "IFEAT Conference", type: "conference", date: "2026-10-11", location: "Abu Dhabi", city: "Abu Dhabi", country: "UAE", lat: 24.4539, lng: 54.3773, url: "https://ifeat.org" },
  // NOVEMBER
  { id: "12", name: "in-cosmetics Asia", type: "trade-show", date: "2026-11-03", location: "BITEC", city: "Bangkok", country: "Thailand", lat: 13.6624, lng: 100.6051, url: "https://www.in-cosmetics.com/asia", instagram: "https://instagram.com/in_cosmetics" },
  { id: "14", name: "Cosmoprof Asia", type: "trade-show", date: "2026-11-11", location: "Hong Kong Convention & Exhibition Centre", city: "Hong Kong", country: "China", lat: 22.2824, lng: 114.1747, url: "https://www.cosmoprof-asia.com", instagram: "https://instagram.com/cosmoprofasia" },
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
  { id: "6c", name: "École Supérieure du Parfum", location: "Paris", country: "France", type: "university", programs: ["Bachelor Perfumer", "Master Perfumer", "Fragrance Marketing"], url: "http://en.ecole-parfum.com/" },
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
