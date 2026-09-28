import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Sparkles, Terminal, Phone, Mail } from 'lucide-react';
import { toggleAudio, isAudioEnabled, playUiClick, playUiHover } from '../Utils/sound';

export default function Navbar({ studioInfo }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const nextState = toggleAudio();
    setSoundOn(nextState);
    if (nextState) playUiClick();
  };

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: '3D Sandbox', href: '#sandbox' },
    { label: 'Tech Matrix', href: '#tech-matrix' },
    { label: 'Team', href: '#team' },
    { label: 'Clients', href: '#clients' },
    { label: 'Estimator', href: '#estimator' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#05070e]/85 backdrop-blur-xl border-b border-cyan-500/15 py-3 shadow-lg shadow-black/50'
          : 'bg-gradient-to-b from-[#05070e]/90 via-[#05070e]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Status */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              onClick={() => playUiClick()}
              onMouseEnter={() => playUiHover()}
              className="group flex items-center gap-3"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/40 p-2 group-hover:border-cyan-400 group-hover:scale-105 transition-all shadow-lg shadow-cyan-500/10">
                <svg viewBox="0 0 100 100" className="w-6 h-6 text-cyan-400 fill-current">
                  <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="none" stroke="#00F0FF" strokeWidth="8" />
                  <circle cx="50" cy="50" r="14" fill="#00F0FF" />
                  <path d="M35 50 L50 35 L65 50 L50 65 Z" fill="#05070e" />
                </svg>
                <div className="absolute inset-0 rounded-xl bg-cyan-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-['Space_Grotesk'] text-xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                    LAB <span className="text-cyan-400">AR</span>
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    XR STUDIO
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ICT TOWER • DHAKA</span>
                </div>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => playUiClick()}
                onMouseEnter={() => playUiHover()}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-300 hover:bg-white/5 rounded-full transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle Button */}
            <button
              onClick={handleSoundToggle}
              title={soundOn ? 'Mute Sound FX' : 'Enable Cyber UI Sound FX'}
              className={`p-2 rounded-xl border transition-all ${
                soundOn
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 glow-cyan-sm'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {soundOn ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Admin Dashboard Portal Link */}
            <a
              href="/admin"
              onClick={() => playUiClick()}
              title="Open Lab AR Admin Dashboard"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 text-xs font-mono transition-all shadow-sm shadow-purple-500/10"
            >
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Dashboard</span>
            </a>

            {/* Quick Contact CTA */}
            <a
              href="#contact"
              onClick={() => playUiClick()}
              onMouseEnter={() => playUiHover()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-xs tracking-wide uppercase shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Initiate Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                playUiClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-xl bg-white/5 text-slate-300 border border-white/10 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 px-4 pt-3 pb-6 border-b border-cyan-500/20 bg-[#070b18]/95 backdrop-blur-2xl transition-all">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  playUiClick();
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-white/5 transition-all"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={() => {
                  playUiClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 rounded-xl bg-cyan-500 text-black font-semibold text-xs tracking-wide uppercase shadow-lg shadow-cyan-500/20"
              >
                Initiate Project with Lab AR
              </a>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 px-2">
                <span>ICT Tower, 14th Floor, Dhaka</span>
                <span className="text-cyan-400">{studioInfo?.phone || '+8801834219770'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
