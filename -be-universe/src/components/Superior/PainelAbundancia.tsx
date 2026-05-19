import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Coins, TrendingUp, Award, Shield } from "lucide-react";

export function PainelAbundancia({ treeCoins, usuario }: { treeCoins: number; usuario?: string }) {
  const [relatorio, setRelatorio] = useState<any>(null);

  useEffect(() => {
    fetch("/api/economia/relatorio").then(r => r.json()).then(setRelatorio).catch(() => {});
  }, []);

  const receitaSimulada = treeCoins * 2.5;
  const pagamento50 = receitaSimulada * 0.5;

  return (
    <div className="bg-black border border-[#ffd700]/20 rounded-xl p-4 md:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ffd700] to-[#ff6600] flex items-center justify-center">
          <Coins className="text-black" size={18} />
        </div>
        <div>
          <h3 className="text-[#ffd700] font-mono text-xs md:text-sm tracking-widest uppercase">Engenharia Econômica</h3>
          <p className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase">70% Reserva · 30% Operação · 50% pra você</p>
        </div>
      </div>

      {/* Regra 70/30 */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
          <p className="text-[8px] text-zinc-500 font-mono uppercase tracking-widest mb-1">Tesouro Central</p>
          <p className="text-lg font-mono font-bold text-[#ffd700]">70%</p>
          <p className="text-[9px] text-zinc-400 font-mono">{relatorio ? `$${relatorio.tesouroCentral}` : "—"}</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
          <p className="text-[8px] text-zinc-500 font-mono uppercase tracking-widest mb-1">Custo Operacional</p>
          <p className="text-lg font-mono font-bold text-[#60a5fa]">30%</p>
          <p className="text-[9px] text-zinc-400 font-mono">{relatorio ? `$${relatorio.custoOperacional}` : "—"}</p>
        </div>
      </div>

      {/* Barra visual 70/30 */}
      <div className="w-full h-4 bg-zinc-900 rounded-full overflow-hidden mb-6 flex">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "70%" }}
          className="h-full bg-gradient-to-r from-[#ffd700] to-[#ff6600)"
          transition={{ duration: 1.5 }}
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "30%" }}
          className="h-full bg-[#60a5fa]"
          transition={{ duration: 1.5, delay: 0.3 }}
        />
      </div>

      {/* 50% do usuário */}
      <div className="bg-gradient-to-r from-[#ffd700]/10 to-transparent border border-[#ffd700]/20 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest">Sua Geração Estimada</span>
          <span className="text-[#ffd700] font-mono text-sm font-bold">${pagamento50.toFixed(2)} USDC</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest">50% pra você</span>
          <span className="text-green-500 font-mono text-xs">✅ Direto na MetaMask</span>
        </div>
      </div>

      {/* Medalhas */}
      {relatorio?.medalhasConcedidas > 0 && (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 flex items-center gap-3">
          <Award size={16} className="text-[#ffd700]" />
          <div>
            <p className="text-[9px] text-zinc-400 font-mono">Medalhas Concedidas</p>
            <p className="text-white font-mono text-xs">{relatorio.medalhasConcedidas}</p>
          </div>
        </div>
      )}

      <p className="text-center text-[8px] text-zinc-600 font-mono mt-4 tracking-widest">
        Regra dos 70/30 · Reserva do Pai · Sustentabilidade do Universo
      </p>
    </div>
  );
}
