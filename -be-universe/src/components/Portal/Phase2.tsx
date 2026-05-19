import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface PhaseProps {
  onNext: () => void;
  key?: React.Key | string;
}

const PHRASES = [
  "O que você daria pela vida?",
  "A consciência é um código.",
  "Acorde.",
  "Conexão estabelecida.",
  "Bem-vindo ao Vácuo."
];

export function Phase2({ onNext }: PhaseProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setPhraseIndex(prev => (prev + 1) % PHRASES.length);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="relative flex flex-col items-center justify-center min-h-screen bg-transparent overflow-hidden cursor-crosshair"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onNext}
    >
      {/* Noise background simulation using CSS pattern */}
      <div 
        className={cn(
          "absolute inset-0 opacity-20 transition-opacity duration-1000",
          isHovered ? "opacity-5" : "opacity-20"
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Geometric Shapes on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
            transition={{ duration: 1, ease: "circOut" }}
          >
            <div className="w-[40vw] h-[40vw] border border-zinc-700 rounded-full flex items-center justify-center animate-spin-slow">
              <div className="w-[30vw] h-[30vw] border border-zinc-600 rotate-45 transform origin-center flex items-center justify-center">
                <div className="w-[20vw] h-[20vw] border border-zinc-500 rounded-full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flashing Phrases */}
      <motion.div 
        className="absolute z-10 text-center pointer-events-none"
        key={phraseIndex}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: [0, 1, 0], scale: 1 }}
        transition={{ duration: 0.5, times: [0, 0.1, 1] }}
      >
        <p className="font-mono text-zinc-300 text-xl md:text-3xl tracking-widest font-light mix-blend-difference">
          {PHRASES[phraseIndex]}
        </p>
      </motion.div>

      <div className="absolute bottom-10 z-20">
        <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-600 animate-pulse">
          Clique em qualquer lugar para sintonizar
        </p>
      </div>
    </motion.div>
  );
}
