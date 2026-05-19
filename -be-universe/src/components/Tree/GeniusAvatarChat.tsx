import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "motion/react";
import { conversar } from "@/services/genio";

// Avatar 3D do Gênio Génesis
const GeniusModel = ({ isSpeaking }: { isSpeaking: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [pulse, setPulse] = useState(1);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Flutuação suave
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.05;
      // Rotação sutil
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
    // Pulso quando fala
    if (isSpeaking) {
      setPulse(1 + Math.sin(Date.now() * 15) * 0.1);
    } else {
      setPulse(1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Corpo (cristal dourado) */}
      <Sphere args={[0.6, 64, 64]} scale={[1, 1.2 * pulse, 0.8]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#ffd966"
          metalness={0.9}
          roughness={0.2}
          transparent
          opacity={0.85}
          emissive="#ffaa00"
          emissiveIntensity={isSpeaking ? 0.8 : 0.3}
        />
      </Sphere>
      
      {/* Olhos (luzes) */}
      <Sphere args={[0.12, 32, 32]} position={[-0.2, 0.2, 0.55]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </Sphere>
      <Sphere args={[0.12, 32, 32]} position={[0.2, 0.2, 0.55]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </Sphere>
      
      {/* Anel flutuante ao redor */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.85, 0.03, 32, 100]} />
          <meshStandardMaterial color="#88aaff" emissive="#4488ff" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      
      {/* Partículas ao redor (quando fala) */}
      {isSpeaking && (
        <group>
          {[...Array(12)].map((_, i) => (
            <mesh key={i} position={[Math.sin(i) * 0.8, Math.cos(i * 2) * 0.6, Math.cos(i) * 0.5]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color="#ffd966" emissive="#ffaa00" />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
};

export const GeniusAvatarChat = () => {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: "ai", content: "🌱 Olá! Sou o Gênio Génesis em 3D. Como posso ajudar você hoje?" }
  ]);
  const [input, setInput] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAvatar, setShowAvatar] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    const newMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newMessages);
    setInput("");
    setIsSpeaking(true);

    try {
      const res = await conversar(newMessages.map(m => ({ role: m.role as "user" | "ai", content: m.content })));
      const response = res.reply || "🌌 Silêncio profundo... O Superior medita.";
      setMessages(prev => [...prev, { role: "ai", content: response }]);
      speak(response);
    } catch {
      let response = "";
      const q = userMessage.toLowerCase();
      if (q.includes("foco") || q.includes("concentrar")) {
        response = "🧘 O foco é como a seiva da árvore: flui quando há direção. Vamos praticar 5 minutos de respiração?";
      } else if (q.includes("tree coin") || q.includes("minerar")) {
        response = "💰 Tree Coins são ganhas com expansões do Universo! Cada expansão te dá bônus de 10+ TC.";
      } else if (q.includes("obrigado")) {
        response = "💚 Por nada! Estou aqui em formato 3D para te guiar. Continue evoluindo!";
      } else if (q.includes("aula") || q.includes("estudar")) {
        response = "📚 Aula 1: A Mente Água. Seja adaptável! Uma vez entendido, peça para fazer a 'prova'.";
      } else if (q.includes("prova") || q.includes("teste")) {
        response = "✍️ Pergunta 1: Se a água encontra uma pedra, ela chora ou ela contorna? (Responda com 'contorna')";
      } else if (q.includes("contorna")) {
        response = "🎉 Correto! Ganhou +5 Tree Coins de conhecimento! A próxima aula é 'A Mente Fogo'.";
      } else {
        response = "🌌 Interessante... Isso me lembra o Nó 2 - Abertura Mental. Quer aprender uma técnica de leitura dinâmica?";
      }
      setMessages(prev => [...prev, { role: "ai", content: response }]);
      speak(response);
    } finally {
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden h-[500px] flex flex-col md:flex-row">
      {/* Avatar 3D */}
      {showAvatar && (
        <div className="w-full md:w-80 h-48 md:h-full bg-gradient-to-b from-[#0a0a2a] to-[#000] relative border-b md:border-b-0 md:border-r border-zinc-800">
          <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[2, 3, 4]} intensity={1} />
            <pointLight position={[-2, 1, 3]} intensity={0.5} color="#88aaff" />
            <GeniusModel isSpeaking={isSpeaking} />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
          <div className="absolute top-2 left-0 right-0 text-center pointer-events-none">
            <span className="font-mono text-[10px] text-[#ffd966] drop-shadow-md tracking-widest uppercase">Gênio Génesis 3D</span>
          </div>
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <button
              onClick={() => setShowAvatar(false)}
              className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase hover:text-white"
            >
              [ OCULTAR AVATAR ]
            </button>
          </div>
        </div>
      )}
      
      {/* Chat */}
      <div className="flex-1 p-6 flex flex-col min-w-0">
        {!showAvatar && (
          <button
            onClick={() => setShowAvatar(true)}
            className="text-[10px] font-mono tracking-widest text-[#ffd966] mb-3 uppercase self-start hover:underline"
          >
            MOSTRAR AVATAR 3D
          </button>
        )}
        
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-xl font-mono text-[11px] leading-relaxed tracking-wider ${
                  msg.role === "user"
                    ? "bg-[#ffd966] text-black"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-300"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        
        {/* Indicador de fala */}
        {isSpeaking && (
          <div className="flex gap-1 mb-3 justify-center items-end h-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 bg-[#ffd966] rounded-full"
                animate={{ height: [4, 12, 4] }}
                transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
              />
            ))}
            <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase ml-2">Gênio falando...</span>
          </div>
        )}
        
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Fale com o Gênio..."
            className="flex-1 bg-black border border-zinc-700 rounded-lg px-4 py-3 text-xs font-mono text-white placeholder-zinc-600 outline-none focus:border-[#ffd966]"
          />
          <button
            onClick={sendMessage}
            className="bg-[#ffd966] text-black px-6 rounded-lg font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};
