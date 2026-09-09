"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const corruptionLines = [
  "> accessing C:\\WINDOWS\\system32\\config... [CORRUPTED]",
  "> bypassing security protocols... [OK]",
  "> C:\\Users\\visitor\\Desktop\\portfolio.exe... [INJECTING]",
  "> overwriting 0x7F4A92... █████░░░░░ 47%",
  "> extracting core telemetry...",
  "> system override engaged."
];

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'corruption' | 'download' | 'scramble' | 'done'>('corruption');
  const [corruptionIndex, setCorruptionIndex] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  
  // Scramble state
  const targetText = 'Print ("Hello World!")';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?~Ψ§ĦÐ╬╗ΩΔ█∑█Σ╬∂Ω';
  const [scrambleDisplay, setScrambleDisplay] = useState(Array(targetText.length).fill(' '));
  const [lockedIndices, setLockedIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
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
          setTimeout(() => setPhase('done'), 1000); // Wait 1 second before fading out
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

    // Phase 4: Done (Fade Out)
    if (phase === 'done') {
      onComplete();
    }
  }, [phase, onComplete]);

  const renderProgressBar = () => {
    const totalBars = 36;
    const filledBars = Math.floor((downloadProgress / 100) * totalBars);
    return `[${'█'.repeat(filledBars)}${'░'.repeat(totalBars - filledBars)}] ${downloadProgress}% COMPLETE`;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#070809] flex flex-col justify-end p-6 sm:p-12 pb-16 sm:pb-24 font-mono text-xs sm:text-sm overflow-hidden pointer-events-none">
      
      <div className="max-w-3xl w-full mx-auto space-y-2 text-[#D7FF00]">
        
        {/* Phase 1 Render */}
        {(phase === 'corruption' || phase === 'download' || phase === 'scramble') && (
          <div className="space-y-1 opacity-70">
            {corruptionLines.slice(0, corruptionIndex + 1).map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        )}

        {/* Phase 2 Render */}
        {(phase === 'download' || phase === 'scramble') && (
          <div className="mt-4">
            <div className="text-white/60">&gt; downloading portfolio_ahmed.sys to local...</div>
            <div className="text-[#FF2A2A]">{renderProgressBar()}</div>
          </div>
        )}

        {/* Phase 3 Render */}
        {phase === 'scramble' && (
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
              <span className="animate-pulse ml-1 inline-block w-2.5 h-5 bg-[#D7FF00]" />
            </div>
          </div>
        )}
      </div>
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-[110] opacity-20" />
    </div>
  );
}
