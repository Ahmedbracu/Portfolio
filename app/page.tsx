"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight, ChevronRight, Terminal, MapPin, X, ExternalLink, Mail, Code, Globe, Menu,
  Volume2, VolumeX, Layers, Cpu, Sparkles, Zap, CheckCircle2, Sliders, Shield, Activity, Maximize2
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Lottie } from 'lottie-react';

import { 
  PRIMARY_PROJECTS, 
  SECONDARY_PROJECTS, 
  CAPABILITIES, 
  Project, 
  TerminalEntry 
} from '../data/portfolio';

import { FadeInSection } from '../components/animations/FadeInSection';
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerChildren';
import { TextReveal } from '../components/animations/TextReveal';
import { SpotlightCard } from '../components/SpotlightCard';
import { BootSequence } from '../components/BootSequence';

import animaBotAnimation from '../public/assets/animation.json';

// --- CUSTOM HOOKS & UTILS --- //

const useSectionRecovery = (sectionId: string, durationMs: number = 1000) => {
  const [isRecovering, setIsRecovering] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (hasTriggered) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRecovering(true);
          setHasTriggered(true);
          window.dispatchEvent(new CustomEvent('system-recovery-start'));
          setTimeout(() => {
            setIsRecovering(false);
            window.dispatchEvent(new CustomEvent('system-recovery-end'));
          }, durationMs);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasTriggered, durationMs]);

  return { ref, isRecovering };
};

const AmbientBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let frame: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX / window.innerWidth - 0.5;
      targetY = e.clientY / window.innerHeight - 0.5;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      if (containerRef.current) {
        const layers = containerRef.current.children;
        for (let i = 0; i < layers.length; i++) {
          const depth = (i + 1) * 15;
          const layer = layers[i] as HTMLElement;
          layer.style.transform = `translate(${currentX * depth}px, ${currentY * depth}px)`;
        }
      }
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-30 sm:opacity-40 select-none">
      <div ref={containerRef} className="absolute inset-0">
        <div className="absolute top-[10%] left-[5%] font-mono text-[10px] text-white/5 whitespace-pre will-change-transform">
          sys.init(0x7F4A);{'\n'}kernel.boot();
        </div>
        <div className="absolute top-[40%] right-[10%] font-mono text-[10px] text-white/5 whitespace-pre will-change-transform">
          alloc_mem: OK{'\n'}render_pipeline: ACTIVE
        </div>
        <div className="absolute bottom-[20%] left-[15%] font-mono text-[14px] font-black text-[#D7FF00]/5 whitespace-pre will-change-transform">
          // AAB_SYSTEM_V2
        </div>
        <div className="absolute top-[60%] left-[40%] font-mono text-[10px] text-white/5 whitespace-pre will-change-transform tracking-[0.5em]">
          DATA_STREAM_ACTIVE
        </div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#070809] via-transparent to-[#070809] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(7,8,9,0.8)_100%)] z-0" />
    </div>
  );
};

