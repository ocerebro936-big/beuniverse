import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, X, Users } from "lucide-react";
import useSound from "use-sound";
import { COSMOS } from "@/lib/cosmos";
import { buscarImagens } from "@/services/midia";

export const travelPackages = {
  "Viagem: Nebulosa de Órion": {
    price: 50,
    duration: 30,
    images: COSMOS.travel.slice(0, 12),
    soundEffect: "https://cdn.freesound.org/previews/258/258169_4323717-lq.mp3"
  },
  "Espiral de Andrômeda": {
    price: 450,
    duration: 40,
    images: COSMOS.travel,
    soundEffect: "https://cdn.freesound.org/previews/258/258169_4323717-lq.mp3"
  },
};

export const SpaceTravel = ({ 
  packageName, 
  onClose 
}: { 
  packageName: string; 
  onClose: () => void;
}) => {
  const pkg = travelPackages[packageName as keyof typeof travelPackages] || travelPackages["Viagem: Nebulosa de Órion"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [play, { stop }] = useSound(pkg.soundEffect, {
    loop: true,
    volume: 0.5,
  });
  const [muted, setMuted] = useState(false);
  const [imagensDinamicas, setImagensDinamicas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [usuariosAtivos, setUsuariosAtivos] = useState(0);

  // Buscar imagens dinâmicas da Pexels
  useEffect(() => {
    buscarImagens("space galaxy nebula cosmos", 1).then(fotos => {
      if (fotos.length > 0) {
        setImagensDinamicas(fotos);
      }
      setLoading(false);
    });
    setUsuariosAtivos(Math.floor(Math.random() * 50) + 20);
  }, []);

  const images = imagensDinamicas.length > 0 ? imagensDinamicas : pkg.images;

  useEffect(() => {
    if (isPlaying && !muted) {
      play();
    } else {
      stop();
    }
    return () => {
      stop();
    };
  }, [play, stop, isPlaying, muted]);

  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Auto-avanço a cada 3 segundos
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        if (currentIndex < images.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          clearInterval(timer);
          setTimeout(onClose, 2000);
        }
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [currentIndex, images.length, onClose, isPlaying]);

  return (
    <div className="fixed inset-0 bg-black/98 z-[100] flex items-center justify-center">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <p className="text-zinc-500 font-mono text-xs tracking-widest animate-pulse">BUSCANDO IMAGENS CÓSMICAS...</p>
        </div>
      )}
      <div className="relative max-w-6xl w-full h-full md:h-[80vh] mx-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Travel ${currentIndex + 1}`}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border-2 border-[#ffd966]"
          />
        </AnimatePresence>
        
        {/* Overlay com informações */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-6 pb-8 md:rounded-b-2xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-[#ffd966] font-mono tracking-widest text-lg md:text-xl uppercase">{packageName}</h3>
              <p className="text-white/70 font-mono text-xs">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Viajantes ativos */}
              <div className="flex items-center gap-1.5 bg-black/60 border border-[#ffd966]/20 rounded-full px-3 py-1.5">
                <Users size={12} className="text-green-500" />
                <span className="text-[9px] font-mono text-green-500">{usuariosAtivos}</span>
              </div>
              <button
                onClick={() => setMuted(!muted)}
                className="bg-black/80 border border-[#ffd966]/40 text-[#ffd966] p-2 rounded-full hover:bg-[#ffd966] hover:text-black transition"
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-black/80 border border-[#ffd966]/40 text-[#ffd966] px-4 py-2 rounded-full font-mono text-[10px] uppercase hover:bg-[#ffd966] hover:text-black transition"
              >
                {isPlaying ? "⏸ Pausar" : "▶ Play"}
              </button>
            </div>
          </div>
          
          {/* Barra de progresso */}
          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#ffd966]"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        {/* Controles de navegação */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-[#ffd966] hover:text-black transition"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-[#ffd966] hover:text-black transition"
        >
          <ChevronRight size={24} />
        </button>
        
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/80 border border-red-500/50 text-red-400 p-2 rounded-full hover:bg-red-500 hover:text-white transition"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
