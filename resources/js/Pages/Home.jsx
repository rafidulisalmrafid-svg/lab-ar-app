import React, { useState, useEffect } from 'react';

// Universal Head component that manages document title seamlessly
const Head = ({ title }) => {
  useEffect(() => {
    if (title && typeof document !== 'undefined') {
      document.title = title;
    }
  }, [title]);
  return null;
};
import Navbar from '../Components/Navbar';
import ThreeBackground from '../Components/ThreeBackground';
import Hero from '../Components/Hero';
import ThreeModelViewer from '../Components/ThreeModelViewer';
import ServicesSection from '../Components/ServicesSection';
import ProjectsSection from '../Components/ProjectsSection';
import ProjectEstimator from '../Components/ProjectEstimator';
import TechMatrix from '../Components/TechMatrix';
import TeamSection from '../Components/TeamSection';
import ClientsMarquee from '../Components/ClientsMarquee';
import ContactSection from '../Components/ContactSection';
import Footer from '../Components/Footer';
import { Sparkles, Terminal, Shield, ArrowRight } from 'lucide-react';
import { playUiClick } from '../Utils/sound';

export default function Home({
  services,
  projects,
  techStack,
  clients,
  teamMembers,
  stats,
  studioInfo,
}) {
  const [prefillEstimate, setPrefillEstimate] = useState(null);

  const handleSelectEstimate = (estimateData) => {
    setPrefillEstimate(estimateData);
  };

  return (
    <div className="min-h-screen bg-[#05070e] text-slate-100 relative selection:bg-cyan-500 selection:text-black">
      <Head>
        <title>Lab AR | Extended Reality (XR) & Game Development Studio</title>
        <meta
          name="description"
          content="Discover our expertise in XR (AR/VR/MR), Game Development, WebGL 3D, and immersive digital experiences. Leading IT & XR innovation company in Bangladesh, based at ICT Tower, Dhaka."
        />
        <meta
          name="keywords"
          content="Lab AR, XR Bangladesh, Game Development Dhaka, Virtual Reality, Augmented Reality, WebGL, Three.js, Kinect Games, ICT Tower Agargaon"
        />
        <meta property="og:title" content="Lab AR - Pioneering Extended Reality & Game Development" />
        <meta
          property="og:description"
          content="Engineering next-generation XR, WebGL, and high-performance game worlds from ICT Tower, Agargaon, Dhaka."
        />
        <meta property="og:type" content="website" />
      </Head>

      {/* Interactive WebGL 3D Spatial Constellation Canvas */}
      <ThreeBackground />

      {/* Cyber Grid Background lines */}
      <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none z-0" />

      {/* App Container */}
      <div className="relative z-10 flex flex-col">
        {/* Navigation Bar */}
        <Navbar studioInfo={studioInfo} />

        {/* Hero Section */}
        <Hero stats={stats} studioInfo={studioInfo} />

        {/* Interactive 3D WebGL Sandbox Section */}
        <section id="sandbox" className="relative py-20 border-t border-white/5 bg-[#05070e]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SPATIAL REAL-TIME 3D SANDBOX</span>
              </div>
              <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-extrabold text-white">
                Experience Interactive 3D In Your Browser
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                No plug-ins, no app downloads required. Inspect 3D models with real-time lighting, materials, and wireframe shaders powered by Three.js.
              </p>
            </div>

            <ThreeModelViewer />
          </div>
        </section>

        {/* Core Services Section */}
        <ServicesSection services={services} />

        {/* Portfolio & Case Studies Section */}
        <ProjectsSection projects={projects} />

        {/* Interactive Scope & Cost Estimator */}
        <ProjectEstimator onSelectEstimate={handleSelectEstimate} />

        {/* Technology Matrix */}
        <TechMatrix techStack={techStack} />

        {/* Core Architects & Team Section */}
        <TeamSection teamMembers={teamMembers} />

        {/* Global Clients & Completed Deliverables Showcase */}
        <ClientsMarquee clients={clients} />

        {/* Studio Location & Dispatch Contact Section */}
        <ContactSection studioInfo={studioInfo} prefillData={prefillEstimate} />

        {/* Footer */}
        <Footer studioInfo={studioInfo} />
      </div>
    </div>
  );
}
