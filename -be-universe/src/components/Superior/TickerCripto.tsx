import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const CRIPTO = [
  { id: "bitcoin", nome: "BTC", icone: "₿" },
  { id: "ethereum", nome: "ETH", icone: "Ξ" },
  { id: "solana", nome: "SOL", icone: "◎" },
  { id: "usd-coin", nome: "USDC", icone: "₵" },
];

export function TickerCripto() {
  const [precos, setPrecos] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscar = async () => {
      try {
        const res = await fetch("/api/mercado/precos");
        const data = await res.json();
        setPrecos(data);
      } catch { /* ignore */ }
      setLoading(false);
    };
    buscar();
    const interval = setInterval(buscar, 60000); // atualiza a cada 1 min
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-black border border-zinc-800 rounded-xl p-3">
        <p className="text-zinc-600 font-mono text-[9px] tracking-widest text-center animate-pulse">CARREGANDO MERCADO...</p>
      </div>
    );
  }

  return (
    <div className="bg-black border border-zinc-800 rounded-xl p-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[8px] text-zinc-600 font-mono tracking-widest uppercase">Mercado em Tempo Real</span>
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {CRIPTO.map((c) => {
          const data = precos?.[c.id];
          if (!data) return null;
          const mudanca = data.usd_24h_change;
          const positiva = mudanca >= 0;

          return (
            <div key={c.id} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] text-zinc-400 font-mono">{c.icone} {c.nome}</span>
                <span className={`text-[8px] font-mono flex items-center gap-0.5 ${positiva ? "text-green-500" : "text-red-500"}`}>
                  {positiva ? <TrendingUp size={8} /> : <TrendingDown size={8} />}
                  {Math.abs(mudanca).toFixed(2)}%
                </span>
              </div>
              <p className="text-white font-mono text-xs font-bold">${data.usd.toLocaleString()}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
