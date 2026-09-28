import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  Globe, 
  Star, 
  ExternalLink, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles,
  Building2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { playUiHover, playUiClick } from '../Utils/sound';

// Custom SVG Brand Logo components for authentic client presentation
const ClientBrandLogo = ({ id, accent = 'cyan' }) => {
  switch (id) {
    case 'adamjee':
      return (
        <svg viewBox="0 0 60 60" className="w-9 h-9" fill="none">
          <rect x="8" y="8" width="44" height="44" rx="10" stroke="currentColor" strokeWidth="2.5" className="text-cyan-400/40" />
          <path d="M18 42 L30 16 L42 42" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400" />
          <path d="M22 34 L38 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-cyan-300" />
        </svg>
      );
    case 'tech-it':
      return (
        <svg viewBox="0 0 60 60" className="w-9 h-9" fill="none">
          <circle cx="30" cy="30" r="22" stroke="currentColor" strokeWidth="2.5" className="text-purple-400/40" />
          <path d="M20 30 H40 M30 20 V40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-purple-400" />
          <circle cx="30" cy="30" r="5" fill="currentColor" className="text-purple-300" />
        </svg>
      );
    case 'beatnik-tech':
      return (
        <svg viewBox="0 0 60 60" className="w-9 h-9" fill="none">
          <path d="M16 22 C16 16 24 16 30 22 C36 28 44 28 44 22 C44 16 36 16 30 22 C24 28 16 28 16 22 Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-emerald-400" />
          <path d="M16 38 C16 32 24 32 30 38 C36 44 44 44 44 38 C44 32 36 32 30 38 C24 44 16 44 16 38 Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-emerald-400/70" />
        </svg>
      );
    case 'beatnik-canada':
      return (
        <svg viewBox="0 0 60 60" className="w-9 h-9" fill="none">
          <polygon points="30,10 38,26 50,26 40,36 44,50 30,42 16,50 20,36 10,26 22,26" stroke="currentColor" strokeWidth="2.5" className="text-blue-400" />
          <circle cx="30" cy="30" r="4" fill="currentColor" className="text-blue-300" />
        </svg>
      );
    case 'ccj-b':
      return (
        <svg viewBox="0 0 60 60" className="w-9 h-9" fill="none">
          <path d="M30 12 L46 20 V34 C46 44 30 50 30 50 C30 50 14 44 14 34 V20 Z" stroke="currentColor" strokeWidth="2.5" className="text-teal-400" />
          <path d="M24 30 L28 34 L36 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-teal-300" />
        </svg>
      );
    case 'cleancycle':
      return (
        <svg viewBox="0 0 60 60" className="w-9 h-9" fill="none">
          <circle cx="30" cy="30" r="20" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" className="text-emerald-400/50" />
          <path d="M22 30 C22 24 26 20 32 20 M38 30 C38 36 34 40 28 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-emerald-400" />
          <circle cx="30" cy="30" r="3" fill="currentColor" className="text-emerald-300" />
        </svg>
      );
    case 'bseed':
      return (
        <svg viewBox="0 0 60 60" className="w-9 h-9" fill="none">
          <path d="M30 46 V26 M30 26 C30 18 42 18 42 26 C42 34 30 38 30 38 M30 26 C30 18 18 18 18 26 C18 34 30 38 30 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-green-400" />
        </svg>
      );
    case 'bist':
      return (
        <svg viewBox="0 0 60 60" className="w-9 h-9" fill="none">
          <polygon points="30,14 48,24 30,34 12,24" stroke="currentColor" strokeWidth="2.5" className="text-amber-400" />
          <path d="M20 29 V40 C20 44 40 44 40 40 V29" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-amber-400/70" />
        </svg>
      );
    case 'printnow':
      return (
        <svg viewBox="0 0 60 60" className="w-9 h-9" fill="none">
          <rect x="14" y="22" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2.5" className="text-rose-400/50" />
          <path d="M20 22 V14 H40 V22" stroke="currentColor" strokeWidth="2.5" className="text-rose-400" />
          <circle cx="22" cy="28" r="2" fill="currentColor" className="text-rose-300" />
        </svg>
      );
    case 'ziva':
      return (
        <svg viewBox="0 0 60 60" className="w-9 h-9" fill="none">
          <polygon points="30,12 45,24 45,42 30,50 15,42 15,24" stroke="currentColor" strokeWidth="2" className="text-fuchsia-400/40" />
          <path d="M22 24 H38 L22 38 H38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-400" />
        </svg>
      );
    case 'flymus':
      return (
        <svg viewBox="0 0 60 60" className="w-9 h-9" fill="none">
          <path d="M12 36 L30 16 L48 36 L30 30 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" className="text-cyan-400" />
          <circle cx="30" cy="26" r="2" fill="currentColor" className="text-cyan-300" />
        </svg>
      );
    case 'adpoint':
      return (
        <svg viewBox="0 0 60 60" className="w-9 h-9" fill="none">
          <circle cx="30" cy="30" r="22" stroke="currentColor" strokeWidth="2" className="text-indigo-400/40" />
          <circle cx="30" cy="30" r="14" stroke="currentColor" strokeWidth="2.5" className="text-indigo-400" />
          <circle cx="30" cy="30" r="5" fill="currentColor" className="text-indigo-300" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 60 60" className="w-9 h-9" fill="none">
          <rect x="12" y="12" width="36" height="36" rx="8" stroke="currentColor" strokeWidth="2.5" className="text-cyan-400" />
          <circle cx="30" cy="30" r="6" fill="currentColor" className="text-cyan-300" />
        </svg>
      );
  }
};

