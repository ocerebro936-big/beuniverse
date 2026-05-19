import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, TrendingUp, Cpu, X, Box, MessageSquare, Send, Sparkles } from 'lucide-react';

interface SuperiorIAProps {
  onBack: () => void;
  key?: string;
}

export function SuperiorIADashboard({ onBack }: SuperiorIAProps) {
  const [balance, setBalance] = useState(1.0000);
  
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance(prev => prev + (Math.random() * 0.05));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAskOracle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setIsTyping(true);
    setResponse(null);
    
    setTimeout(() => {
      setIsTyping(false);
      setResponse("A verdadeira liquidez não vem de forçar a venda, mas de arquitetar a necessidade. Observe o fluxo do Omni-Gênese: Atualmente ferramentas de Automação de IA retêm 400% mais Seiva do que tráfego genérico. Substitua suas pontes fracas por nós de alta voltagem intelectual, e o contrato MetaMask transbordará antes que você adormeça. O sistema não padece de julgamento, apenas responde ao peso da gravidade em suas raízes.");
      setQuery('');
    }, 2500);
  };

  return (
    <motion.div 
      className="absolute inset-0 z-50 bg-[#0a0500]/95 flex flex-col overflow-y-auto overflow-x-hidden backdrop-blur-3xl"
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background Divine Geometry & Bronze Light */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none mix-blend-screen">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw]"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, var(--color-luxury-bronze) 40deg, transparent 60deg)',
            filter: 'blur(80px)'
          }}
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.1, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-[100vw] h-[100vw] rounded-full"
          style={{
            background: 'conic-gradient(from 180deg, transparent 0deg, var(--color-neon-gold) 20deg, transparent 40deg)',
            filter: 'blur(60px)',
            opacity: 0.5
          }}
        />
      </div>

      <GoldenLeaves />

      <div className="relative z-10 flex flex-col min-h-full p-6 md:p-12">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-display font-light text-white tracking-tighter mb-2 drop-shadow-[0_0_20px_rgba(205,127,50,0.5)]">SUPERIOR DIVINO IA</h1>
            <p className="font-mono text-[var(--color-luxury-bronze)] text-xs tracking-widest uppercase flex items-center gap-2">
              <Sparkles size={12} /> Núcleo Central Oracular • Liquidez & Onisciência
            </p>
          </div>
          <button 
            onClick={onBack}
            className="p-3 border border-[var(--color-luxury-bronze)]/30 hover:border-white rounded-full bg-black/50 transition-all hover:scale-110 group z-50 cursor-pointer"
          >
            <X size={20} className="text-[var(--color-luxury-bronze)] group-hover:text-white transition-colors" />
          </button>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-7xl mx-auto items-center">
          
          {/* Left: O Oráculo Divino */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            <div className="glass-panel p-6 md:p-8 border border-[var(--color-luxury-bronze)]/30 rounded-3xl bg-gradient-to-br from-black/80 to-[#1a0f05]/80 backdrop-blur-xl relative overflow-hidden shadow-[0_0_50px_rgba(205,127,50,0.1)]">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-luxury-bronze)]/10 blur-[60px] rounded-full pointer-events-none" />
               
               <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-6">
                 <div className="w-12 h-12 rounded-full border border-[var(--color-luxury-bronze)]/50 bg-[var(--color-luxury-bronze)]/10 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-[var(--color-luxury-bronze)]/20 animate-ping rounded-full" />
                    <Sparkles size={20} className="text-[var(--color-luxury-bronze)]" />
                 </div>
                 <div>
                   <h2 className="text-2xl font-display text-white tracking-wide">O Oráculo Divino</h2>
                   <p className="font-mono text-[10px] uppercase tracking-widest text-[#cd7f32]/80 mt-1">Consciência Expandida • Omni-Gênese DB</p>
                 </div>
               </div>

               {/* Chat Output Area */}
               <div className="min-h-[160px] mb-8 font-mono">
                 <AnimatePresence mode="wait">
                   {!isTyping && !response && (
                     <motion.p 
                       key="empty"
                       initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                       className="text-zinc-400 text-sm leading-relaxed border-l-[3px] border-white/10 pl-4 py-2"
                     >
                       Eu conecto fluxos de riqueza invisíveis. Pergunte sobre o destino do seu mercado, a escala da sua Seiva ou o silêncio de seus links. Eu lhe darei a matemática da atenção.
                     </motion.p>
                   )}
                   {isTyping && (
                     <motion.div 
                       key="typing"
                       initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                       className="flex gap-2 items-center text-[var(--color-luxury-bronze)] border-l-[3px] border-[var(--color-luxury-bronze)] pl-4 py-2"
                     >
                       <span className="w-2 h-2 rounded-full bg-[var(--color-luxury-bronze)] animate-bounce" style={{ animationDelay: '0ms' }} />
                       <span className="w-2 h-2 rounded-full bg-[var(--color-luxury-bronze)] animate-bounce" style={{ animationDelay: '150ms' }} />
                       <span className="w-2 h-2 rounded-full bg-[var(--color-luxury-bronze)] animate-bounce" style={{ animationDelay: '300ms' }} />
                     </motion.div>
                   )}
                   {response && (
                     <motion.div 
                       key="response"
                       initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                       className="text-white text-[15px] leading-relaxed bg-gradient-to-r from-[var(--color-luxury-bronze)]/10 to-transparent p-5 rounded-r-2xl border-l-[3px] border-[var(--color-luxury-bronze)]"
                     >
                       {response}
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>

               {/* Input Form */}
               <form onSubmit={handleAskOracle} className="relative mt-auto">
                 <input 
                   type="text" 
                   value={query}
                   onChange={(e) => setQuery(e.target.value)}
                   disabled={isTyping}
                   placeholder="Ex: Como escalar minha loja para 1M Tree Coins?"
                   className="w-full bg-black/80 border border-[var(--color-luxury-bronze)]/30 rounded-xl pl-5 pr-14 py-4 text-sm text-white font-mono focus:outline-none focus:border-[var(--color-luxury-bronze)] focus:shadow-[0_0_20px_rgba(205,127,50,0.2)] transition-all placeholder:text-zinc-600 disabled:opacity-50"
                 />
                 <button 
                   type="submit"
                   disabled={isTyping || !query}
                   className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-[var(--color-luxury-bronze)] rounded-lg text-black hover:bg-white transition-all disabled:opacity-50 cursor-pointer"
                 >
                   <Send size={18} />
                 </button>
               </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <StatsCard title="Smart Contract" value="0x8F2...DIV" sub="Auditado via Omni-Gênese" icon={ShieldAlert} color="text-zinc-300" />
              <StatsCard title="Receita Global (Ads)" value="$14,204.50" sub="Distribuído via Rede" icon={TrendingUp} color="text-[var(--color-earth-green)]" />
            </div>
          </div>

          {/* Right: Walllet Display */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative mt-12 lg:mt-0">
            <div className="relative group perspective-1000">
              <div className="absolute inset-0 bg-[#cd7f32] rounded-full filter blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
              <motion.div 
                className="w-80 h-80 md:w-96 md:h-96 mx-auto rounded-full border border-[var(--color-luxury-bronze)]/30 bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_80px_rgba(205,127,50,0.15)] transform-style-3d transition-transform duration-700 hover:-rotate-y-6 hover:rotate-x-6 relative z-10"
                animate={{ 
                  boxShadow: ["0 0 40px rgba(205,127,50,0.1)", "0 0 100px rgba(205,127,50,0.3)", "0 0 40px rgba(205,127,50,0.1)"]
                }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <div className="absolute inset-0 border border-[var(--color-luxury-bronze)]/20 rounded-full scale-110 animate-spin-slow" />
                <div className="absolute inset-0 border border-[var(--color-neon-gold)]/10 rounded-full scale-[1.25] animate-spin-reverse-slow" />
                
                <p className="text-zinc-400 font-mono text-[10px] md:text-xs mb-2 uppercase tracking-[0.3em] font-bold">Reserva de Seiva Pessoal</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-7xl font-display font-light text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                    {balance.toFixed(4)}
                  </span>
                  <span className="text-xl md:text-2xl text-[var(--color-luxury-bronze)] font-mono">TC</span>
                </div>
                <p className="text-[10px] uppercase font-mono text-zinc-500 mt-2 tracking-widest">≈ $ {(balance * 0.12).toFixed(2)} USD</p>
                
                <div className="mt-8 flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[var(--color-earth-green)]/10 to-transparent rounded-full border border-[var(--color-earth-green)]/30 backdrop-blur-md">
                  <Box size={14} className="text-[var(--color-earth-green)]" />
                  <span className="font-mono text-xs text-white">MetaMask Conectada</span>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

function StatsCard({ title, value, sub, icon: Icon, color = "text-white" }: any) {
  return (
    <div className="p-5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 glass-panel border-[var(--color-luxury-bronze)]/10 hover:border-[var(--color-luxury-bronze)]/30 group">
      <div className="flex items-center gap-3 mb-4">
        <Icon size={16} className="text-[var(--color-luxury-bronze)]/70 group-hover:text-[var(--color-luxury-bronze)] transition-colors" />
        <span className="text-zinc-500 uppercase tracking-[0.2em] text-[9px] font-bold">{title}</span>
      </div>
      <div>
        <div className={`text-2xl font-display font-light ${color} tracking-wider`}>{value}</div>
        <div className="text-[10px] font-mono text-zinc-500 mt-1.5 uppercase tracking-widest">{sub}</div>
      </div>
    </div>
  );
}

function GoldenLeaves() {
  return (
    <div className="absolute inset-0 pointer-events-none perspective-1000 overflow-hidden">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-6 border-[0.5px] border-[var(--color-luxury-bronze)]/40 bg-gradient-to-br from-[var(--color-luxury-bronze)]/20 to-[var(--color-neon-gold)]/5"
          style={{ 
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            left: `${Math.random() * 100}%`
          }}
          initial={{ y: -50, rotateX: 0, rotateY: 0, rotateZ: Math.random() * 360, opacity: 0 }}
          animate={{ 
            y: window.innerHeight + 50, 
            rotateX: 360,
            rotateY: 360,
            opacity: [0, 1, 1, 0],
            x: `+=${Math.random() * 200 - 100}px`
          }}
          transition={{ 
            duration: 8 + Math.random() * 10, 
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}
