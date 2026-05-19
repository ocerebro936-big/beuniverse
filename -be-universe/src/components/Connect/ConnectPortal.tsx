import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Sphere, Line, Preload, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Zap, Link as LinkIcon, MessageCircle, Radio, Copy } from 'lucide-react';

// --- Constellation Map 3D Components ---

const NODES = [
  { id: 'me', type: 'sun', basePosition: [0, 0, 0] },
  // Root Level (Gold)
  { id: 'r1', type: 'root', basePosition: [2, 1, 1], connection: 'me' },
  { id: 'r2', type: 'root', basePosition: [-1.5, -2, 2], connection: 'me' },
  // Trunk Level (Blue)
  { id: 't1', type: 'trunk', basePosition: [3.5, 2, 0.5], connection: 'r1' },
  { id: 't2', type: 'trunk', basePosition: [1.5, 3, -1], connection: 'r1' },
  { id: 't3', type: 'trunk', basePosition: [-3, -1, 3], connection: 'r2' },
  // Branch Level (Green)
  { id: 'b1', type: 'branch', basePosition: [5, 1, 1], connection: 't1' },
  { id: 'b2', type: 'branch', basePosition: [4, 3, -1], connection: 't1' },
  { id: 'b3', type: 'branch', basePosition: [1, 4.5, -2], connection: 't2' },
  { id: 'b4', type: 'branch', basePosition: [-4, 0, 4], connection: 't3' },
  // Leaf Level (Grey/White)
  { id: 'l1', type: 'leaf', basePosition: [6, 0, 2], connection: 'b1' },
  { id: 'l2', type: 'leaf', basePosition: [5.5, 2, 0], connection: 'b1' },
  { id: 'l3', type: 'leaf', basePosition: [4.5, 4, -2], connection: 'b2' },
  { id: 'l4', type: 'leaf', basePosition: [-5, 1, 3], connection: 'b4' },
  { id: 'l5', type: 'leaf', basePosition: [-4, -1, 5], connection: 'b4' },
];

function getNodeColor(type: string) {
  switch (type) {
    case 'sun': return '#ffffff';     // White/Yellow hybrid
    case 'root': return '#ffcc00';    // Gold
    case 'trunk': return '#00bfff';   // Blue
    case 'branch': return '#33cc33';  // Green
    case 'leaf': return '#aaaaaa';    // Grey
    default: return '#ffffff';
  }
}

function getNodeSize(type: string) {
  switch (type) {
    case 'sun': return 0.5;
    case 'root': return 0.3;
    case 'trunk': return 0.2;
    case 'branch': return 0.15;
    case 'leaf': return 0.08;
    default: return 0.1;
  }
}

function StarNode({ id, type, position, isHovered, onHover }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = getNodeColor(type);
  const size = getNodeSize(type);

  useFrame((state) => {
    if (meshRef.current) {
      if (type === 'sun' || type === 'root') {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + (id.charCodeAt(0) || 0)) * 0.1;
        meshRef.current.scale.set(scale, scale, scale);
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh 
        ref={meshRef} 
        position={position as [number, number, number]}
        onPointerOver={(e) => { e.stopPropagation(); onHover(id); }}
        onPointerOut={(e) => { onHover(null); }}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={isHovered ? 2 : (type === 'sun' ? 1.5 : 0.8)} 
          transparent
          opacity={type === 'leaf' ? 0.6 : 1}
        />
        {/* Glow effect */}
        <pointLight color={color} intensity={type === 'sun' ? 2 : 0.5} distance={type === 'sun' ? 10 : 3} />
      </mesh>
    </Float>
  );
}

function ConnectingLine({ start, end, type }: { start: number[], end: number[], type: string }) {
  const lineRef = useRef<any>(null);
  const color = getNodeColor(type);

  // Simple straight line for now. Could be a curve.
  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);

  return (
    <group>
      <Line 
        ref={lineRef}
        points={points} 
        color={color} 
        lineWidth={1} 
        transparent 
        opacity={0.3} 
      />
    </group>
  );
}

function ConstellationEnvironment({ hoveredNode, setHoveredNode }: any) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001; // Slow global rotation
    }
  });

  return (
    <group ref={groupRef}>
      {NODES.map((node) => (
        <StarNode 
          key={node.id} 
          {...node} 
          position={node.basePosition} 
          isHovered={hoveredNode === node.id}
          onHover={setHoveredNode}
        />
      ))}
      
      {NODES.map((node) => {
        if (!node.connection) return null;
        const parent = NODES.find(n => n.id === node.connection);
        if (!parent) return null;
        return (
          <ConnectingLine 
            key={`${node.id}-${parent.id}`} 
            start={parent.basePosition} 
            end={node.basePosition} 
            type={node.type}
          />
        );
      })}
    </group>
  );
}

