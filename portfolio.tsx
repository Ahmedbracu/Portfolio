import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  ChevronRight,
  Terminal,
  MapPin,
  X,
  ExternalLink,
  Mail,
  Code,
  Globe,
  Menu,
  Volume2,
  VolumeX,
  Layers,
  Cpu,
  Sparkles,
  Zap,
  CheckCircle2,
  Sliders,
  Shield,
  Activity,
  Maximize2
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Lottie } from 'lottie-react';

import animaBotAnimation from './assets/animation.json';
import passOpImg from './assets/Pass-op.png';
import laundryImg from './assets/Laundry.png';
import succuHutImg from './assets/Succu hut.png';
import oshsharohiImg from './assets/Oshsharohi.png';
import kitDropImg from './assets/Kit_Drop.png';
import rentivoImg from './assets/Rentivo.png';
import doccheckImg from './assets/Doc.png';
import mamaCareImg from './assets/MamaCare.AI.png';
import popCornImg from './assets/PopCorn.png';
import signTutorImg from './assets/Signtutor.AI.png';

type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  year: string;
  href: string;
  type: string;
  imageSrc?: string;
  subtitle?: string;
  fallbackBg?: string;
  metrics?: string[];
};

type TerminalEntry = {
  type: 'sys' | 'user' | 'error';
  text: string;
};

const PRIMARY_PROJECTS: Project[] = [
  {
    id: 'passop',
    number: '01',
    title: 'PASSOP',
    category: 'WEB APPLICATION // SECURITY',
    subtitle: 'SECURE PASSWORD MANAGER PLATFORM',
    description: 'Ultra-fast, browser-local cryptographic vault designed for streamlined credential management, client-side encryption, and seamless key interaction.',
    techStack: ['React', 'Tailwind CSS', 'Web Crypto API', 'LocalVault'],
    year: '2026',
    href: 'https://pass-op-wine.vercel.app/',
    type: 'Web Application',
    imageSrc: passOpImg,
    fallbackBg: 'linear-gradient(135deg, #0d1f18 0%, #05120d 100%)',
    metrics: ['0 ms Latency', '100% Client-side', 'AES Encryption']
  },
  {
    id: 'laundrypro',
    number: '02',
    title: 'LAUNDRYPRO',
    category: 'CLIENT PORTFOLIO // SERVICE ENGINE',
    subtitle: 'NEXT-GEN ON-DEMAND CLEANING SYSTEM',
    description: 'On-demand commercial laundry and logistics application with dynamic pickup dispatching, step-by-step order telemetry, and automated price tiering.',
    techStack: ['React', 'Tailwind', 'REST Services', 'Framer Motion'],
    year: '2026',
    href: 'https://laundry-manager-rosy.vercel.app/',
    type: 'Service Portal',
    imageSrc: laundryImg,
    fallbackBg: 'linear-gradient(135deg, #111d28 0%, #080f16 100%)',
    metrics: ['98% On-Time', '24hr Turnaround', '12k+ Items Cleared']
  },
  {
    id: 'succu-cactus',
    number: '03',
    title: 'SUCCU & CACTUS HUT',
    category: 'ECOMMERCE // BOTANICAL STORE',
    subtitle: 'MINIMALIST BOTANICAL DIRECTORY & SHOP',
    description: 'Curated eco-friendly plant storefront featuring interactive filtering, custom botanical care guides, region-specific shipping engines, and rich visual telemetry.',
    techStack: ['React', 'Tailwind', 'E-commerce API', 'State Engine'],
    year: '2026',
    href: 'https://website-rosy-five-11.vercel.app/',
    type: 'E-Commerce Engine',
    imageSrc: succuHutImg,
    fallbackBg: 'linear-gradient(135deg, #0e1c12 0%, #060e08 100%)',
    metrics: ['Nationwide Reach', 'Sub-second Load', 'Eco-Curated']
  },
  {
    id: 'oshsharohi',
    number: '04',
    title: 'OSHSHAROHI',
    category: 'AUTOMOTIVE ENGINEERING // BRAC UNIVERSITY',
    subtitle: 'FORMULA STUDENT RACING INITIATIVE',
    description: 'Official digital platform for BRAC University Formula Student team, highlighting aerodynamic telemetry, vehicle structural engineering, and race specs.',
    techStack: ['React', 'Tailwind CSS', 'High-FPS Motion', 'WebGL'],
    year: '2026',
    href: 'https://oshsharohi.netlify.app/',
    type: 'Motorsport Engineering',
    imageSrc: oshsharohiImg,
    fallbackBg: 'linear-gradient(135deg, #240b0b 0%, #120404 100%)',
    metrics: ['SAE Standard', '60 FPS Canvas', 'Motorsport Grade']
  },
  {
    id: 'kitdrop',
    number: '05',
    title: 'KITDROP',
    category: 'ATHLETIC APPAREL // E-COMMERCE',
    subtitle: 'ELITE FOOTBALL KITS & HARDWARE VENDOR',
    description: 'High-contrast editorial sportswear storefront showcasing official kits, specialized firm-ground boot inventory, and interactive matchwear selector.',
    techStack: ['React', 'Tailwind', 'Custom Micro-cart', 'Responsive UI'],
    year: '2026',
    href: 'https://kit-drop-01.vercel.app/',
    type: 'Sportswear Store',
    imageSrc: kitDropImg,
    fallbackBg: 'linear-gradient(135deg, #1f1d0a 0%, #0d0c04 100%)',
    metrics: ['Pro-Tier Assets', 'Instant Filtering', 'Dark Aesthetics']
  },
  {
    id: 'rentivo',
    number: '06',
    title: 'RENTIVO',
    category: 'AUTOMOTIVE LOGISTICS // EV FLEET',
    subtitle: 'LUXURY & EV VEHICLE RESERVATION SYSTEM',
    description: 'Precision electric vehicle booking system with realtime vehicle telemetry, Plaid performance stats, date availability lookup, and fleet management.',
    techStack: ['React', 'Tailwind', 'Date Pickers', 'Logistics API'],
    year: '2026',
    href: 'https://rentivo-six.vercel.app/',
    type: 'Fleet Management',
    imageSrc: rentivoImg,
    fallbackBg: 'linear-gradient(135deg, #280a0f 0%, #140407 100%)',
    metrics: ['0-60 MPH 1.99s', 'Seamless Booking', 'EV Telemetry']
  }
];

