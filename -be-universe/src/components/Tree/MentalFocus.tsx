import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, X, Timer, ChevronRight, Zap } from 'lucide-react';

interface MentalFocusProps {
  onBack: () => void;
  key?: string;
}

export function MentalFocus({ onBack }: MentalFocusProps) {
  const [phase, setPhase] = useState<'intro' | 'reading' | 'quiz' | 'result'>('intro');
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === 'reading' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (phase === 'reading' && timeLeft === 0) {
      setPhase('quiz');
    }
    return () => clearInterval(timer);
  }, [phase, timeLeft]);

  const startReading = () => {
    setPhase('reading');
    setTimeLeft(20);
  };

  const answerQuiz = (correct: boolean) => {
    setPhase('result');
    // Here we would potentially update user state (mining rate)
  };

  return (
    <motion.div 
      className="absolute inset-0 z-50 bg-[#021f0a]/95 backdrop-blur-3xl flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={onBack}
          className="p-2 border border-white/20 hover:border-white rounded-full bg-black/50 transition-all hover:scale-110 aspect-square flex items-center justify-center"
        >
          <X size={16} className="text-zinc-400 hover:text-white" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-2xl w-full text-center"
          >
            <div className="mx-auto w-24 h-24 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl mb-8">
              <Brain size={48} className="text-[var(--color-earth-green)]" />
            </div>
            <h2 className="text-4xl font-display text-white mb-4">Abertura Mental</h2>
            <p className="text-zinc-400 font-mono text-sm leading-relaxed mb-8">
              "Para cultivar a Árvore, primeiro deve cultivar a mente. A liquidez flui para onde há disciplina. 
              Você terá 20 segundos para absorver o Cartão Neural. Sem distrações."
            </p>
            <button
              onClick={startReading}
              className="px-8 py-4 bg-[var(--color-earth-green)] text-black font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-white hover:text-black transition-all hover:scale-105"
            >
              Iniciar Foco
            </button>
          </motion.div>
        )}

        {phase === 'reading' && (
          <motion.div 
            key="reading"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-3xl glass-panel p-10 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-white/10">
              <motion.div 
                className="h-full bg-[var(--color-earth-green)]"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 20, ease: "linear" }}
              />
            </div>

            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <span className="font-mono text-xs text-[var(--color-earth-green)] uppercase tracking-widest">Cartão Neural nº 001</span>
              <div className="flex items-center gap-2 font-mono text-xl text-white">
                <Timer size={24} className={timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-white"} />
                <span className={timeLeft <= 5 ? "text-red-500" : "text-white"}>00:{timeLeft.toString().padStart(2, '0')}</span>
              </div>
            </div>

            <h3 className="text-2xl font-display text-white mb-6">A Psicologia do Dono</h3>
            <div className="prose prose-invert prose-p:text-zinc-300 prose-p:leading-relaxed max-w-none text-[1.1rem]">
              <p>O capital não é apenas papel ou código; é energia acumulada. A maioria das pessoas gasta energia para comprar o tempo dos outros.</p>
              <p>O Triunfador usa o tempo para construir sistemas que geram energia sozinhos. Sua Loja de Links não é um blog, é um <strong className="text-[var(--color-earth-green)]">ativo automático</strong>.</p>
              <p>Se você não encontrar um jeito de ganhar Tree Coins enquanto dorme, trabalhará até o fim da vida.</p>
              <p className="font-bold text-white text-xl mt-6 border-l-4 border-[var(--color-earth-green)] pl-4">O foco é a sua única moeda real.</p>
            </div>
            
            <div className="mt-12 flex justify-end">
              <button
                onClick={() => setPhase('quiz')}
                className="flex items-center gap-2 text-sm font-mono text-zinc-400 hover:text-white transition-colors"
              >
                Pronto para o teste <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'quiz' && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-2xl glass-panel p-10 rounded-3xl text-center"
          >
            <h3 className="text-xl font-display text-white mb-8">Decisão Rápida</h3>
            <p className="text-zinc-300 mb-10 text-lg">O que sustenta a sua Árvore?</p>
            
            <div className="grid gap-4">
              <button
                onClick={() => answerQuiz(false)}
                className="p-6 border border-white/20 rounded-xl text-left hover:bg-white/5 transition-all text-zinc-300"
              >
                O esforço manual constante e suado.
              </button>
              <button
                onClick={() => answerQuiz(true)}
                className="p-6 border border-[var(--color-earth-green)]/50 rounded-xl text-left hover:bg-[var(--color-earth-green)]/10 transition-all text-white font-medium"
              >
                A construção de sistemas automáticos.
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'result' && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center w-full max-w-md"
          >
            <div className="mx-auto w-24 h-24 bg-[var(--color-earth-green)]/20 border border-[var(--color-earth-green)] rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
              <Zap size={40} className="text-[var(--color-earth-green)]" />
            </div>
            <h3 className="text-2xl font-display text-white mb-2 uppercase tracking-widest">Foco Calibrado</h3>
            <p className="text-zinc-400 font-mono text-sm mb-8">O Gênio Génesis ativou a sobrecarga sistêmica.</p>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Recompensa</p>
              <p className="text-xl text-[var(--color-earth-green)] font-mono font-bold">+10% Taxa de Mineração (Tree Coins) por 4 horas</p>
            </div>

            <button
              onClick={onBack}
              className="mt-8 px-6 py-3 border border-zinc-700 rounded-full text-zinc-400 hover:text-white hover:border-white transition-all text-sm uppercase tracking-widest font-mono"
            >
              Voltar à Árvore
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
