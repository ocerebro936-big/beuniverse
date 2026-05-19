import { useState, useEffect } from "react";
import { buscarBackground, precarregarURL } from "@/services/midia";

interface LoadingScreenProps {
  mensagem?: string;
  query?: string;
  onCompleto?: () => void;
  duracao?: number;
}

export function LoadingScreen({
  mensagem = "CARREGANDO O UNIVERSO...",
  query = "universe galaxy technology",
  onCompleto,
  duracao = 2000,
}: LoadingScreenProps) {
  const [bgUrl, setBgUrl] = useState("");
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    buscarBackground(query).then(url => {
      if (url) {
        precarregarURL(url);
        setBgUrl(url);
      }
      setPronto(true);
    });
  }, [query]);

  useEffect(() => {
    if (!pronto) return;
    const timer = setTimeout(() => onCompleto?.(), duracao);
    return () => clearTimeout(timer);
  }, [pronto, onCompleto, duracao]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background dinâmico */}
      {bgUrl && (
        <img
          src={bgUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          style={{ filter: "blur(4px)", transform: "scale(1.1)" }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full border-2 border-[#ffd700] border-t-transparent animate-spin" />
        <p className="text-[#ffd700] font-mono text-xs md:text-sm tracking-[0.3em] uppercase animate-pulse text-center px-4">
          {mensagem}
        </p>
        {!pronto && (
          <p className="text-zinc-600 font-mono text-[9px] tracking-widest">BUSCANDO IMAGENS...</p>
        )}
      </div>
    </div>
  );
}
