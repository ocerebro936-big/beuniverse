import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { COSMOS } from "@/lib/cosmos";

interface VerticalTreeProps {
  onNodeClick: (nodeId: string) => void;
}

export function VerticalTree({ onNodeClick }: VerticalTreeProps) {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1.5 }}
    >
      {/* Background with Dark Forest at the bottom */}
      <div className="absolute inset-0 z-0">
        <img
          src={COSMOS.forest}
          alt="Forest"
          className="w-full h-full object-cover opacity-40"
          style={{ mixBlendMode: "overlay" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/90 to-zinc-950" />
      </div>

      {/* Top Legend Container */}
      <div className="absolute top-12 left-0 right-0 flex justify-center gap-12 z-20 font-mono text-[10px] tracking-widest uppercase text-zinc-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#33cc33] shadow-[0_0_8px_rgba(51,204,51,0.6)]" />
          RAIZ
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#ffcc00] shadow-[0_0_8px_rgba(255,204,0,0.6)]" />
          TRONCO
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#ff6b35] shadow-[0_0_8px_rgba(255,107,53,0.6)]" />
          COPA
        </div>
      </div>

      {/* SVG Tree Lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 w-full h-full">
        <svg
          className="w-full h-full max-w-md overflow-visible"
          viewBox="0 0 100 150"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id="glow-green">
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Central Trunk */}
          <motion.path
            d="M50 140 Q48 110 50 80 Q52 50 50 30"
            stroke="#33cc33"
            strokeWidth="0.5"
            fill="none"
            className="opacity-70 drop-shadow-md"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Trunk split line */}
          <motion.path
            d="M50 140 Q52 110 50 80 Q48 50 50 30"
            stroke="#33cc33"
            strokeWidth="0.3"
            fill="none"
            className="opacity-50 drop-shadow-sm"
          />

          {/* Bottom Branches */}
          <motion.path
            d="M50 110 Q20 120 0 125"
            stroke="#33cc33"
            strokeWidth="0.3"
            fill="none"
            className="opacity-50 drop-shadow-sm"
          />
          <motion.path
            d="M50 110 Q80 120 100 125"
            stroke="#33cc33"
            strokeWidth="0.3"
            fill="none"
            className="opacity-50 drop-shadow-sm"
          />

          <motion.path
            d="M20 117 Q15 105 10 100"
            stroke="#33cc33"
            strokeWidth="0.2"
            fill="none"
            className="opacity-40"
          />
          <motion.path
            d="M80 117 Q85 105 90 100"
            stroke="#33cc33"
            strokeWidth="0.2"
            fill="none"
            className="opacity-40"
          />

          {/* Middle Branches */}
          <motion.path
            d="M50 80 Q20 70 0 75"
            stroke="#33cc33"
            strokeWidth="0.3"
            fill="none"
            className="opacity-50 drop-shadow-sm"
          />
          <motion.path
            d="M50 80 Q80 70 100 75"
            stroke="#33cc33"
            strokeWidth="0.3"
            fill="none"
            className="opacity-50 drop-shadow-sm"
          />

          <motion.path
            d="M30 76 Q25 60 20 50"
            stroke="#33cc33"
            strokeWidth="0.2"
            fill="none"
            className="opacity-40"
          />
          <motion.path
            d="M70 76 Q75 60 80 50"
            stroke="#33cc33"
            strokeWidth="0.2"
            fill="none"
            className="opacity-40"
          />

          {/* Top Branches */}
          <motion.path
            d="M50 50 Q30 35 15 30"
            stroke="#33cc33"
            strokeWidth="0.3"
            fill="none"
            className="opacity-50 drop-shadow-sm"
          />
          <motion.path
            d="M50 50 Q70 35 85 30"
            stroke="#33cc33"
            strokeWidth="0.3"
            fill="none"
            className="opacity-50 drop-shadow-sm"
          />

          {/* Little glowing dots at branch ends */}
          {[
            { x: 0, y: 125 },
            { x: 100, y: 125 },
            { x: 10, y: 100 },
            { x: 90, y: 100 },
            { x: 0, y: 75 },
            { x: 100, y: 75 },
            { x: 20, y: 50 },
            { x: 80, y: 50 },
            { x: 15, y: 30 },
            { x: 85, y: 30 },
            { x: 35, y: 20 },
            { x: 65, y: 20 },
          ].map((dot, i) => (
            <circle
              key={i}
              cx={dot.x}
              cy={dot.y}
              r="0.8"
              fill="#33cc33"
              className="opacity-60"
            />
          ))}
        </svg>
      </div>

      {/* Interactive Nodes */}
      <div className="relative z-20 flex flex-col h-auto gap-12 justify-center items-center w-full max-w-sm mt-16 pb-16">
        {/* Top Node: A LOJA / COPA */}
        <div className="relative flex flex-col items-center">
          <span className="text-[10px] text-zinc-500 mb-1 tracking-widest">
            A COPA DO CONHECIMENTO
          </span>
          <span className="text-sm text-[#ff6b35] mb-2 font-bold tracking-widest drop-shadow-[0_0_8px_rgba(255,107,53,0.5)]">
            A LOJA
          </span>
          <button
            className="w-12 h-12 rounded-full border border-[#ff6b35] flex items-center justify-center bg-zinc-950/50 backdrop-blur-md transition-all hover:scale-110 shadow-[0_0_15px_rgba(255,107,53,0.2)]"
            onClick={() => onNodeClick("store")}
          >
            <div className="w-4 h-4 rounded-full bg-[#ff6b35] shadow-[0_0_10px_rgba(255,107,53,0.8)]" />
          </button>
        </div>

        {/* Middle Node: O PROFESSOR / TRONCO */}
        <div className="relative flex flex-col items-center">
          <span className="text-[10px] text-zinc-500 mb-1 tracking-widest">
            O TRONCO DA SABEDORIA
          </span>
          <span className="text-sm text-[#ffcc00] mb-2 font-bold tracking-widest drop-shadow-[0_0_8px_rgba(255,204,0,0.5)]">
            O PROFESSOR
          </span>
          <button
            className="w-12 h-12 rounded-full border border-[#ffcc00] flex items-center justify-center bg-zinc-950/50 backdrop-blur-md transition-all hover:scale-110 shadow-[0_0_15px_rgba(255,204,0,0.2)]"
            onClick={() => onNodeClick("professor")}
          >
            <div className="w-4 h-4 rounded-full bg-[#ffcc00] shadow-[0_0_10px_rgba(255,204,0,0.8)]" />
          </button>
        </div>

        {/* Node: RAMIFICAÇÃO SOCIAL */}
        <div className="relative flex flex-col items-center">
          <span className="text-[10px] text-zinc-500 mb-1 tracking-widest">
            A CONSTELAÇÃO
          </span>
          <span className="text-sm text-[#33cc33] mb-2 font-bold tracking-widest drop-shadow-[0_0_8px_rgba(51,204,51,0.5)]">
            CONECTAR
          </span>
          <button
            className="w-12 h-12 rounded-full border border-[#33cc33] flex items-center justify-center bg-zinc-950/50 backdrop-blur-md transition-all hover:scale-110 shadow-[0_0_15px_rgba(51,204,51,0.2)]"
            onClick={() => onNodeClick("connect")}
          >
            <div className="w-4 h-4 rounded-full bg-[#33cc33] shadow-[0_0_10px_rgba(51,204,51,0.8)]" />
          </button>
        </div>

        {/* Node: VIAGENS ESTELARES */}
        <div className="relative flex flex-col items-center">
          <span className="text-[10px] text-zinc-500 mb-1 tracking-widest">
            TURISMO CÓSMICO
          </span>
          <span className="text-sm text-[#00bfff] mb-2 font-bold tracking-widest drop-shadow-[0_0_8px_rgba(0,191,255,0.5)]">
            VIAGENS
          </span>
          <button
            className="w-12 h-12 rounded-full border border-[#00bfff] flex items-center justify-center bg-zinc-950/50 backdrop-blur-md transition-all hover:scale-110 shadow-[0_0_15px_rgba(0,191,255,0.2)]"
            onClick={() => onNodeClick("travel")}
          >
            <div className="w-4 h-4 rounded-full bg-[#00bfff] shadow-[0_0_10px_rgba(0,191,255,0.8)]" />
          </button>
        </div>

        {/* Bottom Node: BE UNIVERSE */}
        <div className="relative flex flex-col items-center">
          <span className="text-[10px] text-zinc-500 mb-1 tracking-widest text-center mt-6">
            A RAIZ DA EXISTÊNCIA
          </span>
          <button
            className="w-14 h-14 rounded-full border-2 border-[#33cc33] flex items-center justify-center bg-zinc-950/50 backdrop-blur-md transition-all hover:scale-110 shadow-[0_0_20px_rgba(51,204,51,0.3)] animate-pulse mt-2"
            onClick={() => onNodeClick("be-universe")}
          >
            <div className="w-4 h-4 rounded-full bg-[#33cc33] shadow-[0_0_10px_rgba(51,204,51,0.8)]" />
          </button>

          <span className="text-sm text-[#33cc33] mt-4 font-bold tracking-widest drop-shadow-[0_0_8px_rgba(51,204,51,0.8)]">
            BE UNIVERSE
          </span>
        </div>
      </div>
    </motion.div>
  );
}
