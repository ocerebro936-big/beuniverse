import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Fingerprint, Sparkles } from 'lucide-react';

interface PhaseProps {
  onNext: () => void;
  key?: React.Key | string;
}

export function Phase4({ onNext }: PhaseProps) {
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (scanning) {
      interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(onNext, 1000);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [scanning, onNext]);

  return (
    <motion.div 
      className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0a0a1a] via-black to-[#0a0a1a] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "brightness(2)" }}
      transition={{ duration: 2 }}
    >
      {/* Background com gradiente e brilho sutil */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ffd700] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a855f7] rounded-full blur-[150px]" />
      </div>

      {/* Abstract circuit lines */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#ffd700] fill-none stroke-[0.15]">
          <path d="M 50 0 Q 55 20 40 40 T 30 70 T 50 100" />
          <path d="M 50 0 Q 45 20 60 40 T 70 70 T 50 100" />
        </svg>
      </div>

      <div className="z-10 flex flex-col items-center gap-12">
        <motion.div 
          className="relative flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br from-zinc-900 to-black border-2 border-[#ffd700]/30 shadow-[0_0_60px_rgba(255,215,0,0.1)] cursor-pointer"
          onMouseDown={() => setScanning(true)}
          onMouseUp={() => setScanning(false)}
          onMouseLeave={() => setScanning(false)}
          onTouchStart={() => setScanning(true)}
          onTouchEnd={() => setScanning(false)}
          whileHover={{ scale: 1.05, borderColor: "rgba(255,215,0,0.6)" }}
          whileTap={{ scale: 0.95 }}
        >
          <Fingerprint 
            size={80} 
            className={`transition-all duration-300 ${scanning ? 'text-[#ffd700] drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]' : 'text-zinc-500'}`} 
            strokeWidth={1}
          />
          
          {/* Scanner Line */}
          {scanning && (
            <motion.div 
              className="absolute left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#ffd700] to-transparent shadow-[0_0_20px_rgba(255,215,0,0.8)]"
              initial={{ top: '15%' }}
              animate={{ top: '85%' }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            />
          )}

          {/* Progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <circle
              cx="80"
              cy="80"
              r="78"
              fill="none"
              stroke={scanProgress > 0 ? "#ffd700" : "rgba(255,215,0,0.1)"}
              strokeWidth="2"
              strokeDasharray="490"
              strokeDashoffset={490 - (490 * scanProgress) / 100}
              className="transition-all duration-75 ease-linear drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
            />
          </svg>

          {/* Partículas ao redor */}
          {scanning && [...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#ffd700] rounded-full"
              style={{
                left: `${50 + 45 * Math.cos(i * 60 * Math.PI / 180)}%`,
                top: `${50 + 45 * Math.sin(i * 60 * Math.PI / 180)}%`,
              }}
              animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.25 }}
            />
          ))}
        </motion.div>

        <div className="font-mono text-center h-10">
          {scanning ? (
            <div className="flex flex-col items-center gap-2">
              <p className="text-[#ffd700] text-xs tracking-widest animate-pulse">
                AUTENTICANDO BIOMETRIA... {scanProgress}%
              </p>
              {scanProgress >= 100 && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-500 text-xs tracking-widest flex items-center gap-2"
                >
                  <Sparkles size={14} /> IDENTIDADE CONFIRMADA
                </motion.p>
              )}
            </div>
          ) : (
            <p className="text-zinc-400 text-xs tracking-widest">
              PRESSIONE E SEGURE PARA AUTENTICAR
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
