import { motion } from "motion/react";
import { Target, Trophy, Star, Zap, ArrowRight } from "lucide-react";

// Marcos da carreira do colaborador
const MILESTONES = [
  { id: "start", nome: "Start", desc: "Conexão na Raiz", icone: "🌱", tc: 0 },
  { id: "explorer", nome: "Explorador", desc: "Primeira tarefa concluída", icone: "🔍", tc: 100 },
  { id: "producer", nome: "Produtor", desc: "50 links PDFs validados", icone: "⚡", tc: 500 },
  { id: "specialist", nome: "Especialista", desc: "Missões de elite completas", icone: "🎯", tc: 1500 },
  { id: "master", nome: "Mestre", desc: "Contrato mensal ativo", icone: "👑", tc: 3000 },
  { id: "achieve", nome: "Achieve", desc: "Conexão com O DIVINO", icone: "🏆", tc: 10000 },
];

interface LifePlanProps {
  treeCoins: number;
  tarefasCompletas?: number;
}

export function LifePlan({ treeCoins, tarefasCompletas = 0 }: LifePlanProps) {
  const milestoneAtual = MILESTONES.filter(m => treeCoins >= m.tc).length - 1;
  const progresso = Math.min(100, (treeCoins / 10000) * 100);

  return (
    <div className="bg-black border border-[#ffd966]/20 rounded-xl p-4 md:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#ffd966]/10 border border-[#ffd966]/30 flex items-center justify-center">
          <Target className="text-[#ffd966]" size={18} />
        </div>
        <div>
          <h3 className="text-[#ffd966] font-mono text-xs md:text-sm tracking-widest uppercase">Life Plan — Mapa de Carreira</h3>
          <p className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase">Trajetória do Start ao Achieve</p>
        </div>
      </div>

      {/* Barra de Progresso Geral */}
      <div className="mb-6">
        <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-2">
          <span>Progresso Geral</span>
          <span className="text-[#ffd966]">{treeCoins} / 10,000 TC</span>
        </div>
        <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progresso}%` }}
            className="h-full bg-gradient-to-r from-[#ff6600] via-[#ffd966] to-[#ffd700]"
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Timeline de Marcos */}
      <div className="space-y-3">
        {MILESTONES.map((m, i) => {
          const alcancado = treeCoins >= m.tc;
          const atual = i === milestoneAtual;

          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`relative flex items-center gap-4 p-3 md:p-4 rounded-xl border transition-all ${
                atual
                  ? "border-[#ffd966] bg-[#ffd966]/10"
                  : alcancado
                  ? "border-green-500/30 bg-green-500/5"
                  : "border-zinc-800 bg-black/40"
              }`}
            >
              {/* Indicador de progresso */}
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-lg shrink-0 ${
                alcancado
                  ? "bg-gradient-to-br from-[#ffd966] to-[#ffaa00]"
                  : "bg-zinc-900 border border-zinc-700"
              }`}>
                {alcancado ? "✓" : m.icone}
              </div>

              {/* Conteúdo */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`font-mono text-xs md:text-sm tracking-widest uppercase ${
                    alcancado ? "text-white" : "text-zinc-400"
                  }`}>
                    {m.nome}
                  </span>
                  {alcancado && (
                    <span className="text-[9px] text-green-500 font-mono">✓</span>
                  )}
                  {atual && (
                    <span className="text-[8px] bg-[#ffd966]/20 text-[#ffd966] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">
                      Atual
                    </span>
                  )}
                </div>
                <p className="text-[10px] md:text-[11px] text-zinc-500 font-mono mt-0.5">{m.desc}</p>
              </div>

              {/* TC necessário */}
              <div className="text-right shrink-0">
                <p className={`font-mono text-[10px] md:text-xs font-bold ${
                  alcancado ? "text-green-500" : "text-zinc-600"
                }`}>
                  {m.tc.toLocaleString()} TC
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bônus atual */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 bg-gradient-to-r from-[#ffd966]/10 to-transparent border border-[#ffd966]/20 rounded-lg p-3 md:p-4 text-center"
      >
        <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-1">Próximo Bônus</p>
        <p className="text-lg md:text-xl font-mono font-bold text-[#ffd966]">
          {milestoneAtual < MILESTONES.length - 1
            ? `${(MILESTONES[milestoneAtual + 1].tc - treeCoins).toLocaleString()} TC para ${MILESTONES[milestoneAtual + 1].nome}`
            : "🏆 Todos os marcos alcançados!"}
        </p>
      </motion.div>
    </div>
  );
}
