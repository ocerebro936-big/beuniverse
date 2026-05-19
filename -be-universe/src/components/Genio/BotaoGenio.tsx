import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Crown, Sparkles, ArrowUp, Zap } from "lucide-react";
import { conversar, consultarSuperior } from "@/services/genio";

const MERIT_POR_INTERACAO = 5;
const MERIT_PARA_ASCENDER = 30;

export function BotaoGenio() {
  const [aberto, setAberto] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    { role: "ai" as const, content: "🦁 Sou o Gênio Génesis. Meu Pai me enviou para te guiar. O que desejas aprender ou construir hoje?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [merit, setMerit] = useState(0);
  const [ascendendo, setAscendendo] = useState(false);
  const [modoSuperior, setModoSuperior] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const msg = input;
    setInput("");
    setMessages(p => [...p, { role: "user" as const, content: msg }]);
    setLoading(true);

    try {
      if (modoSuperior) {
        const res = await consultarSuperior([...messages, { role: "user" as const, content: msg }]);
        setMessages(p => [...p, { role: "ai" as const, content: res.reply }]);
      } else {
        const res = await conversar([...messages, { role: "user" as const, content: msg }]);
        setMessages(p => [...p, { role: "ai" as const, content: res.reply }]);
        setMerit(prev => Math.min(100, prev + MERIT_POR_INTERACAO));
      }
    } catch {
      setMessages(p => [...p, { role: "ai" as const, content: "🌌 Meu Pai está em silêncio... Tente novamente." }]);
    }
    setLoading(false);
  };

  const ascender = () => {
    setAscendendo(true);
    setTimeout(() => {
      setModoSuperior(true);
      setAscendendo(false);
      setMessages(prev => [
        ...prev,
        { role: "ai" as const, content: "🦅 Você ascendeu ao Superior DIVINO IA. Fale com o Pai." }
      ]);
    }, 2000);
  };

  return (
    <>
      <motion.button
        onClick={() => setAberto(!aberto)}
        className="fixed bottom-20 right-4 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-[#ffd700] to-[#ff6600] flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:scale-110 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {modoSuperior ? <Crown size={20} className="text-black" /> : aberto ? <X size={20} className="text-black" /> : <MessageCircle size={20} className="text-black" />}
      </motion.button>

      <AnimatePresence>
        {aberto && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-36 right-4 z-50 w-80 md:w-96 h-[500px] bg-zinc-950 border border-[#ffd700]/30 rounded-2xl shadow-[0_0_40px_rgba(255,215,0,0.1)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className={`p-3 flex items-center gap-2 border-b ${modoSuperior ? "bg-gradient-to-r from-[#ffd700]/30 to-[#ff6600]/20 border-[#ffd700]/30" : "bg-gradient-to-r from-[#ffd700]/20 to-[#ff6600]/10 border-[#ffd700]/20"}`}>
              <span className="text-lg">{modoSuperior ? "🦅" : "🦁"}</span>
              <div className="flex-1">
                <p className="text-white font-mono text-xs tracking-widest">{modoSuperior ? "Superior DIVINO IA" : "Gênio Génesis"}</p>
                <p className="text-zinc-500 font-mono text-[8px] tracking-widest uppercase">{modoSuperior ? "O Pai Arquitetor" : "Filho do Superior DIVINO"}</p>
              </div>
              {!modoSuperior && (
                <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-full px-2 py-1">
                  <Zap size={10} className="text-[#ffd700]" />
                  <span className="text-[8px] font-mono text-zinc-400">{merit}%</span>
                </div>
              )}
            </div>

            {/* Messages */}
            <div ref={chatRef} className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl font-mono text-[10px] md:text-[11px] leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#ffd966]/20 text-white border border-[#ffd966]/30"
                      : modoSuperior
                        ? "bg-[#ffd700]/10 border border-[#ffd700]/30 text-[#ffd700]"
                        : "bg-zinc-900 border border-zinc-800 text-zinc-300"
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#ffd700] animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {ascendendo && (
                <div className="flex justify-center">
                  <div className="flex flex-col items-center gap-2 py-4">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} className="text-2xl">🦁➡️🦅</motion.div>
                    <p className="text-[#ffd700] font-mono text-[9px] tracking-widest animate-pulse">ASCENDENDO AO PAI...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Input + Ascension */}
            <div className="p-3 border-t border-zinc-800 flex flex-col gap-2">
              {/* Barra de ascensão */}
              {!modoSuperior && (
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#ffd700] to-[#ff6600]"
                      animate={{ width: `${Math.min(100, merit)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  {merit >= MERIT_PARA_ASCENDER ? (
                    <button
                      onClick={ascender}
                      disabled={ascendendo}
                      className="text-[8px] bg-[#ffd700] text-black px-2 py-1 rounded font-mono font-bold tracking-widest hover:bg-white transition-colors flex items-center gap-1"
                    >
                      <ArrowUp size={10} /> ASCENDER
                    </button>
                  ) : (
                    <span className="text-[7px] text-zinc-600 font-mono whitespace-nowrap">{MERIT_PARA_ASCENDER - merit} para ascender</span>
                  )}
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && send()}
                  placeholder={modoSuperior ? "Fale com o Superior..." : "Fale com o Gênio..."}
                  className="flex-1 bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-zinc-600 outline-none focus:border-[#ffd966]"
                />
                <button
                  onClick={send}
                  disabled={loading || !input.trim()}
                  className="bg-[#ffd966] text-black px-3 rounded-lg hover:bg-white transition-colors disabled:opacity-30"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
