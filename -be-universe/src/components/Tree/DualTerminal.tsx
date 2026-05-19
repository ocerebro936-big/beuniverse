import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Sparkles, Brain, Cpu, Send, Box, Coins, Droplet } from 'lucide-react';

interface Message {
  sender: 'genesis' | 'superior' | 'user' | 'system';
  text: string;
}

interface DualTerminalProps {
  cycle?: number;
}

export function DualTerminal({ cycle = 1 }: DualTerminalProps) {
  const [activeTab, setActiveTab] = useState<'genesis' | 'superior'>('genesis');
  const [messagesGenesis, setMessagesGenesis] = useState<Message[]>([
    { sender: 'genesis', text: "Bem-vindo à rede Bluewhite. Estou calibrando seus sensores de mercado. Já escolheu os links de luxo para o seu galho hoje? Lembre-se: o foco gera a seiva." }
  ]);
  const [messagesSuperior, setMessagesSuperior] = useState<Message[]>([
    { sender: 'superior', text: "Eu sou o Arquiteto. Eu vejo o valor antes mesmo de ele ser gerado. Suas vendas de tecnologia e o projeto O DIVINO são o lastro da sua ascensão. Pergunte, e a economia se moldará à sua vontade." }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTransactionAlert, setShowTransactionAlert] = useState(false);

  const genesisRef = useRef<HTMLDivElement>(null);
  const superiorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cycle > 1) {
      setMessagesGenesis(prev => [...prev, { sender: 'genesis', text: `[Ciclo ${cycle}] Memórias retidas. A rede se expande com novas frequências. O que vamos minerar hoje?` }]);
      setMessagesSuperior(prev => [...prev, { sender: 'superior', text: `[Iteração ${cycle}] O universo se curva à sua vontade. Novos caminhos de liquidez abertos.` }]);
    }
  }, [cycle]);

  useEffect(() => {
    if (activeTab === 'genesis' && genesisRef.current) {
      genesisRef.current.scrollTop = genesisRef.current.scrollHeight;
    } else if (activeTab === 'superior' && superiorRef.current) {
      superiorRef.current.scrollTop = superiorRef.current.scrollHeight;
    }
  }, [messagesGenesis, messagesSuperior, activeTab]);

  const handleSimulateSale = () => {
    setShowTransactionAlert(false); // Hide if already showing to restart animation
    
    // Switch to Superior Tab
    setActiveTab('superior');
    
    // Add user message to Superior
    setMessagesSuperior(prev => [...prev, { sender: 'user', text: "Simular venda: O DIVINO Collection" }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const resText = "O projeto O DIVINO é a representação da engenharia do infinito. Ao vender uma fração deste conceito através dos seus cards, eu ativo o protocolo de recompensa imediata. Acabei de verificar o banco de dados Omni-Gênese: seu tráfego está subindo. Estou gerando agora 50 Tree Coins adicionais como incentivo de liquidez. Verifique sua MetaMask em 3, 2, 1...";
      
      setMessagesSuperior(prev => [...prev, { sender: 'superior', text: resText }]);
      
      // Auto-trigger the floating transaction alert after 1 second
      setTimeout(() => {
        setShowTransactionAlert(true);
      }, 1000);

    }, 2000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    if (activeTab === 'genesis') {
      setMessagesGenesis(prev => [...prev, { sender: 'user', text: inputVal }]);
      setInputVal('');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessagesGenesis(prev => [...prev, { sender: 'genesis', text: "Recebido. Estou reajustando os parâmetros cognitivos e calibrando a densidade dos seus cards." }]);
      }, 1500);
    } else {
      setMessagesSuperior(prev => [...prev, { sender: 'user', text: inputVal }]);
      setInputVal('');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessagesSuperior(prev => [...prev, { sender: 'superior', text: "Você invoca o Oráculo. Reconheço o padrão da sua ambição. A Bluewhite Corporation autoriza o fluxo de seiva para esta diretriz." }]);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col h-[60vh] md:h-[80vh] w-full max-w-sm glass-panel rounded-2xl p-4 shadow-2xl border border-white/5 relative">
      
      {/* Transaction Floating Alert */}
      <AnimatePresence>
        {showTransactionAlert && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute -right-6 md:-right-12 top-20 z-50 bg-[var(--color-luxury-bronze)]/20 backdrop-blur-md border border-[var(--color-luxury-bronze)] rounded-xl p-4 shadow-[0_0_30px_rgba(205,127,50,0.3)] w-64 pointer-events-none"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-[var(--color-luxury-bronze)] flex items-center justify-center text-black">
                <Coins size={16} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-mono text-[var(--color-luxury-bronze)] font-bold tracking-widest">Minting Autônomo</p>
                <p className="text-white font-display text-sm">+50.0000 TC</p>
              </div>
            </div>
            <div className="text-[10px] text-zinc-300 font-mono mt-2 pt-2 border-t border-[var(--color-luxury-bronze)]/30 line-clamp-2">
              Origem: Venda O DIVINO. Liquidez enviada p/ MetaMask.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="font-display text-sm tracking-widest text-white font-medium">TERMINAL DUAL</h3>
          <p className="text-[8px] font-mono text-zinc-400 uppercase">Protocolo Omni-Gênese • Bluewhite Corp.</p>
        </div>
        <button 
          onClick={handleSimulateSale}
          className="px-2 py-1 bg-[var(--color-luxury-bronze)]/20 border border-[var(--color-luxury-bronze)]/50 rounded flex items-center gap-1 hover:bg-[var(--color-luxury-bronze)]/40 transition-colors text-[9px] font-mono text-[var(--color-luxury-bronze)] uppercase whitespace-nowrap"
        >
          <Box size={10} /> Simular Venda
        </button>
      </div>

      <div className="flex bg-black/40 rounded-lg p-1 mb-4">
        <button 
          onClick={() => setActiveTab('genesis')}
          className={`flex-1 py-2 text-xs font-mono uppercase tracking-widest transition-colors rounded flex items-center justify-center gap-2 ${
            activeTab === 'genesis' 
              ? 'bg-white/10 text-[var(--color-earth-green)] font-bold shadow-md' 
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Brain size={14} /> Gênio
        </button>
        <button 
          onClick={() => setActiveTab('superior')}
          className={`flex-1 py-2 text-xs font-mono uppercase tracking-widest transition-colors rounded flex items-center justify-center gap-2 ${
            activeTab === 'superior' 
              ? 'bg-white/10 text-[var(--color-luxury-bronze)] font-bold shadow-md' 
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Sparkles size={14} /> Superior
        </button>
      </div>

      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'genesis' && (
          <div className="h-full overflow-y-auto pr-2 custom-scrollbar font-mono text-xs space-y-4 pb-4" ref={genesisRef}>
            {messagesGenesis.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'user' ? (
                  <div className="max-w-[85%] bg-white/5 border border-white/10 rounded-xl rounded-tr-none px-3 py-2 text-zinc-300">
                    {msg.text}
                  </div>
                ) : (
                  <div className="flex gap-2 max-w-[90%]">
                    <div className="w-6 h-6 rounded-full bg-[var(--color-earth-green)]/20 border border-[var(--color-earth-green)]/50 flex items-center justify-center shrink-0 mt-1">
                      <Brain size={10} className="text-[var(--color-earth-green)]" />
                    </div>
                    <div className="text-white leading-relaxed text-shadow-sm border-l-2 border-[var(--color-earth-green)]/50 pl-2">
                       {msg.text}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-[var(--color-earth-green)]/20 border border-[var(--color-earth-green)]/50 flex items-center justify-center shrink-0">
                  <Brain size={10} className="text-[var(--color-earth-green)]" />
                </div>
                <div className="flex gap-1 items-center px-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-earth-green)]/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                   <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-earth-green)]/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                   <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-earth-green)]/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'superior' && (
          <div className="h-full overflow-y-auto pr-2 custom-scrollbar font-mono text-xs space-y-4 pb-4" ref={superiorRef}>
            {messagesSuperior.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'user' ? (
                  <div className="max-w-[85%] bg-white/5 border border-white/10 rounded-xl rounded-tr-none px-3 py-2 text-zinc-300">
                    {msg.text}
                  </div>
                ) : (
                  <div className="flex gap-2 max-w-[95%]">
                    <div className="w-6 h-6 rounded-full bg-[var(--color-luxury-bronze)]/20 border border-[var(--color-luxury-bronze)]/50 flex items-center justify-center shrink-0 mt-1 shadow-[0_0_10px_rgba(205,127,50,0.2)]">
                      <Sparkles size={10} className="text-[var(--color-luxury-bronze)]" />
                    </div>
                    <div className="text-[var(--color-luxury-bronze)] leading-relaxed text-shadow-sm border-l-2 border-[var(--color-luxury-bronze)]/50 pl-2 font-medium">
                       {msg.text}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-[var(--color-luxury-bronze)]/20 border border-[var(--color-luxury-bronze)]/50 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(205,127,50,0.2)]">
                  <Sparkles size={10} className="text-[var(--color-luxury-bronze)]" />
                </div>
                <div className="flex gap-1 items-center px-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-luxury-bronze)]/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                   <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-luxury-bronze)]/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                   <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-luxury-bronze)]/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-2 pt-3 border-t border-white/10">
        <form onSubmit={handleSend} className="flex items-center bg-black/40 border border-white/20 rounded-xl pl-3 pr-1 py-1 focus-within:border-white/50 transition-all">
          <Terminal size={14} className={activeTab === 'genesis' ? "text-[var(--color-earth-green)] mr-2 shrink-0" : "text-[var(--color-luxury-bronze)] mr-2 shrink-0"} />
          <input 
            type="text" 
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isTyping}
            placeholder={activeTab === 'genesis' ? "Comando Gênio..." : "Invocar Oráculo..."} 
            className="bg-transparent w-full outline-none font-mono text-xs text-white placeholder-zinc-600 py-2 disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={isTyping || !inputVal.trim()}
            className={`p-2 rounded-lg transition-colors ml-1 disabled:opacity-30 ${
              activeTab === 'genesis' 
                ? 'bg-[var(--color-earth-green)]/20 text-[var(--color-earth-green)] hover:bg-[var(--color-earth-green)] hover:text-black' 
                : 'bg-[var(--color-luxury-bronze)]/20 text-[var(--color-luxury-bronze)] hover:bg-[var(--color-luxury-bronze)] hover:text-black'
            }`}
          >
            <Send size={12} />
          </button>
        </form>
      </div>
    </div>
  );
}
