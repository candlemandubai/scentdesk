"use client";
import { useState } from "react";
import WidgetWrapper, { LiveBadge, CountBadge } from "./WidgetWrapper";
import { useLiveData } from "@/hooks/useLiveData";
import { RefreshCw, Users } from "lucide-react";

interface CommunityPost {
  id: string;
  title: string;
  community: string;
  platform: string;
  icon: string;
  tag: string;
  timestamp: string;
  pubDate: string;
  url: string;
  author: string;
}

interface CommunityResponse {
  posts: CommunityPost[];
  lastUpdated: string;
  count: number;
}

const TAG_COLORS: Record<string, string> = {
  SOTD: "bg-violet-500/20 text-violet-300",
  Recommend: "bg-blue-500/20 text-blue-300",
  Review: "bg-amber-500/20 text-amber-300",
  Collection: "bg-emerald-500/20 text-emerald-300",
  Deal: "bg-rose-500/20 text-rose-300",
  DIY: "bg-cyan-500/20 text-cyan-300",
  Candles: "bg-orange-500/20 text-orange-300",
  News: "bg-teal-500/20 text-teal-300",
  Swap: "bg-pink-500/20 text-pink-300",
  Discussion: "bg-gray-500/20 text-gray-400",
};

const PLATFORMS = ["all", "reddit"] as const;
type PlatformFilter = (typeof PLATFORMS)[number];

const fallback: CommunityResponse = { posts: [], lastUpdated: "", count: 0 };

export default function CommunityFeed() {
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("all");

  const { data, loading, refetch, isStale } = useLiveData<CommunityResponse>({
    url: "/api/community",
    refreshInterval: 180000, // 3 minutes
    fallbackData: fallback,
  });

  const posts = data.posts || [];
  const filtered = platformFilter === "all"
    ? posts
    : posts.filter((p) => p.platform === platformFilter);

  return (
    <WidgetWrapper
      title="Community"
      badge={<><LiveBadge /><CountBadge count={filtered.length} /></>}
      info="Live discussions from fragrance communities on Reddit. Pulls hot posts from r/fragrance, r/fragranceswap, r/Colognes, r/candlemaking, r/Perfumes, r/DIYfragrance, and r/indiemakeupandmore. Auto-refreshes every 3 minutes."
      headerRight={
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {PLATFORMS.map((p) => (
              <button
                key={p}
                onClick={() => setPlatformFilter(p)}
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded transition-colors ${
                  platformFilter === p
                    ? "bg-scent-accent/20 text-scent-accent"
                    : "text-gray-600 hover:text-gray-400"
                }`}
              >
                {p === "all" ? "All" : "Reddit"}
              </button>
            ))}
          </div>
          <button
            onClick={refetch}
            className={`text-gray-500 hover:text-gray-300 transition-colors ${isStale ? "animate-spin" : ""}`}
            title="Refresh"
          >
            <RefreshCw size={11} />
          </button>
        </div>
      }
    >
      {loading && posts.length === 0 && (
        <div className="flex items-center gap-2 py-2 mb-2 px-2 bg-scent-accent/5 rounded border border-scent-accent/10">
          <RefreshCw size={10} className="animate-spin text-scent-accent" />
          <span className="text-[10px] text-scent-accent font-mono">Loading community posts...</span>
        </div>
      )}

      <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
        {filtered.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-8 text-gray-600">
            <Users size={24} className="mb-2 opacity-30" />
            <p className="text-[11px] font-mono">No community posts available</p>
          </div>
        )}
        {filtered.slice(0, 20).map((post) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer block"
          >
            <div className="flex items-start gap-2">
              <span className="text-sm mt-0.5 shrink-0 leading-none">{post.icon}</span>
              <div className="min-w-0">
                <p className="text-[13px] text-gray-200 group-hover:text-white leading-tight transition-colors">
                  {post.title}
                </p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-[10px] font-mono text-scent-accent font-semibold">{post.community}</span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${TAG_COLORS[post.tag] || TAG_COLORS.Discussion}`}>
                    {post.tag}
                  </span>
                  <span className="text-[10px] text-gray-500">{post.timestamp}</span>
                  {post.author && (
                    <>
                      <span className="text-[10px] text-gray-600">·</span>
                      <span className="text-[10px] text-gray-600 truncate max-w-[100px]">{post.author}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {data.lastUpdated && (
        <div className="mt-3 pt-2 border-t border-scent-border text-[9px] font-mono text-gray-600">
          Last updated: {new Date(data.lastUpdated).toLocaleTimeString()}
        </div>
      )}
    </WidgetWrapper>
  );
}
