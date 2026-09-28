import React, { useState } from 'react';
import {
  Glasses,
  Gamepad2,
  Boxes,
  Smartphone,
  Globe,
  Cpu,
  ArrowRight,
  CheckCircle2,
  X,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';
import { playUiClick, playUiHover } from '../Utils/sound';

export default function ServicesSection({ services }) {
  const [selectedService, setSelectedService] = useState(null);

  const iconMap = {
    Glasses,
    Gamepad2,
    Boxes,
    Smartphone,
    Globe,
    Cpu,
  };

  const openServiceModal = (service) => {
    playUiClick();
    setSelectedService(service);
  };

  const closeServiceModal = () => {
    playUiClick();
    setSelectedService(null);
  };

  return (
    <section id="services" className="relative py-24 border-t border-white/5 bg-[#05070e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CORE CAPABILITIES & ENGINEERING DISCIPLINES</span>
          </div>

          <h2 className="font-['Outfit'] text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Empowering Innovation with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Next-Gen Technology
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            From spatial computing and hardware sensory tracking to enterprise cloud backends, we bridge the physical and virtual worlds.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Boxes;

            return (
              <div
                key={service.id}
                onMouseEnter={() => playUiHover()}
                className="group relative rounded-2xl p-7 bg-[#090d1f]/80 hover:bg-[#0e142e] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                {/* Glow backdrop on hover */}
                <div
                  className={`absolute -top-20 -right-20 w-44 h-44 rounded-full bg-gradient-to-br ${service.gradient} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="space-y-4 relative z-10">
                  {/* Top Bar: Icon + Category Badge */}
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400/90 mt-0.5">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300/90 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Key Features List */}
                  <ul className="space-y-2 pt-2 border-t border-white/5">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Tech Badges & CTA */}
                <div className="pt-6 relative z-10 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {service.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-slate-400 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => openServiceModal(service)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 text-xs font-semibold tracking-wide transition-all"
                  >
                    <span>Inspect Pipeline Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div
          onClick={closeServiceModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-3xl bg-[#090e21] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl space-y-6 cursor-default"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  ENGINEERING SPECIFICATION // {selectedService.category}
                </span>
                <h3 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-white">
                  {selectedService.title}
                </h3>
              </div>
              <button
                onClick={closeServiceModal}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {selectedService.description}
            </p>

            {/* Complete Capabilities */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                Full Production Capabilities:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.features.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Matrix */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                Technology & Framework Stack:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                Ready to deploy this capability for your organization?
              </div>
              <a
                href="#contact"
                onClick={() => setSelectedService(null)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-500/25"
              >
                <span>Request Technical Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
