import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Target, ExternalLink, CheckCircle2, Lock, Sparkles } from "lucide-react";

const MISSOES = [
  {
    id: 1,
    titulo: "Analista de Mercado",
    descricao: "Pesquise 3 tendências de mercado para 2026 usando ferramentas de IA. Entregue um relatório de 1 página.",
    recompensa: 50,
    dificuldade: "Iniciante",
    status: "disponivel" as const,
    area: "Finanças",
  },
  {
    id: 2,
    titulo: "Auditor de Cards de Luxo",
    descricao: "Revise os 6 Cards de um colega e dê feedback sobre design, copy e conversão.",
    recompensa: 80,
    dificuldade: "Fácil",
    status: "disponivel" as const,
    area: "Marketing",
  },
  {
    id: 3,
    titulo: "Tradutor Técnico (Inglês/Português)",
    descricao: "Traduza a documentação do sistema para Inglês com precisão técnica. 5 páginas.",
    recompensa: 120,
    dificuldade: "Médio",
    status: "disponivel" as const,
    area: "Idiomas",
  },
  {
    id: 4,
    titulo: "Desenvolvedor de Agente de IA",
    descricao: "Construa um agente em Python que automatiza uma tarefa repetitiva no ecossistema.",
    recompensa: 200,
    dificuldade: "Avançado",
    status: "disponivel" as const,
    area: "Programação",
  },
  {
    id: 5,
    titulo: "Curador do Projeto O DIVINO",
    descricao: "Analise 10 blueprints de hypercarros e filtre os melhores para o acervo da Bluewhite.",
    recompensa: 300,
    dificuldade: "Elite",
    status: "lock" as const,
    area: "Engenharia",
  },
];

export function MissoesMercado() {
  const [missoes, setMissoes] = useState(MISSOES);
  const [selected, setSelected] = useState<number | null>(null);

  const aceitarMissao = (id: number) => {
    setMissoes(prev => prev.map(m => m.id === id ? { ...m, status: "disponivel" as const } : m));
    setSelected(null);
  };

  const disponiveis = missoes.filter(m => m.status === "disponivel" || m.status === "lock");

  return (
    <div className="bg-black border border-zinc-800 rounded-xl p-4 md:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#34d399]/10 border border-[#34d399]/30 flex items-center justify-center">
          <Target className="text-[#34d399]" size={18} />
        </div>
        <div>
          <h3 className="text-[#34d399] font-mono text-xs md:text-sm tracking-widest uppercase">Missões de Mercado</h3>
          <p className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase">{disponiveis.length} disponíveis · 50% de recompensa em USDC</p>
        </div>
      </div>

      <div className="space-y-3">
        {missoes.map((m, i) => {
          const isLocked = m.status === "lock";

          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`relative rounded-xl border transition-all overflow-hidden ${
                isLocked
                  ? "border-zinc-800 opacity-50"
                  : selected === m.id
                    ? "border-[#34d399] bg-[#34d399]/5"
                    : "border-zinc-800 hover:border-zinc-600 bg-zinc-900/30"
              }`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className={`font-mono text-xs tracking-widest uppercase ${isLocked ? "text-zinc-500" : "text-white"}`}>
                        {m.titulo}
                      </h4>
                      <span className={`text-[8px] px-2 py-0.5 rounded-full font-mono tracking-wider ${
                        m.dificuldade === "Iniciante" ? "bg-green-900/30 text-green-500" :
                        m.dificuldade === "Fácil" ? "bg-blue-900/30 text-blue-400" :
                        m.dificuldade === "Médio" ? "bg-yellow-900/30 text-[#ffd700]" :
                        m.dificuldade === "Avançado" ? "bg-red-900/30 text-red-400" :
                        "bg-purple-900/30 text-purple-400"
                      }`}>{m.dificuldade}</span>
                      <span className="text-[8px] text-zinc-600 font-mono">{m.area}</span>
                    </div>
                    <p className="text-zinc-400 font-mono text-[10px] leading-relaxed">{m.descricao}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[#34d399] font-mono text-xs font-bold">{m.recompensa} TC</p>
                    {isLocked && <Lock size={12} className="text-zinc-600 ml-auto mt-1" />}
                  </div>
                </div>

                {selected === m.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 pt-3 border-t border-[#34d399]/20"
                  >
                    <p className="text-[9px] text-zinc-500 font-mono mb-3">50% de {m.recompensa} TC = {(m.recompensa * 0.5).toFixed(0)} TC direto na sua conta ao concluir.</p>
                    <button
                      onClick={() => aceitarMissao(m.id)}
                      className="w-full py-2 bg-[#34d399] text-black rounded-lg font-mono text-[10px] font-bold tracking-widest uppercase hover:bg-white transition-colors flex items-center justify-center gap-2"
                    >
                      <Sparkles size={12} /> Aceitar Missão
                    </button>
                  </motion.div>
                )}
              </div>

              {!isLocked && selected !== m.id && (
                <button
                  onClick={() => setSelected(m.id)}
                  className="absolute inset-0"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <p className="text-center text-[8px] text-zinc-600 font-mono mt-4 tracking-widest">
        Complete missões para acumular mérito e ascender ao Superior DIVINO
      </p>
    </div>
  );
}
