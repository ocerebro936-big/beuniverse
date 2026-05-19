import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface PhaseProps {
  onNext: () => void;
  key?: React.Key | string;
}

export function Phase3({ onNext }: PhaseProps) {
  const [isEntering, setIsEntering] = useState(false);
  const [showContract, setShowContract] = useState(false);

  const handleEnter = () => {
    setIsEntering(true);
    setTimeout(onNext, 2000);
  };

  return (
    <motion.div 
      className="relative flex flex-col items-center justify-end min-h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {/* Golden Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-30 mix-blend-overlay"
        style={{
          background: 'linear-gradient(to top, #ffd700 0%, #b8860b 30%, transparent 100%)'
        }}
        animate={isEntering ? { scale: 1.5, y: "10%" } : { scale: 1, y: "0%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Tree Silhouette */}
      <motion.div 
        className="absolute bottom-0 z-10 w-full flex justify-center origin-bottom"
        animate={isEntering ? { scale: 5, y: "50%" } : { scale: 1, y: "0%" }}
        transition={{ duration: 2, ease: "circIn" }}
      >
        <svg viewBox="0 0 800 600" className="w-[80vw] max-w-[800px] drop-shadow-[0_-5px_15px_rgba(255,215,0,0.5)] fill-[#ffd700]">
          <path d="M 400 600 Q 380 500 390 400 Q 370 350 350 300 Q 300 250 250 200 Q 200 150 150 180 Q 200 220 250 250 Q 270 280 320 320 Q 340 350 360 400 Q 370 450 380 600 Z" />
          <path d="M 400 600 Q 420 500 410 400 Q 430 350 450 300 Q 500 250 550 200 Q 600 150 650 180 Q 600 220 550 250 Q 530 280 480 320 Q 460 350 440 400 Q 430 450 420 600 Z" />
          <path d="M 395 400 Q 400 300 400 200 Q 380 150 350 100 Q 300 70 250 80 Q 300 100 350 150 Q 380 200 390 300 Z" />
          <path d="M 405 400 Q 400 300 400 200 Q 420 150 450 100 Q 500 70 550 80 Q 500 100 450 150 Q 420 200 410 300 Z" />
          <path d="M 0 600 L 800 600 L 800 580 Q 600 560 400 570 Q 200 580 0 580 Z" />
        </svg>
      </motion.div>

      {/* Contract Modal */}
      <AnimatePresence>
        {showContract && (
          <motion.div 
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="w-[90vw] max-w-md p-8 border border-[#ffd700] shadow-[0_0_30px_rgba(255,215,0,0.2)] bg-black/90 font-mono text-zinc-300 text-sm"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <h2 className="text-[#ffd700] mb-4 drop-shadow-[0_0_8px_rgba(255,215,0,0.3)] tracking-widest uppercase">Pacto de Ouro</h2>
              <p className="mb-4">Ao assinar este termo, sua presença será registrada na Seiva Dourada.</p>
              <p className="mb-8 opacity-50 text-xs">O tempo cultivado será recompensado em abundância.</p>
              <div className="flex justify-end">
                <button 
                  className="px-6 py-2 border border-zinc-700 hover:border-[#ffd700] hover:text-[#ffd700] transition-colors"
                  onClick={() => setShowContract(false)}
                >
                  Submeter
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <motion.div 
        className="absolute bottom-20 z-20 flex gap-12"
        animate={isEntering ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
      >
        <button 
          className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400 hover:text-[#ffd700] transition-colors"
          onClick={() => setShowContract(true)}
        >
          Negociar
        </button>
        <button 
          className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400 hover:text-[#ffd700] transition-colors"
          onClick={handleEnter}
        >
          Entrar
        </button>
      </motion.div>
    </motion.div>
  );
}
