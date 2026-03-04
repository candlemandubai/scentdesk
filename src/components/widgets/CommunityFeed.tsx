"use client";
import WidgetWrapper, { LiveBadge } from "./WidgetWrapper";
import { communityPosts } from "@/data/mockData";
import { Heart, MessageSquare, ExternalLink } from "lucide-react";

const platformColors: Record<string, string> = {
  reddit: "text-orange-400",
  fragrantica: "text-purple-400",
  basenotes: "text-blue-400",
  twitter: "text-sky-400",
};

export default function CommunityFeed() {
  return (
    <WidgetWrapper
      title="Community"
      badge={<LiveBadge />}
      info="Live posts from fragrance communities across Reddit, Fragrantica, Basenotes, and X/Twitter. Click any post to visit the thread."
    >
      <div className="space-y-3">
        {communityPosts.map((post) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-full bg-scent-border flex items-center justify-center text-[9px] font-bold text-gray-400">
                {post.author[0]}
              </div>
              <span className="text-[11px] font-semibold text-gray-300 group-hover:text-white transition-colors">{post.author}</span>
              <span className={`text-[9px] font-mono font-semibold ${platformColors[post.platform] || "text-gray-500"}`}>
                {post.platform.toUpperCase()}
              </span>
              <ExternalLink size={9} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-[10px] text-gray-600 ml-auto">{post.time}</span>
            </div>
            <p className="text-[12px] text-gray-400 leading-relaxed pl-7 group-hover:text-gray-300 transition-colors">
              {post.content}
            </p>
            <div className="flex items-center gap-3 pl-7 mt-1.5">
              <span className="flex items-center gap-1 text-[10px] text-gray-600">
                <Heart size={10} /> {post.likes}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-gray-600">
                <MessageSquare size={10} /> Reply
              </span>
            </div>
          </a>
        ))}
      </div>
    </WidgetWrapper>
  );
}