const PersistentSystemIndicator = () => {
  const [status, setStatus] = useState<'ONLINE' | 'RECOVERING'>('ONLINE');
  useEffect(() => {
    const handleStart = () => setStatus('RECOVERING');
    const handleEnd = () => setStatus('ONLINE');
    window.addEventListener('system-recovery-start', handleStart);
    window.addEventListener('system-recovery-end', handleEnd);
    return () => {
      window.removeEventListener('system-recovery-start', handleStart);
      window.removeEventListener('system-recovery-end', handleEnd);
    }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40 font-mono text-[10px] sm:text-xs flex items-center gap-2 px-3 py-1.5 bg-[#0D1012]/80 backdrop-blur border border-white/10 rounded">
      {status === 'ONLINE' ? (
        <span className="w-2 h-2 rounded-full bg-[#D7FF00]" />
      ) : (
        <span className="w-2 h-2 rounded-full border border-[#FF2A2A] animate-pulse" />
      )}
      <span className={status === 'ONLINE' ? 'text-white/60' : 'text-[#FF2A2A]'}>
        {status === 'ONLINE' ? 'SYSTEM ONLINE' : 'SYSTEM RECOVERING'}
      </span>
    </div>
  );
};

// --- COMPONENTS --- //

const ProjectMockup = ({ project }: { project: Project }) => {
  const [imgError, setImgError] = useState(false);

  if (project.imageSrc && !imgError) {
    return (
      <SpotlightCard className="w-full h-full min-h-[220px] sm:min-h-[300px] md:min-h-[360px] lg:min-h-[420px] rounded group">
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
      </SpotlightCard>
    );
  }

  return (
    <SpotlightCard className="w-full h-full min-h-[240px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[440px] rounded-lg flex flex-col justify-between shadow-2xl p-4 sm:p-6 group">
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
    </SpotlightCard>
  );
};

// --- MAIN PAGE --- //

export default function PortfolioApp() {
  const [booting, setBooting] = useState(true);
  const handleBootComplete = useCallback(() => {
    setBooting(false);
  }, []);

  const { ref: workRef, isRecovering: workRecovering } = useSectionRecovery('work', 1000);
  const { ref: hasharcRef, isRecovering: hasharcRecovering } = useSectionRecovery('hasharc', 1200);
  const { ref: productsRef, isRecovering: productsRecovering } = useSectionRecovery('products', 1200);
  const { ref: aboutRef, isRecovering: aboutRecovering } = useSectionRecovery('about', 1400);
  const { ref: capabilitiesRef, isRecovering: capabilitiesRecovering } = useSectionRecovery('capabilities', 1000);
  const { ref: contactRef, isRecovering: contactRecovering } = useSectionRecovery('contact', 1400);

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
  const botRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frame: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) - 0.5;
      targetY = (e.clientY / window.innerHeight) - 0.5;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      if (botRef.current) {
        const rotateX = currentY * -45;
        const rotateY = currentX * 45;
        botRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    frame = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dhaka', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
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
  }, [history, terminalOpen]);

  // Audio system (Web Audio API)
  const playClick = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  };

  const playHover = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
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
    } catch (e) {}
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

  const uniqueCategories = ['ALL', ...Array.from(new Set(SECONDARY_PROJECTS.map(p => p.category)))];
  const filteredProducts = activeCategory === 'ALL' 
    ? SECONDARY_PROJECTS 
    : SECONDARY_PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div className={`min-h-screen bg-[#070809] text-white selection:bg-[#D7FF00] selection:text-black font-sans ${showGrid ? 'bg-grid-white/[0.02]' : ''}`}>
      
      <AnimatePresence>
        {booting && (
          <motion.div
            key="boot"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100]"
          >
            <BootSequence onComplete={handleBootComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <AmbientBackground />
      <PersistentSystemIndicator />

      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#070809]/90 backdrop-blur-md border-b border-white/10 py-3 sm:py-4' : 'bg-transparent py-4 sm:py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          <a href="#" onClick={playClick} onMouseEnter={playHover} className="flex items-center space-x-3 group outline-none">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white text-black flex items-center justify-center font-black text-sm sm:text-base tracking-tighter group-hover:bg-[#D7FF00] transition-colors">
              AB
            </div>
            <div className="flex flex-col">
              <span className="leading-none group-hover:text-[#D7FF00] transition-colors font-bold">AHMED ABU BAKAR</span>
              <span className="font-mono text-[8px] sm:text-[9px] text-white/40 tracking-widest mt-0.5">CREATIVE DEV // DHAKA</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center space-x-8 font-mono text-xs tracking-wider">
            {['WORK', 'PRODUCTS', 'ABOUT', 'CAPABILITIES', 'CONTACT'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={playClick} onMouseEnter={playHover} className="text-white/70 hover:text-[#D7FF00] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D7FF00] hover:after:w-full after:transition-all">
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <button onClick={() => { playClick(); setSoundEnabled(!soundEnabled); }} onMouseEnter={playHover} className="p-2 border border-white/10 hover:border-[#D7FF00]/50 text-white/60 hover:text-[#D7FF00] transition-all rounded">
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#D7FF00]" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button onClick={() => { playClick(); setShowGrid(!showGrid); }} onMouseEnter={playHover} className={`p-2 border transition-all rounded ${showGrid ? 'border-[#D7FF00]/40 text-[#D7FF00]' : 'border-white/10 text-white/40'}`}>
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
        </div>
      </motion.header>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 flex flex-col justify-between px-4 sm:px-6 md:px-8 max-w-7xl mx-auto z-10">
          <StaggerContainer className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 font-mono text-[11px] sm:text-xs text-white/50 border-b border-white/10 pb-3 sm:pb-4 mb-8 sm:mb-12">
            <StaggerItem className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#D7FF00]" />
              <span className="text-white font-bold uppercase tracking-wider text-[10px] sm:text-xs">
                AHMED ABU BAKAR // CREATIVE DEVELOPER
              </span>
            </StaggerItem>
            <StaggerItem className="flex items-center space-x-3 sm:space-x-6 text-[10px] sm:text-[11px]">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#FF2A2A]" /> DHAKA, BANGLADESH</span>
              <span className="hidden md:inline text-[#D7FF00] font-mono">TIME: {dhakaTime || '12:00:00'} [UTC+6]</span>
            </StaggerItem>
          </StaggerContainer>

          <div className="my-auto py-4 sm:py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <FadeInSection delay={0.2} className="font-mono text-[10px] sm:text-xs tracking-widest text-[#D7FF00] uppercase mb-3 sm:mb-4 flex items-center gap-2">
                <span className="inline-block w-6 sm:w-8 h-[1px] bg-[#D7FF00]" />
                <span>SYSTEM ARCHITECTURE & FRONTEND ENGINEERING</span>
              </FadeInSection>

              <h1 className="font-sans font-black text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter uppercase leading-[0.88] text-white mb-6 sm:mb-8 break-words">
                <TextReveal text="DESIGN. BUILD. DEPLOY." delay={0.3} />
              </h1>

              <FadeInSection delay={0.6} className="max-w-2xl font-sans text-sm sm:text-lg md:text-xl text-[#9AA0A3] leading-relaxed mb-8 sm:mb-10 font-normal">
                I design and build digital experiences where visual systems, dark editorial direction, interaction, and precision software engineering meet.
              </FadeInSection>

              <StaggerContainer initialDelay={0.8} staggerDelay={0.1} className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs">
                <StaggerItem>
                  <a href="#work" onClick={playClick} onMouseEnter={playHover} className="px-5 sm:px-6 py-3.5 sm:py-4 bg-[#D7FF00] text-black font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center space-x-2 shadow-lg shadow-[#D7FF00]/10 rounded-none">
                    <span>VIEW SELECTED WORK</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </StaggerItem>
                <StaggerItem>
                  <a href="#contact" onClick={playClick} onMouseEnter={playHover} className="px-5 sm:px-6 py-3.5 sm:py-4 bg-[#111416] border border-white/20 text-white font-bold uppercase tracking-widest hover:border-[#D7FF00] hover:text-[#D7FF00] transition-all flex items-center space-x-2">
                    <span>START A PROJECT</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </StaggerItem>
                <StaggerItem>
                  <button onClick={() => { playClick(); setTerminalOpen(true); }} onMouseEnter={playHover} className="px-4 py-3.5 border border-white/10 text-white/60 hover:text-white font-mono text-xs uppercase hover:bg-white/5 transition-all hidden sm:flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-[#D7FF00]" />
                    <span>TERMINAL</span>
                  </button>
                </StaggerItem>
              </StaggerContainer>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 15, delay: 0.8 }}
              className="flex justify-center items-center lg:justify-end hidden sm:flex" style={{ perspective: '1000px' }}
            >
              <div 
                ref={botRef} 
                className="cursor-pointer will-change-transform"
                onClick={() => { playClick(); setTerminalOpen(true); setHistory(prev => [...prev, { type: 'sys', text: "ANIMA SYSTEM: Let's check the terminal and navigate through it." }]); }}
              >
                <Lottie
                  src={animaBotAnimation}
                  className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px] opacity-90 hover:opacity-100 transition-opacity drop-shadow-[0_0_40px_rgba(215,255,0,0.15)]"
                  loop={true}
                  autoplay={true}
                />
              </div>
            </motion.div>
          </div>

          <StaggerContainer initialDelay={1} className="pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 font-mono text-[11px] sm:text-xs text-white/50">
            <StaggerItem>
              <span className="text-white/30 block text-[10px]">CORE FOCUS</span>
              <span className="text-white font-semibold">Creative Frontend</span>
            </StaggerItem>
            <StaggerItem>
              <span className="text-white/30 block text-[10px]">PRIMARY STACK</span>
              <span className="text-white font-semibold">React / Next.js / TS</span>
            </StaggerItem>
            <StaggerItem>
              <span className="text-white/30 block text-[10px]">VISUAL LANGUAGE</span>
              <span className="text-white font-semibold">Editorial Cyberpunk</span>
            </StaggerItem>
            <StaggerItem>
              <span className="text-white/30 block text-[10px]">AVAILABILITY</span>
              <span className="text-[#D7FF00] font-semibold">2026 Projects</span>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* WORK SECTION */}
        <section ref={workRef as any} id="work" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-white/10 relative z-10">
          <AnimatePresence>
            {workRecovering && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-[#070809]/95 flex items-center justify-center p-6"
              >
                <div className="font-mono text-sm text-[#D7FF00] max-w-md w-full space-y-2">
                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>&gt; decrypt /work_portfolio</motion.div>
                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="animate-pulse">██████████████████ 100%</motion.div>
                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="text-white mt-4">ACCESS GRANTED</motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <FadeInSection className="mb-12 sm:mb-20 pb-6 border-b border-white/10">
            <div className="font-mono text-xs text-[#D7FF00] uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D7FF00]" />
              <span>PRIMARY SYSTEM SHOWCASE</span>
            </div>
            <h2 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white">
              <TextReveal text="SELECTED WORK" />
            </h2>
          </FadeInSection>

          <div className="space-y-16 sm:space-y-32">
            {PRIMARY_PROJECTS.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={project.id} className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center group`}>
                  <FadeInSection className={`lg:col-span-7 h-full ${!isEven ? 'lg:order-2' : 'lg:order-1'}`} delay={0.1}>
                    <a href={project.href} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                      <ProjectMockup project={project} />
                    </a>
                  </FadeInSection>

                  <StaggerContainer className={`lg:col-span-5 space-y-4 sm:space-y-6 ${!isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <StaggerItem className="flex items-center space-x-3 font-mono text-xs">
                      <span className="text-[#D7FF00] font-bold text-sm sm:text-base">[{project.number}]</span>
                      <span className="text-white/40">//</span>
                      <span className="text-white/60 tracking-wider uppercase text-[10px] sm:text-xs">{project.category}</span>
                    </StaggerItem>
                    <StaggerItem>
                      <h3 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white group-hover:text-[#D7FF00] transition-colors">{project.title}</h3>
                      <p className="font-mono text-xs text-white/40 mt-1 uppercase tracking-wider">{project.subtitle}</p>
                    </StaggerItem>
                    <StaggerItem>
                      <p className="font-sans text-sm sm:text-base text-[#9AA0A3] leading-relaxed">{project.description}</p>
                    </StaggerItem>
                    <StaggerItem className="flex flex-wrap gap-2 pt-1 font-mono text-[10px] sm:text-xs">
                      {project.techStack.map(tech => (
                        <span key={tech} className="px-2.5 py-1 bg-[#111416] border border-white/10 text-white/80 uppercase">{tech}</span>
                      ))}
                    </StaggerItem>
                    <StaggerItem className="flex flex-wrap items-center gap-3 pt-3 font-mono text-xs">
                      <a href={`/projects/${project.id}`} className="px-5 py-3 bg-white/5 border border-white/20 text-white font-bold uppercase hover:bg-[#D7FF00] hover:text-black transition-all flex items-center space-x-2">
                        <span>FULL CASE STUDY</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </StaggerItem>
                  </StaggerContainer>
                </div>
              );
            })}
          </div>
        </section>

        {/* Startup & Venture Section */}
        <section ref={hasharcRef as any} id="hasharc" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-white/10 relative z-10">

          <AnimatePresence>
            {hasharcRecovering && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-[#070809]/95 flex items-center justify-center p-6"
              >
                <div className="font-mono text-sm text-[#D7FF00] max-w-md w-full space-y-2">
                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>&gt; initialize /hasharc_studio</motion.div>
                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="animate-pulse">LOADING VENTURE DATA...</motion.div>
                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="text-white mt-4">SYSTEM READY</motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section Header */}
          <FadeInSection className="mb-12 sm:mb-16 pb-6 border-b border-white/10">
            <div className="font-mono text-xs text-[#D7FF00] uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D7FF00]" />
              <span>VENTURE & STARTUP INITIATIVE</span>
            </div>
            <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              <TextReveal text="HASHARC STUDIO" />
            </h2>
          </FadeInSection>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            <StaggerContainer className="space-y-6">
              <StaggerItem>
                <p className="font-sans text-base sm:text-lg text-[#9AA0A3] leading-relaxed">
                  A showcase of full-stack digital products, web applications, and interactive platforms engineered by Ahmed Abu Bakar at his startup <strong className="text-white">HASHARC Studio</strong> and collaborative initiatives, focusing on functional usability and clean UI design.
                </p>
              </StaggerItem>
              
              <StaggerItem className="flex flex-wrap gap-2 pt-2 font-mono text-[10px] sm:text-xs">
                {['React', 'Tailwind', 'Vercel Pipeline', 'Studio API'].map((tech) => (
                  <span key={tech} className="px-2.5 py-1 bg-[#111416] border border-white/10 text-white/80 rounded-none uppercase">
                    {tech}
                  </span>
                ))}
              </StaggerItem>

              <StaggerItem className="pt-4">
                <a
                  href="https://hasharc-studio-webapp.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="inline-flex px-6 py-4 bg-[#D7FF00] text-black font-bold uppercase tracking-widest hover:bg-white transition-all items-center space-x-3 shadow-xl"
                >
                  <span>VISIT HASHARC STUDIO</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </StaggerItem>
            </StaggerContainer>

            <FadeInSection delay={0.2} className="bg-[#0D1012] border border-white/10 p-4 relative group">
              <div className="absolute inset-0 bg-[#D7FF00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
              <img 
                src="https://raw.githubusercontent.com/ahmedabubakar16/assets/main/hasharc.jpg" 
                alt="HASHARC STUDIO" 
                className="w-full h-auto border border-white/5 relative z-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
              {/* Decorative Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#D7FF00] -translate-x-1 -translate-y-1" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#D7FF00] translate-x-1 translate-y-1" />
            </FadeInSection>

          </div>
        </section>

        {/* Secondary Products Section */}
        <section ref={productsRef as any} id="products" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-white/10 relative z-10 bg-[#070809]">

          <AnimatePresence>
            {productsRecovering && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-[#070809]/95 flex items-center justify-center p-6"
              >
                <div className="font-mono text-sm text-[#D7FF00] max-w-md w-full space-y-2">
                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>&gt; decrypt /products</motion.div>
                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="animate-pulse">██████████████████ 100%</motion.div>
                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>&gt; mounting project archive...</motion.div>
                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="text-white mt-4">ACCESS GRANTED</motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section Header */}
          <FadeInSection className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="font-mono text-xs text-[#D7FF00] uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#D7FF00]" />
                <span>MOBILE & ACCESSIBILITY DIGITAL PRODUCTS</span>
              </div>
              <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
                <TextReveal text="OTHER DIGITAL PRODUCTS" />
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
          </FadeInSection>

          {/* Secondary Products Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredProducts.map((proj, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  key={proj.id}
                  className="bg-[#0D1012] border border-white/10 p-5 sm:p-6 hover:border-[#D7FF00]/50 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs text-white/40 mb-3">
                      <span className="text-[#D7FF00] font-bold">[{proj.number}]</span>
                      <span className="uppercase">{proj.type}</span>
                    </div>

                    {proj.imageSrc && (
                      <div className="w-full h-48 sm:h-56 mb-5 overflow-hidden rounded border border-white/10 bg-black/40 relative">
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
                      href={`/projects/${proj.id}`}
                      onClick={playClick}
                      onMouseEnter={playHover}
                      className="w-full py-2.5 bg-[#111416] border border-white/15 text-white hover:bg-[#D7FF00] hover:text-black hover:border-[#D7FF00] transition-all font-mono text-xs uppercase font-bold flex items-center justify-center space-x-2"
                    >
                      <span>VIEW CASE STUDY</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Editorial About Section */}
        <section ref={aboutRef as any} id="about" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-white/10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            <StaggerContainer className="lg:col-span-5">
              <StaggerItem className="font-mono text-xs text-[#D7FF00] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#D7FF00]" />
                <span>ENGINEER PROFILE & PHILOSOPHY</span>
              </StaggerItem>
              <StaggerItem>
                <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-none mb-6">
                  <TextReveal text="I BUILD DIGITAL EXPERIENCES WITH A FOCUS ON DESIGN, INTERACTION AND DETAIL." />
                </h2>
              </StaggerItem>

              <StaggerItem className="p-4 bg-[#0D1012] border border-white/10 font-mono text-xs text-white/60 space-y-2">
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
              </StaggerItem>
            </StaggerContainer>

            <StaggerContainer initialDelay={0.3} className="lg:col-span-7 space-y-6 font-sans text-base text-[#9AA0A3] leading-relaxed">
              <StaggerItem>
                <p>
                  I am a creative developer with a passion for constructing high-contrast visual interfaces, dark industrial layouts, and lightning-fast web architecture. My work operates at the intersection of editorial art direction and precision frontend software engineering.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p>
                  Rather than relying on generic AI templates or bloated libraries, I treat every project as a bespoke digital engine—crafted line by line using modern web standards, tactile micro-interactions, clean layout grids, and performance-first codebases.
                </p>
              </StaggerItem>

              <StaggerItem className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 font-mono text-xs">
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
              </StaggerItem>
            </StaggerContainer>

          </div>
        </section>

        {/* Capabilities / Technical Matrix Section */}
        <section ref={capabilitiesRef as any} id="capabilities" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-white/10 relative z-10 bg-[#070809]">

          <AnimatePresence>
            {capabilitiesRecovering && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-[#070809] flex flex-col justify-center items-center p-6"
              >
                <div className="font-mono text-sm text-[#D7FF00] max-w-lg w-full space-y-4">
                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-white mb-6">&gt; CAPABILITY SCAN INITIALIZED</motion.div>
                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex justify-between"><span>UI ENGINEERING</span><span>████████████ 100%</span></motion.div>
                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="flex justify-between"><span>PRODUCT THINKING</span><span>██████████░░  88%</span></motion.div>
                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="flex justify-between"><span>INTERACTION DESIGN</span><span>███████████░  94%</span></motion.div>
                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="flex justify-between"><span>MOTION</span><span>█████████░░░  82%</span></motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-white mt-8 animate-pulse">SYSTEM STATUS: OPTIMAL</motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <FadeInSection className="mb-12 pb-6 border-b border-white/10">
            <div className="font-mono text-xs text-[#D7FF00] uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D7FF00]" />
              <span>TECHNICAL DOMAINS & CAPABILITIES</span>
            </div>
            <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              <TextReveal text="SYSTEM CAPABILITIES" />
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {CAPABILITIES.map((cap, idx) => (
              <FadeInSection key={cap.code} delay={idx * 0.1} className="bg-[#0D1012] border border-white/10 p-6 sm:p-8 hover:border-[#D7FF00]/50 transition-all flex flex-col justify-between">
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
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* Interactive Contact System Section */}
        <section ref={contactRef as any} id="contact" className="py-20 sm:py-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-white/10 relative z-10">
          
          <AnimatePresence>
            {contactRecovering && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-[#070809]/95 flex items-center justify-center p-6"
              >
                <div className="font-mono text-sm text-[#D7FF00] max-w-md w-full space-y-3">
                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>&gt; establishing secure connection...</motion.div>
                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="animate-pulse">..............</motion.div>
                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>connection established.</motion.div>
                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="mt-4 text-white/50">&gt; channel: AHMED.PORTFOLIO</motion.div>
                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="text-white/50">&gt; encryption: ACTIVE</motion.div>
                  <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.0 }} className="mt-4 font-bold text-white">READY FOR TRANSMISSION_</motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <StaggerContainer className="lg:col-span-7 space-y-6">
              <StaggerItem className="font-mono text-xs text-[#D7FF00] uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-[#D7FF00]" />
                <span>INITIATE COLLABORATION</span>
              </StaggerItem>

              <StaggerItem>
                <h2 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white leading-none">
                  <TextReveal text="LET'S BUILD SOMETHING WORTH REMEMBERING." />
                </h2>
              </StaggerItem>

              <StaggerItem>
                <p className="font-sans text-base sm:text-lg text-[#9AA0A3] max-w-xl">
                  Currently open for selected client projects, frontend engineering roles, design agency collaborations, and digital product consulting for 2026.
                </p>
              </StaggerItem>

              <StaggerItem className="pt-4 flex flex-wrap gap-4 font-mono text-xs">
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
              </StaggerItem>
            </StaggerContainer>

            <FadeInSection delay={0.4} className="lg:col-span-5 bg-[#0D1012] border border-white/10 p-6 sm:p-8 space-y-6 font-mono text-xs">
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
                  <span className="text-white/40 group-hover:text-white transition-colors truncate max-w-[180px]">
                    /ahmedabubakar16
                  </span>
                </a>

                <a
                  href="https://github.com/ahmedabubakar16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-[#111416] border border-white/5 hover:border-[#D7FF00]/50 transition-all text-white group"
                >
                  <div className="flex items-center space-x-3">
                    <Code className="w-4 h-4 text-[#D7FF00]" />
                    <span>GITHUB</span>
                  </div>
                  <span className="text-white/40 group-hover:text-white transition-colors truncate max-w-[180px]">
                    /ahmedabubakar16
                  </span>
                </a>
              </div>
            </FadeInSection>
          </div>
        </section>


      </main>

      {/* Terminal Overlay */}
      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-0 sm:bottom-4 right-0 sm:right-4 w-full sm:w-[500px] h-[50vh] sm:h-[400px] bg-[#070809]/95 backdrop-blur-xl border border-white/10 sm:rounded-lg shadow-2xl z-[100] flex flex-col font-mono"
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5 cursor-move">
              <div className="flex items-center space-x-2 text-[10px] text-white/50 tracking-widest">
                <Terminal className="w-3.5 h-3.5" />
                <span>SYS.TERMINAL // v2026.08</span>
              </div>
              <button onClick={() => setTerminalOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto text-xs sm:text-sm space-y-2">
              {history.map((entry, i) => (
                <div key={i} className={`${entry.type === 'user' ? 'text-white' : entry.type === 'error' ? 'text-[#FF2A2A]' : 'text-[#D7FF00] opacity-80'} whitespace-pre-wrap`}>
                  {entry.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <div className="p-2 border-t border-white/10 bg-black/50">
              <div className="flex items-center text-white/80">
                <span className="text-[#D7FF00] mr-2 ml-2 font-bold">&gt;</span>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  onKeyDown={handleCommand}
                  className="w-full bg-transparent border-none outline-none text-xs sm:text-sm focus:ring-0 p-1 font-mono"
                  placeholder="Enter command..."
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
