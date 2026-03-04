"use client";
import WidgetWrapper, { LiveBadge } from "./WidgetWrapper";

const buzzTopics = [
  { tag: "#NichePerfume", posts: "124K", change: "+32%", platform: "TikTok" },
  { tag: "#PerfumeTok", posts: "89K", change: "+18%", platform: "TikTok" },
  { tag: "#FragranceCollection", posts: "67K", change: "+12%", platform: "Instagram" },
  { tag: "#ScentOfTheDay", posts: "45K", change: "+8%", platform: "Instagram" },
  { tag: "#PerfumeReview", posts: "38K", change: "+15%", platform: "YouTube" },
  { tag: "#DupeFragrance", posts: "31K", change: "+45%", platform: "TikTok" },
  { tag: "#CleanPerfumery", posts: "22K", change: "+28%", platform: "Twitter" },
  { tag: "#OudLovers", posts: "19K", change: "+20%", platform: "Instagram" },
];

const influencerMentions = [
  { brand: "Maison Francis Kurkdjian", mentions: 8400, sentiment: 92 },
  { brand: "Parfums de Marly", mentions: 7200, sentiment: 88 },
  { brand: "Initio", mentions: 5100, sentiment: 85 },
  { brand: "Xerjoff", mentions: 4300, sentiment: 90 },
  { brand: "Amouage", mentions: 3800, sentiment: 87 },
];

const platformColors: Record<string, string> = {
  TikTok: "#ff0050",
  Instagram: "#c13584",
  YouTube: "#ff0000",
  Twitter: "#1da1f2",
};

export default function SocialBuzz() {
  return (
    <WidgetWrapper title="Social Buzz" badge={<LiveBadge />} info="Trending fragrance hashtags and brand mentions across TikTok, Instagram, YouTube, and X/Twitter this week.">
      <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-2">Trending Hashtags — This Week</div>
      <div className="space-y-1.5 mb-4">
        {buzzTopics.map((topic) => (
          <div key={topic.tag} className="flex items-center justify-between py-1 hover:bg-white/[0.02] rounded px-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: platformColors[topic.platform] }} />
              <span className="text-[12px] text-gray-200 font-mono">{topic.tag}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-gray-400">{topic.posts}</span>
              <span className="text-[10px] font-mono text-emerald-400">{topic.change}</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{
                background: `${platformColors[topic.platform]}20`,
                color: platformColors[topic.platform],
              }}>
                {topic.platform}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-2">Top Brand Mentions</div>
      <div className="space-y-2">
        {influencerMentions.map((brand) => (
          <div key={brand.brand}>
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[11px] text-gray-300 truncate">{brand.brand}</span>
              <span className="text-[10px] font-mono text-gray-400">{(brand.mentions / 1000).toFixed(1)}K mentions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-scent-bg rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${brand.sentiment}%`,
                    background: brand.sentiment > 90 ? "#34d399" : brand.sentiment > 85 ? "#c8a97e" : "#60a5fa",
                  }}
                />
              </div>
              <span className="text-[9px] font-mono text-gray-500">{brand.sentiment}% pos</span>
            </div>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}
