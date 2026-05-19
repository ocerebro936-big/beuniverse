import { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HologramClass } from "./HologramClass";
import { BookOpen, MessageCircle, Crown, Search, Presentation, ShieldCheck, Flame, Zap } from "lucide-react";

const GeniusAvatarChat = lazy(() => import("../Tree/GeniusAvatarChat").then(m => ({ default: m.GeniusAvatarChat })));

export function ProfessorPortal({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<"conversation" | "professor" | "conference">("conversation");
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  const lessons = [
    { id: "mind", title: "Mente Água", subtitle: "ADAPTABILIDADE INFINITA", icon: "🌊" },
    { id: "engineering", title: "Engenharia do Infinito", subtitle: "CONSTRUÇÃO DE REALIDADES", icon: "⚙️" },
    { id: "wealth", title: "Algoritmo da Riqueza", subtitle: "FLUXO DE CAPITAL", icon: "💰" },
  ];

  const conferences = [
    { id: "ethics", title: "Ética Profissional", subtitle: "COMO SER UM NÓ CONFIÁVEL", icon: <ShieldCheck size={40} className="text-[#ffcc00]" /> },
    { id: "mindset", title: "Mentalidade Lucrativa", subtitle: "TRANSFORMAR CONHECIMENTO EM ATIVOS", icon: <Flame size={40} className="text-[#ffcc00]" /> },
    { id: "positivity", title: "Positividade Prática", subtitle: "RESILIÊNCIA NO MERCADO", icon: <Zap size={40} className="text-[#ffcc00]" /> },
  ];

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center font-sans tracking-widest text-[#ffcc00]">
      {/* Golden Temple Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#ffcc00]/20 via-black to-black" />
        <div className="absolute inset-0 flex items-center justify-center opacity-30 mix-blend-overlay">
          <div className="w-[80vw] h-[80vw] rounded-full border border-[#ffcc00] animate-[ping_10s_ease-in-out_infinite]" />
          <div className="absolute w-[60vw] h-[60vw] rounded-full border border-[#ffcc00] animate-[ping_8s_ease-in-out_infinite_reverse]" />
        </div>
      </div>

      <div className="absolute top-4 left-4 z-50">
        <button 
          className="px-4 py-2 flex items-center gap-2 text-[10px] md:text-xs text-[#ffcc00] border border-[#ffcc00]/30 rounded-full hover:bg-[#ffcc00]/10 hover:border-[#ffcc00] transition-colors uppercase font-mono shadow-[0_0_10px_rgba(255,204,0,0.1)] backdrop-blur-md"
          onClick={onBack}
        >
          <span className="text-xl leading-none">&rsaquo;</span> Voltar à Árvore
        </button>
      </div>

      <div className="absolute top-8 w-full flex justify-center z-40">
         <div className="flex gap-4 p-1 bg-black/60 border border-[#ffcc00]/30 rounded-full backdrop-blur-md font-mono text-[10px] sm:text-xs uppercase flex-wrap justify-center">
           <button 
             onClick={() => setMode("conversation")}
             className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 ${mode === "conversation" ? "bg-[#ffcc00] text-black shadow-[0_0_15px_#ffcc00]" : "text-[#ffcc00]/50 hover:text-[#ffcc00]"}`}
           >
             <MessageCircle size={14} /> Tutoria Viva
           </button>
           <button 
             onClick={() => setMode("professor")}
             className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 ${mode === "professor" ? "bg-[#ffcc00] text-black shadow-[0_0_15px_#ffcc00]" : "text-[#ffcc00]/50 hover:text-[#ffcc00]"}`}
           >
             <BookOpen size={14} /> Modo Professor
           </button>
           <button 
             onClick={() => setMode("conference")}
             className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 ${mode === "conference" ? "bg-[#ffcc00] text-black shadow-[0_0_15px_#ffcc00]" : "text-[#ffcc00]/50 hover:text-[#ffcc00]"}`}
           >
             <Presentation size={14} /> Conferências
           </button>
         </div>
      </div>

      <AnimatePresence mode="wait">
        {!activeLesson ? (
          <motion.div
            key={`mode-${mode}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full flex flex-col items-center justify-center relative z-20 pt-24"
          >
              {mode === "conversation" && (
                 <div className="w-full max-w-4xl h-[70vh] flex items-center justify-center">
                   <Suspense fallback={<div className="text-zinc-500 font-mono text-xs animate-pulse">ATIVANDO GÊNIO 3D...</div>}>
                     <GeniusAvatarChat />
                   </Suspense>
                 </div>
              )}

             {mode === "professor" && (
                <div className="w-full h-full flex flex-col items-center justify-center p-8">
                   <div className="text-center mb-16">
                     <Crown size={40} className="mx-auto text-[#ffcc00] mb-4 opacity-80" />
                     <h2 className="text-2xl md:text-3xl font-bold tracking-[0.3em] font-mono drop-shadow-[0_0_15px_rgba(255,204,0,0.6)]">O TEMPLO DE OURO</h2>
                     <p className="text-xs md:text-sm text-[#ffcc00]/70 uppercase tracking-widest mt-2">Escolha sua runa de sabedoria</p>
                   </div>
                   
                   <div className="flex flex-wrap justify-center gap-8 max-w-5xl">
                     {lessons.map((lesson, i) => (
                       <motion.button
                         key={lesson.id}
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: i * 0.2 }}
                         onClick={() => setActiveLesson(lesson.id)}
                         className="relative group flex flex-col items-center p-8 bg-black/40 border border-[#ffcc00]/30 rounded-xl backdrop-blur-md hover:bg-[#ffcc00]/10 hover:border-[#ffcc00] transition-all hover:scale-105"
                       >
                         <div className="text-4xl mb-6 opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_15px_rgba(255,204,0,0.5)]">
                           {lesson.icon}
                         </div>
                         <h3 className="font-mono text-sm tracking-[0.2em] font-bold mb-2 text-center text-white">{lesson.title}</h3>
                         <p className="font-mono text-[9px] tracking-widest text-[#ffcc00]/60 uppercase text-center max-w-[150px]">
                           {lesson.subtitle}
                         </p>
                         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#ffcc00]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                       </motion.button>
                     ))}
                   </div>
                </div>
             )}

             {mode === "conference" && (
                <div className="w-full h-full flex flex-col items-center justify-center p-8">
                   <div className="text-center mb-16">
                     <Presentation size={40} className="mx-auto text-[#ffcc00] mb-4 opacity-80" />
                     <h2 className="text-2xl md:text-3xl font-bold tracking-[0.3em] font-mono drop-shadow-[0_0_15px_rgba(255,204,0,0.6)]">PALESTRAS DO GÊNIO</h2>
                     <p className="text-xs md:text-sm text-[#ffcc00]/70 uppercase tracking-widest mt-2">O Braço Acadêmico de Elite</p>
                   </div>
                   
                   <div className="flex flex-wrap justify-center gap-8 max-w-5xl">
                     {conferences.map((conf, i) => (
                       <motion.button
                         key={conf.id}
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: i * 0.2 }}
                         onClick={() => setActiveLesson(conf.id)}
                         className="relative group flex flex-col items-center p-8 bg-black/40 border border-[#ffcc00]/30 rounded-xl backdrop-blur-md hover:bg-[#ffcc00]/10 hover:border-[#ffcc00] transition-all hover:scale-105 w-64"
                       >
                         <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_15px_rgba(255,204,0,0.5)]">
                            {conf.icon}
                         </div>
                         <h3 className="font-mono text-xs tracking-[0.1em] font-bold mb-2 text-center text-white">{conf.title}</h3>
                         <p className="font-mono text-[9px] tracking-widest text-[#ffcc00]/60 uppercase text-center">
                           {conf.subtitle}
                         </p>
                         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#ffcc00]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                       </motion.button>
                     ))}
                   </div>
                </div>
             )}
          </motion.div>
        ) : (
          <motion.div
            key="hologram-class"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="w-full h-full flex items-center justify-center bg-black/90 backdrop-blur-xl relative z-40"
          >
             <button 
               onClick={() => setActiveLesson(null)}
               className="absolute top-8 left-8 text-[#ffcc00]/50 hover:text-[#ffcc00] font-mono text-[10px] tracking-widest uppercase flex items-center gap-2"
             >
               &larr; FECHAR AULA
             </button>
            <HologramClass lessonId={activeLesson} onClose={() => setActiveLesson(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
