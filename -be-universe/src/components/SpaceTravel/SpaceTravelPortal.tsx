import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Rocket, Star, ArrowLeft } from 'lucide-react';
import { COSMOS } from '@/lib/cosmos';

const ROUTES = [
  {
    id: 'nebula',
    title: 'NEBULOSA DE ÓRION',
    description: 'Um berçário estelar repleto de nuvens de gás e poeira colorida.',
    cost: 50,
    images: COSMOS.travel.slice(0, 10)
  },
  {
    id: 'galaxy',
    title: 'ESPIRAL DE ANDRÔMEDA',
    description: 'A galáxia vizinha em sua glória, com bilhões de estrelas visíveis.',
    cost: 100,
    images: COSMOS.travel.slice(5, 15)
  },
  {
    id: 'deep-space',
    title: 'HORIZONTE PROFUNDO',
    description: 'Paisagens cósmicas distantes onde as estrelas nascem e morrem.',
    cost: 150,
    images: COSMOS.travel.slice(10, 20)
  }
];

export function SpaceTravelPortal({ onBack }: { onBack: () => void }) {
  const [selectedRoute, setSelectedRoute] = useState<typeof ROUTES[0] | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = (route: typeof ROUTES[0]) => {
    setIsPurchasing(true);
    setTimeout(() => {
      setIsPurchasing(false);
      setSelectedRoute(route);
      setCurrentSlide(0);
    }, 1500);
  };

  const nextSlide = () => {
    if (selectedRoute && currentSlide < selectedRoute.images.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const endJourney = () => {
    setSelectedRoute(null);
    setCurrentSlide(0);
  };

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {!selectedRoute ? (
          <motion.div 
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen flex flex-col items-center justify-center p-6 relative z-10"
          >
             <div className="absolute top-4 left-4 z-50">
                <button 
                  className="px-4 py-2 flex items-center gap-2 text-[10px] md:text-xs text-[#00bfff] border border-[#00bfff]/30 rounded-full hover:bg-[#00bfff]/10 hover:border-[#00bfff] transition-colors uppercase font-mono tracking-widest"
                  onClick={onBack}
                >
                  <ArrowLeft size={14} /> Voltar à Árvore
                </button>
             </div>

             <div className="text-center mb-12">
               <h2 className="text-[#00bfff] font-mono text-xl md:text-2xl tracking-[0.4em] uppercase drop-shadow-[0_0_15px_rgba(0,191,255,0.4)]">
                 Estação Espacial
               </h2>
               <p className="text-zinc-500 font-mono text-[10px] tracking-[0.3em] uppercase mt-4">
                 Escolha seu destino e embarque
               </p>
             </div>

             <div className="flex flex-col md:flex-row gap-6 max-w-5xl w-full">
               {ROUTES.map((route, i) => (
                 <motion.div 
                   key={route.id}
                   className="flex-1 bg-zinc-950/60 backdrop-blur-md border border-zinc-800 rounded-xl overflow-hidden hover:border-[#00bfff]/50 transition-colors group"
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.15 }}
                 >
                   <div className="h-32 overflow-hidden relative">
                     <img src={route.images[0]} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt={route.title} />
                     <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
                   </div>
                   <div className="p-6">
                     <h3 className="text-[#00bfff] font-mono text-sm tracking-widest mb-2">{route.title}</h3>
                     <p className="text-zinc-400 text-xs mb-6 h-12 leading-relaxed">{route.description}</p>
                     
                     <div className="flex items-center justify-between">
                       <span className="text-[#ffcc00] font-mono text-xs flex items-center gap-1 font-bold">
                         <Star size={12} fill="#ffcc00" /> {route.cost} TC
                       </span>
                       <button 
                         className="px-4 py-2 bg-[#00bfff]/10 text-[#00bfff] border border-[#00bfff]/30 rounded text-xs font-mono tracking-widest hover:bg-[#00bfff] hover:text-black transition-all flex items-center gap-2"
                         onClick={() => handlePurchase(route)}
                         disabled={isPurchasing}
                       >
                         {isPurchasing ? 'Processando...' : <><Rocket size={14} /> Viajar</>}
                       </button>
                     </div>
                   </div>
                 </motion.div>
               ))}
             </div>
          </motion.div>
        ) : (
          <motion.div 
            key="journey"
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-20 bg-black"
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {/* Slow pan animation on the image */}
                <motion.img 
                  src={selectedRoute.images[currentSlide]} 
                  alt="Espaço"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1, x: 0 }}
                  animate={{ scale: 1.1, x: currentSlide % 2 === 0 ? '-2%' : '2%' }}
                  transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* In-Journey Controls */}
            <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center pointer-events-none px-6">
              <div className="w-full max-w-4xl flex items-center justify-between mb-8 pointer-events-auto">
                <button 
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className="p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/20 text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>

                <div className="text-center">
                  <p className="text-[#00bfff] font-mono text-sm tracking-[0.4em] mb-1 drop-shadow-md">
                    {selectedRoute.title}
                  </p>
                  <p className="text-zinc-400 font-mono text-xs tracking-[0.2em]">
                    Setor {currentSlide + 1} de {selectedRoute.images.length}
                  </p>
                </div>

                <button 
                  onClick={nextSlide}
                  disabled={currentSlide === selectedRoute.images.length - 1}
                  className="p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/20 text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className="pointer-events-auto">
                 <button 
                   className="px-6 py-2 bg-transparent text-[#00bfff] border-b border-[#00bfff]/30 text-xs font-mono tracking-widest uppercase hover:text-white transition-colors"
                   onClick={endJourney}
                 >
                   Retornar à Base
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Purchasing Overlay/Flash */}
      <AnimatePresence>
         {isPurchasing && (
           <motion.div 
             className="absolute inset-0 bg-white z-[100]"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 1.5, ease: "easeInOut" }}
           />
         )}
      </AnimatePresence>
    </div>
  );
}
