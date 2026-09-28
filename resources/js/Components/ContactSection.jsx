import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Check,
  Copy,
  Clock,
  Sparkles,
  ShieldCheck,
  Building2,
  ExternalLink,
} from 'lucide-react';
import { playUiClick, playUiHover, playLaserPulse } from '../Utils/sound';

export default function ContactSection({ studioInfo, prefillData }) {
  const [copiedField, setCopiedField] = useState(null);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const [data, setDataState] = useState({
    name: '',
    email: '',
    company: '',
    service: prefillData?.service || 'Extended Reality (XR)',
    budget: '$5,000 - $15,000',
    timeline: prefillData?.timeline || '6 - 8 Weeks',
    message: prefillData?.details || '',
  });

  const setData = (key, value) => {
    setDataState(prev => ({ ...prev, [key]: value }));
  };

  const reset = () => {
    setDataState({
      name: '',
      email: '',
      company: '',
      service: prefillData?.service || 'Extended Reality (XR)',
      budget: '$5,000 - $15,000',
      timeline: prefillData?.timeline || '6 - 8 Weeks',
      message: '',
    });
  };

  // Sync if prefill updates
  React.useEffect(() => {
    if (prefillData) {
      if (prefillData.service) setData('service', prefillData.service);
      if (prefillData.timeline) setData('timeline', prefillData.timeline);
      if (prefillData.details) setData('message', prefillData.details);
    }
  }, [prefillData]);

  const copyToClipboard = (text, fieldName) => {
    playUiClick();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playLaserPulse();
    setProcessing(true);

    try {
      // If Inertia router is globally available
      const inertiaRouter = window.__inertia_router;
      if (inertiaRouter) {
        inertiaRouter.post('/contact', data, {
          preserveScroll: true,
          onSuccess: () => {
            setSubmittedSuccess(true);
            reset();
            setProcessing(false);
          },
        });
        return;
      }
    } catch {}

    // Standalone / Static fallback
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('lab_ar_inquiries');
        const list = stored ? JSON.parse(stored) : [];
        list.unshift({
          id: Date.now(),
          name: data.name,
          email: data.email,
          company: data.company,
          service: data.service,
          budget: data.budget,
          timeline: data.timeline,
          message: data.message,
          status: 'new',
          created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
        });
        localStorage.setItem('lab_ar_inquiries', JSON.stringify(list));
      }
    } catch {}

    setTimeout(() => {
      setSubmittedSuccess(true);
      reset();
      setProcessing(false);
    }, 600);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#05070e] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Studio Information & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                <Building2 className="w-3.5 h-3.5" />
                <span>ICT TOWER • RESEARCH HEADQUARTERS</span>
              </div>

              <h2 className="font-['Outfit'] text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Initiate Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
                  XR Odyssey
                </span>
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Whether you need high-fidelity Virtual Reality training, a WebGL 3D product showcase, or a full-scale game production, our engineers at ICT Tower, Dhaka are ready to consult.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-3.5">
              {/* Address Card */}
              <div className="p-5 rounded-2xl bg-[#080d20] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>PHYSICAL STUDIO</span>
                  </span>
                  <span className="text-slate-400">AGARGAON, DHAKA</span>
                </div>
                <div className="text-sm font-semibold text-white leading-snug">
                  {studioInfo?.address || 'E-14/X, ICT Tower (14th Floor), Agargaon, Dhaka - 1207, Bangladesh.'}
                </div>
                <div className="flex items-center gap-3 pt-2 text-xs">
                  <a
                    href="https://maps.google.com/?q=ICT+Tower+Agargaon+Dhaka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-mono"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Phone / WhatsApp Card */}
              <div className="p-5 rounded-2xl bg-[#080d20] border border-white/10 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>DIRECT TELEPHONE / WHATSAPP</span>
                  </div>
                  <div className="font-['Space_Grotesk'] text-lg font-bold text-white">
                    {studioInfo?.phone || '+880 1834-219770'}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(studioInfo?.phoneRaw || '+8801834219770', 'phone')}
                    title="Copy Phone Number"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
                  >
                    {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href={`tel:${studioInfo?.phoneRaw || '+8801834219770'}`}
                    className="px-3.5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-black border border-cyan-500/40 text-xs font-semibold font-mono transition-all"
                  >
                    Call Now
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-[#080d20] border border-white/10 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Mail className="w-3.5 h-3.5 text-purple-400" />
                    <span>OFFICIAL ELECTRONIC MAIL</span>
                  </div>
                  <div className="font-['Space_Grotesk'] text-base font-bold text-white">
                    {studioInfo?.email || 'contact@lab-ar.xyz'}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(studioInfo?.email || 'contact@lab-ar.xyz', 'email')}
                    title="Copy Email"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
                  >
                    {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href={`mailto:${studioInfo?.email || 'contact@lab-ar.xyz'}`}
                    className="px-3.5 py-2 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500 hover:text-white border border-purple-500/40 text-xs font-semibold font-mono transition-all"
                  >
                    Write Email
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours & Guarantee */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{studioInfo?.hours || 'Sun - Thu: 10AM - 7PM (BST)'}</span>
              </div>
              <span className="text-cyan-400">RESPONSE &lt; 4 HOURS</span>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Request Terminal */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl p-7 sm:p-9 bg-gradient-to-b from-[#090f26] to-[#060a1a] border border-cyan-500/30 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                    PROJECT DISPATCH TERMINAL
                  </span>
                  <h3 className="font-['Outfit'] text-xl font-bold text-white">
                    Submit Technical Scope or RFP
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ONLINE</span>
                </div>
              </div>

              {submittedSuccess ? (
                <div className="p-8 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-center space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 mx-auto rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="font-['Outfit'] text-2xl font-bold text-white">
                    Transmission Acknowledged!
                  </h4>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you! Your technical project parameters have been routed directly to the lead engineering team at ICT Tower, Dhaka. We will review your requirements and reach out promptly.
                  </p>
                  <button
                    onClick={() => setSubmittedSuccess(false)}
                    className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-semibold text-xs uppercase tracking-wider transition-all"
                  >
                    Send Another Dispatch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">
                        Full Name / Contact Person *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tanvir Ahmed"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-400 text-white text-sm outline-none transition-all placeholder:text-slate-600"
                      />
                      {errors.name && (
                        <p className="text-xs text-rose-400 font-mono">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">
                        Corporate / Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. tanvir@enterprise.com"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-400 text-white text-sm outline-none transition-all placeholder:text-slate-600"
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-400 font-mono">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Studio / Enterprise Ltd."
                        value={data.company}
                        onChange={(e) => setData('company', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-400 text-white text-sm outline-none transition-all placeholder:text-slate-600"
                      />
                    </div>

                    {/* Primary Service */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">
                        Domain of Interest *
                      </label>
                      <select
                        value={data.service}
                        onChange={(e) => setData('service', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#070b18] border border-white/10 focus:border-cyan-400 text-white text-sm outline-none transition-all"
                      >
                        <option value="Extended Reality (XR)">Extended Reality (AR/VR/MR)</option>
                        <option value="Game Development & Motion">Game Development & Kinect Motion</option>
                        <option value="WebGL & 3D Interactive Web">WebGL & 3D Interactive Web</option>
                        <option value="Mobile App Development">Mobile App Development (Flutter)</option>
                        <option value="Enterprise Web & Software">Enterprise Web & Software (.NET/Laravel)</option>
                        <option value="Computer Vision & AI">Computer Vision & AI Diagnostics</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Budget Range */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">
                        Estimated Budget Bracket
                      </label>
                      <select
                        value={data.budget}
                        onChange={(e) => setData('budget', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#070b18] border border-white/10 focus:border-cyan-400 text-white text-sm outline-none transition-all"
                      >
                        <option value="$2,000 - $5,000">$2,000 - $5,000 (MVP / Prototype)</option>
                        <option value="$5,000 - $15,000">$5,000 - $15,000 (Full Production)</option>
                        <option value="$15,000 - $50,000">$15,000 - $50,000 (Enterprise / Game)</option>
                        <option value="$50,000+">$50,000+ (Multi-Platform Ecosystem)</option>
                      </select>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">
                        Target Delivery Timeline
                      </label>
                      <input
                        type="text"
                        value={data.timeline}
                        onChange={(e) => setData('timeline', e.target.value)}
                        placeholder="e.g. 6 - 8 Weeks"
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-400 text-white text-sm outline-none transition-all placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">
                      Project Scope & Engineering Objectives *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Outline your project vision, target audience, preferred platforms, or sensor requirements..."
                      value={data.message}
                      onChange={(e) => setData('message', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-400 text-white text-sm outline-none transition-all placeholder:text-slate-600 resize-none"
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-400 font-mono">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-black font-bold text-sm uppercase tracking-wider shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 stroke-[2.5]" />
                    <span>{processing ? 'Transmitting Specification...' : 'Transmit Project Dispatch to Lab AR'}</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>All inquiries handled under strict confidentiality & bilateral NDA.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
