'use client';

import { useState } from 'react';

/* ── mock profile data ── */
const profile = {
  name: 'Amira Beaumont',
  handle: '@amira.nose',
  title: 'Senior Perfumer',
  house: 'Maison Lumière',
  location: 'Grasse, France',
  avatar: null, // placeholder
  bio: 'Crafting emotions in liquid form. Specializing in sustainable ouds & modern florals. ISIPCA Class of 2014.',
  stats: {
    creations: 47,
    awards: 6,
    followers: '12.4K',
  },
  badges: ['IFRA Certified', 'Sustainable', 'Niche'],
};

const links = [
  {
    id: 1,
    category: 'portfolio',
    icon: '🧪',
    title: 'My Fragrance Portfolio',
    subtitle: '47 creations — from concept to counter',
    url: '#',
    accent: '#c8a97e',
    clicks: 2341,
  },
  {
    id: 2,
    category: 'shop',
    icon: '🛍',
    title: 'Shop My Latest Collection',
    subtitle: 'Éclat de Nuit — Limited Edition 2026',
    url: '#',
    accent: '#e8768a',
    clicks: 1822,
    badge: 'NEW',
  },
  {
    id: 3,
    category: 'social',
    icon: '📸',
    title: 'Instagram @amira.nose',
    subtitle: 'Behind the scenes at the organ',
    url: '#',
    accent: '#a78bfa',
    clicks: 3104,
  },
  {
    id: 4,
    category: 'education',
    icon: '🎓',
    title: 'Perfumery Masterclass',
    subtitle: 'Learn oud layering techniques — 6 modules',
    url: '#',
    accent: '#38bdf8',
    clicks: 987,
    badge: 'POPULAR',
  },
  {
    id: 5,
    category: 'press',
    icon: '📰',
    title: 'Featured in Fragrantica',
    subtitle: '"The New Wave of Sustainable Perfumery"',
    url: '#',
    accent: '#34d399',
    clicks: 654,
  },
  {
    id: 6,
    category: 'contact',
    icon: '💼',
    title: 'Book a Consultation',
    subtitle: 'Bespoke fragrance development for brands',
    url: '#',
    accent: '#f59e0b',
    clicks: 1205,
  },
  {
    id: 7,
    category: 'community',
    icon: '💬',
    title: 'Join My Discord',
    subtitle: 'A community of 2,000+ fragrance creators',
    url: '#',
    accent: '#818cf8',
    clicks: 445,
  },
  {
    id: 8,
    category: 'music',
    icon: '🎵',
    title: 'My Blending Playlist',
    subtitle: 'What plays in the lab — updated weekly',
    url: '#',
    accent: '#fb923c',
    clicks: 312,
  },
];

const noteAccords = [
  { name: 'Oud', pct: 92 },
  { name: 'Rose', pct: 87 },
  { name: 'Sandalwood', pct: 78 },
  { name: 'Iris', pct: 65 },
  { name: 'Vetiver', pct: 58 },
];

