// You made it all the way to the footer code. Respect.
// ScentDesk is a love letter to the fragrance industry.
// If you want to build something together: hello@olfactal.com
// → candlestart.com | olfactal.com | @candlemandubai

"use client";
import { useState } from "react";
import { Instagram, Mail, MessageCircle, Plus, X } from "lucide-react";

const CONTRIBUTE_MSG = encodeURIComponent(
  `Hello! I'd like to contribute data to ScentDesk.\n\nI can help with (please edit):\n- Events & upcoming workshops\n- Raw materials pricing / shortages\n- Market reports or industry data\n- Candles, diffusers, room sprays market info\n- Other scented categories\n\nThis can be a one-time contribution or ongoing. Let me know how I can help!`
);

const CONTRIBUTE_ITEMS = [
  { emoji: "📅", text: "Events & upcoming workshops" },
  { emoji: "🧪", text: "Raw materials pricing, shortages or updates" },
  { emoji: "📊", text: "Market reports or industry data" },
  { emoji: "🕯️", text: "Candles, diffusers, room sprays market info" },
  { emoji: "🏭", text: "Manufacturer or supplier updates" },
  { emoji: "📰", text: "Any fragrance industry news or tips" },
];

function ContributeDialog({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-scent-surface border border-scent-border rounded-lg shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-scent-border">
          <div className="flex items-center gap-2">
            <Plus size={12} className="text-scent-accent" />
            <span className="text-[12px] font-mono font-bold text-gray-200 tracking-wider">
              CONTRIBUTE
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-3">
          <p className="text-[12px] text-gray-300 leading-relaxed mb-3">
            We&apos;re building ScentDesk with the community. If you have any of
            the following, we&apos;d love to hear from you:
          </p>

          <div className="flex flex-col gap-1.5 mb-4">
            {CONTRIBUTE_ITEMS.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-white/[0.02] border border-scent-border/30"
              >
                <span className="text-[13px]">{item.emoji}</span>
                <span className="text-[11px] text-gray-400 font-mono">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-gray-600 font-mono mb-3">
            One-time tips or ongoing contributions — everything helps.
          </p>

          {/* CTA buttons */}
          <div className="flex gap-2">
            <a
              href={`https://wa.me/971508684288?text=${CONTRIBUTE_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/30 transition-colors text-[11px] font-mono font-semibold"
            >
              <MessageCircle size={12} />
              WhatsApp
            </a>
            <a
              href="mailto:hello@olfactal.com?subject=ScentDesk%20Contribution"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded bg-white/[0.03] border border-scent-border text-gray-400 hover:text-gray-200 hover:bg-white/[0.06] transition-colors text-[11px] font-mono font-semibold"
            >
              <Mail size={12} />
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const [showContribute, setShowContribute] = useState(false);

  return (
    <>
      <footer className="bg-scent-surface/50 border-t border-scent-border/50 mt-4 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-[9px] font-mono text-gray-600">
            <div className="w-1 h-1 rounded-full bg-scent-accent" />
            <span className="font-bold text-gray-500 tracking-wider">
              SCENT<span className="text-scent-accent">DESK</span>
            </span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Contribute — opens dialog */}
            <button
              onClick={() => setShowContribute(true)}
              className="flex items-center gap-1 text-[9px] font-mono text-gray-600 hover:text-scent-accent transition-colors"
              title="Contribute data to ScentDesk"
            >
              <Plus size={9} />
              <span className="hidden sm:inline">Contribute</span>
            </button>

            <div className="h-3 w-px bg-scent-border/50 hidden sm:block" />

            <a href="https://instagram.com/olfactal" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-scent-accent transition-colors" title="@olfactal">
              <Instagram size={11} />
            </a>
            <a href="https://instagram.com/candlemandubai" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-scent-accent transition-colors" title="@candlemandubai">
              <Instagram size={11} />
            </a>
            <a href="https://wa.me/971508684288" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-scent-accent transition-colors" title="WhatsApp">
              <MessageCircle size={11} />
            </a>
            <a href="mailto:hello@olfactal.com?subject=ScentDesk%20Feedback" className="text-gray-600 hover:text-scent-accent transition-colors" title="Feedback">
              <Mail size={11} />
            </a>
          </div>
        </div>
      </footer>

      {/* Contribute Dialog */}
      {showContribute && (
        <ContributeDialog onClose={() => setShowContribute(false)} />
      )}
    </>
  );
}
