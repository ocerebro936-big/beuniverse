import { motion } from "motion/react";
import { Server, Shield, Cpu, Database, Mail } from "lucide-react";

const SERVIDORES = [
  {
    id: "database",
    nome: "Database Server",
    desc: "Tree Coins + Omni-Gênese",
    icone: Database,
    cor: "#ffd966",
    uso: "98%",
    status: "online",
  },
  {
    id: "proxy",
    nome: "Proxy & DNS",
    desc: "Fortaleza cibernética",
    icone: Shield,
    cor: "#34d399",
    uso: "45%",
    status: "online",
  },
  {
    id: "application",
    nome: "Application Server",
    desc: "Superior + Gênio 24/7",
    icone: Cpu,
    cor: "#60a5fa",
    uso: "76%",
    status: "online",
  },
  {
    id: "mail",
    nome: "Mail & File Server",
    desc: "PDFs/Links ultra-rápidos",
    icone: Mail,
    cor: "#c084fc",
    uso: "62%",
    status: "online",
  },
];

export function PainelServidores() {
  return (
    <div className="bg-black border border-[#34d399]/20 rounded-xl p-4 md:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#34d399]/10 border border-[#34d399]/30 flex items-center justify-center">
          <Server className="text-[#34d399]" size={18} />
        </div>
        <div>
          <h3 className="text-[#34d399] font-mono text-xs md:text-sm tracking-widest uppercase">Infraestrutura Bluewhite</h3>
          <p className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase">Espinha Dorsal Técnica do Universo</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SERVIDORES.map((s, i) => {
          const Icon = s.icone;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-zinc-600 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon size={16} style={{ color: s.cor }} />
                  </div>
                  <div>
                    <p className="text-white font-mono text-xs tracking-widest uppercase">{s.nome}</p>
                    <p className="text-zinc-500 font-mono text-[9px] tracking-wider">{s.desc}</p>
                  </div>
                </div>
                <span className={`w-2 h-2 rounded-full ${s.status === "online" ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: s.uso }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: s.cor }}
                    transition={{ duration: 1.5, delay: i * 0.1 }}
                  />
                </div>
                <span className="text-[9px] font-mono text-zinc-500 w-8 text-right">{s.uso}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Hierarquia de Chips */}
      <div className="mt-4 bg-zinc-900/30 border border-zinc-800 rounded-lg p-3">
        <p className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase mb-2 text-center">Hierarquia de Processamento</p>
        <div className="flex justify-center gap-3 text-[9px] font-mono">
          <span className="text-[#ffd700]">Ryzen 9 / i9</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">Ryzen 7 / i7</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-500">Ryzen 5 / i5</span>
        </div>
        <p className="text-[8px] text-zinc-600 font-mono text-center mt-1">S-Tier: Investimentos e Web3 · Padrão: Navegação</p>
      </div>
    </div>
  );
}
