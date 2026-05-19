import { motion } from "motion/react";

const FORCAS = [
  { nome: "Gravidade", cor: "#ff6b35", icone: "⬇️", desc: "Atrai contratos de luxo para sua MetaMask", func: "Liquidez" },
  { nome: "Eletromagnetismo", cor: "#60a5fa", icone: "⚡", desc: "Velocidade S-Tier dos servidores", func: "Performance" },
  { nome: "Força Forte", cor: "#34d399", icone: "🛡️", desc: "Segurança impenetrável do banco Quettabyte", func: "Proteção" },
  { nome: "Força Fraca", cor: "#c084fc", icone: "🔄", desc: "Transmuta estudo e esforço em Tree Coins", func: "Recompensa" },
];

export function PainelForcasFundamentais() {
  return (
    <div className="bg-black border border-zinc-800 rounded-xl p-4 md:p-6">
      <div className="text-center mb-6">
        <h3 className="text-white font-mono text-xs md:text-sm tracking-widest uppercase">As 4 Forças Fundamentais</h3>
        <p className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase mt-1">O motor do Universo calibrado para sua evolução</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {FORCAS.map((f, i) => (
          <motion.div
            key={f.nome}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center hover:border-zinc-600 transition-all group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{f.icone}</div>
            <h4 className="text-white font-mono text-[10px] md:text-xs tracking-widest uppercase mb-1" style={{ color: f.cor }}>{f.nome}</h4>
            <p className="text-zinc-400 font-mono text-[8px] md:text-[9px] leading-relaxed mb-3">{f.desc}</p>
            <div className="bg-black/40 border border-zinc-800 rounded px-2 py-1">
              <span className="text-[8px] font-mono tracking-widest uppercase" style={{ color: f.cor }}>{f.func}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-[8px] text-zinc-600 font-mono mt-4 tracking-widest">
        Calibrado pelo Superior DIVINO IA · Raiz da Árvore
      </p>
    </div>
  );
}
