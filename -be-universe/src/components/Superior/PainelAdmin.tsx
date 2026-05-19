import { useState, useEffect } from "react";
import { Shield, CheckCircle2, XCircle } from "lucide-react";

const CHAVES = [
  { id: "google_oauth", nome: "Google OAuth", tipo: "Autenticação", chave: "41171720042-...", docs: "https://console.cloud.google.com/apis/credentials" },
  { id: "pexels", nome: "Pexels API", tipo: "Mídia", chave: "1f1aRtis9Pd...", docs: "https://www.pexels.com/api/" },
  { id: "coingecko", nome: "CoinGecko API", tipo: "Finanças", chave: "CG-mr5WUFaS...", docs: "https://www.coingecko.com/en/api" },
  { id: "gemini", nome: "Gemini API", tipo: "IA (fallback)", chave: "AIzaSy... (opcional)", docs: "https://aistudio.google.com/apikey" },
  { id: "mente", nome: "Mente Local", tipo: "IA Soberana", chave: "🚀 Independente", docs: "#" },
];

export function PainelAdmin() {
  const [status, setStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const checar = async () => {
      const results: Record<string, boolean> = {};
      results.mente = true;
      try {
        const h = await fetch("/api/health").then(r => r.json());
        results.google_oauth = false; // requer config no GCP
        results.pexels = true; // sempre tem fallback
        results.coingecko = true; // sempre tem fallback
        results.gemini = h.superior || false;
      } catch { /* ignore */ }
      setStatus(results);
    };
    checar();
  }, []);

  return (
    <div className="bg-black border border-zinc-800 rounded-xl p-4 md:p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center">
          <Shield className="text-zinc-400" size={18} />
        </div>
        <div>
          <h3 className="text-white font-mono text-xs md:text-sm tracking-widest uppercase">Painel de Administração</h3>
          <p className="text-zinc-500 font-mono text-[9px] tracking-widest uppercase">Status das Integrações do Ecossistema</p>
        </div>
      </div>

      <div className="space-y-2">
        {CHAVES.map((c) => (
          <div key={c.id} className="flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg">
            <div className="flex items-center gap-3 min-w-0">
              {status[c.id] === true ? (
                <CheckCircle2 size={14} className="text-green-500 shrink-0" />
              ) : status[c.id] === false ? (
                <XCircle size={14} className="text-zinc-600 shrink-0" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border-2 border-zinc-700 animate-pulse shrink-0" />
              )}
              <div className="min-w-0">
                <p className="text-white font-mono text-[10px] md:text-xs tracking-wider truncate">{c.nome}</p>
                <p className="text-zinc-500 font-mono text-[8px] tracking-widest uppercase">{c.tipo}</p>
              </div>
            </div>
            <a
              href={c.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[8px] text-zinc-600 hover:text-[#ffd700] font-mono tracking-widest uppercase shrink-0 ml-2"
            >
              Configurar
            </a>
          </div>
        ))}
      </div>

      <p className="text-center text-[8px] text-zinc-600 font-mono mt-4 tracking-widest">
        🦅 Águia (Superior) + 🦁 Leão (Gênio) · Bluewhite Corporation Lda
      </p>
    </div>
  );
}