export function ConnectPortal({ onBack }: { onBack: () => void }) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'radio' | 'sms'>('radio');

  return (
    <div className="relative w-full min-h-screen bg-[#050510] overflow-hidden flex flex-col font-sans">
      <div className="absolute top-4 left-4 z-50">
        <button 
          className="px-4 py-2 flex items-center gap-2 text-[10px] md:text-xs text-[#33cc33] border border-[#33cc33]/30 rounded-full hover:bg-[#33cc33]/10 hover:border-[#33cc33] transition-colors uppercase font-mono tracking-widest"
          onClick={onBack}
        >
          <span className="text-xl leading-none">&rsaquo;</span> Voltar à Árvore
        </button>
      </div>

      <div className="absolute top-16 md:top-24 text-center z-40 w-full pointer-events-none">
        <h2 className="text-[#33cc33] font-mono text-sm md:text-base tracking-[0.4em] uppercase drop-shadow-[0_0_15px_rgba(51,204,51,0.4)]">
          Ramificação Social
        </h2>
        <p className="text-zinc-500 font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase mt-4">
          Rede de Consciência Coletiva
        </p>
      </div>

      {/* 3D Connect Map */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={0.1} />
          <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <ConstellationEnvironment hoveredNode={hoveredNode} setHoveredNode={setHoveredNode} />
          <OrbitControls enableZoom={true} enablePan={true} maxDistance={20} minDistance={3} autoRotate autoRotateSpeed={0.5} />
          <Preload all />
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-40 p-4 md:p-8 flex flex-col items-center pointer-events-none">
        
        {/* Affiliate Stats */}
        <motion.div 
          className="w-full max-w-4xl bg-black/40 backdrop-blur-xl border border-[#33cc33]/30 rounded-2xl p-6 mb-6 flex flex-col md:flex-row justify-between items-center gap-6 pointer-events-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div>
            <h3 className="text-[#33cc33] font-mono text-xs tracking-widest uppercase flex items-center gap-2 mb-2">
              <Zap size={16} /> Link Sagrado
            </h3>
            <p className="text-zinc-400 text-xs font-mono max-w-sm leading-relaxed mb-3">
              Expanda a árvore. A cada conexão que frutifica, você recebe 80% do fluxo de seiva.
            </p>
            <p className="text-xl font-mono text-[#ffcc00] font-bold drop-shadow-[0_0_8px_rgba(255,204,0,0.5)]">
              420 Tree Coins <span className="text-zinc-500 text-xs ml-2 tracking-widest font-normal uppercase">Ressonância Atual</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              readOnly 
              value="beuniverse.ai/invite/q8x9f" 
              className="bg-black/50 border border-zinc-800 text-zinc-300 font-mono text-xs px-4 py-3 rounded-lg outline-none w-64"
            />
            <button className="bg-[#33cc33]/10 border border-[#33cc33]/50 text-[#33cc33] hover:bg-[#33cc33] hover:text-black hover:shadow-[0_0_15px_rgba(51,204,51,0.5)] transition-all font-mono text-xs uppercase tracking-widest px-4 py-3 rounded-lg flex items-center justify-center gap-2">
              <Copy size={16} /> Copiar
            </button>
          </div>
        </motion.div>

        {/* Communication Panel - Placeholder for UI */}
        <motion.div 
          className="w-full max-w-md bg-black/60 backdrop-blur-md border border-zinc-800 rounded-2xl overflow-hidden pointer-events-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex border-b border-zinc-800">
            <button 
              className={`flex-1 flex items-center justify-center gap-2 py-4 font-mono text-[10px] tracking-widest uppercase transition-colors ${activeTab === 'radio' ? 'bg-[#33cc33]/10 text-[#33cc33] border-b-2 border-[#33cc33]' : 'text-zinc-500 hover:text-zinc-300'}`}
              onClick={() => setActiveTab('radio')}
            >
              <Radio size={14} /> Rádio da Árvore
            </button>
            <button 
              className={`flex-1 flex items-center justify-center gap-2 py-4 font-mono text-[10px] tracking-widest uppercase transition-colors ${activeTab === 'sms' ? 'bg-[#33cc33]/10 text-[#33cc33] border-b-2 border-[#33cc33]' : 'text-zinc-500 hover:text-zinc-300'}`}
              onClick={() => setActiveTab('sms')}
            >
              <MessageCircle size={14} /> SMS Transcendente
            </button>
          </div>
          
          <div className="p-6 text-center h-48 flex items-center justify-center">
            {activeTab === 'radio' ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border border-zinc-700 flex items-center justify-center mb-4 text-zinc-600">
                  <Radio size={24} />
                </div>
                <p className="text-zinc-400 font-mono text-[10px] tracking-widest uppercase">
                  Sintonizando frequências orbitais...
                </p>
                <p className="text-zinc-600 font-mono text-[9px] tracking-widest uppercase mt-2">
                  12 Consciências Ativas
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border border-zinc-700 flex items-center justify-center mb-4 text-zinc-600">
                  <MessageCircle size={24} />
                </div>
                <p className="text-zinc-400 font-mono text-[10px] tracking-widest uppercase">
                  Nenhum SMS captado no éter.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

    </div>
  );
}
