import React, { useState } from 'react';
import { Cpu, Code2, Layers, Shield, Sparkles, Terminal } from 'lucide-react';
import { playUiClick, playUiHover } from '../Utils/sound';

export default function TechMatrix({ techStack }) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  return (
    <section id="tech-matrix" className="relative py-24 bg-[#070b18] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Terminal className="w-3.5 h-3.5" />
            <span>WHAT WE WORK WITH & HARNESS</span>
          </div>

          <h2 className="font-['Outfit'] text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Technology{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
              Matrix & Tooling
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg">
            Harnessing the latest industry-standard engines, modern web frameworks, and sensory hardware to build powerful, scalable, and immersive digital worlds.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {techStack.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                playUiClick();
                setActiveCategoryIndex(idx);
              }}
              onMouseEnter={() => playUiHover()}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all border ${
                activeCategoryIndex === idx
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black border-cyan-400 shadow-lg shadow-cyan-500/20'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:border-cyan-500/40 hover:bg-white/10'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Active Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack[activeCategoryIndex].items.map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => playUiHover()}
              className="p-6 rounded-2xl bg-[#090e23] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-cyan-500/10 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                    {item.type}
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {item.level}%
                  </span>
                </div>

                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.name}
                </h3>

                <p className="text-xs font-mono text-purple-300">
                  {item.badge}
                </p>
              </div>

              {/* Proficiency Level Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000"
                    style={{ width: `${item.level}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>DEPLOYED PRODUCTION</span>
                  <span>ENTERPRISE GRADE</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