const SECONDARY_PROJECTS: Project[] = [
  {
    id: 'hasharc-studio',
    number: '07',
    title: 'HASHARC STUDIO',
    category: 'CREATIVE TECH // WEB APPLICATION',
    description: 'High-performance digital engine and studio application designed for real-time asset rendering and interactive project showcasing.',
    techStack: ['React', 'Tailwind', 'Vercel Pipeline', 'Studio API'],
    year: '2026',
    href: 'https://hasharc-studio-webapp.vercel.app/',
    type: 'Live Web Platform',
    imageSrc: 'https://raw.githubusercontent.com/ahmedabubakar16/assets/main/hasharc.jpg'
  },
  {
    id: 'doccheck',
    number: '08',
    title: 'DOCCHECK',
    category: 'HEALTHCARE / INTERFACE',
    description: 'Medical diagnostic UI and patient triage interface designed for rapid emergency clinical data entry and appointment telemetry.',
    techStack: ['React', 'Tailwind', 'Health API'],
    year: '2025',
    href: 'https://www.behance.net/ahmedabubakar16',
    type: 'Web Application',
    imageSrc: doccheckImg
  },
  {
    id: 'mamacare-ai',
    number: '09',
    title: 'MAMACARE.AI',
    category: 'MATERNAL HEALTH TECH',
    description: 'Clinical tracking platform assisting healthcare workers with maternal risk detection, scheduling telemetry, and biometric logging.',
    techStack: ['React Native', 'Tailwind', 'AI Pipeline'],
    year: '2025',
    href: 'https://www.behance.net/ahmedabubakar16',
    type: 'Mobile Product',
    imageSrc: mamaCareImg
  },
  {
    id: 'popcorn',
    number: '10',
    title: 'POPCORN',
    category: 'MEDIA STREAMING UI',
    description: 'Cinematic content discovery engine featuring zero-lag preview trailers, custom watchlist telemetry, and dark theater mode UI.',
    techStack: ['React', 'Tailwind', 'TMDB API'],
    year: '2024',
    href: 'https://www.behance.net/ahmedabubakar16',
    type: 'Web Product',
    imageSrc: popCornImg
  },
  {
    id: 'signtutor-ai',
    number: '11',
    title: 'SIGNTUTOR.AI',
    category: 'ACCESSIBILITY PLATFORM',
    description: 'Interactive sign language learning web tool translating hand gestures into realtime visual learning feedback using computer vision.',
    techStack: ['React', 'Computer Vision', 'WebSockets'],
    year: '2024',
    href: 'https://kaggle.com/competitions/gemini-3/writeups/new-writeup-1765109533488',
    type: 'AI / Accessibility',
    imageSrc: signTutorImg
  }
];

