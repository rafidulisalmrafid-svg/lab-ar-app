import React, { useState, useId } from 'react';
import { Calculator, ArrowRight, CheckCircle2, Clock, Sparkles, Cpu, Layers } from 'lucide-react';
import { playUiClick, playUiHover, playLaserPulse } from '../Utils/sound';

export default function ProjectEstimator({ onSelectEstimate }) {
  const [projectType, setProjectType] = useState('ar-vr');
  const [fidelity, setFidelity] = useState('high-end');
  const [platform, setPlatform] = useState('cross-platform');
  const [backend, setBackend] = useState('cloud-sync');

  const types = [
    { id: 'ar-vr', label: 'Extended Reality (VR/AR/MR)', baseWeeks: 6, tag: 'Spatial Computing' },
    { id: 'game-kinect', label: 'Kinect & Motion Game Dev', baseWeeks: 8, tag: 'Interactive Gaming' },
    { id: 'webgl-3d', label: 'WebGL 3D Web Experience', baseWeeks: 4, tag: 'Browser 3D' },
    { id: 'mobile-app', label: 'Cross-Platform Mobile App', baseWeeks: 5, tag: 'Flutter / Native' },
    { id: 'enterprise-web', label: 'Enterprise Web & ERP Suite', baseWeeks: 7, tag: 'Laravel / .NET' },
  ];

  const fidelities = [
    { id: 'standard', label: 'Standard Clean UI / Low-Poly', multiplier: 1.0 },
    { id: 'high-end', label: 'High-Fidelity PBR & GLSL Shaders', multiplier: 1.35 },
    { id: 'photoreal', label: 'Photorealistic / AAA Unreal 5', multiplier: 1.7 },
  ];

  const platforms = [
    { id: 'web-browser', label: 'Zero-Install Web Browser', weeksAdd: 0 },
    { id: 'quest-vision', label: 'Meta Quest & Vision Pro', weeksAdd: 2 },
    { id: 'kinect-motion', label: 'Kinect / Depth Sensor Kiosk', weeksAdd: 3 },
    { id: 'cross-platform', label: 'Cross-Platform (Mobile + Web)', weeksAdd: 2 },
  ];

  const backends = [
    { id: 'client-only', label: 'Stand-alone / Client Only', weeksAdd: 0 },
    { id: 'cloud-sync', label: 'Real-time WebSockets & Database', weeksAdd: 2 },
    { id: 'enterprise-erp', label: 'Enterprise Cryptographic / ERP', weeksAdd: 4 },
  ];

  // Calculation logic
  const selectedTypeObj = types.find((t) => t.id === projectType) || types[0];
  const selectedFidObj = fidelities.find((f) => f.id === fidelity) || fidelities[1];
  const selectedPlatObj = platforms.find((p) => p.id === platform) || platforms[3];
  const selectedBackObj = backends.find((b) => b.id === backend) || backends[1];

  const totalWeeks = Math.round(
    selectedTypeObj.baseWeeks * selectedFidObj.multiplier +
      selectedPlatObj.weeksAdd +
      selectedBackObj.weeksAdd
  );

  const handleApplyToForm = () => {
    playLaserPulse();
    if (onSelectEstimate) {
      onSelectEstimate({
        service: selectedTypeObj.label,
        timeline: `${totalWeeks} - ${totalWeeks + 3} Weeks`,
        details: `Configured: ${selectedTypeObj.label} | ${selectedFidObj.label} | ${selectedPlatObj.label} | ${selectedBackObj.label}`,
      });
    }

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="estimator" className="relative py-24 bg-[#05070e] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Calculator className="w-3.5 h-3.5" />
            <span>INTERACTIVE SCOPE & ARCHITECTURE ESTIMATOR</span>
          </div>

          <h2 className="font-['Outfit'] text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Calculate Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
              Project Parameters
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg">
            Configure your technical requirements to receive an instant architectural scope, estimated delivery timeline, and direct transmission to our engineering team.
          </p>
        </div>

        {/* Interactive Estimator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-8 space-y-8 bg-[#080d1f] border border-white/10 p-6 sm:p-8 rounded-3xl">
            {/* 1. Project Discipline */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider flex items-center gap-2">
                <span>01 // Project Architecture & Domain</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {types.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      playUiClick();
                      setProjectType(t.id);
                    }}
                    onMouseEnter={() => playUiHover()}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      projectType === t.id
                        ? 'bg-cyan-500/20 border-cyan-500/60 shadow-lg shadow-cyan-500/15'
                        : 'bg-black/30 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">{t.tag}</span>
                      {projectType === t.id && (
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      )}
                    </div>
                    <div className="text-sm font-semibold text-white mt-1">
                      {t.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Visual Fidelity */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider flex items-center gap-2">
                <span>02 // Visual & Shader Fidelity</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {fidelities.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      playUiClick();
                      setFidelity(f.id);
                    }}
                    onMouseEnter={() => playUiHover()}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      fidelity === f.id
                        ? 'bg-purple-500/20 border-purple-500/60 shadow-lg shadow-purple-500/15'
                        : 'bg-black/30 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">
                      {f.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Hardware Target */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider flex items-center gap-2">
                <span>03 // Target Hardware & Ecosystem</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {platforms.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      playUiClick();
                      setPlatform(p.id);
                    }}
                    onMouseEnter={() => playUiHover()}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      platform === p.id
                        ? 'bg-emerald-500/20 border-emerald-500/60 shadow-lg shadow-emerald-500/15'
                        : 'bg-black/30 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">
                      {p.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Backend Architecture */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider flex items-center gap-2">
                <span>04 // Cloud & Server Infrastructure</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {backends.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      playUiClick();
                      setBackend(b.id);
                    }}
                    onMouseEnter={() => playUiHover()}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      backend === b.id
                        ? 'bg-blue-500/20 border-blue-500/60 shadow-lg shadow-blue-500/15'
                        : 'bg-black/30 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">
                      {b.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Summary Card */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="p-7 rounded-3xl bg-gradient-to-b from-[#0c142e] to-[#080d1f] border border-cyan-500/30 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-cyan-400 tracking-wider">
                  ESTIMATED TELEMETRY
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300">
                  REALTIME
                </span>
              </div>

              {/* Timeline metric */}
              <div className="space-y-1">
                <div className="text-xs font-mono text-slate-400 uppercase">
                  Estimated Delivery Timeline
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-['Space_Grotesk'] text-4xl sm:text-5xl font-extrabold text-white">
                    {totalWeeks} - {totalWeeks + 3}
                  </span>
                  <span className="text-cyan-400 font-semibold text-lg">
                    Weeks
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Includes sprint architecture, 3D prototyping, asset baking, QA verification & ICT Tower deployment.
                </p>
              </div>

              {/* Scope Breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Discipline:</span>
                  <span className="font-semibold text-white">{selectedTypeObj.label}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Fidelity:</span>
                  <span className="font-semibold text-white">{selectedFidObj.label}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Target:</span>
                  <span className="font-semibold text-white">{selectedPlatObj.label}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Backend:</span>
                  <span className="font-semibold text-white">{selectedBackObj.label}</span>
                </div>
              </div>

              {/* CTA button */}
              <button
                onClick={handleApplyToForm}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                <span>Transmit Spec to Lab AR</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="text-center text-[10px] font-mono text-slate-400">
                Official quotation provided after NDA & technical scoping call.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
