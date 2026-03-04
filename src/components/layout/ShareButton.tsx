"use client";
import { useState, useCallback } from "react";
import { Share2, Copy, Check, Twitter, MessageCircle, Link2 } from "lucide-react";

interface ShareButtonProps {
  /** What's being shared — shown in share dialog */
  title?: string;
  /** Share text */
  text?: string;
  /** URL to share */
  url?: string;
  /** Compact mode for widget headers */
  compact?: boolean;
}

/**
 * Universal share button with Web Share API fallback.
 * Uses native share on mobile, custom dropdown on desktop.
 */
export default function ShareButton({
  title = "ScentDesk — Fragrance Industry Intelligence",
  text = "Real-time fragrance market data, raw material prices, trends & AI insights. The Bloomberg Terminal for perfumers.",
  url,
  compact = false,
}: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "https://scentdesk.app");

  const handleShare = useCallback(async () => {
    // Try native Web Share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
        return;
      } catch {
        // User cancelled or not supported — fall through to menu
      }
    }
    // Desktop fallback — show menu
    setShowMenu((prev) => !prev);
  }, [title, text, shareUrl]);

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => { setCopied(false); setShowMenu(false); }, 1500);
  }, [shareUrl]);

  const shareToTwitter = useCallback(() => {
    const tweetText = encodeURIComponent(`${text}\n\n${shareUrl}`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, "_blank");
    setShowMenu(false);
  }, [text, shareUrl]);

  const shareToWhatsApp = useCallback(() => {
    const waText = encodeURIComponent(`${title}\n${text}\n${shareUrl}`);
    window.open(`https://wa.me/?text=${waText}`, "_blank");
    setShowMenu(false);
  }, [title, text, shareUrl]);

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className={`flex items-center gap-1.5 transition-colors ${
          compact
            ? "text-gray-500 hover:text-gray-300 p-1"
            : "text-gray-500 hover:text-scent-accent text-[10px] font-mono font-semibold px-2 py-1 rounded hover:bg-white/5"
        }`}
        title="Share"
      >
        <Share2 size={compact ? 12 : 11} />
        {!compact && <span>SHARE</span>}
      </button>

      {showMenu && (
        <div className="absolute right-0 top-full mt-1 bg-scent-card border border-scent-border rounded-lg shadow-xl z-50 min-w-[200px] animate-slide-up">
          <div className="p-2 space-y-0.5">
            <button
              onClick={copyLink}
              className="w-full flex items-center gap-2 px-3 py-2 text-[12px] font-mono text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <button
              onClick={shareToTwitter}
              className="w-full flex items-center gap-2 px-3 py-2 text-[12px] font-mono text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors"
            >
              <Twitter size={14} />
              Share on X
            </button>
            <button
              onClick={shareToWhatsApp}
              className="w-full flex items-center gap-2 px-3 py-2 text-[12px] font-mono text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors"
            >
              <MessageCircle size={14} />
              WhatsApp
            </button>
            <button
              onClick={() => {
                const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
                window.open(linkedinUrl, "_blank");
                setShowMenu(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-[12px] font-mono text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors"
            >
              <Link2 size={14} />
              LinkedIn
            </button>
          </div>
          <div className="border-t border-scent-border px-3 py-2">
            <p className="text-[9px] font-mono text-gray-600 text-center">
              Powered by ScentDesk.app
            </p>
          </div>
        </div>
      )}

      {/* Click-outside to close */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
}