const CAPABILITIES = [
  {
    code: '01',
    title: 'FRONTEND ENGINEERING',
    subtitle: 'HIGH-PERFORMANCE INTERFACES',
    description: 'Building resilient, lightning-fast web architecture using React, Next.js, and TypeScript. Specializing in modular layout engines and responsive DOM trees.',
    skills: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'State Management', 'REST / GraphQL', 'Performance Opt']
  },
  {
    code: '02',
    title: 'UI/UX & EDITORIAL DESIGN',
    subtitle: 'CYBERPUNK × INDUSTRIAL SYSTEMS',
    description: 'Crafting high-contrast visual hierarchies, precision grid systems, and dark industrial layouts that balance extreme readability with aggressive visual impact.',
    skills: ['Figma Engineering', 'Design Systems', 'Typography Systems', 'Information Arch', 'Rapid Wireframing', 'User Flows']
  },
  {
    code: '03',
    title: 'INTERACTION & MOTION',
    subtitle: 'MICRO-INTERACTIONS & MOTION',
    description: 'Developing tactile micro-interactions, hardware-accelerated animations, hover dynamics, and fluid transition choreography.',
    skills: ['Framer Motion', 'GSAP Animation', 'CSS Hardware Accel', 'Canvas Dynamics', 'Interactive HUDs', 'Sound Reactive']
  },
  {
    code: '04',
    title: 'DEPLOYMENT & ARCHITECTURE',
    subtitle: 'PRODUCTION & CONTINUOUS DELIVERY',
    description: 'Configuring automated deployment workflows, Vercel edge runtime pipelines, SEO optimization, and web performance standard compliance.',
    skills: ['Vercel Edge Deploy', 'Git Workflows', 'CI/CD Pipelines', 'Core Web Vitals', 'Responsive Optimization', 'SEO Telemetry']
  }
];

