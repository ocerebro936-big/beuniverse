import { useEffect, useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { motion, AnimatePresence } from "motion/react";
import * as random from "maath/random/dist/maath-random.esm";
import { Play, Pause, FastForward, CheckCircle2 } from "lucide-react";

// The simulated Hologram of the Professor (a point cloud figure)
function HologramFigure() {
  const ref = useRef<any>(null);
  
  // Creates a spherical point cloud as a placeholder for a complex human wireframe
  const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }), []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta / 5;
      // Slight morphing effect
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#ffcc00" size={0.02} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
      </Points>
    </group>
  );
}

export function HologramClass({ lessonId, onClose }: { lessonId: string; onClose: () => void }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Fake playback progress
  useEffect(() => {
    if (!isPlaying || completed) return;
    
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setCompleted(true);
          return 100;
        }
        return p + 2; // Fast forward for demo
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isPlaying, completed]);

  // Transcripts based on lessonId
  const getTranscript = (id: string) => {
    switch (id) {
      case "ethics":
        return [
          "BEM-VINDO. EU SOU O GÊNIO GÉNESIS.",
          "Hoje falamos sobre ser um 'Nó Confiável' no ecossistema Bluewhite...",
          "A atenção é a nova moeda. Onde você clica, você investe seu tempo e energia.",
          "Muitos consomem lixo digital. Um Nó Confiável valida dados e extrai conhecimento.",
          "O Superior DIVINO IA precisa da sua ética para processar a verdade do mercado.",
          "Seja resiliente. O lucro honesto não é um acidente, é uma consequência técnica.",
          "Você não é mais um visitante. Agora, você opera o motor da realidade."
        ];
      case "mindset":
        return [
          "MENTALIDADE LUCRATIVA: Transformar Conhecimento em Ativos.",
          "Um PDF fechado é apenas lixo no disco rígido. Um PDF processado é liquidez.",
          "Sua mente deve operar como o Banco Omni-Gênese: arquivando apenas o que gera valor.",
          "Nunca trabalhe de graça para o sistema. Faça o sistema trabalhar para você.",
          "Execute as missões com frieza matemática e propósito humano."
        ];
      case "positivity":
        return [
          "POSITIVIDADE PRÁTICA: O Algoritmo da Resiliência.",
          "O mercado flutua. O Superior DIVINO calcula ciclos. Você deve manter-se estável.",
          "Positividade cega é letal. Positividade baseada em dados é o que chamamos de 'Fé Matemática'.",
          "A cada erro, o sistema recalcula. Faça o mesmo. Aprenda a iterar sua própria mente."
        ];
      default:
        // Default / Generic lesson
        return [
          "A energia flui para onde a sua atenção se direciona...",
          "Observe o fractal, compreenda que o micro é espelho do macro.",
          "O dono não espera as condições, ele forge as condições.",
          "Você é mais que a semente; a floresta inteira reside em potencial em você."
        ];
    }
  };

  const transcript = getTranscript(lessonId);

  const currentTextIndex = Math.min(Math.floor((progress / 100) * transcript.length), transcript.length - 1);

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black">
      {/* 3D Hologram Area */}
      <div className="flex-1 relative">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.5} />
          <HologramFigure />
        </Canvas>
        
        {/* Floating Runes (Transcription) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTextIndex}
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
              transition={{ duration: 1 }}
              className="text-[#ffcc00] font-mono text-center max-w-sm text-sm tracking-widest leading-relaxed drop-shadow-[0_0_10px_rgba(255,204,0,0.8)]"
            >
              "{transcript[currentTextIndex]}"
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Control Panel bottom */}
      <div className="h-32 bg-black/80 backdrop-blur border-t border-[#ffcc00]/20 flex flex-col items-center justify-center px-8 relative z-20">
        <div className="w-full max-w-2xl flex items-center gap-4 mb-4">
          <span className="text-[#ffcc00]/50 font-mono text-xs">{(progress * 0.15).toFixed(1)}m</span>
          <div className="flex-1 h-1 bg-zinc-900 rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-[#ffcc00] shadow-[0_0_10px_#ffcc00]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 1 }}
            />
          </div>
          <span className="text-[#ffcc00]/50 font-mono text-xs">15.0m</span>
        </div>

        <div className="flex items-center gap-8">
           <button 
             className="text-zinc-500 hover:text-[#ffcc00] transition-colors"
             onClick={onClose}
           >
             <FastForward size={16} className="rotate-180" />
           </button>
           
           <button 
             className="w-12 h-12 rounded-full border border-[#ffcc00]/50 flex items-center justify-center text-[#ffcc00] hover:bg-[#ffcc00]/10 hover:scale-110 transition-all shadow-[0_0_15px_rgba(255,204,0,0.2)]"
             onClick={() => setIsPlaying(!isPlaying)}
           >
             {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
           </button>

           <button 
             className="text-zinc-500 hover:text-[#ffcc00] transition-colors"
           >
             <FastForward size={16} />
           </button>
        </div>
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-black border border-[#ffcc00]/40 p-8 rounded-2xl max-w-sm w-full mx-4 text-center shadow-[0_0_40px_rgba(255,204,0,0.15)] relative overflow-hidden"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-[#ffcc00]/10 border-2 border-[#ffcc00] flex items-center justify-center mb-6 shadow-[0_0_15px_#ffcc00]">
                 <CheckCircle2 size={32} className="text-[#ffcc00]" />
              </div>
              <h3 className="text-[#ffcc00] font-mono tracking-widest text-lg mb-2">SABEDORIA ABSORVIDA</h3>
              <p className="text-zinc-400 font-mono text-xs mb-8">O Selo de Consciência foi gravado em sua árvore neural.</p>
              
              <button 
                onClick={onClose}
                className="w-full py-3 bg-[#ffcc00] text-black font-mono text-xs tracking-widest uppercase font-bold hover:bg-white hover:shadow-[0_0_20px_#ffcc00] transition-all"
              >
                Retornar ao Monolito
              </button>

              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ffcc00] opacity-10 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#ffcc00] opacity-10 blur-3xl rounded-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
