import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "motion/react";

const LESSONS = [
  { id: "expansion", title: "A Expansão da Consciência", duration: "15min" },
  { id: "physics", title: "A Física da Riqueza", duration: "20min" },
  { id: "dna", title: "O DNA da Árvore", duration: "25min" },
  { id: "ramification", title: "A Arte da Ramificação", duration: "18min" },
];

function InteractiveMonolith({ onSelect }: { onSelect: (id: string) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh 
          ref={meshRef} 
          onClick={() => onSelect(LESSONS[0].id)}
          onPointerOver={(e) => {
             e.stopPropagation();
             setHovered(true);
             document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
             setHovered(false);
             document.body.style.cursor = 'auto';
          }}
        >
          {/* A tall, monolithic crystal shape */}
          <boxGeometry args={[1.2, 3.5, 1.2]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={2.5}
            chromaticAberration={0.08}
            anisotropy={0.1}
            distortion={0.3}
            distortionScale={0.5}
            temporalDistortion={0.05}
            color={hovered ? "#ffcc00" : "#111111"}
            emissive={hovered ? "#221100" : "#000000"}
          />
        </mesh>
      </Float>
      
      {/* Golden base halo */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshStandardMaterial color="#ffcc00" emissive="#ff8800" transparent opacity={0.15} />
      </mesh>
      
      {/* Floating particles around it */}
      <Sparkles count={80} scale={5} size={3} color="#ffe680" opacity={0.3} speed={0.4} />
    </group>
  );
}

export function Monolith({ onSelectLesson }: { onSelectLesson: (id: string) => void }) {
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen" style={{ pointerEvents: 'auto' }}>
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 10, 5]} intensity={1.5} color="#ffdd44" />
          <pointLight position={[-5, -10, -5]} intensity={0.5} color="#44ff88" />
          <spotLight position={[0, -5, 0]} intensity={1} color="#ffcc00" angle={0.5} penumbra={1} />
          
          <InteractiveMonolith onSelect={onSelectLesson} />
        </Canvas>
      </div>

      <div className="absolute bottom-12 w-full max-w-md mx-auto z-10 flex flex-col gap-3 px-6 overflow-hidden pointer-events-none">
        {LESSONS.map((lesson, idx) => (
          <motion.button
            key={lesson.id}
            className="flex items-center justify-between p-3 md:p-4 bg-black/60 backdrop-blur-md border border-[#ffcc00]/20 rounded-lg group hover:border-[#ffcc00]/60 hover:bg-[#ffcc00]/5 transition-all pointer-events-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 + 0.5, ease: "easeOut" }}
            onClick={() => onSelectLesson(lesson.id)}
          >
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 border border-[#ffcc00]/40 rotate-45 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
                <div className="w-1.5 h-1.5 bg-[#ffcc00]/80 group-hover:bg-[#ffcc00] shadow-[0_0_5px_#ffcc00]" />
              </div>
              <span className="text-[#ffcc00]/80 font-mono text-[10px] md:text-xs uppercase group-hover:text-[#ffcc00] transition-colors tracking-widest text-left">
                {lesson.title}
              </span>
            </div>
            <span className="text-zinc-600 font-mono text-[9px] md:text-[10px] tracking-widest px-2 py-1 border border-zinc-800 rounded bg-black">
              {lesson.duration}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
