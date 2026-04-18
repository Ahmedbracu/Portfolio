import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  Github,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Twitch,
  Globe,
  Mail,
  Video,
  Ghost,
  MessageCircle,
  Gamepad2,
  Phone,
  Send,
  BookOpen,
  Music,
  CloudLightning,
  Layers,
  Codepen,
  Code2,
  Image as ImageIcon,
  Dribbble,
  Pin,
  Gitlab
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { TypeWriter } from '@/components/TypeWriter';
import gsap from 'gsap';

export function Hero() {
  const { profile } = usePortfolio();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const iconMap: Record<string, React.ElementType> = {
    github: Github,
    linkedin: Linkedin,
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    youtube: Youtube,
    twitch: Twitch,
    globe: Globe,
    mail: Mail,
    video: Video,
    ghost: Ghost,
    'message-circle': MessageCircle,
    'gamepad-2': Gamepad2,
    phone: Phone,
    send: Send,
    'book-open': BookOpen,
    music: Music,
    'cloud-lightning': CloudLightning,
    layers: Layers,
    codepen: Codepen,
    code: Code2,
    image: ImageIcon,
    dribbble: Dribbble,
    pin: Pin,
    gitlab: Gitlab,
  };

  useEffect(() => {
    // Character animation for title
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char');
      gsap.fromTo(
        chars,
        { opacity: 0, y: 50, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'expo.out',
          delay: 0.5,
        }
      );
    }

    // Subtitle animation
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', delay: 1.2 }
      );
    }
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split name into characters for animation
  const nameChars = profile.name.split('');

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dark px-4 pt-16 lg:px-0 lg:pt-0"
    >
      {/* Cyberpunk background handled in App.tsx globally */}

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-pink opacity-50 blur-xl animate-pulse" />
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-dark-100 shadow-glow sm:h-40 sm:w-40">
              <img
                src={profile.profileImage || "/profile.jpg"}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-dark-200 bg-dark-100/50 px-4 py-2 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-sm text-muted-foreground">Available for opportunities</span>
        </motion.div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          data-text={profile.name}
          className="mb-6 font-display text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl glitch"
          style={{ perspective: '1000px' }}
        >
          {nameChars.map((char, index) => (
            <span
              key={index}
              className="char inline-block"
              style={{
                transformStyle: 'preserve-3d',
                whiteSpace: char === ' ' ? 'pre' : 'normal'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Typewriter Subtitle */}
        <div className="mx-auto mb-10 max-w-2xl h-16 flex items-center justify-center font-mono text-lg text-[#00f3ff] sm:text-xl md:text-2xl">
          <TypeWriter 
             strings={[
                 `> INITIALIZING SYSTEM...`, 
                 `> SYS.ROLE: ${profile.title.toUpperCase()}`, 
                 `> SYS.MISSION: "${profile.tagline.toUpperCase()}"`
             ]} 
             typeSpeed={40}
             backSpeed={20}
             delayBeforeDelete={3000}
          />
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8, ease: [0.68, -0.55, 0.265, 1.55] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={scrollToProjects}
            className="group flex items-center gap-2 rounded-xl bg-dark px-6 py-3 font-medium text-white transition-all duration-300 neon-border hover:scale-105"
          >
            Access Data Core
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1 text-[#00f3ff]" />
          </button>
          <button
            onClick={scrollToContact}
            className="flex items-center gap-2 rounded-xl border-2 border-dark-200 bg-dark-100 px-6 py-3 font-medium text-white transition-all duration-300 hover:border-[#ff003c] hover:text-[#00f3ff] hover:shadow-[0_0_15px_rgba(255,0,60,0.5)]"
          >
            Establish Connection
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          {profile.socialLinks.map((link, index) => {
            const Icon = iconMap[link.icon] || Mail;
            return (
              <motion.a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.2 + index * 0.1, ease: [0.68, -0.55, 0.265, 1.55] }}
                whileHover={{ scale: 1.15 }}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-dark-100 text-muted-foreground transition-all duration-300 hover:bg-dark-200 hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground">Scroll</span>
          <div className="h-12 w-6 rounded-full border-2 border-dark-200 p-1">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="h-2 w-2 rounded-full bg-brand-indigo"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
