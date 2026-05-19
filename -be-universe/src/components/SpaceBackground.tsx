export function SpaceBackground({ stage }: { stage: string }) {
  const getScale = () => {
    switch (stage) {
      case "phase1": return 1;
      case "phase2": return 1.5;
      case "phase3": return 2;
      case "phase4": return 3;
      case "tree": return 1.1;
      default: return 1;
    }
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black"
      style={{ transform: `scale(${getScale()})`, transition: "transform 4s ease-in-out" }}
    >
      {/* Nebulas estáticas com blur (sem animação) */}
      <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] rounded-full bg-indigo-900/10 mix-blend-screen" style={{ filter: "blur(120px)" }} />
      <div className="absolute -bottom-1/4 -right-1/4 w-[150%] h-[150%] rounded-full bg-purple-900/10 mix-blend-screen" style={{ filter: "blur(100px)" }} />

      {/* Estrelas via CSS puro (sem motion) */}
      <div className="absolute inset-0" style={{ willChange: "transform" }}>
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: (i % 3) + 1 + "px",
              height: (i % 3) + 1 + "px",
              left: ((i * 23) % 100) + "%",
              top: ((i * 17) % 100) + "%",
              opacity: 0.3 + (i % 3) * 0.15,
              animation: `pulse ${2 + (i % 3)}s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
