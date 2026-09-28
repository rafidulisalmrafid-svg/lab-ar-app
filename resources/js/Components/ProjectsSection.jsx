import React, { useState } from 'react';
import {
  ExternalLink,
  Layers,
  Sparkles,
  X,
  CheckCircle,
  Eye,
  Filter,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { playUiClick, playUiHover } from '../Utils/sound';

export default function ProjectsSection({ projects }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    'All',
    'Game Development',
    'Virtual Reality',
    'Augmented Reality',
    'Enterprise Software',
    'Mobile Engineering',
  ];

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const openProject = (project) => {
    playUiClick();
    setSelectedProject(project);
  };

  const closeProject = () => {
    playUiClick();
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="relative py-24 bg-[#070a16] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PROVEN PORTFOLIO & CASE STUDIES</span>
            </div>

            <h2 className="font-['Outfit'] text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Discover Our Work &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                Pioneering Projects
              </span>
            </h2>

            <p className="text-slate-400 text-base">
              Explore our real-world creations across Extended Reality, motion-tracking video games, and mission-critical enterprise systems.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playUiClick();
                  setActiveFilter(cat);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeFilter === cat
                    ? 'bg-cyan-500 text-black font-semibold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onMouseEnter={() => playUiHover()}
              className="group relative rounded-2xl bg-[#090e21] border border-white/10 hover:border-cyan-500/40 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              {/* Image & Overlay */}
              <div className="relative h-56 overflow-hidden bg-black/60">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090e21] via-transparent to-black/20" />

                {/* Top Badge */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-cyan-300">
                    {project.category}
                  </span>
                </div>

                <div className="absolute top-3.5 right-3.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-mono text-slate-400">
                    CLIENT: <span className="text-slate-200">{project.client}</span>
                  </div>

                  <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs font-medium text-cyan-400">
                    {project.tagline}
                  </p>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Tech tags & inspect button */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => openProject(project)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.04] hover:bg-cyan-500 text-slate-300 hover:text-black font-semibold text-xs tracking-wider uppercase border border-white/10 hover:border-cyan-400 transition-all duration-200"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Deep Case Study</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div
          onClick={closeProject}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn overflow-y-auto cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-3xl bg-[#090e21] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl my-8 space-y-6 cursor-default"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-xs font-mono font-medium">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    // {selectedProject.type}
                  </span>
                </div>
                <h3 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400">
                  {selectedProject.tagline}
                </p>
              </div>

              <button
                onClick={closeProject}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Banner Media */}
            <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 border border-white/10">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090e21] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                <span className="bg-black/70 px-3 py-1 rounded-lg backdrop-blur-sm text-slate-200">
                  CLIENT: {selectedProject.client}
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-lg backdrop-blur-sm">
                  {selectedProject.status}
                </span>
              </div>
            </div>

            {/* Detailed Summary */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                Project Overview & Mission:
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedProject.summary}
              </p>
            </div>

            {/* Performance Impact / Outcomes */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                <span>Verified Milestones & Impact:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedProject.results.map((res, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1"
                  >
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <p className="text-xs text-slate-200 font-medium leading-snug">
                      {res}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                Production Technology Stack:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Modal Action */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-400 font-mono">
                ENGINEERED AT LAB AR • ICT TOWER, DHAKA
              </span>
              <a
                href="#contact"
                onClick={closeProject}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-500/25"
              >
                <span>Discuss Similar Solution</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
