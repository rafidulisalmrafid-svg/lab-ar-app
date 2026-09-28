import React, { useState } from 'react';
import { 
  Users, 
  ExternalLink, 
  Sparkles, 
  Terminal, 
  Award, 
  Briefcase,
  ChevronRight,
  ShieldAlert,
  Send
} from 'lucide-react';
import { playUiHover, playUiClick } from '../Utils/sound';

const SocialIcon = ({ type }) => {
  if (type === 'linkedin') {
    return (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z" />
      </svg>
    );
  }
  if (type === 'github') {
    return (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  }
  // Twitter / X
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
};

export default function TeamSection({ teamMembers = [] }) {
  const [activeMember, setActiveMember] = useState(null);

  return (
    <section id="team" className="relative py-24 bg-[#05070e] border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/10 via-purple-600/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-cyan-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Users className="w-3.5 h-3.5" />
              <span>CORE ARCHITECTS & CREATIVES</span>
            </div>

            <h2 className="font-['Outfit'] text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Meet The Team Shaping <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Next-Generation Realities
              </span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Based at ICT Tower, Agargaon, Dhaka — our cross-disciplinary team blends spatial computing, game engine physics, AAA 3D artistry, and high-concurrency cloud systems to build revolutionary digital experiences.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <div className="px-3 py-2 rounded-xl bg-[#090e21] border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Dhaka Studio Core: 4 Specialists</span>
            </div>
            <a
              href="#contact"
              onClick={() => playUiClick()}
              onMouseEnter={() => playUiHover()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all font-mono"
            >
              <span>Join Our Lab</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              onMouseEnter={() => playUiHover()}
              className="group relative rounded-2xl bg-gradient-to-b from-[#0a0f26]/90 to-[#060917]/90 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1.5"
            >
              {/* Top Accent Line */}
              <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity" />

              {/* Member Image & Status Badge */}
              <div className="relative aspect-square w-full overflow-hidden bg-slate-900">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Scanline hologram effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f26] via-transparent to-black/30 pointer-events-none" />

                {/* Telemetry Status Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-cyan-400/30 text-[10px] font-mono text-cyan-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>{member.status}</span>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300">
                    {member.experience}
                  </div>
                </div>

                {/* Corner Tech Brackets */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400/50 pointer-events-none" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400/50 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400/50 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400/50 pointer-events-none" />
              </div>

              {/* Member Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                      {member.division}
                    </span>
                  </div>

                  <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {member.name}
                  </h3>

                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium">
                    {member.role}
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed pt-1 line-clamp-3">
                    {member.bio}
                  </p>
                </div>

                {/* Skill Pills */}
                <div className="space-y-3 pt-3 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills?.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-300 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social and Action Links */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      {member.links?.linkedin && (
                        <a
                          href={member.links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="LinkedIn Profile"
                          onClick={() => playUiClick()}
                          onMouseEnter={() => playUiHover()}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 flex items-center justify-center text-slate-400 hover:text-cyan-300 transition-all"
                        >
                          <SocialIcon type="linkedin" />
                        </a>
                      )}
                      {member.links?.github && (
                        <a
                          href={member.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="GitHub Repository"
                          onClick={() => playUiClick()}
                          onMouseEnter={() => playUiHover()}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 flex items-center justify-center text-slate-400 hover:text-cyan-300 transition-all"
                        >
                          <SocialIcon type="github" />
                        </a>
                      )}
                      {member.links?.twitter && (
                        <a
                          href={member.links.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="X / Twitter"
                          onClick={() => playUiClick()}
                          onMouseEnter={() => playUiHover()}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 flex items-center justify-center text-slate-400 hover:text-cyan-300 transition-all"
                        >
                          <SocialIcon type="twitter" />
                        </a>
                      )}
                    </div>

                    <a
                      href="#contact"
                      onClick={() => playUiClick()}
                      onMouseEnter={() => playUiHover()}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 group/link"
                    >
                      <span>Connect</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Studio Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-cyan-950/20 via-[#0a102b] to-purple-950/20 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-['Space_Grotesk'] font-bold text-sm sm:text-base">
                Want to collaborate directly with our engineering architects?
              </h4>
              <p className="text-slate-400 text-xs">
                Visit our spatial lab at ICT Tower (14th Floor), Agargaon, Dhaka or book a private tech demonstration.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            onClick={() => playUiClick()}
            onMouseEnter={() => playUiHover()}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
          >
            <span>Initiate Project Consultation</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
