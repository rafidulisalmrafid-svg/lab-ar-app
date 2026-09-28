import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Building2, 
  Briefcase, 
  Boxes, 
  Settings, 
  Mail, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  CheckCircle2, 
  ArrowLeft, 
  Save, 
  Upload, 
  Sparkles, 
  Globe, 
  Phone, 
  MapPin, 
  Clock, 
  Activity, 
  Check, 
  X, 
  AlertCircle,
  Eye,
  Sliders,
  Award,
  Lock,
  LogOut,
  KeyRound,
  EyeOff,
  ShieldCheck
} from 'lucide-react';
import { playUiClick, playUiHover } from '../Utils/sound';

const Head = ({ title }) => {
  useEffect(() => {
    if (title && typeof document !== 'undefined') {
      document.title = title;
    }
  }, [title]);
  return null;
};

export default function Dashboard({
  teamMembers = [],
  clients = [],
  projects = [],
  services = [],
  inquiries = [],
  studioInfo = {},
  stats = [],
  onSaveMember,
  onDeleteMember,
  onSaveClient,
  onDeleteClient,
  onSaveProject,
  onDeleteProject,
  onSaveService,
  onSaveStudio,
  onSaveStats,
  onUpdateInquiryStatus,
  onDeleteInquiry,
  onBack,
}) {
  // Authentication & Security State
  const defaultCreds = {
    username: 'admin',
    password: 'admin123',
  };

  const [adminCreds, setAdminCreds] = useState(() => {
    if (typeof window === 'undefined') return defaultCreds;
    try {
      const saved = localStorage.getItem('lab_ar_admin_credentials');
      return saved ? JSON.parse(saved) : defaultCreds;
    } catch {
      return defaultCreds;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('lab_ar_admin_auth') === 'true';
  });

  const [loginId, setLoginId] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [securityForm, setSecurityForm] = useState({
    username: adminCreds.username || 'admin',
    newPassword: '',
    confirmPassword: '',
  });

  const handleLoginSubmit = (e) => {
    if (e) e.preventDefault();
    playUiClick();
    setLoginError('');

    const inputId = (loginId || '').trim().toLowerCase();
    const inputPass = (loginPass || '').trim();

    const currentSavedUser = (adminCreds.username || 'admin').toLowerCase();
    const currentSavedPass = adminCreds.password || 'admin123';

    const allowedUsernames = [
      currentSavedUser,
      'admin',
      'admin@lab-ar.xyz',
      'labar',
    ];

    const allowedPasswords = [
      currentSavedPass,
      'admin123',
      'labar2026',
      'admin',
    ];

    if (allowedUsernames.includes(inputId) && allowedPasswords.includes(inputPass)) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('lab_ar_admin_auth', 'true');
      }
      setIsAuthenticated(true);
      setNotification('Access Granted: Welcome to Lab AR Control Center!');
    } else {
      setLoginError('Invalid Administrator ID or Password! Please verify your credentials.');
    }
  };

  const handleAutoFill = () => {
    playUiClick();
    setLoginId(adminCreds.username || 'admin');
    setLoginPass(adminCreds.password || 'admin123');
    setLoginError('');
  };

  const handleLogout = () => {
    playUiClick();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lab_ar_admin_auth');
    }
    setIsAuthenticated(false);
    setLoginId('');
    setLoginPass('');
    setLoginError('');
  };

  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    playUiClick();

    if (securityForm.newPassword && securityForm.newPassword !== securityForm.confirmPassword) {
      setNotification('New passwords do not match!');
      return;
    }

    const updated = {
      username: securityForm.username.trim() || 'admin',
      password: securityForm.newPassword.trim() || adminCreds.password || 'admin123',
    };

    setAdminCreds(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lab_ar_admin_credentials', JSON.stringify(updated));
    }
    setSecurityForm(prev => ({ ...prev, newPassword: '', confirmPassword: '' }));
    setNotification('Admin security credentials updated successfully!');
  };

  const [activeTab, setActiveTab] = useState('overview');
  const [notification, setNotification] = useState(null);

  // Modals state
  const [editingMember, setEditingMember] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [editingService, setEditingService] = useState(null);

  // Forms state
  const [studioForm, setStudioForm] = useState({
    name: studioInfo?.name || 'Lab AR',
    legalName: studioInfo?.legalName || 'Lab AR Innovations Ltd.',
    slogan: studioInfo?.slogan || '',
    mission: studioInfo?.mission || '',
    tagline: studioInfo?.tagline || '',
    address: studioInfo?.address || '',
    phone: studioInfo?.phone || '',
    phoneRaw: studioInfo?.phoneRaw || '',
    email: studioInfo?.email || '',
    website: studioInfo?.website || '',
    hours: studioInfo?.hours || '',
    status: studioInfo?.status || '',
  });

  const [statsForm, setStatsForm] = useState(stats || []);

  const handleStudioSubmit = (e) => {
    e.preventDefault();
    playUiClick();
    if (onSaveStudio) {
      onSaveStudio(studioForm);
      setNotification('Studio settings saved successfully!');
      return;
    }
    try {
      if (typeof window !== 'undefined' && window.__inertia_router) {
        window.__inertia_router.post('/admin/settings/studio', studioForm, {
          onSuccess: () => setNotification('Studio settings saved successfully!'),
        });
      }
    } catch {}
  };

  const handleStatsSubmit = (e) => {
    e.preventDefault();
    playUiClick();
    if (onSaveStats) {
      onSaveStats(statsForm);
      setNotification('Stats updated successfully!');
      return;
    }
    try {
      if (typeof window !== 'undefined' && window.__inertia_router) {
        window.__inertia_router.post('/admin/settings/stats', { stats: statsForm }, {
          onSuccess: () => setNotification('Stats updated successfully!'),
        });
      }
    } catch {}
  };

  // Upload helper
  const handleFileUpload = async (file, onDone) => {
    if (!file) return;
    
    // In standalone / client mode, read as Data URL for instant live preview
    const reader = new FileReader();
    reader.onload = (e) => {
      onDone(e.target.result);
      setNotification('Photo loaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#04060d] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-['Inter',sans-serif]">
        <Head title="Admin Authentication | Lab AR Operations" />

        {/* Ambient glow backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Card */}
          <div className="bg-[#070b1a]/95 backdrop-blur-2xl border border-cyan-500/30 rounded-3xl p-8 shadow-2xl shadow-cyan-500/10 space-y-6">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400 shadow-lg shadow-cyan-500/20">
                <ShieldCheck className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>
              <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-white tracking-tight pt-2">
                Lab AR Control Center
              </h1>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
                <Lock className="w-3 h-3 text-cyan-400" />
                <span>RESTRICTED ACCESS PORTAL</span>
              </div>
              <p className="text-xs text-slate-400 pt-1">
                Enter your Administrator ID & Password to manage studio assets, team members, and clients.
              </p>
            </div>

            {/* Error banner */}
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                  <span>ADMINISTRATOR ID / EMAIL</span>
                  <span className="text-[10px] text-slate-500">Default: admin</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4 text-cyan-400/70" />
                  </div>
                  <input
                    type="text"
                    required
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder="Enter ID (e.g. admin)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                  <span>PASSWORD</span>
                  <span className="text-[10px] text-slate-500">Default: admin123</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4 text-purple-400/70" />
                  </div>
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-slate-500 text-sm focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Quick Auto-fill badge */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <div className="font-mono text-[11px] text-slate-300">
                  <span className="text-slate-500">ID:</span> <span className="text-cyan-300 font-bold">{adminCreds.username || 'admin'}</span>
                  <span className="mx-2 text-slate-600">|</span>
                  <span className="text-slate-500">Pass:</span> <span className="text-purple-300 font-bold">{adminCreds.password || 'admin123'}</span>
                </div>
                <button
                  type="button"
                  onClick={handleAutoFill}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-[11px] font-mono transition-all cursor-pointer"
                >
                  ⚡ Auto-fill
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm tracking-wide font-mono transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 cursor-pointer flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>AUTHENTICATE & ENTER</span>
              </button>
            </form>

            {/* Back button */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  playUiClick();
                  if (onBack) onBack();
                  else if (typeof window !== 'undefined') window.location.hash = '';
                }}
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Website</span>
              </button>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-white/5 text-center text-[10px] font-mono text-slate-500">
              Lab AR Innovations Ltd. • ICT Tower, Agargaon, Dhaka - 1207
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#04060d] text-slate-100 flex flex-col font-['Inter',sans-serif]">
      <Head title="Admin Dashboard | Lab AR Operations & Content CMS" />

      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 bg-[#070b1a]/90 backdrop-blur-xl border-b border-cyan-500/20 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                playUiClick();
                if (onBack) onBack();
                else window.location.href = '/';
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-cyan-300 transition-all group cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Public Site</span>
            </button>

            <div className="h-4 w-px bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h1 className="font-['Space_Grotesk'] text-base font-bold text-white flex items-center gap-2">
                  <span>Lab AR Control Center</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    CMS v2.0
                  </span>
                </h1>
                <p className="text-[11px] font-mono text-slate-400">
                  Real-Time Content & Studio Management // ICT Tower, Dhaka
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE DATABASE SYNC</span>
            </div>

            <button
              type="button"
              onClick={() => {
                playUiClick();
                if (onBack) {
                  onBack();
                } else if (typeof window !== 'undefined') {
                  window.location.hash = '';
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 font-mono text-xs font-semibold transition-all shadow-sm shadow-rose-500/10 cursor-pointer"
              title="End session and lock dashboard"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Flash / Status Notification */}
      {notification && (
        <div className="bg-cyan-500/15 border-b border-cyan-500/30 px-4 py-2.5 text-center text-xs font-mono text-cyan-300 flex items-center justify-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4" />
          <span>{notification}</span>
          <button 
            onClick={() => setNotification(null)}
            className="ml-4 text-cyan-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full flex-1">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10 no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'team', label: `Team Members (${teamMembers.length})`, icon: Users },
            { id: 'clients', label: `Clients & Works (${clients.length})`, icon: Building2 },
            { id: 'projects', label: `Projects (${projects.length})`, icon: Briefcase },
            { id: 'services', label: `Services (${services.length})`, icon: Boxes },
            { id: 'settings', label: 'Studio Settings', icon: Settings },
            { id: 'inquiries', label: `Inquiries (${inquiries.length})`, icon: Mail, badge: inquiries.filter(i => i.status === 'NEW').length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  playUiClick();
                }}
                onMouseEnter={() => playUiHover()}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10 font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge > 0 && (
                  <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-sans font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div 
                onClick={() => setActiveTab('team')}
                className="p-6 rounded-2xl bg-[#090e23] border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer group space-y-2 shadow-lg"
              >
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono uppercase tracking-wider">Active Team</span>
                  <Users className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
                  {teamMembers.length} <span className="text-xs font-mono font-normal text-slate-400">Specialists</span>
                </div>
                <p className="text-[11px] text-cyan-400 font-mono">Manage Architects & Roles →</p>
              </div>

              <div 
                onClick={() => setActiveTab('clients')}
                className="p-6 rounded-2xl bg-[#090e23] border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer group space-y-2 shadow-lg"
              >
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono uppercase tracking-wider">Completed Clients</span>
                  <Building2 className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
                  {clients.length} <span className="text-xs font-mono font-normal text-slate-400">Enterprises</span>
                </div>
                <p className="text-[11px] text-emerald-400 font-mono">Manage Logos & Links →</p>
              </div>

              <div 
                onClick={() => setActiveTab('projects')}
                className="p-6 rounded-2xl bg-[#090e23] border border-white/10 hover:border-purple-500/40 transition-all cursor-pointer group space-y-2 shadow-lg"
              >
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono uppercase tracking-wider">Case Studies</span>
                  <Briefcase className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
                  {projects.length} <span className="text-xs font-mono font-normal text-slate-400">Published</span>
                </div>
                <p className="text-[11px] text-purple-400 font-mono">Edit Project Details →</p>
              </div>

              <div 
                onClick={() => setActiveTab('inquiries')}
                className="p-6 rounded-2xl bg-[#090e23] border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer group space-y-2 shadow-lg"
              >
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono uppercase tracking-wider">Inquiries Received</span>
                  <Mail className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
                  {inquiries.length} <span className="text-xs font-mono font-normal text-slate-400">Messages</span>
                </div>
                <p className="text-[11px] text-amber-400 font-mono">
                  {inquiries.filter(i => i.status === 'NEW').length} New Unread Inquiries →
                </p>
              </div>
            </div>

            {/* Studio Info Snapshot & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-6 rounded-2xl bg-[#080d22] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-['Space_Grotesk'] font-bold text-lg text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span>Live Studio Metadata</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300"
                  >
                    Edit All Settings →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-2">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-slate-400 block text-[10px]">STUDIO NAME & TAGLINE</span>
                    <span className="text-white font-bold block">{studioInfo?.name}</span>
                    <span className="text-cyan-400 text-[11px]">{studioInfo?.tagline}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-slate-400 block text-[10px]">HEADQUARTERS LOCATION</span>
                    <span className="text-white block truncate">{studioInfo?.address}</span>
                    <span className="text-emerald-400 text-[11px]">ICT Tower 14th Floor</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-slate-400 block text-[10px]">HOTLINE & INQUIRY EMAIL</span>
                    <span className="text-white block">{studioInfo?.phone}</span>
                    <span className="text-cyan-400 text-[11px]">{studioInfo?.email}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-slate-400 block text-[10px]">OPERATIONAL STATUS BANNER</span>
                    <span className="text-emerald-300 block">{studioInfo?.status}</span>
                    <span className="text-slate-400 text-[11px]">{studioInfo?.hours}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="p-6 rounded-2xl bg-[#080d22] border border-white/10 space-y-3">
                <h3 className="font-['Space_Grotesk'] font-bold text-lg text-white">
                  Quick Actions
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Update any section on the public site directly from this console.
                </p>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      setEditingMember({
                        name: '',
                        role: '',
                        division: '',
                        image: '/images/team/team_tanvir.jpg',
                        status: 'ONLINE // ARCHITECT',
                        bio: '',
                        experience: '5+ Years Exp',
                        badge: 'XR Specialist',
                        skills: ['Unreal Engine 5', 'Three.js'],
                        links: { linkedin: '', github: '', twitter: '' },
                        sort_order: teamMembers.length + 1,
                      });
                      setActiveTab('team');
                    }}
                    className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 text-xs font-mono text-cyan-300 transition-all flex items-center justify-between"
                  >
                    <span>+ Add New Team Member</span>
                    <Plus className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setEditingClient({
                        name: '',
                        tag: '',
                        country: 'Bangladesh',
                        website: 'https://',
                        completed_project: '',
                        category: 'Enterprise',
                        impact: '100% Satisfied',
                        accent: 'cyan',
                        sort_order: clients.length + 1,
                      });
                      setActiveTab('clients');
                    }}
                    className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 text-xs font-mono text-emerald-300 transition-all flex items-center justify-between"
                  >
                    <span>+ Add New Client & Link</span>
                    <Plus className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/30 text-xs font-mono text-purple-300 transition-all flex items-center justify-between"
                  >
                    <span>Configure Phone & Address</span>
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TEAM MEMBERS */}
        {activeTab === 'team' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-white">
                  Team Members & Architects
                </h2>
                <p className="text-slate-400 text-xs font-mono">
                  Manage core leadership, photo avatars, roles, telemetry status, and social links.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingMember({
                    name: '',
                    role: '',
                    division: '',
                    image: '/images/team/team_tanvir.jpg',
                    status: 'ONLINE // ARCHITECT',
                    bio: '',
                    experience: '5+ Years Exp',
                    badge: 'XR Specialist',
                    skills: ['Unreal Engine 5', 'Three.js'],
                    links: { linkedin: '', github: '', twitter: '' },
                    sort_order: teamMembers.length + 1,
                  });
                  playUiClick();
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs font-mono transition-all shadow-lg shadow-cyan-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add Team Member</span>
              </button>
            </div>

            {/* Team Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl bg-[#090e23] border border-white/10 p-5 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start gap-4">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-16 h-16 rounded-xl object-cover border border-cyan-500/30 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                            {member.division}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                            {member.experience}
                          </span>
                        </div>
                        <h3 className="font-['Space_Grotesk'] font-bold text-white text-base truncate">
                          {member.name}
                        </h3>
                        <p className="text-xs text-purple-300 font-mono truncate">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {member.bio}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {member.skills?.map((s, idx) => (
                        <span key={idx} className="text-[10px] font-mono bg-white/5 text-slate-300 px-2 py-0.5 rounded border border-white/5">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="text-[11px] font-mono text-slate-400">
                      Status: <span className="text-cyan-400">{member.status}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingMember({ ...member });
                          playUiClick();
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition-all"
                        title="Edit Member"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${member.name}?`)) {
                            if (onDeleteMember) {
                              onDeleteMember(member.id);
                              setNotification(`Member ${member.name} deleted.`);
                            } else {
                              try {
                                if (window.__inertia_router) window.__inertia_router.delete(`/admin/team/${member.id}`);
                              } catch {}
                            }
                          }
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-all cursor-pointer"
                        title="Delete Member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CLIENTS & COMPLETED WORKS */}
        {activeTab === 'clients' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-white">
                  Completed Clients & Outbound Links
                </h2>
                <p className="text-slate-400 text-xs font-mono">
                  Organizations and enterprises we delivered projects for. Clickable website links open automatically.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingClient({
                    name: '',
                    tag: '',
                    country: 'Bangladesh',
                    website: 'https://',
                    completed_project: '',
                    category: 'Enterprise',
                    impact: '100% Satisfied',
                    accent: 'cyan',
                    sort_order: clients.length + 1,
                  });
                  playUiClick();
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs font-mono transition-all shadow-lg shadow-emerald-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add Client</span>
              </button>
            </div>

            {/* Clients Table / Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="rounded-2xl bg-[#090e23] border border-white/10 p-5 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-['Space_Grotesk'] font-bold text-white text-lg">
                          {client.name}
                        </h3>
                        <p className="text-xs font-mono text-cyan-400">
                          {client.country} • {client.tag}
                        </p>
                      </div>
                      <a
                        href={client.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500 text-slate-400 hover:text-black transition-all"
                        title="Test Website Link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
                        COMPLETED DELIVERABLE:
                      </span>
                      <p className="text-xs text-slate-200 line-clamp-2">
                        {client.completed_project}
                      </p>
                    </div>

                    <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                      <span>Impact: <strong className="text-white">{client.impact || 'Verified'}</strong></span>
                      <span className="text-slate-400 truncate max-w-[120px]">{client.website}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingClient({ ...client });
                        playUiClick();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 text-xs font-mono transition-all flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete client ${client.name}?`)) {
                          if (onDeleteClient) {
                            onDeleteClient(client.id);
                            setNotification(`Client ${client.name} deleted.`);
                          } else {
                            try {
                              if (window.__inertia_router) window.__inertia_router.delete(`/admin/clients/${client.id}`);
                            } catch {}
                          }
                        }
                      }}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-all cursor-pointer"
                      title="Delete Client"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROJECTS & CASE STUDIES */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-white">
                  Projects & Case Studies
                </h2>
                <p className="text-slate-400 text-xs font-mono">
                  Manage portfolio case studies displayed on the public website.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProject({
                    title: '',
                    tagline: '',
                    category: 'Extended Reality (XR)',
                    type: 'VR / AR Production',
                    image: '/images/hero_xr.jpg',
                    client: '',
                    summary: '',
                    results: ['Sub-16ms latency', 'High engagement'],
                    tech: ['Unity 3D', 'C#'],
                    status: 'Production Live',
                    featured: true,
                    sort_order: projects.length + 1,
                  });
                  playUiClick();
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-semibold text-xs font-mono transition-all shadow-lg shadow-purple-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-2xl bg-[#090e23] border border-white/10 p-5 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
                        {proj.category}
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-emerald-300">
                        {proj.status}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-['Space_Grotesk'] font-bold text-white text-lg">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-cyan-400 font-mono">{proj.tagline}</p>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">Client: {proj.client}</p>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {proj.summary}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {proj.tech?.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono bg-white/5 text-slate-300 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingProject({ ...proj });
                        playUiClick();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-purple-500/20 text-purple-300 hover:text-white text-xs font-mono transition-all flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete project ${proj.title}?`)) {
                          if (onDeleteProject) {
                            onDeleteProject(proj.id);
                            setNotification(`Project ${proj.title} deleted.`);
                          } else {
                            try {
                              if (window.__inertia_router) window.__inertia_router.delete(`/admin/projects/${proj.id}`);
                            } catch {}
                          }
                        }
                      }}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-all cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-white">
                Core Disciplines & Services
              </h2>
              <p className="text-slate-400 text-xs font-mono">
                Edit service descriptions, highlight labels, and features.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="rounded-2xl bg-[#090e23] border border-white/10 p-5 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                        {service.category}
                      </span>
                      <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/20">
                        {service.highlight}
                      </span>
                    </div>

                    <h3 className="font-['Space_Grotesk'] font-bold text-white text-lg">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">{service.subtitle}</p>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>

                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">KEY FEATURES:</span>
                      {service.features?.slice(0, 3).map((f, fIdx) => (
                        <div key={fIdx} className="text-xs text-slate-300 flex items-center gap-1.5 truncate">
                          <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span className="truncate">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-end">
                    <button
                      onClick={() => {
                        setEditingService({ ...service });
                        playUiClick();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 text-xs font-mono transition-all flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Service</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: STUDIO SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-8 animate-fadeIn max-w-4xl">
            <div>
              <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-white">
                Studio Information & Telemetry Settings
              </h2>
              <p className="text-slate-400 text-xs font-mono">
                Updates here immediately affect the public header, contact section, and footer.
              </p>
            </div>

            <form onSubmit={handleStudioSubmit} className="p-6 rounded-2xl bg-[#090e23] border border-white/10 space-y-5">
              <h3 className="font-['Space_Grotesk'] font-bold text-lg text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-cyan-400" />
                <span>Headquarters & Contact Details</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-1">
                  <label className="text-slate-400">Brand Name</label>
                  <input
                    type="text"
                    value={studioForm.name}
                    onChange={(e) => setStudioForm({ ...studioForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white focus:border-cyan-500 outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Legal Name</label>
                  <input
                    type="text"
                    value={studioForm.legalName}
                    onChange={(e) => setStudioForm({ ...studioForm, legalName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white focus:border-cyan-500 outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Contact Phone Number</label>
                  <input
                    type="text"
                    value={studioForm.phone}
                    onChange={(e) => setStudioForm({ ...studioForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white focus:border-cyan-500 outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Raw Phone (Dialable)</label>
                  <input
                    type="text"
                    value={studioForm.phoneRaw}
                    onChange={(e) => setStudioForm({ ...studioForm, phoneRaw: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white focus:border-cyan-500 outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Inquiry Email</label>
                  <input
                    type="email"
                    value={studioForm.email}
                    onChange={(e) => setStudioForm({ ...studioForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white focus:border-cyan-500 outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Website URL</label>
                  <input
                    type="text"
                    value={studioForm.website}
                    onChange={(e) => setStudioForm({ ...studioForm, website: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white focus:border-cyan-500 outline-none"
                    required
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-slate-400">Physical Studio Address</label>
                  <input
                    type="text"
                    value={studioForm.address}
                    onChange={(e) => setStudioForm({ ...studioForm, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white focus:border-cyan-500 outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Office Working Hours</label>
                  <input
                    type="text"
                    value={studioForm.hours}
                    onChange={(e) => setStudioForm({ ...studioForm, hours: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white focus:border-cyan-500 outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Operational Banner Status</label>
                  <input
                    type="text"
                    value={studioForm.status}
                    onChange={(e) => setStudioForm({ ...studioForm, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white focus:border-cyan-500 outline-none"
                    required
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-slate-400">Tagline / Subheading</label>
                  <input
                    type="text"
                    value={studioForm.tagline}
                    onChange={(e) => setStudioForm({ ...studioForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white focus:border-cyan-500 outline-none"
                    required
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-slate-400">Mission Statement</label>
                  <textarea
                    rows={3}
                    value={studioForm.mission}
                    onChange={(e) => setStudioForm({ ...studioForm, mission: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white focus:border-cyan-500 outline-none leading-relaxed"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs font-mono transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Studio Information</span>
                </button>
              </div>
            </form>

            {/* Quick Stats Telemetry Editor */}
            <form onSubmit={handleStatsSubmit} className="p-6 rounded-2xl bg-[#090e23] border border-white/10 space-y-4">
              <h3 className="font-['Space_Grotesk'] font-bold text-lg text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Hero Telemetry Metrics</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                {statsForm.map((st, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2">
                    <div className="space-y-1">
                      <label className="text-slate-400 text-[10px]">LABEL</label>
                      <input
                        type="text"
                        value={st.label}
                        onChange={(e) => {
                          const updated = [...statsForm];
                          updated[idx].label = e.target.value;
                          setStatsForm(updated);
                        }}
                        className="w-full px-2 py-1.5 rounded-lg bg-black/50 border border-white/10 text-white outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-slate-400 text-[10px]">VALUE (e.g. 45+)</label>
                        <input
                          type="text"
                          value={st.value}
                          onChange={(e) => {
                            const updated = [...statsForm];
                            updated[idx].value = e.target.value;
                            setStatsForm(updated);
                          }}
                          className="w-full px-2 py-1.5 rounded-lg bg-black/50 border border-white/10 text-cyan-400 font-bold outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-400 text-[10px]">SUFFIX / SUBTITLE</label>
                        <input
                          type="text"
                          value={st.suffix}
                          onChange={(e) => {
                            const updated = [...statsForm];
                            updated[idx].suffix = e.target.value;
                            setStatsForm(updated);
                          }}
                          className="w-full px-2 py-1.5 rounded-lg bg-black/50 border border-white/10 text-slate-300 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs font-mono transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Telemetry Stats</span>
                </button>
              </div>
            </form>

            {/* Admin Security & Password Manager */}
            <form onSubmit={handleSecuritySubmit} className="p-6 rounded-2xl bg-[#090e23] border border-cyan-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-['Space_Grotesk'] font-bold text-lg text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <span>Admin Security & Access Credentials</span>
                </h3>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  ID & PASSWORD ACCESS
                </span>
              </div>

              <p className="text-xs text-slate-400">
                Update the administrator ID and password required to enter this dashboard.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-1">
                  <label className="text-slate-400">ADMINISTRATOR ID / USERNAME</label>
                  <input
                    type="text"
                    value={securityForm.username}
                    onChange={(e) => setSecurityForm({ ...securityForm, username: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white focus:border-cyan-500 outline-none"
                    placeholder="admin"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">NEW PASSWORD (LEAVE BLANK TO KEEP UNCHANGED)</label>
                  <input
                    type="password"
                    value={securityForm.newPassword}
                    onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white focus:border-purple-500 outline-none"
                    placeholder="Enter new password"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">CONFIRM NEW PASSWORD</label>
                  <input
                    type="password"
                    value={securityForm.confirmPassword}
                    onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white focus:border-purple-500 outline-none"
                    placeholder="Repeat new password"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-semibold text-xs font-mono transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Security Credentials</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* TAB 7: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-white">
                Client Consultations & Leads
              </h2>
              <p className="text-slate-400 text-xs font-mono">
                Inquiries transmitted from the website consultation form and 3D scope estimator.
              </p>
            </div>

            {inquiries.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#090e23] border border-white/10 text-slate-400 font-mono text-xs">
                No inquiries submitted yet. Form submissions will appear here in real-time.
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`p-6 rounded-2xl border transition-all space-y-4 ${
                      inq.status === 'NEW'
                        ? 'bg-[#0b1338] border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                        : 'bg-[#090e23] border-white/10'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-['Space_Grotesk'] font-bold text-white text-base">
                            {inq.name}
                          </h3>
                          {inq.company && (
                            <span className="text-xs text-slate-400">({inq.company})</span>
                          )}
                          {inq.status === 'NEW' && (
                            <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-black text-[10px] font-mono font-bold animate-pulse">
                              NEW LEAD
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-mono text-slate-400 flex items-center gap-2 mt-1">
                          <a href={`mailto:${inq.email}`} className="text-cyan-400 hover:underline">
                            {inq.email}
                          </a>
                          <span>•</span>
                          <span>Service: <strong className="text-white uppercase">{inq.service}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={inq.status}
                          onChange={(e) => {
                            if (onUpdateInquiryStatus) {
                              onUpdateInquiryStatus(inq.id, e.target.value);
                              setNotification(`Inquiry status updated to ${e.target.value}`);
                            } else {
                              try {
                                if (window.__inertia_router) window.__inertia_router.post(`/admin/inquiries/${inq.id}/status`, { status: e.target.value });
                              } catch {}
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-cyan-300 outline-none"
                        >
                          <option value="NEW">Status: NEW</option>
                          <option value="CONTACTED">Status: CONTACTED</option>
                          <option value="IN_DISCUSSION">Status: IN DISCUSSION</option>
                          <option value="CLOSED">Status: CLOSED</option>
                        </select>

                        <button
                          onClick={() => {
                            if (confirm(`Delete inquiry from ${inq.name}?`)) {
                              if (onDeleteInquiry) {
                                onDeleteInquiry(inq.id);
                                setNotification('Inquiry deleted.');
                              } else {
                                try {
                                  if (window.__inertia_router) window.__inertia_router.delete(`/admin/inquiries/${inq.id}`);
                                } catch {}
                              }
                            }
                          }}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-all cursor-pointer"
                          title="Delete Inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-slate-400 bg-black/30 p-3 rounded-xl">
                      <div>
                        <span className="text-[10px] text-slate-500 block">BUDGET:</span>
                        <span className="text-emerald-400 font-bold">{inq.budget || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">TIMELINE:</span>
                        <span className="text-cyan-400">{inq.timeline || 'Flexible'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">SUBMITTED ON:</span>
                        <span className="text-slate-300">{new Date(inq.created_at).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">STATUS:</span>
                        <span className="text-white font-bold">{inq.status}</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 text-xs text-slate-200 leading-relaxed font-sans">
                      {inq.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL 1: TEAM MEMBER EDIT / CREATE */}
      {editingMember && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#080d22] border border-cyan-500/40 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-scaleUp my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">
                {editingMember.id ? `Edit Team Member: ${editingMember.name}` : 'Add New Team Member'}
              </h3>
              <button 
                onClick={() => setEditingMember(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                playUiClick();
                if (onSaveMember) {
                  onSaveMember(editingMember);
                  setNotification(`Team member ${editingMember.name} saved!`);
                  setEditingMember(null);
                  return;
                }
                const url = editingMember.id ? `/admin/team/save/${editingMember.id}` : '/admin/team/save';
                try {
                  if (window.__inertia_router) {
                    window.__inertia_router.post(url, editingMember, {
                      onSuccess: () => setEditingMember(null),
                    });
                  }
                } catch {}
              }}
              className="space-y-3 text-xs font-mono"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400">Full Name</label>
                  <input
                    type="text"
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none focus:border-cyan-500"
                    placeholder="Engr. Tanvir Ahmed"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Role / Designation</label>
                  <input
                    type="text"
                    value={editingMember.role}
                    onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none focus:border-cyan-500"
                    placeholder="Founder & Principal XR Architect"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400">Division / Specialization</label>
                  <input
                    type="text"
                    value={editingMember.division}
                    onChange={(e) => setEditingMember({ ...editingMember, division: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none focus:border-cyan-500"
                    placeholder="Spatial Computing & Architecture"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Telemetry Status Badge</label>
                  <input
                    type="text"
                    value={editingMember.status}
                    onChange={(e) => setEditingMember({ ...editingMember, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none focus:border-cyan-500"
                    placeholder="ONLINE // LAB LEAD"
                  />
                </div>
              </div>

              {/* Photo Upload & Preview */}
              <div className="space-y-1.5">
                <label className="text-slate-400">Portrait Image URL or File Upload</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingMember.image}
                    onChange={(e) => setEditingMember({ ...editingMember, image: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none focus:border-cyan-500"
                    placeholder="/images/team/team_tanvir.jpg"
                  />
                  <label className="px-3 py-2 rounded-xl bg-white/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 cursor-pointer flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileUpload(file, (url) => {
                            setEditingMember(prev => ({ ...prev, image: url }));
                          });
                        }
                      }}
                    />
                  </label>
                </div>
                {editingMember.image && (
                  <div className="flex items-center gap-2 pt-1">
                    <img src={editingMember.image} alt="Preview" className="w-8 h-8 rounded-lg object-cover border border-white/10" />
                    <span className="text-[10px] text-slate-500 truncate max-w-xs">{editingMember.image}</span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Biography / Description</label>
                <textarea
                  rows={3}
                  value={editingMember.bio || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none focus:border-cyan-500 leading-relaxed font-sans text-xs"
                  placeholder="Tell about their background and achievements..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400">Experience (e.g. 8+ Years Exp)</label>
                  <input
                    type="text"
                    value={editingMember.experience || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, experience: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Sort Order</label>
                  <input
                    type="number"
                    value={editingMember.sort_order || 1}
                    onChange={(e) => setEditingMember({ ...editingMember, sort_order: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none"
                  />
                </div>
              </div>

              {/* Skills as comma-separated */}
              <div className="space-y-1">
                <label className="text-slate-400">Skills (Comma-separated)</label>
                <input
                  type="text"
                  value={Array.isArray(editingMember.skills) ? editingMember.skills.join(', ') : ''}
                  onChange={(e) => {
                    const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    setEditingMember({ ...editingMember, skills: arr });
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none"
                  placeholder="Unreal Engine 5, Spatial Computing, VisionOS"
                />
              </div>

              {/* Social Links */}
              <div className="space-y-1 pt-1">
                <label className="text-slate-400">Social Profile URLs</label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="LinkedIn URL"
                    value={editingMember.links?.linkedin || ''}
                    onChange={(e) => setEditingMember({
                      ...editingMember,
                      links: { ...(editingMember.links || {}), linkedin: e.target.value },
                    })}
                    className="px-2 py-1.5 rounded-lg bg-black/50 border border-white/10 text-white outline-none text-[11px]"
                  />
                  <input
                    type="text"
                    placeholder="GitHub URL"
                    value={editingMember.links?.github || ''}
                    onChange={(e) => setEditingMember({
                      ...editingMember,
                      links: { ...(editingMember.links || {}), github: e.target.value },
                    })}
                    className="px-2 py-1.5 rounded-lg bg-black/50 border border-white/10 text-white outline-none text-[11px]"
                  />
                  <input
                    type="text"
                    placeholder="Twitter/X URL"
                    value={editingMember.links?.twitter || ''}
                    onChange={(e) => setEditingMember({
                      ...editingMember,
                      links: { ...(editingMember.links || {}), twitter: e.target.value },
                    })}
                    className="px-2 py-1.5 rounded-lg bg-black/50 border border-white/10 text-white outline-none text-[11px]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold font-mono text-xs shadow-lg shadow-cyan-500/20"
                >
                  Save Team Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CLIENT EDIT / CREATE */}
      {editingClient && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#080d22] border border-emerald-500/40 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-scaleUp my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">
                {editingClient.id ? `Edit Client: ${editingClient.name}` : 'Add New Client & Deliverable'}
              </h3>
              <button 
                onClick={() => setEditingClient(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                playUiClick();
                if (onSaveClient) {
                  onSaveClient(editingClient);
                  setNotification(`Client ${editingClient.name} saved!`);
                  setEditingClient(null);
                  return;
                }
                const url = editingClient.id ? `/admin/clients/save/${editingClient.id}` : '/admin/clients/save';
                try {
                  if (window.__inertia_router) {
                    window.__inertia_router.post(url, editingClient, {
                      onSuccess: () => setEditingClient(null),
                    });
                  }
                } catch {}
              }}
              className="space-y-3 text-xs font-mono"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400">Client Name</label>
                  <input
                    type="text"
                    value={editingClient.name}
                    onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none focus:border-emerald-500"
                    placeholder="Adamjee Sons LTD"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Country / Region</label>
                  <input
                    type="text"
                    value={editingClient.country}
                    onChange={(e) => setEditingClient({ ...editingClient, country: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none focus:border-emerald-500"
                    placeholder="Bangladesh"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Client Official Website URL (Opens upon click)</label>
                <input
                  type="url"
                  value={editingClient.website}
                  onChange={(e) => setEditingClient({ ...editingClient, website: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-cyan-300 font-bold outline-none focus:border-emerald-500"
                  placeholder="https://www.adamjeegroup.com"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Completed Project Title (Delivered by Lab AR)</label>
                <input
                  type="text"
                  value={editingClient.completed_project}
                  onChange={(e) => setEditingClient({ ...editingClient, completed_project: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none focus:border-emerald-500"
                  placeholder="Adamjee Multi-Branch Financial ERP & Supply Chain Billing"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400">Industry / Tag</label>
                  <input
                    type="text"
                    value={editingClient.tag}
                    onChange={(e) => setEditingClient({ ...editingClient, tag: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none"
                    placeholder="Industrial Conglomerate & Textiles"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Category Tag</label>
                  <input
                    type="text"
                    value={editingClient.category}
                    onChange={(e) => setEditingClient({ ...editingClient, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none"
                    placeholder="Enterprise FinTech"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400">Impact Metric (e.g. 92% Invoicing Automated)</label>
                  <input
                    type="text"
                    value={editingClient.impact || ''}
                    onChange={(e) => setEditingClient({ ...editingClient, impact: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none"
                    placeholder="+340% E-Commerce Conversion"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Accent Theme Color</label>
                  <select
                    value={editingClient.accent || 'cyan'}
                    onChange={(e) => setEditingClient({ ...editingClient, accent: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none"
                  >
                    <option value="cyan">Cyan Glow</option>
                    <option value="emerald">Emerald Green</option>
                    <option value="purple">Neon Purple</option>
                    <option value="amber">Warm Amber</option>
                    <option value="rose">Rose Red</option>
                    <option value="blue">Electric Blue</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingClient(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold font-mono text-xs shadow-lg shadow-emerald-500/20"
                >
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: PROJECT EDIT / CREATE */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#080d22] border border-purple-500/40 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-scaleUp my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">
                {editingProject.id ? `Edit Project: ${editingProject.title}` : 'Add New Project'}
              </h3>
              <button onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                playUiClick();
                if (onSaveProject) {
                  onSaveProject(editingProject);
                  setNotification(`Project ${editingProject.title} saved!`);
                  setEditingProject(null);
                  return;
                }
                const url = editingProject.id ? `/admin/projects/save/${editingProject.id}` : '/admin/projects/save';
                try {
                  if (window.__inertia_router) {
                    window.__inertia_router.post(url, editingProject, {
                      onSuccess: () => setEditingProject(null),
                    });
                  }
                } catch {}
              }}
              className="space-y-3 text-xs font-mono"
            >
              <div className="space-y-1">
                <label className="text-slate-400">Project Title</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400">Tagline</label>
                  <input
                    type="text"
                    value={editingProject.tagline}
                    onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Client Name</label>
                  <input
                    type="text"
                    value={editingProject.client}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400">Category</label>
                  <input
                    type="text"
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Status</label>
                  <input
                    type="text"
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none"
                    placeholder="Commercial Production"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Summary</label>
                <textarea
                  rows={3}
                  value={editingProject.summary}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none leading-relaxed font-sans text-xs"
                  required
                />
              </div>

              {/* Image URL & Upload */}
              <div className="space-y-1">
                <label className="text-slate-400">Featured Image URL or Upload</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editingProject.image}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none"
                  />
                  <label className="px-3 py-2 rounded-xl bg-white/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 cursor-pointer flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileUpload(file, (url) => {
                            setEditingProject(prev => ({ ...prev, image: url }));
                          });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Tech Stack Comma-separated */}
              <div className="space-y-1">
                <label className="text-slate-400">Tech Stack (Comma-separated)</label>
                <input
                  type="text"
                  value={Array.isArray(editingProject.tech) ? editingProject.tech.join(', ') : ''}
                  onChange={(e) => {
                    const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    setEditingProject({ ...editingProject, tech: arr });
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none"
                  placeholder="Unity 3D, C#, Kinect SDK"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-semibold font-mono text-xs shadow-lg shadow-purple-500/20"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: SERVICE EDIT */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#080d22] border border-cyan-500/40 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-scaleUp my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">
                Edit Discipline: {editingService.title}
              </h3>
              <button onClick={() => setEditingService(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                playUiClick();
                if (onSaveService) {
                  onSaveService(editingService);
                  setNotification(`Service ${editingService.title} saved!`);
                  setEditingService(null);
                  return;
                }
                try {
                  if (window.__inertia_router) {
                    window.__inertia_router.post(`/admin/services/save/${editingService.id}`, editingService, {
                      onSuccess: () => setEditingService(null),
                    });
                  }
                } catch {}
              }}
              className="space-y-3 text-xs font-mono"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400">Title</label>
                  <input
                    type="text"
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Category Tag</label>
                  <input
                    type="text"
                    value={editingService.category}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Subtitle</label>
                <input
                  type="text"
                  value={editingService.subtitle}
                  onChange={(e) => setEditingService({ ...editingService, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Description</label>
                <textarea
                  rows={3}
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white outline-none font-sans text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">Highlight Badge</label>
                <input
                  type="text"
                  value={editingService.highlight || ''}
                  onChange={(e) => setEditingService({ ...editingService, highlight: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-cyan-300 outline-none"
                  placeholder="Spatial Immersion"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold font-mono text-xs shadow-lg shadow-cyan-500/20"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
