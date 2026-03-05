"use client";
import WidgetWrapper, { LiveBadge, CountBadge } from "./WidgetWrapper";
import { useLiveData } from "@/hooks/useLiveData";
import { RefreshCw, Play, Youtube } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  channel: string;
  videoId: string;
  thumbnail: string;
  url: string;
  tag: string;
  timestamp: string;
  pubDate: string;
}

interface YouTubeResponse {
  videos: VideoItem[];
  lastUpdated: string;
  count: number;
}

const TAG_COLORS: Record<string, string> = {
  Review: "bg-amber-500/20 text-amber-300",
  "Top List": "bg-violet-500/20 text-violet-300",
  Haul: "bg-emerald-500/20 text-emerald-300",
  Collection: "bg-blue-500/20 text-blue-300",
  "Blind Buy": "bg-rose-500/20 text-rose-300",
  Seasonal: "bg-cyan-500/20 text-cyan-300",
  Tutorial: "bg-teal-500/20 text-teal-300",
  Budget: "bg-green-500/20 text-green-300",
  Compliment: "bg-pink-500/20 text-pink-300",
  Versus: "bg-orange-500/20 text-orange-300",
  Video: "bg-gray-500/20 text-gray-400",
};

const fallback: YouTubeResponse = { videos: [], lastUpdated: "", count: 0 };

export default function YouTubeFeed() {
  const { data, loading, refetch, isStale } = useLiveData<YouTubeResponse>({
    url: "/api/youtube",
    refreshInterval: 300000, // 5 minutes
    fallbackData: fallback,
  });

  const videos = data.videos || [];

  return (
    <WidgetWrapper
      title="Fragrance YouTube"
      badge={<><LiveBadge /><CountBadge count={videos.length} /></>}
      info="Latest videos from top fragrance YouTubers — Jeremy Fragrance, Demi Rawling, CurlyFragrance, Redolessence, Brooklyn Fragrance Lover, Gents Scents, and more. Auto-refreshes every 5 minutes."
      headerRight={
        <button
          onClick={refetch}
          className={`text-gray-500 hover:text-gray-300 transition-colors ${isStale ? "animate-spin" : ""}`}
          title="Refresh"
        >
          <RefreshCw size={11} />
        </button>
      }
    >
      {loading && videos.length === 0 && (
        <div className="flex items-center gap-2 py-2 mb-2 px-2 bg-scent-accent/5 rounded border border-scent-accent/10">
          <RefreshCw size={10} className="animate-spin text-scent-accent" />
          <span className="text-[10px] text-scent-accent font-mono">Loading videos...</span>
        </div>
      )}

      <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
        {videos.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-8 text-gray-600">
            <Youtube size={24} className="mb-2 opacity-30" />
            <p className="text-[11px] font-mono">No videos available right now</p>
            <p className="text-[9px] text-gray-700 mt-1">YouTube feeds may be temporarily unavailable</p>
          </div>
        )}
        {videos.slice(0, 15).map((video) => (
          <a
            key={video.id}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer block"
          >
            <div className="flex gap-2.5">
              {/* Thumbnail */}
              {video.thumbnail ? (
                <div className="relative shrink-0 w-[120px] h-[68px] rounded overflow-hidden bg-gray-800">
                  <img
                    src={video.thumbnail}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={20} className="text-white fill-white" />
                  </div>
                  <div className="absolute bottom-0.5 right-0.5">
                    <Youtube size={10} className="text-red-500" />
                  </div>
                </div>
              ) : (
                <div className="shrink-0 w-[120px] h-[68px] rounded bg-gray-800 flex items-center justify-center">
                  <Youtube size={20} className="text-gray-600" />
                </div>
              )}
              {/* Info */}
              <div className="min-w-0 flex-1">
                <p className="text-[12px] text-gray-200 group-hover:text-white leading-tight transition-colors line-clamp-2">
                  {video.title}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  <span className="text-[10px] font-mono text-scent-accent font-semibold truncate max-w-[120px]">
                    {video.channel}
                  </span>
                  <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-full ${TAG_COLORS[video.tag] || TAG_COLORS.Video}`}>
                    {video.tag}
                  </span>
                </div>
                <span className="text-[9px] text-gray-500 mt-0.5 block">{video.timestamp}</span>
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
