import React from 'react';
import { ArrowUp, Terminal, Shield, Globe, Sparkles, Send } from 'lucide-react';
import { playUiClick } from '../Utils/sound';
export default function Footer({ studioInfo }) {
  const scrollToTop = () => {
    playUiClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#03050a] border-t border-white/10 pt-16 pb-12 overflow-hidden text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 p-2">
                <svg viewBox="0 0 100 100" className="w-5 h-5 fill-current">
                  <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="none" stroke="#00F0FF" strokeWidth="8" />
                  <circle cx="50" cy="50" r="14" fill="#00F0FF" />
                </svg>
              </div>
              <span className="font-['Space_Grotesk'] text-xl font-bold text-white tracking-tight">
                LAB <span className="text-cyan-400">AR</span>
              </span>
            </div>

            <p className="text-xs leading-relaxed text-slate-300 max-w-sm">
              {studioInfo?.mission || 'Empowering Innovation with Cutting-Edge Technology. Explore our expertise in Software Development, Extended Reality (XR), Game Development, and next-gen digital solutions tailored for your success.'}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-slate-300">
                HEADQUARTERED AT ICT TOWER (14TH FLOOR), DHAKA
              </span>
            </div>
          </div>

          {/* Core Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Discipline Focus
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">Extended Reality (AR/VR/MR)</a></li>
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">Kinect Motion Games</a></li>
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">WebGL 3D Web Apps</a></li>
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">Cross-Platform Apps</a></li>
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">Enterprise .NET & Laravel</a></li>
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">Computer Vision AI</a></li>
            </ul>
          </div>

          {/* Studio Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Studio Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-cyan-300 transition-colors">Core Services</a></li>
              <li><a href="#projects" className="hover:text-cyan-300 transition-colors">Case Studies</a></li>
              <li><a href="#team" className="hover:text-cyan-300 transition-colors">Core Team</a></li>
              <li><a href="#clients" className="hover:text-cyan-300 transition-colors">Completed Clients</a></li>
              <li><a href="#estimator" className="hover:text-cyan-300 transition-colors">Project Estimator</a></li>
              <li><a href="#contact" className="hover:text-cyan-300 transition-colors">ICT Tower Location</a></li>
              <li><a href="/admin" className="text-purple-400 hover:text-purple-300 font-mono font-medium transition-colors">⚡ Admin Dashboard</a></li>
            </ul>
          </div>

          {/* Quick Connect */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Direct Inquiries
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <a href="tel:+8801834219770" className="block text-slate-300 hover:text-cyan-300 transition-colors">
                +880 1834-219770
              </a>
              <a href="mailto:contact@lab-ar.xyz" className="block text-slate-300 hover:text-cyan-300 transition-colors">
                contact@lab-ar.xyz
              </a>
              <p className="text-[11px] text-slate-500 pt-1 leading-normal font-sans">
                E-14/X, ICT Tower (14th Floor), Agargaon, Dhaka - 1207, Bangladesh.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-500">
            <span>© 2026 Lab AR. All rights reserved.</span>
            <span>•</span>
            <span className="text-cyan-500/80">Built with Laravel + React + Inertia</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
