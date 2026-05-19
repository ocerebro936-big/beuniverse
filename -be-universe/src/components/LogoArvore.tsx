import { motion } from "motion/react";

export function LogoArvore({ size = "md", pulsar = true }: { size?: "sm" | "md" | "lg"; pulsar?: boolean }) {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-12 h-12 text-sm", lg: "w-20 h-20 text-lg" };

  return (
    <motion.div
      className={`${sizes[size]} rounded-xl bg-gradient-to-br from-[#ffd700] to-[#b8860b] flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.2)] relative overflow-hidden`}
      animate={pulsar ? { scale: [1, 1.03, 1], boxShadow: ["0 0 20px rgba(255,215,0,0.2)", "0 0 30px rgba(255,215,0,0.4)", "0 0 20px rgba(255,215,0,0.2)"] } : {}}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Circuito percorrendo o logo */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 48 48" fill="none">
        <motion.path
          d="M24 4 L24 44 M4 24 L44 24"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="24" cy="4" r="2" fill="white"
          animate={{ cx: ["24", "24", "44", "24", "24", "4", "24"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      <span className="font-bold text-black drop-shadow-md">&#xe703;</span>
      <svg className="w-6 h-6 md:w-8 md:h-8 text-black" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    </motion.div>
  );
}