export default function ClientsMarquee({ clients = [] }) {
  const [filterCategory, setFilterCategory] = useState('All');

  // Categories for client filtering
  const categories = ['All', 'Enterprise FinTech', 'Motion Controlled Game', 'WebXR & Cloud', 'WebAR Try-On'];

  const filteredClients = filterCategory === 'All' 
    ? clients 
    : clients.filter(c => c.category === filterCategory || (filterCategory === 'Enterprise FinTech' && c.tag.includes('Industrial')));

  // Duplicate array for seamless infinite marquee loop
  const marqueeClients = [...clients, ...clients];

  return (
    <section id="clients" className="relative py-24 bg-[#05070e] border-t border-white/5 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-10 left-1/3 w-[600px] h-[300px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[250px] bg-purple-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              <Award className="w-3.5 h-3.5" />
              <span>COMPLETED CLIENT DELIVERABLES & PORTFOLIO</span>
            </div>

            <h2 className="font-['Outfit'] text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Trusted By Clients We've <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Successfully Delivered For
              </span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Explore organizations, brands, and industrial conglomerates who chose Lab AR to engineer their mission-critical software, WebGL experiences, and motion games. <span className="text-cyan-400 font-medium">Click on any client logo or card to visit their live official website.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#090e21] border border-white/10">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>100% Verified Production Live</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#090e21] border border-white/10">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>BD • Canada • Singapore • UAE</span>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilterCategory(cat);
                playUiClick();
              }}
              onMouseEnter={() => playUiHover()}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                filterCategory === cat
                  ? 'bg-cyan-500 text-black font-semibold shadow-lg shadow-cyan-500/20'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              <span>{cat}</span>
              {cat === 'All' && <span className="opacity-70">({clients.length})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Completed Client Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredClients.map((client) => (
            <a
              key={client.id || client.name}
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playUiClick()}
              onMouseEnter={() => playUiHover()}
              title={`Visit ${client.name} official website (${client.website})`}
              className="group relative p-6 rounded-2xl bg-[#090e23]/90 hover:bg-[#0c1330] border border-white/10 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 cursor-pointer"
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div className="space-y-4">
                {/* Header: Logo, Name & External Link Badge */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-[#0d1536] border border-white/10 group-hover:border-cyan-500/40 flex items-center justify-center transition-all shadow-md group-hover:scale-105 shrink-0">
                      <ClientBrandLogo id={client.id} accent={client.accent} />
                    </div>
                    <div>
                      <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                        <span>{client.name}</span>
                      </h3>
                      <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <span className="text-slate-300">{client.country}</span>
                        <span>•</span>
                        <span className="text-cyan-400/90 truncate max-w-[130px]">{client.tag}</span>
                      </div>
                    </div>
                  </div>

                  {/* Visit Website Indicator */}
                  <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-cyan-500 text-slate-400 group-hover:text-black flex items-center justify-center transition-all shrink-0">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Delivered Project Highlight */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400">
                    <span className="flex items-center gap-1 font-semibold uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Delivered by Lab AR
                    </span>
                    <span className="text-slate-400">{client.category}</span>
                  </div>
                  <div className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors line-clamp-2">
                    {client.completedProject}
                  </div>
                </div>
              </div>

              {/* Footer: Metric & URL */}
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-mono text-[11px]">
                  <Sparkles className="w-3 h-3" />
                  <span>{client.impact}</span>
                </div>

                <div className="font-mono text-[11px] text-slate-400 group-hover:text-cyan-300 flex items-center gap-1 transition-colors">
                  <span>Visit Website</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Section Divider & Marquee Subhead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
          — Continuous Partner Marquee // Click any logo to launch website —
        </span>
      </div>

      {/* Infinite Scrolling Interactive Marquee with Clickable Links */}
      <div className="relative w-full overflow-hidden py-4 select-none">
        {/* Left & Right gradient fades */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#05070e] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#05070e] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max gap-4 animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
          {marqueeClients.map((client, idx) => (
            <a
              key={idx}
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playUiHover()}
              onClick={() => playUiClick()}
              title={`Click to open ${client.name} (${client.website})`}
              className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-[#090e21] border border-white/10 hover:border-cyan-400 transition-all cursor-pointer group shrink-0 shadow-lg shadow-black/50 hover:bg-[#0e163b]"
            >
              <div className="w-10 h-10 rounded-xl bg-[#060a1a] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <ClientBrandLogo id={client.id} accent={client.accent} />
              </div>
              <div>
                <div className="font-['Space_Grotesk'] text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1">
                  <span>{client.name}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                </div>
                <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
                  <span className="text-emerald-400">{client.country}</span>
                  <span>•</span>
                  <span className="text-slate-300">{client.tag}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Verified Testimonial Spotlight */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">VERIFIED IMPACT REVIEWS</div>
          <h3 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-white">
            What Leaders Say About Working With Lab AR
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#090e23] border border-white/10 hover:border-white/20 transition-all space-y-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-slate-300 italic leading-relaxed">
              "Lab AR brought our Kinect motion gaming vision to reality with unprecedented tracking accuracy and zero lag. The team at ICT Tower is world-class."
            </p>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white block">Tech IT Solutions</span>
                <span className="text-slate-400 font-mono">Interactive Gaming Division</span>
              </div>
              <a
                href="https://techit-bd.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono text-[11px]"
              >
                <span>techit-bd.com</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#090e23] border border-white/10 hover:border-white/20 transition-all space-y-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-slate-300 italic leading-relaxed">
              "Their WebGL and Three.js 3D facial try-on engine increased our user engagement by 340%. Flawless execution without requiring app downloads."
            </p>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white block">ZIVA Brand Studio</span>
                <span className="text-slate-400 font-mono">Cosmetics & AR E-Commerce</span>
              </div>
              <a
                href="https://zivabrands.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fuchsia-400 hover:text-fuchsia-300 flex items-center gap-1 font-mono text-[11px]"
              >
                <span>zivabrands.com</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#090e23] border border-white/10 hover:border-white/20 transition-all space-y-4">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-slate-300 italic leading-relaxed">
              "Our enterprise billing infrastructure needed extreme reliability and compliance. Lab AR built and deployed an automated suite that handles millions seamlessly."
            </p>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white block">Adamjee Sons LTD</span>
                <span className="text-slate-400 font-mono">Enterprise Systems</span>
              </div>
              <a
                href="https://www.adamjeegroup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono text-[11px]"
              >
                <span>adamjeegroup.com</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
