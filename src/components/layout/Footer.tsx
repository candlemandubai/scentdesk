"use client";
import { Instagram, Mail, MessageCircle, Globe, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-scent-surface border-t border-scent-border mt-4 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Brand + Copyright */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
          <div className="w-1.5 h-1.5 rounded-full bg-scent-accent" />
          <span className="font-bold text-gray-400 tracking-wider">
            SCENT<span className="text-scent-accent">DESK</span>
          </span>
          <span className="text-gray-700">|</span>
          <span>&copy; {new Date().getFullYear()}</span>
          <span className="text-gray-700">|</span>
          <span className="flex items-center gap-1">
            Made with <Heart size={8} className="text-red-400" fill="currentColor" /> in Dubai
          </span>
        </div>

        {/* Center: Resources */}
        <div className="flex items-center gap-3 text-[10px] text-gray-600">
          <a href="https://olfactal.com" target="_blank" rel="noopener noreferrer" className="hover:text-scent-accent transition-colors">Olfactal</a>
          <span className="text-gray-700">|</span>
          <a href="https://ifrafragrance.org" target="_blank" rel="noopener noreferrer" className="hover:text-scent-accent transition-colors">IFRA</a>
          <span className="text-gray-700">|</span>
          <a href="https://www.fragrantica.com" target="_blank" rel="noopener noreferrer" className="hover:text-scent-accent transition-colors">Fragrantica</a>
          <span className="text-gray-700">|</span>
          <a href="https://basenotes.com" target="_blank" rel="noopener noreferrer" className="hover:text-scent-accent transition-colors">Basenotes</a>
          <span className="text-gray-700">|</span>
          <a href="mailto:hello@olfactal.com?subject=ScentDesk%20Feedback" className="hover:text-scent-accent transition-colors">Feedback</a>
        </div>

        {/* Right: Social + Contact */}
        <div className="flex items-center gap-3">
          <a href="https://instagram.com/olfactal" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-scent-accent transition-colors" title="@olfactal">
            <Instagram size={13} />
          </a>
          <a href="https://instagram.com/candlemandubai" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-scent-accent transition-colors" title="@candlemandubai">
            <Instagram size={13} />
          </a>
          <a href="https://wa.me/971508684288" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-scent-accent transition-colors" title="WhatsApp">
            <MessageCircle size={13} />
          </a>
          <a href="mailto:hello@olfactal.com" className="text-gray-600 hover:text-scent-accent transition-colors" title="hello@olfactal.com">
            <Mail size={13} />
          </a>
          <a href="https://olfactal.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-scent-accent transition-colors" title="olfactal.com">
            <Globe size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
