import { motion } from "motion/react";
import { Coins, BookOpen, Users, Shield } from "lucide-react";

const SETORES = [
  {
    id: "raiz",
    nome: "Raiz",
    desc: "Finanças & Tree Coins",
    icone: Coins,
    cor: "#ff4444",
    bg: "bg-red-900/10 border-red-900/30",
    usuarios: 142,
  },
  {
    id: "tronco",
    nome: "Tronco",
    desc: "Educação & Mentor",
    icone: BookOpen,
    cor: "#ffcc44",
    bg: "bg-yellow-900/10 border-yellow-900/30",
    usuarios: 89,
  },
  {
    id: "copa",
    nome: "Copa",
    desc: "Sociedade & Conexões",
    icone: Users,
    cor: "#44cc44",
    bg: "bg-green-900/10 border-green-900/30",
    usuarios: 204,
  },
  {
    id: "nucleo",
    nome: "Núcleo",
    desc: "Segurança & Fortaleza",
    icone: Shield,
    cor: "#4488ff",
    bg: "bg-blue-900/10 border-blue-900/30",
    usuarios: 56,
  },
];

export function SetoresUniverso() {
  return (
    <div className="bg-black border border-zinc-800 rounded-xl p-4 md:p-6">
      <div className="text-center mb-6">
        <h3 className="text-[#ffd700] font-mono text-sm tracking-widest uppercase">Setores do Universo</h3>
        <p className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase mt-1">Cada setor tem sua identidade e função</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {SETORES.map((s, i) => {
          const Icon = s.icone;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${s.bg} border rounded-xl p-4 text-center hover:scale-105 transition-transform cursor-pointer group`}
            >
              <div className="w-10 h-10 mx-auto rounded-full bg-black/40 border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Icon size={20} style={{ color: s.cor }} />
              </div>
              <h4 className="text-white font-mono text-xs tracking-widest uppercase mb-1">{s.nome}</h4>
              <p className="text-zinc-400 font-mono text-[9px] tracking-wider mb-3">{s.desc}</p>
              <div className="flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-mono text-green-500">{s.usuarios} ativos</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