export default function LinksPage() {
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0e17] text-[#e5e7eb] flex flex-col items-center relative overflow-hidden">
      {/* ── ambient background ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#c8a97e] opacity-[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#a78bfa] opacity-[0.03] rounded-full blur-[100px]" />
      </div>

      {/* ── top bar ── */}
      <div className="w-full max-w-lg mx-auto px-4 pt-4 pb-2 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6b7280]">
            scentdesk.app/links
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6b7280]">
          {profile.stats.followers} followers
        </span>
      </div>

      {/* ── profile card ── */}
      <div className="w-full max-w-lg mx-auto px-4 relative z-10 mt-4">
        <div className="bg-[#111827] border border-[#1e2d3d] rounded-xl overflow-hidden">
          {/* banner gradient */}
          <div className="h-20 bg-gradient-to-r from-[#1a2332] via-[#1e2a3a] to-[#1a2332] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#c8a97e]/10 via-transparent to-[#a78bfa]/10" />
          </div>

          <div className="px-5 pb-5 -mt-10 relative">
            {/* avatar */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c8a97e] to-[#d4a843] border-4 border-[#111827] flex items-center justify-center text-2xl font-bold text-[#0a0e17] shadow-lg shadow-[#c8a97e]/20">
              AB
            </div>

            <div className="mt-3">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-white">{profile.name}</h1>
                <svg className="w-4 h-4 text-[#c8a97e]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm text-[#c8a97e] font-mono mt-0.5">
                {profile.title} <span className="text-[#374151]">·</span> {profile.house}
              </p>
              <p className="text-xs text-[#6b7280] mt-0.5">{profile.location}</p>
              <p className="text-sm text-[#9ca3af] mt-3 leading-relaxed">{profile.bio}</p>
            </div>

            {/* badges */}
            <div className="flex flex-wrap gap-2 mt-3">
              {profile.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-[#c8a97e]/10 text-[#c8a97e] border border-[#c8a97e]/20 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* stats */}
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#1e2d3d]">
              {Object.entries(profile.stats).map(([label, value]) => (
                <div key={label} className="text-center">
                  <div className="text-lg font-semibold text-white">{value}</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#6b7280]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── signature accords ── */}
      <div className="w-full max-w-lg mx-auto px-4 relative z-10 mt-4">
        <div className="bg-[#111827] border border-[#1e2d3d] rounded-xl overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[#1e2d3d] flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#9ca3af] font-semibold">
              Signature Accords
            </span>
            <span className="text-[10px] text-[#6b7280] font-mono">affinity %</span>
          </div>
          <div className="p-4 space-y-2.5">
            {noteAccords.map((accord) => (
              <div key={accord.name} className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#9ca3af] w-20 shrink-0">{accord.name}</span>
                <div className="flex-1 h-1.5 bg-[#1a2332] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#c8a97e] to-[#d4a843] transition-all duration-1000"
                    style={{ width: `${accord.pct}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-[#6b7280] w-8 text-right">{accord.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── links ── */}
      <div className="w-full max-w-lg mx-auto px-4 relative z-10 mt-4 space-y-2.5">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            onMouseEnter={() => setHoveredLink(link.id)}
            onMouseLeave={() => setHoveredLink(null)}
            className="group block bg-[#111827] border border-[#1e2d3d] rounded-xl px-4 py-3.5 transition-all duration-200 hover:border-[#2a3a4d] relative overflow-hidden"
            style={{
              boxShadow: hoveredLink === link.id ? `0 0 24px ${link.accent}10, 0 0 48px ${link.accent}05` : 'none',
              borderColor: hoveredLink === link.id ? `${link.accent}30` : undefined,
            }}
          >
            {/* hover accent line */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-200 rounded-l-xl"
              style={{
                background: link.accent,
                opacity: hoveredLink === link.id ? 1 : 0,
              }}
            />

            <div className="flex items-center gap-3.5">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{ background: `${link.accent}15` }}
              >
                {link.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white truncate">{link.title}</span>
                  {link.badge && (
                    <span
                      className="px-1.5 py-px text-[9px] font-mono font-bold uppercase tracking-wider rounded"
                      style={{
                        background: `${link.accent}20`,
                        color: link.accent,
                      }}
                    >
                      {link.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#6b7280] mt-0.5 truncate">{link.subtitle}</p>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <svg
                  className="w-4 h-4 text-[#374151] group-hover:text-[#6b7280] transition-all duration-200 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-[9px] font-mono text-[#374151] mt-1">{link.clicks.toLocaleString()}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* ── footer ── */}
      <div className="w-full max-w-lg mx-auto px-4 relative z-10 mt-8 mb-8">
        <div className="flex flex-col items-center gap-3 pt-6 border-t border-[#1e2d3d]">
          <a href="/" className="flex items-center gap-1.5 group">
            <div className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
            <span className="font-mono text-[11px] tracking-[0.08em] text-[#6b7280] group-hover:text-[#9ca3af] transition-colors">
              SCENT<span className="text-[#c8a97e]">DESK</span>
            </span>
          </a>
          <p className="text-[10px] text-[#374151] font-mono text-center">
            The fragrance industry&apos;s open intelligence terminal
          </p>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-[10px] font-mono text-[#374151] hover:text-[#6b7280] cursor-pointer transition-colors">
              Create yours
            </span>
            <span className="text-[#1e2d3d]">·</span>
            <span className="text-[10px] font-mono text-[#374151] hover:text-[#6b7280] cursor-pointer transition-colors">
              Claim handle
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
