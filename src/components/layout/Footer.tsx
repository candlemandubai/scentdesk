// You made it all the way to the footer code. Respect.
// ScentDesk is a love letter to the fragrance industry.
// If you want to build something together: hello@olfactal.com
// → candlestart.com | olfactal.com | @candlemandubai

"use client";
import { Instagram, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
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
  );
}