const ProjectMockup = ({ project }: { project: Project }) => {
  const [imgError, setImgError] = useState(false);

  if (project.imageSrc && !imgError) {
    return (
      <div className="relative w-full h-full min-h-[220px] sm:min-h-[300px] md:min-h-[360px] lg:min-h-[420px] rounded overflow-hidden border border-white/10 group-hover:border-[#D7FF00]/50 transition-all bg-[#0d1012]">
        <img
          src={project.imageSrc}
          alt={project.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
        <div className="absolute top-3 right-3 px-2 py-1 bg-black/80 backdrop-blur border border-white/10 font-mono text-[9px] text-[#D7FF00] rounded uppercase">
          LIVE PREVIEW
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full min-h-[240px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[440px] rounded-lg flex flex-col justify-between overflow-hidden border border-white/15 transition-all duration-500 group-hover:border-[#D7FF00]/60 shadow-2xl p-4 sm:p-6"
      style={{ background: project.fallbackBg || '#111416' }}
    >
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="font-mono text-[10px] text-white/50 uppercase ml-2">
            SYSTEM // {project.id.toUpperCase()}
          </span>
        </div>
        <span className="font-mono text-xs px-2 py-0.5 bg-white/10 rounded font-bold text-[#D7FF00]">
          {project.year}
        </span>
      </div>

      <div className="my-auto py-6">
        <div className="font-mono text-xs text-[#D7FF00] uppercase tracking-widest mb-2">
          {project.category}
        </div>
        <h3 className="font-sans text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          {project.title}
        </h3>
        <p className="font-sans text-xs sm:text-sm text-white/70 mt-2 max-w-md">
          {project.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 font-mono text-[9px] sm:text-[10px] text-white/60">
        {project.metrics ? project.metrics.map((m: string, idx: number) => (
          <div key={idx} className="bg-black/40 p-2 rounded border border-white/5 truncate text-center">
            {m}
          </div>
        )) : (
          <div className="col-span-3 text-center py-1 bg-black/40 rounded border border-white/5 text-[#D7FF00]">
            ACTIVE SPECIFICATION AVAILABLE
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [dhakaTime, setDhakaTime] = useState('');

  const [commandInput, setCommandInput] = useState('');
  const [history, setHistory] = useState<TerminalEntry[]>([
    { type: 'sys', text: 'AHMED ABU BAKAR // SYSTEM CONSOLE v2026.08' },
    { type: 'sys', text: 'Type "help" to list all available system diagnostics.' }
  ]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dhaka',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      setDhakaTime(new Intl.DateTimeFormat([], options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const playClick = () => {
    if (!soundEnabled) return;
    try {
      const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextCtor();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      // Audio context fallbacks
    }
  };

  const playHover = () => {
    if (!soundEnabled) return;
    try {
      const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextCtor();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch (e) {
      // Audio context fallbacks
    }
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = commandInput.trim().toLowerCase();
      if (!cmd) return;

      const newHistory: TerminalEntry[] = [...history, { type: 'user', text: `> ${commandInput}` }];

      switch (cmd) {
        case 'help':
          newHistory.push({ type: 'sys', text: 'AVAILABLE COMMANDS:\n  projects  - List primary web systems\n  skills    - Display technical capabilities\n  contact   - Output communication protocols\n  clear     - Clear system terminal output\n  about     - Output engineer background' });
          break;
        case 'projects':
          PRIMARY_PROJECTS.forEach(p => {
            newHistory.push({ type: 'sys', text: `[${p.number}] ${p.title} (${p.year}) - ${p.category}\n    URL: ${p.href}` });
          });
          break;
        case 'skills':
          newHistory.push({ type: 'sys', text: 'CORE STACK: React, Next.js, TypeScript, Tailwind CSS, REST, Framer Motion, Vercel Pipelines, Web Graphics.' });
          break;
        case 'contact':
          newHistory.push({ type: 'sys', text: 'EMAIL: ahmed.abubakar.dev@gmail.com\nBEHANCE: https://www.behance.net/ahmedabubakar16\nGITHUB: https://github.com/ahmedabubakar16' });
          break;
        case 'about':
          newHistory.push({ type: 'sys', text: 'AHMED ABU BAKAR // Creative Developer based in Dhaka, Bangladesh. Building high-contrast digital experiences where precision frontend architecture meets dark editorial aesthetics.' });
          break;
        case 'clear':
          setHistory([]);
          setCommandInput('');
          return;
        default:
          newHistory.push({ type: 'error', text: `Command not recognized: "${cmd}". Type "help" for valid diagnostics.` });
      }

      setHistory(newHistory);
      setCommandInput('');
    }
  };

  const filteredSecondary = activeCategory === 'ALL'
    ? SECONDARY_PROJECTS
    : SECONDARY_PROJECTS.filter(p => p.type.toUpperCase().includes(activeCategory));

  return (
    <div className="min-h-screen bg-[#070809] text-[#F2F2F0] font-sans selection:bg-[#D7FF00] selection:text-black relative overflow-x-hidden">

      {/* Background Architectural Grid Overlay */}
      {showGrid && (
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      )}

      {/* Cyberpunk Scanline Telemetry Subtle Texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 2px)`,
          backgroundSize: '100% 4px'
        }}
      />

      {/* Header / Primary Telemetry Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
          ? 'bg-[#070809]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-transparent py-4 sm:py-5 border-b border-white/5'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">

          <a
            href="#"
            onClick={playClick}
            onMouseEnter={playHover}
            className="group flex items-center space-x-2.5 sm:space-x-3 text-white font-black tracking-tight text-sm sm:text-base md:text-lg uppercase"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#111416] border border-white/20 flex items-center justify-center font-mono text-[11px] sm:text-xs font-bold text-[#D7FF00] group-hover:border-[#D7FF00] transition-colors">
              AB
            </div>
            <div className="flex flex-col">
              <span className="leading-none group-hover:text-[#D7FF00] transition-colors">AHMED ABU BAKAR</span>
              <span className="font-mono text-[8px] sm:text-[9px] text-white/40 tracking-widest mt-0.5">CREATIVE DEV // DHAKA</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 font-mono text-xs tracking-wider">
            {['WORK', 'PRODUCTS', 'ABOUT', 'CAPABILITIES', 'CONTACT'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={playClick}
                onMouseEnter={playHover}
                className="text-white/70 hover:text-[#D7FF00] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D7FF00] hover:after:w-full after:transition-all"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* System Status Indicators & Audio Controls */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => { playClick(); setSoundEnabled(!soundEnabled); }}
              onMouseEnter={playHover}
              className="p-2 border border-white/10 hover:border-[#D7FF00]/50 text-white/60 hover:text-[#D7FF00] transition-all rounded"
              title="Toggle Telemetry Audio"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#D7FF00]" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => { playClick(); setShowGrid(!showGrid); }}
              onMouseEnter={playHover}
              className={`p-2 border transition-all rounded ${showGrid ? 'border-[#D7FF00]/40 text-[#D7FF00]' : 'border-white/10 text-white/40'}`}
              title="Toggle Grid Overlay"
            >
              <Sliders className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 bg-[#111416] border border-white/10 px-3 py-1.5 rounded font-mono text-[10px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D7FF00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D7FF00]"></span>
              </span>
              <span className="text-white/80 font-bold tracking-widest">AVAILABLE FOR WORK</span>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => { playClick(); setSoundEnabled(!soundEnabled); }}
              className="p-2 border border-white/10 text-white/60 rounded"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#D7FF00]" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => { playClick(); setMobileMenuOpen(!mobileMenuOpen); }}
              className="p-2 border border-white/20 text-white rounded hover:border-[#D7FF00] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#D7FF00]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/10 bg-[#0D1012] px-4 py-6 space-y-4 font-mono text-sm uppercase">
            <div className="flex items-center space-x-2 pb-3 border-b border-white/10 text-xs text-[#D7FF00]">
              <Activity className="w-4 h-4" />
              <span>SYSTEM STATUS: ONLINE // DHAKA UTC+6</span>
            </div>
            {['WORK', 'PRODUCTS', 'ABOUT', 'CAPABILITIES', 'CONTACT'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => { playClick(); setMobileMenuOpen(false); }}
                className="block text-white/80 hover:text-[#D7FF00] py-2 border-b border-white/5"
              >
                // {item}
              </a>
            ))}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-white/40 font-mono">2026 // PORTFOLIO</span>
              <button
                onClick={() => { setTerminalOpen(true); setMobileMenuOpen(false); }}
                className="text-xs text-[#D7FF00] flex items-center gap-1 border border-[#D7FF00]/30 px-3 py-1 rounded"
              >
                <Terminal className="w-3.5 h-3.5" /> CONSOLE
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 flex flex-col justify-between px-4 sm:px-6 md:px-8 max-w-7xl mx-auto z-10">

        {/* Top Technical Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 font-mono text-[11px] sm:text-xs text-white/50 border-b border-white/10 pb-3 sm:pb-4 mb-8 sm:mb-12">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-[#D7FF00]" />
            <span className="text-white font-bold uppercase tracking-wider text-[10px] sm:text-xs">
              AHMED ABU BAKAR // CREATIVE DEVELOPER
            </span>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-6 text-[10px] sm:text-[11px]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FF2A2A]" /> DHAKA, BANGLADESH
            </span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline font-mono">LAT: 23.8103° N</span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="text-[#D7FF00] font-mono">TIME: {dhakaTime || '12:00:00'} [UTC+6]</span>
          </div>
        </div>

        {/* Hero Main Headline */}
        <div className="my-auto py-4 sm:py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="font-mono text-[10px] sm:text-xs tracking-widest text-[#D7FF00] uppercase mb-3 sm:mb-4 flex items-center gap-2">
              <span className="inline-block w-6 sm:w-8 h-[1px] bg-[#D7FF00]" />
              <span>SYSTEM ARCHITECTURE & FRONTEND ENGINEERING</span>
            </div>

            <h1 className="font-sans font-black text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter uppercase leading-[0.88] text-white mb-6 sm:mb-8 break-words">
              DESIGN.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/30">
                BUILD.
              </span><br />
              <span className="text-[#D7FF00]">DEPLOY.</span>
            </h1>

            <p className="max-w-2xl font-sans text-sm sm:text-lg md:text-xl text-[#9AA0A3] leading-relaxed mb-8 sm:mb-10 font-normal">
              I design and build digital experiences where visual systems, dark editorial direction, interaction, and precision software engineering meet.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs">
              <a
                href="#work"
                onClick={playClick}
                onMouseEnter={playHover}
                className="px-5 sm:px-6 py-3.5 sm:py-4 bg-[#D7FF00] text-black font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center space-x-2 shadow-lg shadow-[#D7FF00]/10 min-h-[44px] touch-manipulation rounded-none"
              >
                <span>VIEW SELECTED WORK</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                onClick={playClick}
                onMouseEnter={playHover}
                className="px-5 sm:px-6 py-3.5 sm:py-4 bg-[#111416] border border-white/20 text-white font-bold uppercase tracking-widest hover:border-[#D7FF00] hover:text-[#D7FF00] transition-all flex items-center space-x-2 min-h-[44px] touch-manipulation"
              >
                <span>START A PROJECT</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => { playClick(); setTerminalOpen(true); }}
                onMouseEnter={playHover}
                className="px-4 py-3.5 border border-white/10 text-white/60 hover:text-white font-mono text-xs uppercase hover:bg-white/5 transition-all hidden sm:flex items-center space-x-2 min-h-[44px]"
              >
                <Terminal className="w-4 h-4 text-[#D7FF00]" />
                <span>TERMINAL</span>
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center lg:justify-end hidden sm:flex">
            <Lottie
              src={animaBotAnimation}
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px] opacity-90 hover:opacity-100 transition-opacity drop-shadow-2xl"
              loop={true}
              autoplay={true}
            />
          </div>
        </div>

        {/* Hero Bottom Telemetry Grid Footer */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 font-mono text-[11px] sm:text-xs text-white/50">
          <div>
            <span className="text-white/30 block text-[9px] sm:text-[10px]">CORE FOCUS</span>
            <span className="text-white font-semibold">Creative Frontend</span>
          </div>
          <div>
            <span className="text-white/30 block text-[10px]">PRIMARY STACK</span>
            <span className="text-white font-semibold">React / Next.js / TS</span>
          </div>
          <div>
            <span className="text-white/30 block text-[10px]">VISUAL LANGUAGE</span>
            <span className="text-white font-semibold">Editorial Cyberpunk</span>
          </div>
          <div>
            <span className="text-white/30 block text-[10px]">AVAILABILITY</span>
            <span className="text-[#D7FF00] font-semibold">2026 Projects</span>
          </div>
        </div>
      </section>

      {/* Selected Work Section */}
      <section id="work" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-white/10 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="font-mono text-xs text-[#D7FF00] uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D7FF00]" />
              <span>PRIMARY SYSTEM SHOWCASE</span>
            </div>
            <h2 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
              SELECTED WORK
            </h2>
          </div>
          <div className="font-mono text-xs text-white/40 text-left md:text-right">
            <span>SHOWCASING 06 PRODUCTION WEBSITES</span>
            <span className="block text-white/20">LIVE DEPLOYMENTS ACTIVE</span>
          </div>
        </div>

        {/* Projects Showcase Container */}
        <div className="space-y-20 sm:space-y-28 md:space-y-36">
          {PRIMARY_PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.id}
                className={`group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''
                  }`}
              >
                {/* Project Telemetry Text Block */}
                <div className={`lg:col-span-5 space-y-4 sm:space-y-6 ${!isEven ? 'lg:order-2' : 'lg:order-1'}`}>

                  {/* Meta Details */}
                  <div className="flex items-center space-x-3 font-mono text-xs">
                    <span className="text-[#D7FF00] font-bold text-sm sm:text-base">[{project.number}]</span>
                    <span className="text-white/40">//</span>
                    <span className="text-white/60 tracking-wider uppercase text-[10px] sm:text-xs">{project.category}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white group-hover:text-[#D7FF00] transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs text-white/40 mt-1 uppercase tracking-wider">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Project Description */}
                  <p className="font-sans text-sm sm:text-base text-[#9AA0A3] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px] sm:text-xs">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-[#111416] border border-white/10 text-white/80 rounded-none uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links & Spec Modal Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-3 font-mono text-xs">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClick}
                      onMouseEnter={playHover}
                      className="px-5 py-3 bg-white/5 border border-white/20 text-white font-bold uppercase hover:bg-[#D7FF00] hover:text-black hover:border-[#D7FF00] transition-all flex items-center space-x-2"
                    >
                      <span>LAUNCH SYSTEM</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => { playClick(); setSelectedProject(project); }}
                      onMouseEnter={playHover}
                      className="px-4 py-3 border border-white/10 text-white/60 hover:text-white uppercase hover:border-white/30 transition-all flex items-center space-x-2"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#D7FF00]" />
                      <span>TECH SPEC</span>
                    </button>
                  </div>

                </div>

                {/* Project Visual Showcase */}
                <div className={`lg:col-span-7 ${!isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="block cursor-pointer"
                  >
                    <ProjectMockup project={project} />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* Secondary Products Section */}
      <section id="products" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-white/10 relative z-10 bg-[#070809]">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="font-mono text-xs text-[#D7FF00] uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D7FF00]" />
              <span>MOBILE & ACCESSIBILITY DIGITAL PRODUCTS</span>
            </div>
            <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              OTHER DIGITAL PRODUCTS
            </h2>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {['ALL', 'WEB', 'MOBILE', 'AI'].map((cat) => (
              <button
                key={cat}
                onClick={() => { playClick(); setActiveCategory(cat); }}
                onMouseEnter={playHover}
                className={`px-3 py-1.5 border uppercase transition-all ${activeCategory === cat
                    ? 'bg-[#D7FF00] text-black font-bold border-[#D7FF00]'
                    : 'bg-[#111416] border-white/10 text-white/60 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredSecondary.map((proj) => (
            <div
              key={proj.id}
              className="bg-[#0D1012] border border-white/10 p-5 sm:p-6 hover:border-[#D7FF00]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-white/40 mb-3">
                  <span className="text-[#D7FF00] font-bold">[{proj.number}]</span>
                  <span className="uppercase">{proj.type}</span>
                </div>

                {proj.imageSrc && (
                  <div className="w-full h-48 sm:h-56 mb-5 overflow-hidden rounded border border-white/10 bg-black/40">
                    <img
                      src={proj.imageSrc}
                      alt={proj.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}

                <h3 className="font-sans font-black text-2xl uppercase tracking-tight text-white group-hover:text-[#D7FF00] transition-colors mb-2">
                  {proj.title}
                </h3>
                <p className="font-mono text-xs text-white/40 mb-3 uppercase tracking-wider">
                  {proj.category}
                </p>
                <p className="font-sans text-xs sm:text-sm text-[#9AA0A3] leading-relaxed mb-4">
                  {proj.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-5 font-mono text-[10px]">
                  {proj.techStack.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-black/60 border border-white/10 text-white/70">
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={proj.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="w-full py-2.5 bg-[#111416] border border-white/15 text-white hover:bg-[#D7FF00] hover:text-black hover:border-[#D7FF00] transition-all font-mono text-xs uppercase font-bold flex items-center justify-center space-x-2"
                >
                  <span>VIEW CASE STUDY</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Editorial About Section */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-white/10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          <div className="lg:col-span-5">
            <div className="font-mono text-xs text-[#D7FF00] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D7FF00]" />
              <span>ENGINEER PROFILE & PHILOSOPHY</span>
            </div>
            <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-none mb-6">
              I BUILD DIGITAL EXPERIENCES WITH A FOCUS ON DESIGN, INTERACTION AND DETAIL.
            </h2>

            <div className="p-4 bg-[#0D1012] border border-white/10 font-mono text-xs text-white/60 space-y-2">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>NAME</span>
                <span className="text-white">AHMED ABU BAKAR</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>LOCATION</span>
                <span className="text-white">DHAKA, BANGLADESH</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>PRIMARY ROLE</span>
                <span className="text-[#D7FF00]">CREATIVE DEVELOPER</span>
              </div>
              <div className="flex justify-between">
                <span>SPECIALIZATION</span>
                <span className="text-white">FRONTEND & DIGITAL UI</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 font-sans text-base text-[#9AA0A3] leading-relaxed">
            <p>
              I am a creative developer with a passion for constructing high-contrast visual interfaces, dark industrial layouts, and lightning-fast web architecture. My work operates at the intersection of editorial art direction and precision frontend software engineering.
            </p>
            <p>
              Rather than relying on generic AI templates or bloated libraries, I treat every project as a bespoke digital engine—crafted line by line using modern web standards, tactile micro-interactions, clean layout grids, and performance-first codebases.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 font-mono text-xs">
              <div className="p-4 bg-[#111416] border border-white/10">
                <span className="text-[#D7FF00] font-bold block mb-1">// DESIGN DIRECTIVES</span>
                <p className="text-white/70 text-xs leading-normal">
                  Sharp typography, high contrast, non-symmetrical grids, subtle telemetry accents, and dark monochrome palettes.
                </p>
              </div>
              <div className="p-4 bg-[#111416] border border-white/10">
                <span className="text-[#D7FF00] font-bold block mb-1">// ENGINEERING STANDARDS</span>
                <p className="text-white/70 text-xs leading-normal">
                  React architecture, Next.js optimization, responsive breakpoints, clean accessibility, and zero layout shift.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Capabilities / Technical Matrix Section */}
      <section id="capabilities" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-white/10 relative z-10 bg-[#070809]">

        <div className="mb-12 pb-6 border-b border-white/10">
          <div className="font-mono text-xs text-[#D7FF00] uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#D7FF00]" />
            <span>TECHNICAL DOMAINS & CAPABILITIES</span>
          </div>
          <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            SYSTEM CAPABILITIES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.code}
              className="bg-[#0D1012] border border-white/10 p-6 sm:p-8 hover:border-[#D7FF00]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs mb-4">
                  <span className="text-[#D7FF00] font-bold">[{cap.code}]</span>
                  <span className="text-white/40 uppercase">{cap.subtitle}</span>
                </div>
                <h3 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mb-3">
                  {cap.title}
                </h3>
                <p className="font-sans text-sm text-[#9AA0A3] leading-relaxed mb-6">
                  {cap.description}
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] text-white/40 uppercase block mb-2">// SPECIFICATION STACK</span>
                <div className="flex flex-wrap gap-2">
                  {cap.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 bg-[#171B1E] border border-white/10 font-mono text-xs text-white/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Interactive Contact System Section */}
      <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-white/10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-7 space-y-6">
            <div className="font-mono text-xs text-[#D7FF00] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D7FF00]" />
              <span>INITIATE COLLABORATION</span>
            </div>

            <h2 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white leading-none">
              LET'S BUILD SOMETHING WORTH REMEMBERING.
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#9AA0A3] max-w-xl">
              Currently open for selected client projects, frontend engineering roles, design agency collaborations, and digital product consulting for 2026.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 font-mono text-xs">
              <a
                href="mailto:ahmed.abubakar.dev@gmail.com"
                onClick={playClick}
                onMouseEnter={playHover}
                className="px-6 py-4 bg-[#D7FF00] text-black font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center space-x-3 shadow-xl"
              >
                <Mail className="w-4 h-4" />
                <span>START A PROJECT</span>
              </a>

              <a
                href="https://www.behance.net/ahmedabubakar16"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="px-6 py-4 bg-[#111416] border border-white/20 text-white font-bold uppercase tracking-widest hover:border-[#D7FF00] hover:text-[#D7FF00] transition-all flex items-center space-x-2"
              >
                <span>BEHANCE PORTFOLIO</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0D1012] border border-white/10 p-6 sm:p-8 space-y-6 font-mono text-xs">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 text-white/50">
              <span>COMMUNICATION CHANNELS</span>
              <span className="text-[#D7FF00]">// DIRECT</span>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:ahmed.abubakar.dev@gmail.com"
                className="flex items-center justify-between p-3 bg-[#111416] border border-white/5 hover:border-[#D7FF00]/50 transition-all text-white group"
              >
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#D7FF00]" />
                  <span>EMAIL</span>
                </div>
                <span className="text-white/40 group-hover:text-white transition-colors truncate max-w-[180px]">
                  ahmed.abubakar.dev@gmail.com
                </span>
              </a>

              <a
                href="https://www.behance.net/ahmedabubakar16"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-[#111416] border border-white/5 hover:border-[#D7FF00]/50 transition-all text-white group"
              >
                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4 text-[#D7FF00]" />
                  <span>BEHANCE</span>
                </div>
                <span className="text-white/40 group-hover:text-white transition-colors">
                  @ahmedabubakar16
                </span>
              </a>

              <a
                href="https://github.com/ahmedabubakar16"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-[#111416] border border-white/5 hover:border-[#D7FF00]/50 transition-all text-white group"
              >
                <div className="flex items-center space-x-3">
                  <FaGithub className="w-4 h-4 text-[#D7FF00]" />
                  <span>GITHUB</span>
                </div>
                <span className="text-white/40 group-hover:text-white transition-colors">
                  github.com/ahmedabubakar16
                </span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-[#111416] border border-white/5 hover:border-[#D7FF00]/50 transition-all text-white group"
              >
                <div className="flex items-center space-x-3">
                  <FaLinkedin className="w-4 h-4 text-[#D7FF00]" />
                  <span>LINKEDIN</span>
                </div>
                <span className="text-white/40 group-hover:text-white transition-colors">
                  CONNECT
                </span>
              </a>
            </div>

            <div className="pt-2 text-[10px] text-white/30 text-center uppercase tracking-widest">
              RESPONSE TIME: WITHIN 24 HOURS
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 sm:px-6 md:px-8 bg-[#050607] relative z-10 font-mono text-xs text-white/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-white">AHMED ABU BAKAR</span>
            <span>/</span>
            <span>2026 © ALL RIGHTS RESERVED</span>
          </div>

          <div className="text-center md:text-right">
            <span>DESIGNED + BUILT BY AHMED ABU BAKAR</span>
            <span className="block text-[10px] text-[#D7FF00] mt-0.5">DEPLOYED ON VERCEL EDGE PLATFORM</span>
          </div>
        </div>
      </footer>

      {/* Interactive Project Specification Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#0D1012] border border-[#D7FF00]/50 w-full max-w-3xl rounded-lg overflow-hidden max-h-[88vh] sm:max-h-[90vh] flex flex-col font-mono text-xs text-white my-auto">

            {/* Modal Header */}
            <div className="p-3.5 sm:p-4 bg-[#171B1E] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2 truncate mr-2">
                <span className="text-[#D7FF00] font-bold">[{selectedProject.number}]</span>
                <span className="font-bold text-xs sm:text-sm uppercase truncate">{selectedProject.title} // TECHNICAL SPECIFICATION</span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 text-white/60 hover:text-white rounded hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 font-sans">
              <div>
                <span className="font-mono text-[10px] text-[#D7FF00] tracking-widest uppercase block mb-1">PROJECT OVERVIEW</span>
                <p className="text-sm text-white/80 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 bg-[#111416] border border-white/5">
                  <span className="text-white/40 block text-[10px]">CATEGORY</span>
                  <span className="text-white font-bold">{selectedProject.category}</span>
                </div>
                <div className="p-3 bg-[#111416] border border-white/5">
                  <span className="text-white/40 block text-[10px]">DEPLOYMENT YEAR</span>
                  <span className="text-white font-bold">{selectedProject.year}</span>
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] text-[#D7FF00] tracking-widest uppercase block mb-2">TECHNOLOGY STACK</span>
                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  {selectedProject.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-[#171B1E] border border-white/10 text-white/90">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between items-center font-mono">
                <span className="text-white/40 text-xs">VERCEL DEPLOYMENT READY</span>
                <a
                  href={selectedProject.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#D7FF00] text-black font-bold text-xs uppercase hover:bg-white transition-colors flex items-center space-x-1.5"
                >
                  <span>OPEN LIVE SYSTEM</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Terminal Drawer Modal */}
      {terminalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#0A0C0E] border border-[#D7FF00]/40 w-full max-w-2xl rounded-lg overflow-hidden flex flex-col font-mono text-xs shadow-2xl">

            <div className="p-3 bg-[#121619] border-b border-white/10 flex items-center justify-between text-white/70">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-[#D7FF00]" />
                <span className="font-bold text-white text-xs">SYSTEM COMMAND CONSOLE</span>
              </div>
              <button
                onClick={() => setTerminalOpen(false)}
                className="text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal Window Output */}
            <div className="p-4 h-64 sm:h-80 overflow-y-auto space-y-2 text-white/80">
              {history.map((item, index) => (
                <div
                  key={index}
                  className={`whitespace-pre-wrap ${item.type === 'user'
                      ? 'text-[#D7FF00] font-bold'
                      : item.type === 'error'
                        ? 'text-[#FF2A2A]'
                        : 'text-white/80'
                    }`}
                >
                  {item.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Terminal Input Line */}
            <div className="p-3 bg-[#0F1215] border-t border-white/10 flex items-center space-x-2">
              <span className="text-[#D7FF00] font-bold">&gt;</span>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                onKeyDown={handleCommand}
                placeholder="Type 'help', 'projects', 'skills', or 'clear'..."
                className="bg-transparent border-none outline-none flex-1 text-white font-mono text-xs"
                autoFocus
              />
            </div>

          </div>
        </div>
      )}

    </div>
  );
}