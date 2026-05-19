import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { COSMOS } from "@/lib/cosmos";
import { Fingerprint, Wallet, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";

interface PhaseProps {
  onNext: () => void;
  key?: React.Key | string;
}

const JOURNEY_STAGES = [
  { title: "ALÉM DE ÓRION", bg: COSMOS.journey[0] },
  { title: "A GRANDE ÓRBITA", bg: COSMOS.journey[1] },
  { title: "RASANTE ATMOSFÉRICO", bg: COSMOS.journey[2] },
  { title: "TERRA – JARDIM DA ÁRVORE", bg: COSMOS.journey[3] },
];

export function Phase1({ onNext }: PhaseProps) {
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [journeyStage, setJourneyStage] = useState(-1);
  const [biometricScanned, setBiometricScanned] = useState(false);
  const [connectedContracts, setConnectedContracts] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (journeyStage >= 0 && journeyStage < JOURNEY_STAGES.length) {
      const timer = setTimeout(() => {
        setJourneyStage(j => j + 1);
      }, 2500);
      return () => clearTimeout(timer);
    } else if (journeyStage === JOURNEY_STAGES.length) {
       const timer = setTimeout(() => {
         onNext();
       }, 500);
       return () => clearTimeout(timer);
    }
  }, [journeyStage, onNext]);

  const handleEnter = async () => {
    try {
      if (supabase) {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin
          }
        });
        if (error) console.error("Login error:", error);
      } else {
        setJourneyStage(0);
      }
    } catch (e) {
      console.error(e);
      setJourneyStage(0);
    }
  };

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 1.5 }}
    >
      <AnimatePresence mode="popLayout">
        {journeyStage === -1 && (
          <motion.div
            key="initial-bg"
            className="absolute inset-0 z-0 bg-zinc-950"
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 2, ease: "easeIn" }}
          >
            <img
              src={COSMOS.space}
              alt="Space"
              className="w-full h-full object-cover opacity-70 mix-blend-screen"
            />
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
        )}

        {journeyStage >= 0 && journeyStage < JOURNEY_STAGES.length && (
           <motion.div
             key={`stage-${journeyStage}`}
             className="absolute inset-0 z-0"
             initial={{ opacity: 0, scale: 1 }}
             animate={{ opacity: 1, scale: 1.5 }}
             exit={{ opacity: 0, scale: 2 }}
             transition={{ duration: 3, ease: "easeInOut" }}
           >
             <img
               src={JOURNEY_STAGES[journeyStage].bg}
               alt={JOURNEY_STAGES[journeyStage].title}
               className="w-full h-full object-cover opacity-70 mix-blend-screen"
             />
             <div className="absolute inset-0 bg-black/40" />
           </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        
        <AnimatePresence mode="wait">
          {journeyStage >= 0 && journeyStage < JOURNEY_STAGES.length ? (
             <motion.div 
               key="stage-title"
               initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
               animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
               exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
               transition={{ duration: 1 }}
               className="text-center"
             >
               <span className="text-white font-mono text-sm tracking-[0.5em] text-center drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
                 {JOURNEY_STAGES[journeyStage].title}
               </span>
             </motion.div>
          ) : journeyStage === -1 && (
            <motion.div 
              key="orb"
              className="relative flex items-center justify-center"
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              {/* Pink/Purple Flare */}
              <motion.div
                className="absolute w-64 h-64 opacity-60"
                style={{ background: "radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 60%)" }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[1px] h-full bg-pink-500/50 rotate-45" />
                  <div className="w-full h-[1px] bg-pink-500/50 rotate-45 absolute" />
                </div>
              </motion.div>

              {/* The Seed Orb */}
              <motion.div
                className={cn(
                  "w-6 h-6 rounded-full bg-white relative z-20",
                  isNegotiating ? "shadow-[0_0_80px_30px_rgba(255,255,255,0.9)]" : "shadow-[0_0_30px_10px_rgba(255,255,255,0.7)]"
                )}
                animate={
                  isNegotiating
                    ? { scale: [1, 1.5, 1], filter: ["blur(1px)", "blur(0px)", "blur(1px)"] }
                    : { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }
                }
                transition={{ duration: isNegotiating ? 1.5 : 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {journeyStage === -1 && (
          <motion.div 
            className="absolute inset-0 flex items-end justify-center pb-16 sm:pb-20 md:pb-24 z-20 pointer-events-auto"
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1 }}
          >
            <div className="flex gap-8 sm:gap-12 md:gap-16 bg-black/40 backdrop-blur-sm px-6 sm:px-10 py-4 sm:py-5 rounded-full border border-zinc-800/50 items-center">
              <button
                className="group relative text-xs sm:text-sm tracking-[0.3em] text-zinc-300 transition-all duration-500 hover:text-white font-mono whitespace-nowrap"
                onMouseEnter={() => setIsNegotiating(true)}
                onMouseLeave={() => setIsNegotiating(false)}
                onClick={() => {
                  localStorage.setItem('bw_initial_view', 'organic-map');
                  localStorage.setItem('bw_initial_tab', 'store');
                  handleEnter();
                }}
              >
                <span className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0)] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300">
                  NEGOCIAR
                </span>
              </button>
              <button
                className="group relative text-xs sm:text-sm tracking-[0.3em] text-zinc-300 transition-all duration-500 hover:text-white font-mono whitespace-nowrap"
                onClick={() => {
                  localStorage.removeItem('bw_initial_view');
                  localStorage.removeItem('bw_initial_tab');
                  handleEnter();
                }}
              >
                <span className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0)] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300">
                  ENTRAR
                </span>
              </button>
              <div className="w-px h-6 bg-zinc-800 hidden sm:block" />
              <button
                onClick={() => {
                  // Modo demo: simula login Google e entra
                  localStorage.setItem('bw_google_login', 'demo');
                  handleEnter();
                }}
                className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors font-mono"
                title="Entrar com Google (modo demo)"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                <span className="hidden sm:inline">Google</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hyperdrive zoom flash overlay when moving to nature */}
      {journeyStage === JOURNEY_STAGES.length - 1 && (
        <motion.div
           className="absolute inset-0 bg-white pointer-events-none z-50"
           initial={{ opacity: 0 }}
           animate={{ opacity: [0, 0, 1] }}
           transition={{ duration: 2.5, ease: "easeIn" }}
        />
      )}

    </motion.div>
  );
}
