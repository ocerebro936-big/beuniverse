import { motion } from "motion/react";
import { Zap, Server, Cpu, Database, Shield } from "lucide-react";

const METRICAS = [
  { nome: "Superior DIVINO", antes: 320, depois: 4, unidade: "ms", icone: Cpu, cor: "#ffd700" },
  { nome: "Gênio Génesis", antes: 450, depois: 8, unidade: "ms", icone: Zap, cor: "#60a5fa" },
  { nome: "Omni-Gênese", antes: 1200, depois: 15, unidade: "ms", icone: Database, cor: "#34d399" },
  { nome: "Tree Coins", antes: 800, depois: 2, unidade: "ms", icone: Server, cor: "#c084fc" },
  { nome: "Segurança", antes: 200, depois: 1, unidade: "ms", icone: Shield, cor: "#f87171" },
];

export function PainelPerformanceSTier() {
  const reducaoMedia = METRICAS.reduce((acc, m) => acc + (1 - m.depois / m.antes) * 100, 0) / METRICAS.length;

  return (
    <div className="bg-black border border-[#ffd700]/20 rounded-xl p-4 md:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ffd700] to-[#ff6600] flex items-center justify-center">
          <Zap className="text-black" size={18} />
        </div>
        <div>
          <h3 className="text-[#ffd700] font-mono text-xs md:text-sm tracking-widest uppercase">Performance S-Tier</h3>
          <p className="text-green-500 font-mono text-[9px] tracking-widest uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> 
            Ryzen 9 9800X3D — Latência Zero
          </p>
        </div>
      </div>

      {/* Redução Média */}
      <div className="bg-gradient-to-r from-[#ffd700]/10 to-[#ff6600]/10 border border-[#ffd700]/20 rounded-lg p-4 text-center mb-6">
        <p className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase mb-1">Redução Média de Latência</p>
        <p className="text-3xl md:text-4xl font-mono font-bold text-[#ffd700] drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">
          {reducaoMedia.toFixed(1)}%
        </p>
        <p className="text-[10px] text-green-500 font-mono mt-1">Sistema {reducaoMedia > 95 ? "99.9%" : ""} mais rápido</p>
      </div>

      {/* Métricas */}
      <div className="space-y-3">
        {METRICAS.map((m, i) => {
          const Icon = m.icone;
          const melhoria = ((1 - m.depois / m.antes) * 100).toFixed(1);
          return (
            <motion.div
              key={m.nome}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 md:p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon size={14} style={{ color: m.cor }} />
                  <span className="text-white font-mono text-[10px] md:text-xs tracking-wider">{m.nome}</span>
                </div>
                <span className="text-green-500 font-mono text-[10px] font-bold">+{melhoria}%</span>
              </div>

              {/* Barras comparativas */}
              <div className="flex items-center gap-3">
                <span className="text-[8px] text-zinc-600 font-mono w-6">Antes</span>
                <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: `${(m.antes / 1200) * 100}%` }}
                    className="h-full bg-zinc-600 rounded-full"
                    transition={{ duration: 1 }}
                  />
                </div>
                <span className="text-[9px] text-zinc-500 font-mono w-12 text-right">{m.antes}{m.unidade}</span>
              </div>

              <div className="flex items-center gap-3 mt-1">
                <span className="text-[8px] text-green-500 font-mono w-6">Depois</span>
                <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(m.depois / 1200) * 100}%` }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: m.cor }}
                    transition={{ duration: 1.5, delay: 0.3 + i * 0.1 }}
                  />
                </div>
                <span className="text-[9px] text-green-500 font-mono w-12 text-right">{m.depois}{m.unidade}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Status S-Tier */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 bg-gradient-to-r from-zinc-900 to-black border border-[#ffd700]/20 rounded-lg p-3 md:p-4 text-center"
      >
        <p className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase mb-1">Hardware</p>
        <p className="text-[#ffd700] font-mono text-xs tracking-wider">AMD Ryzen 9 9800X3D • Memória Quettabyte • Proxy Acelerado</p>
        <p className="text-[8px] text-green-500 font-mono mt-2 tracking-widest uppercase flex items-center justify-center gap-1">
          <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
          S-Tier Ativo • Latência Zero
        </p>
      </motion.div>
    </div>
  );
}
