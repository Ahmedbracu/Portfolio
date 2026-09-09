"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const biosLines = [
  "Phoenix BIOS 4.0 Release 6.0",
  "Copyright 1985-2026 Phoenix Technologies Ltd.",
  "All Rights Reserved",
  "",
  "CPU: AMD Ryzen 9 7950X",
  "Memory Test : 65536K OK",
  "",
  "Initializing USB Controllers .. Done.",
  "Detecting IDE ATAPI device...",
  "Found Boot Device: AHMED_PORTFOLIO_OS",
  "Booting from Primary Device...",
  ""
];

const corruptionLines = [
  "> accessing C:\\WINDOWS\\system32\\config... [CORRUPTED]",
  "> bypassing security protocols... [OK]",
  "> C:\\Users\\visitor\\Desktop\\portfolio.exe... [INJECTING]",
  "> overwriting 0x7F4A92... █████░░░░░ 47%",
  "> extracting core telemetry...",
  "> system override engaged."
];

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'bios' | 'corruption' | 'download' | 'scramble' | 'input' | 'glitch' | 'done'>('bios');
  const [biosIndex, setBiosIndex] = useState(0);
  const [corruptionIndex, setCorruptionIndex] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [inputText, setInputText] = useState('');
  
  // Scramble state
  const targetText = 'Print ("Hello World!")';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?~Ψ§ĦÐ╬╗ΩΔ█∑█Σ╬∂Ω';
  const [scrambleDisplay, setScrambleDisplay] = useState(Array(targetText.length).fill(' '));
  const [lockedIndices, setLockedIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Phase 0: BIOS Lines
    if (phase === 'bios') {
      const interval = setInterval(() => {
        setBiosIndex(prev => {
          if (prev >= biosLines.length - 1) {
            clearInterval(interval);
            setTimeout(() => setPhase('corruption'), 500);
            return prev;
          }
          return prev + 1;
        });
      }, 100); 
      return () => clearInterval(interval);
    }

    // Phase 1: Corruption Lines
    if (phase === 'corruption') {
      const interval = setInterval(() => {
        setCorruptionIndex(prev => {
          if (prev >= corruptionLines.length - 1) {
            clearInterval(interval);
            setTimeout(() => setPhase('download'), 300);
            return prev;
          }
          return prev + 1;
        });
      }, 150); // Fast rapid-fire
      return () => clearInterval(interval);
    }

    // Phase 2: Download Progress
    if (phase === 'download') {
      const interval = setInterval(() => {
        setDownloadProgress(prev => {
          const next = prev + Math.floor(Math.random() * 15) + 5;
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => setPhase('scramble'), 400);
            return 100;
          }
          return next;
        });
      }, 80);
      return () => clearInterval(interval);
    }

    // Phase 3: Text Scramble Decode
    if (phase === 'scramble') {
      let currentLocked = new Set<number>();
      let lockIndex = 0;
      
      const scrambleInterval = setInterval(() => {
        setScrambleDisplay(prev => 
          prev.map((_, i) => {
            if (currentLocked.has(i)) return targetText[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
        );
      }, 30);

      const lockInterval = setInterval(() => {
        if (lockIndex >= targetText.length) {
          clearInterval(scrambleInterval);
          clearInterval(lockInterval);
          setTimeout(() => setPhase('input'), 500); 
          return;
        }
        currentLocked.add(lockIndex);
        setLockedIndices(new Set(currentLocked));
        lockIndex++;
      }, 60);

      return () => {
        clearInterval(scrambleInterval);
        clearInterval(lockInterval);
      };
    }

    // Phase 4: Input
    if (phase === 'input') {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Backspace') {
          setInputText(prev => prev.slice(0, -1));
        } else if (e.key.length === 1) {
          setInputText(prev => prev + e.key);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }

    // Phase 5: Glitch
    if (phase === 'glitch') {
      setTimeout(() => {
        setPhase('done');
      }, 1300); // 1.3s glitch duration
    }

    // Phase 6: Done (Fade Out)
    if (phase === 'done') {
      setTimeout(() => {
        onComplete();
      }, 500); // give it time to fade out
    }
  }, [phase, onComplete, targetText.length]);

  useEffect(() => {
    if (phase === 'input' && inputText.trim().toLowerCase() === 'hello world!') {
      setTimeout(() => setPhase('glitch'), 300);
    }
  }, [phase, inputText]);

  const renderProgressBar = () => {
    const totalBars = 36;
    const filledBars = Math.floor((downloadProgress / 100) * totalBars);
    return `[${'█'.repeat(filledBars)}${'░'.repeat(totalBars - filledBars)}] ${downloadProgress}% COMPLETE`;
  };

  const isGlitching = phase === 'glitch';

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'done' ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col p-6 sm:p-12 pb-16 sm:pb-24 font-mono text-xs sm:text-sm overflow-hidden pointer-events-none"
    >
      <motion.div
        animate={isGlitching ? {
          x: [0, -25, 25, -15, 15, -35, 35, 0, -10, 10, 0],
          y: [0, 15, -15, 20, -20, 10, -10, 25, -25, 5, 0],
          skewX: [0, -10, 20, -15, 25, -5, 15, -20, 0],
          scale: [1, 1.1, 0.9, 1.15, 0.85, 1.05, 1],
          filter: [
            "hue-rotate(0deg) contrast(1)",
            "hue-rotate(90deg) contrast(2) invert(0.3)",
            "hue-rotate(-90deg) contrast(3) invert(0.1)",
            "hue-rotate(180deg) contrast(4) invert(0.8)",
            "hue-rotate(45deg) contrast(2) invert(0.2)",
            "hue-rotate(0deg) contrast(1)"
          ],
          opacity: [1, 0.8, 1, 0.4, 1, 0.9, 0.5, 1]
        } : {}}
        transition={{ duration: 1.3, ease: "linear" }}
        className="w-full h-full flex flex-col"
      >
        {/* BIOS Phase - Top Left aligned, Gray/White text */}
        {phase === 'bios' && (
          <div className="w-full space-y-1 text-white/80">
            {biosLines.slice(0, biosIndex + 1).map((line, i) => (
              <div key={i}>{line === "" ? "\u00A0" : line}</div>
            ))}
          </div>
        )}

        {/* Terminal/Hacking Phase - Top Left aligned, Green/Red text */}
        {phase !== 'bios' && (
          <div className="flex-grow flex flex-col justify-start w-full space-y-2 text-[#D7FF00]">
            
            {/* Phase 1 Render */}
            {(phase === 'corruption' || phase === 'download' || phase === 'scramble' || phase === 'input' || phase === 'glitch') && (
              <div className="space-y-1 opacity-70">
                {corruptionLines.slice(0, corruptionIndex + 1).map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            )}

            {/* Phase 2 Render */}
            {(phase === 'download' || phase === 'scramble' || phase === 'input' || phase === 'glitch') && (
              <div className="mt-4">
                <div className="text-white/60">&gt; downloading portfolio_ahmed.sys to local...</div>
                <div className="text-[#FF2A2A]">{renderProgressBar()}</div>
              </div>
            )}

            {/* Phase 3 Render */}
            {(phase === 'scramble' || phase === 'input' || phase === 'glitch') && (
              <div className="mt-8">
                <div className="text-white text-base sm:text-lg lg:text-xl font-bold tracking-widest flex">
                  <span className="text-[#D7FF00] mr-3">&gt;</span>
                  {scrambleDisplay.map((char, i) => (
                    <span 
                      key={i} 
                      className={lockedIndices.has(i) ? 'text-white' : 'text-[#D7FF00] opacity-80'}
                    >
                      {char}
                    </span>
                  ))}
                  {phase === 'scramble' && (
                    <span className="animate-pulse ml-1 inline-block w-2.5 h-5 bg-[#D7FF00]" />
                  )}
                </div>
              </div>
            )}

            {/* Phase 4 Render (User Input) */}
            {(phase === 'input' || phase === 'glitch') && (
              <div className="mt-6">
                <div className="text-white/60 mb-2">VERIFICATION REQUIRED: PLEASE TYPE "Hello World!" TO CONTINUE</div>
                <div className="text-white text-base sm:text-lg lg:text-xl font-bold tracking-widest flex items-center">
                  <span className="text-[#D7FF00] mr-3">&gt;</span>
                  <span className="text-white">{inputText}</span>
                  <span className="animate-pulse ml-1 inline-block w-2.5 h-5 bg-[#D7FF00]" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Glitch Overlay effects */}
        {isGlitching && (
          <>
            <div className="absolute inset-0 bg-white mix-blend-difference opacity-30 z-40" />
            
            {/* TV Static Noise Overlay */}
            <motion.div 
              animate={{ opacity: [0.1, 0.4, 0.1, 0.5, 0.2] }}
              transition={{ duration: 0.15, repeat: Infinity }}
              className="absolute inset-0 z-40 pointer-events-none"
              style={{
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")',
                backgroundSize: '150px 150px'
              }}
            />

            {/* Heavy Horizontal Tearing */}
            <motion.div 
              animate={{
                top: ["0%", "40%", "10%", "70%", "20%", "90%", "0%"],
                height: ["20px", "120px", "10px", "180px", "40px", "200px", "0px"],
                x: ["-5%", "5%", "-10%", "15%", "-20%", "10%", "0%"]
              }}
              transition={{ duration: 0.35, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 bg-[#D7FF00]/20 mix-blend-overlay z-50 backdrop-invert backdrop-hue-rotate-90"
            />
            <motion.div 
              animate={{
                top: ["80%", "20%", "60%", "30%", "10%", "50%", "100%"],
                height: ["50px", "20px", "80px", "30px", "100px", "10px", "0px"],
                x: ["5%", "-5%", "10%", "-10%", "15%", "-15%", "0%"]
              }}
              transition={{ duration: 0.25, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 bg-red-500/30 mix-blend-color-burn z-50 backdrop-invert"
            />
          </>
        )}
      </motion.div>
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-[110] opacity-20" />
    </motion.div>
  );
}
