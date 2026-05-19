import { motion } from "motion/react";
import { Clock, Sun, Moon, Zap, Coffee } from "lucide-react";

const BLOCOS = [
  { hora: "06:00", nome: "Despertar & Meditação", tipo: "saude", icone: Sun },
  { hora: "07:00", nome: "Estudo Técnico (Python/Java)", tipo: "foco", icone: Zap },
  { hora: "09:00", nome: "Missões Externas / Cards", tipo: "trabalho", icone: Zap },
  { hora: "12:00", nome: "Pausa & Alinhamento", tipo: "pausa", icone: Coffee },
  { hora: "13:00", nome: "Automação & Agentes", tipo: "foco", icone: Zap },
  { hora: "15:00", nome: "Revisão & Mentor (Gênio)", tipo: "estudo", icone: Zap },
  { hora: "17:00", nome: "Exercício & Natureza", tipo: "saude", icone: Sun },
  { hora: "18:00", nome: "Conteúdo e Leitura", tipo: "estudo", icone: Zap },
  { hora: "20:00", nome: "Descompressão", tipo: "pausa", icone: Coffee },
  { hora: "22:00", nome: "Recolhimento & Sono", tipo: "sono", icone: Moon },
];

export function TimetablePerfeito() {
  const agora = new Date();
  const horaMin = agora.getHours() * 60 + agora.getMinutes();
  const blocoAtual = BLOCOS.findIndex(b => {
    const [h, m] = b.hora.split(":").map(Number);
    return h * 60 + m > horaMin;
  });

  return (
    <div className="bg-black border border-[#ffd700]/20 rounded-xl p-4 md:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/30 flex items-center justify-center">
          <Clock className="text-[#ffd700]" size={18} />
        </div>
        <div>
          <h3 className="text-[#ffd700] font-mono text-xs md:text-sm tracking-widest uppercase">Rotina Perfeita 24h</h3>
          <p className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase">Cronograma de Alta Performance</p>
        </div>
      </div>

      <div className="space-y-1">
        {BLOCOS.map((b, i) => {
          const Icon = b.icone;
          const ativo = i === blocoAtual;
          const passado = i < blocoAtual;

          return (
            <motion.div
              key={b.hora}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`flex items-center gap-3 p-2 md:p-3 rounded-lg transition-all ${
                ativo ? "bg-[#ffd700]/10 border border-[#ffd700]/30" : passado ? "opacity-40" : "hover:bg-zinc-900/50"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                ativo ? "bg-[#ffd700] text-black" : "bg-zinc-900 text-zinc-500"
              }`}>
                <Icon size={14} />
              </div>
              <span className={`font-mono text-[10px] md:text-xs w-12 shrink-0 ${ativo ? "text-[#ffd700]" : "text-zinc-500"}`}>{b.hora}</span>
              <span className={`font-mono text-[10px] md:text-xs ${ativo ? "text-white" : "text-zinc-400"}`}>{b.nome}</span>
              {ativo && <span className="ml-auto text-[8px] bg-[#ffd700]/20 text-[#ffd700] px-2 py-0.5 rounded-full font-mono">Agora</span>}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
