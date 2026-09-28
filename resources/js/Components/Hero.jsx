import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Terminal, ShieldCheck, Box, Play, Compass, Cpu, Layers } from 'lucide-react';
import { playUiClick, playUiHover, playLaserPulse } from '../Utils/sound';

export default function Hero({ stats, studioInfo }) {
  const [dhakaTime, setDhakaTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Dhaka (BST, UTC+6)
      const options = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setDhakaTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/15 via-purple-600/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Studio Telemetry Pill */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono backdrop-blur-md shadow-sm shadow-cyan-500/10">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold uppercase tracking-wider">
              {studioInfo?.tagline || 'Leading XR & Game Dev Studio Bangladesh'}
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-400 text-xs font-mono">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>DHAKA (BST): <strong className="text-slate-200">{dhakaTime || '10:00 AM'}</strong></span>
          </div>

          <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-400 text-xs font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>STATUS: <span className="text-emerald-300 font-semibold">{studioInfo?.status || 'ONLINE'}</span></span>
          </div>
        </div>

        {/* Main Grid: Headline + Cinematic Studio Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-['Outfit'] text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Architecting{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
                Realities Beyond
              </span>{' '}
              Perception.
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              We engineer cutting-edge <strong className="text-cyan-300 font-semibold">Extended Reality (AR/VR/MR)</strong>,
              interactive <strong className="text-purple-300 font-semibold">WebGL 3D engines</strong>, and motion-controlled
              video games from our innovation lab at <span className="text-white border-b border-cyan-500/50">ICT Tower, Agargaon, Dhaka</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#sandbox"
                onClick={() => {
                  playLaserPulse();
                }}
                onMouseEnter={() => playUiHover()}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 text-black font-bold text-sm tracking-wide uppercase shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Box className="w-4 h-4 stroke-[2.5]" />
                <span>Launch 3D WebGL Sandbox</span>
              </a>

              <a
                href="#projects"
                onClick={() => playUiClick()}
                onMouseEnter={() => playUiHover()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 hover:text-white border border-white/10 hover:border-cyan-500/40 font-semibold text-sm transition-all backdrop-blur-md"
              >
                <span>Explore Featured Works</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </a>

              <a
                href="#estimator"
                onClick={() => playUiClick()}
                onMouseEnter={() => playUiHover()}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-mono text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10 border border-cyan-500/20 transition-all"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Estimate Project Cost & Timeline</span>
              </a>
            </div>

            {/* Micro Feature highlights */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white flex items-baseline gap-1">
                    <span className="text-cyan-400">{stat.value}</span>
                  </div>
                  <div className="text-[11px] font-medium text-slate-400 leading-tight">
                    {stat.label}
                  </div>
                  <div className="text-[10px] font-mono text-cyan-500/80">
                    {stat.suffix}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Studio Cyber Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glowing Border Frame */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-cyan-500/40 via-purple-500/20 to-transparent shadow-2xl shadow-cyan-500/10">
                <div className="relative rounded-[22px] overflow-hidden bg-[#070b18] border border-cyan-500/30">
                  {/* Image with subtle zoom hover */}
                  <img
                    src="/images/hero_xr.jpg"
                    alt="Lab AR XR Innovation Studio at ICT Tower"
                    className="w-full h-[360px] sm:h-[440px] object-cover object-center filter brightness-95 contrast-105 hover:scale-105 transition-transform duration-700"
                  />

                  {/* Cyber Grid & Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070e] via-transparent to-black/30 pointer-events-none" />

                  {/* Top Hologram Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-cyan-500/40 text-xs font-mono text-cyan-300">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>LAB AR RESEARCH CENTER • ICT TOWER</span>
                  </div>

                  {/* Bottom Floating Stats Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">CORE FOCUS</span>
                      <span className="text-cyan-400 font-bold">SPATIAL COMPUTING & GAME ENGINES</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-300">
                      <span>Unity 3D • Unreal 5 • WebGL • Kinect SDK</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                        6DOF READY
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Floating Accent Pill Left */}
              <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-[#0c142b]/90 backdrop-blur-xl border border-cyan-500/30 shadow-xl shadow-black/80 animate-float">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400">SUB-15MS LATENCY</div>
                  <div className="text-xs font-bold text-white font-['Space_Grotesk']">Kinect & Motion Systems</div>
                </div>
              </div>

              {/* Decorative Floating Accent Pill Right */}
              <div className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-[#160d2e]/90 backdrop-blur-xl border border-purple-500/30 shadow-xl shadow-black/80">
                <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400">FULL PIPELINE</div>
                  <div className="text-xs font-bold text-white font-['Space_Grotesk']">Laravel + React + 3D</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
