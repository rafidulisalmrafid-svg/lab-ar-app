import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';

// Base URL helper for GitHub Pages
const baseUrl = import.meta.env.BASE_URL || '/';
const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${baseUrl}${cleanPath}`;
};

const initialServices = [
  {
    id: 'xr',
    title: 'Extended Reality (XR)',
    subtitle: 'Spatial Computing & Next-Gen Realities',
    category: 'AR / VR / MR',
    description: 'Architecting boundary-pushing Augmented Reality, Virtual Reality, and Mixed Reality experiences that transform enterprise workflows, immersive training, and spatial branding.',
    icon: 'Glasses',
    features: [
      'Enterprise VR Simulation & Training Environments',
      'Markerless & Location-Based WebAR Experiences',
      'Spatial Computing for Apple Vision Pro & Meta Quest 3',
      'Interactive Architectural & Industrial Digital Twins',
    ],
    tech: ['Unity', 'Unreal Engine 5', 'WebXR', 'ARKit', 'ARCore', 'OpenXR'],
    highlight: 'Spatial Immersion',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
  },
  {
    id: 'game-dev',
    title: 'Game Development',
    subtitle: 'High-Fidelity Gameplay & Motion Systems',
    category: 'Interactive Gaming',
    description: 'Engineering AAA-inspired game systems, physics simulations, cross-platform mechanics, and gesture/motion-controlled arcade experiences like Kinect-integrated sports and action titles.',
    icon: 'Gamepad2',
    features: [
      'Multiplatform Unreal & Unity Game Production',
      'Kinect, LiDAR & Computer Vision Motion Controls',
      'Physics Engines & Complex Particle Dynamics',
      'Gamified Serious Games & Behavioral Simulations',
    ],
    tech: ['C#', 'C++', 'Unreal Engine', 'Unity 3D', 'Kinect SDK', 'Blender'],
    highlight: 'Motion Controlled',
    gradient: 'from-purple-500/20 via-fuchsia-500/10 to-transparent',
  },
  {
    id: 'webgl',
    title: 'WebGL & 3D Interactive Web',
    subtitle: 'Zero-Install Browser Spatial Experiences',
    category: '3D Web',
    description: 'Bringing real-time GPU-accelerated 3D rendering right into the web browser. Custom GLSL shaders, 3D product configurators, and interactive 60+ FPS digital showrooms.',
    icon: 'Boxes',
    features: [
      'Custom Three.js & WebGL 3D Visualization Engines',
      'Real-Time 3D Product Customizers & AR Try-On',
      'Interactive Data Landscapes & Shader Artworks',
      'Ultra-Optimized Assets with GLTF/DRACO Compression',
    ],
    tech: ['Three.js', 'WebGL', 'GLSL Shaders', 'React Three Fiber', 'WebGPU'],
    highlight: '60 FPS In-Browser',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
  },
  {
    id: 'app-dev',
    title: 'Cross-Platform App Development',
    subtitle: 'Native Performance & AR Ecosystems',
    category: 'Mobile Engineering',
    description: 'Delivering fluid, high-performance iOS and Android applications integrating camera vision, sensor telemetry, geospatial mapping, and high-engagement consumer UX.',
    icon: 'Smartphone',
    features: [
      'Flutter & React Native Unified Codebases',
      'Native ARCore & ARKit Sensor Integrations',
      'Offline-First Sync & Cryptographic Verification',
      'Clean Architecture & Microservices Integration',
    ],
    tech: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase'],
    highlight: 'Native Speed',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
  },
  {
    id: 'web-dev',
    title: 'Enterprise Web & Cloud Platforms',
    subtitle: 'Scalable Architectures & Mission-Critical Software',
    category: 'Cloud & Web',
    description: 'Crafting robust full-stack web applications, secure enterprise billing suites, automated IoT dashboards, and high-concurrency cloud infrastructures.',
    icon: 'Globe',
    features: [
      'High-Concurrency Laravel, React & Inertia Architectures',
      'Enterprise .NET Core & Microservices Solutions',
      'Cryptographic QR Ticketing & Verification Engines',
      'Real-Time Telemetry & Smart City IoT Dashboards',
    ],
    tech: ['Laravel', 'React.js', 'Vue.js', '.NET Core', 'Node.js', 'PostgreSQL'],
    highlight: 'Enterprise Scale',
    gradient: 'from-indigo-500/20 via-blue-500/10 to-transparent',
  },
  {
    id: 'ai-cv',
    title: 'Computer Vision & AI Engineering',
    subtitle: 'Real-Time Edge Detection & Neural Interfaces',
    category: 'AI & Telemetry',
    description: 'Implementing intelligent real-time image processing, facial landmark mesh tracking, motion telemetry classification, and edge-deployed deep learning inference.',
    icon: 'Cpu',
    features: [
      'Real-Time Facial Landmark & Pose Estimation',
      'Edge AI Model Optimization via ONNX & TFLite',
      'Optical Marker & Spatial SLAM Positioning',
      'Industrial Quality Inspection & Defect Detection',
    ],
    tech: ['Python', 'OpenCV', 'MediaPipe', 'TensorFlow', 'PyTorch', 'FastAPI'],
    highlight: 'Edge AI Processing',
    gradient: 'from-rose-500/20 via-red-500/10 to-transparent',
  },
];

const initialProjects = [
  {
    id: 'captain-analyzen',
    title: 'Captain Analyzen: Motion Gaming',
    tagline: 'Gesture & Skeletal Motion-Tracking Sports Arcade Title',
    category: 'Interactive Gaming',
    type: 'Kinect Motion Arcade Game',
    image: getAssetUrl('images/captain_analyzen.jpg'),
    client: 'Tech IT Solutions / Interactive Entertainment',
    summary: 'A full-body motion-controlled interactive arcade game built for high-traffic experiential brand zones and competitive esports exhibitions in Dhaka.',
    results: [
      'Over 85,000+ registered player sessions',
      'Sub-16ms skeletal tracking response latency',
      'Zero calibration failure rate across all heights and lighting conditions',
    ],
    tech: ['Unity 3D', 'C#', 'Microsoft Kinect v2 SDK', 'Custom Skeletal Rig', 'HLSL Shaders'],
    status: 'Commercial Production',
    featured: true,
  },
  {
    id: 'vr-cognitive-sim',
    title: 'AeroVision VR Flight Maintenance',
    tagline: 'High-Precision Spatial VR Simulator for Aerospace Technicians',
    category: 'Extended Reality (XR)',
    type: 'Immersive VR Training Simulation',
    image: getAssetUrl('images/vr_research.jpg'),
    client: 'AeroDynamics Global Corp',
    summary: 'A hyper-realistic virtual reality training environment simulating complex jet turbine overhaul procedures and safety protocol certifications.',
    results: [
      'Reduced technician certification time by 48%',
      'Zero physical hardware damage during procedural training',
      '99.8% spatial fidelity replication of jet turbine assemblies',
    ],
    tech: ['Unreal Engine 5', 'OpenXR', 'Meta Quest Pro', 'Hand Tracking API', 'Nanite & Lumen'],
    status: 'Enterprise Deployed',
    featured: true,
  },
  {
    id: 'aura-ar-tryon',
    title: 'Aura Skincare & 3D AR Try-On',
    tagline: 'Zero-Install WebGL 3D Product Configurator & Facial AR Filter',
    category: 'WebGL & 3D Web',
    type: 'Browser-Based WebAR Experience',
    image: getAssetUrl('images/ar_skincare.jpg'),
    client: 'ZIVA Brand Studio (UAE & BD)',
    summary: 'An instantaneous, zero-download WebGL and WebAR product exploration experience enabling cosmetics consumers to inspect high-poly 3D bottles and try shades.',
    results: [
      '+340% increase in average session duration',
      'Instant load in under 1.4 seconds on 4G cellular networks',
      'Seamless checkout conversion rate uplift of +28%',
    ],
    tech: ['Three.js', 'React Three Fiber', 'GLTF/DRACO', 'MediaPipe FaceMesh', 'GLSL PBR'],
    status: 'Production Live',
    featured: true,
  },
  {
    id: 'cleancycle-iot',
    title: 'CleanCycle Smart City Telemetry',
    tagline: 'Automated Smart Urban Waste Management & Geospatial Tracking',
    category: 'Enterprise Software',
    type: 'Enterprise Web & IoT Platform',
    image: getAssetUrl('images/cleantech_city.jpg'),
    client: 'Municipal Corporation / CleanCycle',
    summary: 'A mission-critical municipal IoT dashboard and mobile driver suite managing automated waste container telemetry, route optimization algorithms, and landfill compliance.',
    results: [
      'Optimized municipal collection routes by 34%',
      'Monitored 1,200+ smart bins with automated fill alerts',
      'Saved over $220,000 annually in municipal diesel expenditures',
    ],
    tech: ['Laravel 12', 'React.js', 'Inertia.js', 'PostGIS', 'MQTT', 'TailwindCSS'],
    status: 'Deployed Live',
    featured: true,
  },
];

const initialClients = [
  {
    id: 'adamjee',
    name: 'Adamjee Sons LTD',
    tag: 'Industrial Conglomerate & Textiles',
    country: 'Bangladesh',
    website: 'https://www.adamjeegroup.com',
    completedProject: 'Adamjee Multi-Branch Financial ERP & Supply Chain Billing',
    category: 'Enterprise FinTech',
    impact: '92% Invoicing Automated',
    accent: 'cyan',
  },
  {
    id: 'tech-it',
    name: 'Tech IT Solutions',
    tag: 'Interactive Gaming & Hardware',
    country: 'Global',
    website: 'https://techit-bd.com',
    completedProject: 'Kinect Motion-Tracking Sports & Arcade Gaming Title',
    category: 'Motion Controlled Game',
    impact: 'Sub-16ms Motion Latency',
    accent: 'purple',
  },
  {
    id: 'beatnik-tech',
    name: 'Beatnik Technology',
    tag: 'Software & Digital Innovation Lab',
    country: 'Bangladesh',
    website: 'https://beatnik.technology',
    completedProject: 'High-Performance WebXR Showroom & Real-Time Cloud Sockets',
    category: 'WebXR & Cloud',
    impact: '60+ FPS Browser Experience',
    accent: 'emerald',
  },
  {
    id: 'beatnik-canada',
    name: 'Beatnik Canada',
    tag: 'Creative Digital XR Agency',
    country: 'Canada',
    website: 'https://beatnikagency.ca',
    completedProject: 'Spatial Brand Activation & 3D Interactive Web Showroom',
    category: 'Spatial Brand Studio',
    impact: '250k+ Engagements Across NA',
    accent: 'blue',
  },
  {
    id: 'ccj-b',
    name: 'CCJ-B',
    tag: 'Civil, Legal Rights & Climate Action',
    country: 'International',
    website: 'https://www.ccj-b.org',
    completedProject: 'Global Crisis Relief, Transparent Donor Ledger & Action Portal',
    category: 'Humanitarian Web App',
    impact: '$1.8M Raised in Disaster Aid',
    accent: 'teal',
  },
  {
    id: 'cleancycle',
    name: 'Clean Cycle',
    tag: 'Smart City CleanTech & IoT',
    country: 'Bangladesh',
    website: 'https://cleancycle.io',
    completedProject: 'Smart Waste Collection Telemetry & Fleet Tracking System',
    category: 'IoT Smart City Dashboard',
    impact: 'Real-Time Sensor Fleet',
    accent: 'emerald',
  },
  {
    id: 'bseed',
    name: 'BSEED Foundation',
    tag: 'Social Development & Ecology',
    country: 'Global',
    website: 'https://bseed-global.org',
    completedProject: 'EcoQuest Gamified Environmental Simulation & Tree Tracker',
    category: 'Gamified Simulation',
    impact: '60,000+ Students Engaged',
    accent: 'green',
  },
  {
    id: 'bist',
    name: 'BIST Institute',
    tag: 'Science & Technology University',
    country: 'Academic',
    website: 'https://bist.edu.bd',
    completedProject: 'Virtual Campus Digital Twin & AR STEM Interactive Lab',
    category: 'EdTech & Virtual Twin',
    impact: 'Adopted by 3,500+ Students',
    accent: 'amber',
  },
  {
    id: 'printnow',
    name: 'Print Now',
    tag: 'Next-Gen Print Logistics',
    country: 'National',
    website: 'https://printnow.com.bd',
    completedProject: 'Web-to-Print 3D Box Packaging Previewer & Order Engine',
    category: 'WebGL 3D Configurator',
    impact: 'Zero Pre-Press Errors',
    accent: 'rose',
  },
  {
    id: 'ziva',
    name: 'ZIVA Brand Studio',
    tag: 'Cosmetics & AR E-Commerce',
    country: 'UAE & BD',
    website: 'https://zivabrands.com',
    completedProject: 'AI-Powered Facial Mesh Augmented Reality Lipstick & Makeup Try-On',
    category: 'WebAR Try-On',
    impact: '+340% E-Commerce Conversion',
    accent: 'fuchsia',
  },
  {
    id: 'flymus',
    name: 'Flymus Logistics',
    tag: 'Aerospace & Cargo Telemetry',
    country: 'Singapore',
    website: 'https://flymuslogistics.com',
    completedProject: 'Spatial Jet Maintenance Visualizer & Global Cargo Tracking',
    category: 'Enterprise Aerospace 3D',
    impact: 'Real-Time Air Cargo Hub',
    accent: 'cyan',
  },
  {
    id: 'adpoint',
    name: 'AdPoint Activation',
    tag: 'Digital Brand Activation',
    country: 'Bangladesh',
    website: 'https://adpoint-global.com',
    completedProject: 'Interactive Gesture Wall & AR Experiential Booths',
    category: 'Experiential Brand AR',
    impact: '12+ Nationwide Expos',
    accent: 'indigo',
  },
];

const initialTeam = [
  {
    id: 'tanvir-ahmed',
    name: 'Engr. Tanvir Ahmed',
    role: 'Founder & Principal XR Architect',
    division: 'Spatial Computing & Architecture',
    image: getAssetUrl('images/team/team_tanvir.jpg'),
    status: 'ONLINE // LAB LEAD',
    bio: 'Visionary XR technologist pioneering spatial computing in South Asia. Specializing in Unreal Engine 5, VisionOS architectures, and large-scale industrial simulations at ICT Tower.',
    experience: '8+ Years Exp',
    badge: 'XR Systems Pioneer',
    skills: ['Unreal Engine 5', 'Spatial Computing', 'OpenXR', 'VisionOS', 'C++'],
    links: {
      linkedin: 'https://www.linkedin.com',
      github: 'https://github.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 'farhan-sadik',
    name: 'Farhan Sadik',
    role: 'Lead Game Developer & Motion Engineer',
    division: 'Interactive Gameplay & Physics',
    image: getAssetUrl('images/team/team_farhan.jpg'),
    status: 'ACTIVE // GAME ENGINE',
    bio: 'Gameplay physics specialist behind our Kinect motion-tracking sports titles and arcade experiences. Master of skeletal telemetry and high-framerate Unity DOTS pipelines.',
    experience: '6+ Years Exp',
    badge: 'Kinect & Physics Guru',
    skills: ['Unity 3D', 'C#', 'Kinect SDK', 'DOTS', 'Gameplay AI'],
    links: {
      linkedin: 'https://www.linkedin.com',
      github: 'https://github.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 'ayesha-rahman',
    name: 'Ayesha Rahman',
    role: 'Head of 3D Art & Virtual Environments',
    division: 'Creative & Spatial Worlds',
    image: getAssetUrl('images/team/team_ayesha.jpg'),
    status: 'CREATIVE // SHADER LAB',
    bio: 'Award-winning 3D environment artist crafting photorealistic cyber worlds, optimized game-ready digital twins, and real-time PBR material shaders.',
    experience: '7+ Years Exp',
    badge: 'Master 3D Sculptor',
    skills: ['Blender', 'Substance 3D', 'GLTF/DRACO', 'Unreal Lumen', 'Houdini'],
    links: {
      linkedin: 'https://www.linkedin.com',
      github: 'https://github.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 'rashedul-islam',
    name: 'Rashedul Islam',
    role: 'Senior Full-Stack & WebGL Engineer',
    division: 'Cloud & Browser 3D Engines',
    image: getAssetUrl('images/team/team_rashed.jpg'),
    status: 'DEPLOYING // CLOUD XR',
    bio: 'Engineers zero-install browser 3D configurators with Three.js, React, and robust Laravel cloud microservices capable of handling millions of concurrent hits.',
    experience: '6+ Years Exp',
    badge: 'WebGL & Shaders Specialist',
    skills: ['Three.js', 'React.js', 'Laravel', 'GLSL Shaders', 'WebGPU'],
    links: {
      linkedin: 'https://www.linkedin.com',
      github: 'https://github.com',
      twitter: 'https://twitter.com',
    },
  },
];

const initialStats = [
  { label: 'XR & 3D Deployments', value: '45+', suffix: 'Projects' },
  { label: 'Total Users Engaged', value: '1.2M+', suffix: 'Global Reach' },
  { label: 'Client Retention Rate', value: '99.4%', suffix: 'Satisfaction' },
  { label: 'Hardware Ecosystems', value: '12+', suffix: 'VR/AR/Motion' },
];

const initialStudioInfo = {
  name: 'Lab AR',
  legalName: 'Lab AR Innovations Ltd.',
  slogan: 'Innovating the Future: Pioneering Extended Reality & Game Development',
  mission: 'Empowering Innovation with Cutting-Edge Technology. Explore our expertise in Software Development, Extended Reality (XR), Game Development, and next-gen digital solutions tailored for your success.',
  tagline: 'Best IT & XR Innovation Company in Bangladesh',
  address: 'E-14/X, ICT Tower (14th Floor), Agargaon, Dhaka - 1207, Bangladesh',
  phone: '+880 1834-219770',
  phoneRaw: '+8801834219770',
  email: 'contact@lab-ar.xyz',
  website: 'https://www.lab-ar.xyz',
  coords: {
    lat: 23.7774,
    lng: 90.3789,
    landmark: 'ICT Tower, Agargaon, Dhaka',
  },
  hours: 'Sunday - Thursday: 10:00 AM - 7:00 PM (BST)',
  status: 'ONLINE - ACCEPTING Q3-Q4 COMMISSIONS',
};

const initialTechStack = [
  {
    category: 'Game & XR Engines',
    items: [
      { name: 'Unity 3D', level: 96, badge: 'C# / DOTS', type: 'Game & VR' },
      { name: 'Unreal Engine 5', level: 92, badge: 'Nanite / Lumen', type: 'AAA Graphics' },
      { name: 'Three.js / WebGL', level: 94, badge: 'GLSL / Shaders', type: 'Browser 3D' },
      { name: 'WebXR & OpenXR', level: 90, badge: 'Spatial API', type: 'Headset Native' },
    ],
  },
  {
    category: 'Modern Frontend & Mobile',
    items: [
      { name: 'React.js', level: 95, badge: 'Modern SPA / Next', type: 'Frontend' },
      { name: 'Inertia.js', level: 94, badge: 'Monolith / Modern', type: 'Full-Stack' },
      { name: 'Flutter', level: 91, badge: 'iOS & Android', type: 'Mobile XR' },
      { name: 'Vue.js', level: 88, badge: 'Composition API', type: 'Frontend' },
    ],
  },
  {
    category: 'Backend & Enterprise Systems',
    items: [
      { name: 'Laravel 12', level: 96, badge: 'PHP 8.3 / Queues', type: 'Backend Core' },
      { name: '.NET Core', level: 90, badge: 'C# / Microservices', type: 'Enterprise' },
      { name: 'Python / FastAPI', level: 89, badge: 'AI / Vision Models', type: 'Machine Learning' },
      { name: 'Node.js', level: 92, badge: 'Real-Time Sockets', type: 'Async Servers' },
    ],
  },
  {
    category: 'Sensors, Hardware & Vision',
    items: [
      { name: 'Microsoft Kinect SDK', level: 95, badge: 'Skeletal Tracking', type: 'Motion Input' },
      { name: 'Meta Quest 3 / Pro', level: 93, badge: 'Hand Tracking', type: 'VR Hardware' },
      { name: 'Apple Vision Pro / VisionOS', level: 87, badge: 'Spatial UI', type: 'Spatial Computing' },
      { name: 'OpenCV & MediaPipe', level: 91, badge: 'Neural FaceMesh', type: 'Computer Vision' },
    ],
  },
];

function StandaloneApp() {
  const [currentView, setCurrentView] = useState('home');

  // Intercept links to /admin or #admin
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      } else if (window.location.pathname.endsWith('/admin')) {
        setCurrentView('admin');
      } else {
        setCurrentView('home');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div>
      <Home
        services={initialServices}
        projects={initialProjects}
        techStack={initialTechStack}
        clients={initialClients}
        teamMembers={initialTeam}
        stats={initialStats}
        studioInfo={initialStudioInfo}
      />
    </div>
  );
}

const rootEl = document.getElementById('app');
if (rootEl) {
  createRoot(rootEl).render(<StandaloneApp />);
}
