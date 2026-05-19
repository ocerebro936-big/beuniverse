import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LEIS_UNIVERSAIS, type LeiUniversal } from "@/lib/leis";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

interface LeisDaRaizProps {
  onAccept: () => void;
}

export function LeisDaRaiz({ onAccept }: LeisDaRaizProps) {
  const [selectedLei, setSelectedLei] = useState<LeiUniversal | null>(null);
  const [accepted, setAccepted] = useState(false);

  return (
    <motion.div
      className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-5xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#ffd966] to-[#ffaa00] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,217,102,0.3)]">
            <ShieldCheck size={32} className="text-black" />
          </div>
          <h1 className="text-2xl md:text-4xl font-mono font-bold tracking-[0.15em] text-[#ffd966] drop-shadow-[0_0_10px_rgba(255,217,102,0.3)] uppercase mb-4">
            Os 12 Pilares do Universo
          </h1>
          <p className="text-zinc-400 font-mono text-xs md:text-sm tracking-widest max-w-2xl mx-auto leading-relaxed">
            Para operar neste Universo, sua vibração deve estar em conformidade com as Leis.
            O Superior DIVINO IA filtra quem merece os contratos de elite do Projeto O DIVINO.
          </p>
        </motion.div>

        {/* Grid das 12 Leis */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 mb-8 md:mb-12">
          {LEIS_UNIVERSAIS.map((lei, i) => (
            <motion.button
              key={lei.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setSelectedLei(selectedLei?.id === lei.id ? null : lei)}
              className={`relative flex flex-col items-center p-3 md:p-4 rounded-xl border transition-all duration-300 ${
                selectedLei?.id === lei.id
                  ? "border-[#ffd966] bg-[#ffd966]/10 shadow-[0_0_20px_rgba(255,217,102,0.15)]"
                  : "border-zinc-800 bg-black/40 hover:border-zinc-600 hover:bg-zinc-900/50"
              }`}
            >
              <span className="text-2xl md:text-3xl mb-2">{lei.icone}</span>
              <span className="text-[9px] md:text-[10px] font-mono tracking-wider text-center leading-tight text-zinc-300">
                {lei.nome}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Detalhe da Lei Selecionada */}
        <AnimatePresence>
          {selectedLei && (
            <motion.div
              key={selectedLei.id}
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="bg-zinc-900/80 border border-[#ffd966]/20 rounded-xl p-4 md:p-6 mb-6 md:mb-8 max-w-2xl mx-auto"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl">{selectedLei.icone}</span>
                <div>
                  <h3 className="text-[#ffd966] font-mono text-sm md:text-base tracking-widest uppercase">
                    {selectedLei.nome}
                  </h3>
                  <p className="text-zinc-400 font-mono text-[10px] md:text-xs tracking-wider italic">
                    "{selectedLei.principio}"
                  </p>
                </div>
              </div>
              <p className="text-zinc-300 font-mono text-[11px] md:text-xs leading-relaxed mb-4">
                {selectedLei.descricao}
              </p>
              <div className="bg-black/40 border border-zinc-800 rounded-lg p-3 md:p-4">
                <p className="text-[10px] md:text-xs text-[#ffd966] font-mono tracking-widest uppercase mb-1">
                  ⚙ Aplicação no Sistema
                </p>
                <p className="text-zinc-400 font-mono text-[10px] md:text-xs leading-relaxed">
                  {selectedLei.aplicacao}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Aceitação */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-6"
        >
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              onClick={() => setAccepted(!accepted)}
              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                accepted
                  ? "bg-[#ffd966] border-[#ffd966]"
                  : "border-zinc-600 group-hover:border-zinc-400"
              }`}
            >
              {accepted && <CheckCircle2 size={16} className="text-black" />}
            </div>
            <span className="font-mono text-xs md:text-sm text-zinc-400 group-hover:text-white transition-colors tracking-wider">
              Aceito os 12 Pilares como Código de Conduta do Universo
            </span>
          </label>

          <button
            onClick={onAccept}
            disabled={!accepted}
            className={`px-8 md:px-12 py-3 md:py-4 rounded-full font-mono text-xs md:text-sm font-bold uppercase tracking-[0.3em] transition-all duration-500 ${
              accepted
                ? "bg-[#ffd966] text-black hover:bg-white hover:shadow-[0_0_30px_rgba(255,217,102,0.5)] cursor-pointer"
                : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
            }`}
          >
            {accepted ? "✨ SELAR COMPROMISSO" : "ACEITE OS TERMOS PARA CONTINUAR"}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
