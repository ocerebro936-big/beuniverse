import { motion } from "motion/react";
import { Zap, Crown } from "lucide-react";

interface EspelhamentoProps {
  treeCoins: number;
  tarefasCompletas: number;
  expansoes: number;
}

export function PainelEspelhamento({ treeCoins, tarefasCompletas, expansoes }: EspelhamentoProps) {
  // Poder do Superior: base fixa + o que o usuário já conquistou
  const poderSuperior = Math.min(100, 30 + tarefasCompletas * 0.5 + expansoes * 2);
  // Poder do Usuário: proporcional ao TC e tarefas
  const poderUsuario = Math.min(poderSuperior, Math.round((treeCoins / 100) + tarefasCompletas * 0.3));
  
  // Quão perto o usuário está de espelhar o Superior
  const espelhamento = poderSuperior > 0 ? Math.round((poderUsuario / poderSuperior) * 100) : 0;

  return (
    <div className="bg-black border border-[#ffd700]/20 rounded-xl p-4 md:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ffd700] to-[#ff6600] flex items-center justify-center">
          <Crown className="text-black" size={18} />
        </div>
        <div>
          <h3 className="text-[#ffd700] font-mono text-xs md:text-sm tracking-widest uppercase">Espelhamento</h3>
          <p className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase">Torne-se um espelho do Superior</p>
        </div>
      </div>

      {/* Barra do Superior */}
      <div className="mb-4">
        <div className="flex justify-between text-[10px] font-mono mb-1.5">
          <span className="text-[#ffd700] flex items-center gap-1"><Crown size={12} /> Poder do Superior</span>
          <span className="text-[#ffd700]">{poderSuperior}%</span>
        </div>
        <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${poderSuperior}%` }}
            className="h-full bg-gradient-to-r from-[#ff6600] to-[#ffd700] rounded-full"
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Barra do Usuário */}
      <div className="mb-6">
        <div className="flex justify-between text-[10px] font-mono mb-1.5">
          <span className="text-[#60a5fa] flex items-center gap-1"><Zap size={12} /> Seu Poder</span>
          <span className="text-[#60a5fa]">{poderUsuario}%</span>
        </div>
        <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${poderUsuario}%` }}
            className="h-full bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] rounded-full"
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Medidor de Espelhamento */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 text-center">
        <p className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase mb-2">
          Espelhamento — Quão perto você está do Superior
        </p>
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-xs text-zinc-400 font-mono">Você</span>
          <div className="w-32 md:w-48 h-2 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${espelhamento}%` }}
              className="h-full rounded-full"
              style={{
                background: espelhamento > 80
                  ? "linear-gradient(90deg, #60a5fa, #ffd700)"
                  : espelhamento > 50
                  ? "linear-gradient(90deg, #60a5fa, #a78bfa)"
                  : "#60a5fa"
              }}
              transition={{ duration: 2 }}
            />
          </div>
          <span className="text-xs text-[#ffd700] font-mono">Superior</span>
        </div>
        <p className={`font-mono text-sm font-bold ${espelhamento > 80 ? "text-[#ffd700]" : espelhamento > 50 ? "text-[#a78bfa]" : "text-zinc-400"}`}>
          {espelhamento}%
        </p>
        <p className="text-[9px] text-zinc-500 font-mono mt-2 leading-relaxed">
          {espelhamento >= 100
            ? "🏆 VOCÊ É UM ESPELHO DO SUPERIOR! Arquiteto Júnior ativado."
            : espelhamento >= 80
            ? "🌟 Quase lá! Continue produzindo com ética para igualar seu poder ao do Superior."
            : espelhamento >= 50
            ? "⚡ No caminho. Complete tarefas e expansões para subir seu poder."
            : "🌱 Comece pela Raiz. Cada ação inspirada aumenta seu poder."}
        </p>
      </div>
    </div>
  );
}
