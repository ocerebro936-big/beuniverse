import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ShieldCheck, Database, Link as LinkIcon, Plus, Copy, CheckCircle2, TrendingUp, Cpu, Car, Bot } from 'lucide-react';

interface LinkStoreProps {
  onBack: () => void;
  key?: string;
}

interface SaleCard {
  id: string;
  title: string;
  category: 'Tecnologia' | 'Luxo' | 'Ferramenta IA';
  url: string;
  clicks: number;
  fiatPrice: string;
  tcReward: string;
  imageIcon: any;
}

export function LinkStore({ onBack }: LinkStoreProps) {
  const [newLink, setNewLink] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const [cards, setCards] = useState<SaleCard[]>([
    {
      id: '1',
      title: 'O DIVINO - Supercar Collection',
      category: 'Luxo',
      url: 'https://odivino.store/collection',
      clicks: 1204,
      fiatPrice: '$25,000.00',
      tcReward: '50.0000 TC',
      imageIcon: Car
    },
    {
      id: '2',
      title: 'Omni-Gênese DB Service',
      category: 'Tecnologia',
      url: 'https://genesis.cloud/db',
      clicks: 432,
      fiatPrice: '$49.99/mo',
      tcReward: '0.1000 TC/mo',
      imageIcon: Database
    },
    {
      id: '3',
      title: 'Nova IA - Model Optimizer',
      category: 'Ferramenta IA',
      url: 'https://nova-ia.ai',
      clicks: 890,
      fiatPrice: '$199.00',
      tcReward: '0.4000 TC',
      imageIcon: Bot
    },
    {
      id: '4',
      title: 'Hardware Wallet Gen-2',
      category: 'Tecnologia',
      url: 'https://secure-wallet.io',
      clicks: 156,
      fiatPrice: '$150.00',
      tcReward: '0.3000 TC',
      imageIcon: Cpu
    },
    {
      id: '5',
      title: 'Auto-GPT Interface',
      category: 'Ferramenta IA',
      url: 'https://autogpt.pro',
      clicks: 342,
      fiatPrice: '$29.99',
      tcReward: '0.0500 TC',
      imageIcon: Bot
    },
    {
      id: '6',
      title: 'Divino Exclusive Track Day',
      category: 'Luxo',
      url: 'https://odivino.store/trackday',
      clicks: 56,
      fiatPrice: '$5,000.00',
      tcReward: '10.0000 TC',
      imageIcon: Car
    }
  ]);

  const handleGenerateLink = () => {
    if (!newLink) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedLink(`https://arvore.divino/${Math.random().toString(36).substring(7)}`);
      // Simulating real-time suggestion from Superior DIVINO IA
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      className="absolute inset-0 z-50 bg-[#020502]/95 backdrop-blur-3xl flex flex-col overflow-y-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <div className="absolute top-4 right-4 z-20">
        <button 
          onClick={onBack}
          className="p-2 border border-[var(--color-luxury-bronze)]/30 hover:border-[var(--color-luxury-bronze)] rounded-full bg-black/50 transition-all hover:scale-110 aspect-square flex items-center justify-center group"
        >
          <X size={16} className="text-[var(--color-luxury-bronze)]/50 group-hover:text-[var(--color-luxury-bronze)]" />
        </button>
      </div>

      <div className="max-w-7xl w-full mx-auto p-6 pt-16 pb-24 min-h-screen relative">
        {/* Divine Galery Background Ornaments */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-b from-[var(--color-luxury-bronze)]/10 to-transparent pointer-events-none rounded-b-full blur-[100px]" />
        
        <div className="relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-display text-white mb-3 tracking-tighter">THE DIVINE GALLERY</h2>
            <p className="text-[var(--color-luxury-bronze)] font-mono text-sm tracking-[0.3em] uppercase">Marketplace de Alta Densidade</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-zinc-500">
              <ShieldCheck size={14} className="text-[var(--color-earth-green)]" />
              Monitorado por <strong className="text-white">Superior DIVINO IA</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 relative">
            
            {/* Left Column: Link Generator & Omni-Genese Stats */}
            <div className="xl:col-span-4 space-y-6">
              
              {/* OMNI-GÊNESE DB VISUALIZER */}
              <div className="p-6 border border-white/5 rounded-2xl bg-black/60 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-earth-green)]/10 blur-[40px] rounded-full" />
                <div className="flex items-center gap-3 mb-6">
                  <Database className="text-[var(--color-earth-green)] animate-pulse" size={20} />
                  <div>
                    <h3 className="text-lg font-display text-white">Banco Omni-Gênese</h3>
                    <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Sync Global Ativo 24/7</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="font-mono text-xs text-zinc-400">Nós Conectados</span>
                    <span className="font-mono text-xs text-white">14.204.891</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="font-mono text-xs text-zinc-400">Conversão (24h)</span>
                    <span className="font-mono text-xs text-[var(--color-earth-green)]">+ 4,200.00 TC</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="font-mono text-xs text-zinc-400">Status Seiva</span>
                    <span className="font-mono text-xs text-[var(--color-neon-gold)] flex items-center gap-1">
                      <TrendingUp size={12} /> Alta Demanda: IA
                    </span>
                  </div>
                </div>

                {/* Simulated Pulse Effect */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-earth-green)] to-transparent opacity-50 animate-pulse" />
              </div>

              {/* LINK GENERATOR VORTEX */}
              <div className="p-6 border border-[var(--color-luxury-bronze)]/20 rounded-2xl bg-gradient-to-b from-black to-[var(--color-luxury-bronze)]/5 relative">
                <div className="flex flex-col mb-4">
                  <h3 className="text-lg font-display text-white flex items-center gap-2">
                    <LinkIcon size={18} className="text-[var(--color-luxury-bronze)]" />
                    Forja de Afiliados
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">Cole qualquer link parceiro. O Superior DIVINO IA converterá em raiz rastreável.</p>
                </div>

                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="https://exemplo.com/produto" 
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[var(--color-luxury-bronze)] transition-colors"
                  />
                  <button 
                    onClick={handleGenerateLink}
                    disabled={isGenerating || !newLink}
                    className="w-full py-3 bg-[var(--color-luxury-bronze)] text-black font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? 'Sintetizando...' : 'Gerar Rastreamento Divino'}
                  </button>
                </div>

                <AnimatePresence>
                  {generatedLink && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 p-4 border border-[var(--color-earth-green)]/30 bg-[var(--color-earth-green)]/5 rounded-lg"
                    >
                      <p className="text-[10px] uppercase font-mono text-zinc-400 mb-2">Sua URL Única:</p>
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-mono text-xs text-[var(--color-earth-green)] truncate">{generatedLink}</span>
                        <button 
                          onClick={handleCopy}
                          className="p-2 border border-[var(--color-earth-green)]/50 rounded hover:bg-[var(--color-earth-green)] hover:text-black text-white transition-colors shrink-0"
                        >
                          {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                      
                      {/* AI Suggestion */}
                      <div className="mt-4 text-xs font-mono text-zinc-400 border-t border-[var(--color-earth-green)]/20 pt-3 flex flex-col gap-2">
                        <span className="text-white flex items-center gap-1 font-bold"><Brain size={12} className="text-[var(--color-neon-gold)]" /> Superior DIVINO IA sugere:</span>
                        "Substitua o Slot 4 por este novo link. O setor de IA está com alta demanda hoje."
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>

            {/* Right Column: 6 Gallery Cards */}
            <div className="xl:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cards.map((card) => {
                  const Icon = card.imageIcon;
                  return (
                    <div key={card.id} className="group relative p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent hover:from-[var(--color-luxury-bronze)]/50 transition-all duration-500 cursor-pointer h-full">
                      <div className="absolute inset-0 bg-black/80 rounded-2xl -z-10 group-hover:bg-black/60 transition-all duration-500" />
                      
                      <div className="h-full glass-panel border border-[var(--color-luxury-bronze)]/10 rounded-xl p-5 flex flex-col justify-between overflow-hidden relative">
                        {/* Shimmer effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />

                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] uppercase font-mono text-zinc-400 tracking-wider">
                              {card.category}
                            </span>
                            <div className="w-10 h-10 rounded-full bg-[var(--color-luxury-bronze)]/10 flex items-center justify-center border border-[var(--color-luxury-bronze)]/20">
                              <Icon size={18} className="text-[var(--color-luxury-bronze)] group-hover:text-white transition-colors" />
                            </div>
                          </div>
                          
                          <h4 className="text-white font-display text-xl mb-1">{card.title}</h4>
                          <p className="text-zinc-500 font-mono text-[10px] flex items-center gap-1 mb-6 truncate"><ExternalLink size={10} /> {card.url}</p>
                        </div>
                        
                        <div className="pt-4 border-t border-white/5 space-y-3">
                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em] mb-1">Preço Fíat</p>
                              <p className="text-white font-display text-lg">{card.fiatPrice}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] text-[var(--color-earth-green)] font-mono uppercase tracking-[0.2em] mb-1">Reward</p>
                              <p className="text-[var(--color-earth-green)] font-mono text-sm font-bold">{card.tcReward}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between bg-black/40 px-3 py-2 rounded">
                             <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                                <TrendingUp size={12} className="text-[var(--color-neon-gold)]" />
                                {card.clicks.toLocaleString()} cliques
                             </div>
                             <span className="text-[10px] uppercase text-zinc-600 font-mono">Via Omni-Gênese</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Ensure Brain icon is imported, let's fix it if it's missing from my previous import list.
function Brain(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>
}
