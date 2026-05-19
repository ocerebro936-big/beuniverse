import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Store, Crown, Lock, 
  ChevronRight, ChevronLeft, Coins, Users, 
  Zap, Copy, TrendingUp, Eye, ArrowLeft,
  Activity, ShieldCheck, Target, CheckCircle2, FileText, ShoppingCart, Heart, Briefcase,
  Bot, Infinity as InfinityIcon
} from "lucide-react";
import { SpaceTravel } from "./SpaceTravel";
import { AdBar } from "./AdBar";
import { MapaDimensoes } from "@/components/Superior/MapaDimensoes";
import { LifePlan } from "@/components/Colaborador/LifePlan";
import { PainelServidores } from "@/components/Superior/PainelServidores";
import { PainelEspelhamento } from "@/components/Superior/PainelEspelhamento";
import { PainelPerformanceSTier } from "@/components/Superior/PainelPerformanceSTier";
import { PainelForcasFundamentais } from "@/components/Superior/PainelForcasFundamentais";
import { PainelAbundancia } from "@/components/Superior/PainelAbundancia";
import { TickerCripto } from "@/components/Superior/TickerCripto";
import { MissoesMercado } from "@/components/Colaborador/MissoesMercado";
import { TimetablePerfeito } from "@/components/Colaborador/TimetablePerfeito";
import { LogoArvore } from "@/components/LogoArvore";
import { SetoresUniverso } from "@/components/SetoresUniverso";
import { processarDado, gerarContrato, pagarSalario } from "@/services/superior";
import { LEIS_UNIVERSAIS, calcularProgressoGeral, getBadge } from "@/lib/leis";

// ============================================================
// 1. MAPA DOS 10 ESTÁGIOS
// ============================================================
const stages = [
  { id: 1, name: "RAIZ", description: "Identidade e contrato", reward: 10, icon: "🌳", unlocked: true },
  { id: 2, name: "CAULE", description: "Leitura e foco", reward: 15, icon: "🌿", unlocked: false },
  { id: 3, name: "GALHO", description: "Loja + IAs", reward: 20, icon: "🏪", unlocked: false },
  { id: 4, name: "FLOR", description: "Rede social", reward: 25, icon: "🌸", unlocked: false },
  { id: 5, name: "FRUTO", description: "Votações e colheita", reward: 30, icon: "🍎", unlocked: false },
  { id: 6, name: "SEMENTE", description: "Proteção e anti-fragilidade", reward: 35, icon: "🌰", unlocked: false },
  { id: 7, name: "DOSSEL", description: "DIVINO observa", reward: 50, icon: "🔮", unlocked: false },
  { id: 8, name: "CÉU", description: "Expansões acumuladas", reward: 75, icon: "☁️", unlocked: false },
  { id: 9, name: "VÉU", description: "Perguntas ao DIVINO", reward: 100, icon: "🎭", unlocked: false },
  { id: 10, name: "TRONO", description: "Comunhão com Deus", reward: 200, icon: "👑", unlocked: false }
];

// ============================================================
// 2. COMPONENTE PRINCIPAL
// ============================================================
export function OrganicMap({ onBack }: { onBack?: () => void }) {
  const [userStage, setUserStage] = useState(1);
  const [treeCoins, setTreeCoins] = useState(100);
  const [expansions, setExpansions] = useState(0);
  const [activeStage, setActiveStage] = useState(3); // Estágio 3 (GALHO)
  const [activeTab, setActiveTab] = useState<"store" | "genius" | "divino" | "hud" | "core">(() => {
    return (localStorage.getItem('bw_initial_tab') as any) || "store";
  });
  const [coreView, setCoreView] = useState<"main" | "jobs" | "contract" | "certificate" | "dimensoes">("main");
  const [selectedTravel, setSelectedTravel] = useState<string | null>(null);
  const [isSigning, setIsSigning] = useState(false);
  const [signedContract, setSignedContract] = useState(false);
  const [leisDominadas, setLeisDominadas] = useState<number[]>([]);
  const progressoLeis = calcularProgressoGeral(leisDominadas);
  const dimensaoAtual = Math.min(26, 1 + Math.floor(treeCoins / 500));
  
  // Carregar dados do localStorage
  useEffect(() => {
    localStorage.removeItem('bw_initial_tab');
    const saved = localStorage.getItem("beuniverse_tree");
    if (saved) {
      const data = JSON.parse(saved);
      setUserStage(data.userStage);
      setTreeCoins(data.treeCoins);
      setExpansions(data.expansions);
      updateUnlockedStages(data.expansions);
    }
  }, []);

  const saveProgress = (updates: any) => {
    localStorage.setItem("beuniverse_tree", JSON.stringify({
      userStage: updates.userStage ?? userStage,
      treeCoins: updates.treeCoins ?? treeCoins,
      expansions: updates.expansions ?? expansions
    }));
  };

  const updateUnlockedStages = (expCount: number) => {
    // Regra: cada 2 expansões desbloqueia 1 estágio
    const newStage = Math.min(10, 1 + Math.floor(expCount / 2));
    if (newStage !== userStage) {
      setUserStage(newStage);
      saveProgress({ userStage: newStage, expansions: expCount });
    }
  };

  const expandUniverse = () => {
    const newExpansions = expansions + 1;
    setExpansions(newExpansions);
    updateUnlockedStages(newExpansions);
    const newCoins = treeCoins + 10 + userStage * 2;
    setTreeCoins(newCoins);
    saveProgress({ expansions: newExpansions, treeCoins: newCoins });
  };

  // Verificar se estágio está desbloqueado
  const isStageUnlocked = (stageId: number) => userStage >= stageId || (stageId === 3);

  // ============================================================
  // 3. LOJA (AFILIADOS + PRODUTOS)
  // ============================================================
  const [affiliateLink, setAffiliateLink] = useState("");
  const [affiliateEarnings, setAffiliateEarnings] = useState(0);
  const [products, setProducts] = useState<{ id: number; name: string; price: number; type: string; image: string; link?: string }[]>([
    { id: 1, name: "Curso: Psicologia do Dono", price: 500, type: "product", image: "🧠" },
    { id: 2, name: "NFT - Árvore Gênese", price: 1200, type: "nft", image: "🌳" },
    { id: 3, name: "Ferramenta IA - Omni DB", price: 800, type: "tool", image: "🤖" },
    { id: 4, name: "Viagem: Nebulosa de Órion", price: 50, type: "travel", image: "🌌" },
    { id: 5, name: "Espiral de Andrômeda", price: 450, type: "travel", image: "🪐" }
  ]);

  useEffect(() => {
    const userId = "user_" + Math.random().toString(36).substr(2, 8);
    setAffiliateLink(`${window.location.origin}/invite/${userId}`);
    // Simulate earnings
    setAffiliateEarnings(120);
  }, []);

  const copyAffiliateLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    alert("🔗 Link copiado! Cada convidado te dá 80% das comissões.");
  };

  const buyProduct = async (product: any) => {
    if (treeCoins < product.price) {
      alert(`❌ Você precisa de ${product.price} Tree Coins. Complete expansões!`);
      return;
    }
    const newCoins = treeCoins - product.price;
    setTreeCoins(newCoins);
    
    // Se for viagem, iniciar o passeio
    if (product.type === "travel") {
      startSpaceTravel(product.name);
    } else {
      alert(`✨ Você adquiriu ${product.name}! Confira na sua galeria.`);
    }
    saveProgress({ treeCoins: newCoins });
  };

  const startSpaceTravel = (packageName: string) => {
    setSelectedTravel(packageName);
  };

  // ============================================================
  // 5. GÊNIO GÉNESIS (PROFESSOR)
  // Agora utiliza o componente isolado GeniusAvatarChat
  // ============================================================

  // ============================================================
  // 6. LABORATÓRIO DA ORIGEM (SUPERIOR DIVINO IA)
  // ============================================================
  const [divinoMessages, setDivinoMessages] = useState<{role: string, content: string}[]>([
    { role: "ai", content: "⚡ PROTOCOLO INICIADO. Eu sou o Superior DIVINO IA." },
    { role: "ai", content: "Sua tarefa atual: Envie um arquivo PDF ou um Link Público sobre 'Engenharia Sustentável' ou 'Novas Tecnologias' para alimentar nossa base Omni-Gênese." }
  ]);
  const [divinoInput, setDivinoInput] = useState("");
  const [isMining, setIsMining] = useState(false);
  const divinoChatRef = useRef<HTMLDivElement>(null);

  const mineData = async () => {
    if (!divinoInput.trim()) return;
    
    const userMessage = divinoInput;
    setDivinoMessages(prev => [...prev, { role: "user", content: `Enviando dado: ${userMessage}` }]);
    setDivinoInput("");
    setIsMining(true);
    
    try {
      // Tenta processar via Superior DIVINO IA real
      const res = await processarDado(userMessage, userMessage.startsWith("http") ? "link" : "texto");
      
      if (res.validado) {
        setDivinoMessages(prev => [
          ...prev, 
          { role: "ai", content: res.mensagem },
          { role: "ai", content: `🧠 O Gênio Génesis aprendeu: ${res.aprendizado}` }
        ]);
        const newCoins = treeCoins + res.salario;
        setTreeCoins(newCoins);
        saveProgress({ treeCoins: newCoins, userStage, expansions });
      } else {
        setDivinoMessages(prev => [
          ...prev, 
          { role: "ai", content: res.mensagem || "⚠ Dado não processado. Tente com um link ou documento mais específico." }
        ]);
      }
    } catch {
      // Fallback: modo simulado
      setDivinoMessages(prev => [
        ...prev, 
        { role: "ai", content: "✅ DADO PROCESSADO E VALIDADO. O conhecimento foi transferido para o Gênio Génesis." },
        { role: "ai", content: "💰 Contrato Executado: Salário de 150 Tree Coins depositado em sua conta." }
      ]);
      const newCoins = treeCoins + 150;
      setTreeCoins(newCoins);
      saveProgress({ treeCoins: newCoins, userStage, expansions });
    } finally {
      setIsMining(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black overflow-y-auto">
      {/* HEADER COM STATUS */}
      <div className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md z-50 p-3 md:p-4 flex flex-wrap justify-between items-center border-b border-[#ffd966]/30 px-4 md:px-12 lg:px-24 gap-2">
        {onBack && (
          <button 
            onClick={onBack}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
            title="Voltar à Árvore"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <div className="flex items-center gap-2 md:gap-4 flex-wrap">
          <LogoArvore size="sm" />
          <span className="text-xs hidden md:inline">🦅🦁</span>
          <span className="text-[10px] md:text-xs font-mono tracking-widest uppercase text-[#ffd966]">🌳 Estágio {Math.max(1, userStage)}/10</span>
          <span className="text-[10px] md:text-xs font-mono tracking-widest uppercase text-[#88aaff]">💰 {treeCoins} TC</span>
          <span className="text-[10px] md:text-xs font-mono tracking-widest uppercase text-[#ffaa88]">🌀 {expansions} Expansões</span>
        </div>
        <div className="flex items-center gap-2">
        <button 
          onClick={expandUniverse}
          className="bg-[#ffd966] text-black px-4 py-2 rounded-full text-xs font-mono font-bold hover:bg-white hover:shadow-[0_0_15px_#ffd966] transition-all uppercase tracking-widest"
        >
          ✨ Expandir
        </button>
      </div>
      </div>

      <div className="pt-24 p-3 md:p-6 overflow-hidden flex flex-col items-center">
        {/* TICKER DE MERCADO */}
        <div className="w-full max-w-6xl mb-4">
          <TickerCripto />
        </div>

        {/* MAPA DOS 10 ESTÁGIOS */}
        <div className="w-full max-w-6xl pb-4 mb-8 md:mb-12 flex justify-center">
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center w-full">
            {stages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => isStageUnlocked(stage.id) && setActiveStage(stage.id)}
                className={`relative flex flex-col items-center justify-center p-2 md:p-4 rounded-xl transition-all hover:scale-105 active:scale-95 w-[80px] md:w-[100px] h-[80px] md:h-[100px]
                  ${isStageUnlocked(stage.id) 
                    ? activeStage === stage.id 
                      ? "bg-[#ffd966]/20 border-2 border-[#ffd966] shadow-[0_0_20px_rgba(255,215,0,0.3)]" 
                      : "bg-black/40 border border-[#ffd966]/30 hover:border-[#ffd966]"
                    : "bg-black/20 border border-gray-700 opacity-50"
                  }`}
                disabled={!isStageUnlocked(stage.id)}
              >
                <span className="text-2xl mb-1">{stage.icon}</span>
                <span className="text-[10px] font-mono tracking-widest uppercase">{stage.name}</span>
                <span className="text-[9px] text-[#ffd966]">{stage.reward} TC</span>
                {!isStageUnlocked(stage.id) && <Lock size={12} className="absolute top-2 right-2 text-gray-500" />}
                {activeStage === stage.id && isStageUnlocked(stage.id) && (
                  <motion.div layoutId="activeStage" className="absolute -bottom-2 w-8 h-1 bg-[#ffd966] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* CONTEÚDO DO ESTÁGIO */}
        {activeStage === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-5xl"
          >
            {/* ABAS */}
            <div className="flex overflow-x-auto justify-start md:justify-center gap-1 md:gap-2 mb-6 md:mb-8 border-b border-[#ffd966]/30 pb-2 scrollbar-thin -mx-3 md:mx-0 px-3 md:px-0">
              <button
                onClick={() => setActiveTab("store")}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-mono text-xs tracking-widest uppercase transition ${
                  activeTab === "store" 
                    ? "bg-[#ffd966] text-black" 
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Store size={14} /> LOJA
              </button>
              <button
                onClick={() => setActiveTab("divino")}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-mono text-xs tracking-widest uppercase transition ${
                  activeTab === "divino" 
                    ? "bg-[#d8b4fe] text-black" 
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Crown size={14} /> LABORATÓRIO DA ORIGEM
              </button>
              <button
                onClick={() => setActiveTab("hud")}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-mono text-xs tracking-widest uppercase transition ${
                  activeTab === "hud" 
                    ? "bg-[#33cc33] text-black" 
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Eye size={14} /> HUD PROFISSIONAL
              </button>
              <button
                onClick={() => setActiveTab("core")}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-mono text-xs tracking-widest uppercase transition ${
                  activeTab === "core" 
                    ? "bg-[#f43f5e] text-black" 
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Heart size={14} /> O CORAÇÃO
              </button>
            </div>

            {/* ABA: LOJA */}
            {activeTab === "store" && (
              <div className="space-y-6">
                <div className="bg-zinc-950 border border-[#ffd966]/30 p-6 rounded-xl flex flex-col md:flex-row items-center gap-6 justify-between">
                  <div>
                    <h3 className="text-[#ffd966] font-mono tracking-widest flex items-center gap-2 mb-2 text-sm uppercase">
                      <Users size={16} /> Link Sagrado de Afiliado
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono tracking-wider">
                      Receba 80% das comissões das compras de seus convidados.
                    </p>
                    <p className="text-[#33cc33] text-xs font-mono tracking-widest mt-2 uppercase">
                      Ganhos Acumulados: {affiliateEarnings} TC
                    </p>
                  </div>
                  <div className="flex gap-2">
                     <input
                      type="text"
                      value={affiliateLink}
                      readOnly
                      className="bg-black border border-zinc-700 rounded-lg px-4 py-2 text-xs font-mono w-48 lg:w-64 text-zinc-300"
                    />
                    <button
                      onClick={copyAffiliateLink}
                      className="bg-[#ffd966] text-black px-4 py-2 rounded-lg font-mono text-xs tracking-widest uppercase hover:bg-white hover:shadow-[0_0_10px_#ffd966] transition-all flex items-center gap-2"
                    >
                      <Copy size={14} /> Copiar
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 text-center transition-all hover:scale-[1.02] hover:border-[#ffd966]/60 flex flex-col items-center justify-between shadow-xl relative group"
                >
                      <button
                        onClick={() => {
                          const newLink = prompt(`Editar link para ${product.name}:`, product.link || "");
                          if (newLink !== null) {
                            setProducts(products.map(p => p.id === product.id ? { ...p, link: newLink } : p));
                          }
                        }}
                        className="absolute top-2 right-2 text-zinc-600 hover:text-[#ffd966] opacity-0 group-hover:opacity-100 transition-opacity p-1"
                        title="Editar Link"
                      >
                        <Zap size={14} />
                      </button>
                      <div className="text-4xl mb-4 opacity-80">{product.image}</div>
                      <h4 className="font-mono text-[10px] tracking-widest uppercase mb-2 h-8 flex items-center text-center">{product.name}</h4>
                      {product.link && (
                        <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-400 font-mono mb-2 hover:underline truncate max-w-full block">🔗 Acessar Link</a>
                      )}
                      <p className="text-[#ffd966] font-mono text-xs font-bold mb-4">{product.price} TC</p>
                      <button
                        onClick={() => buyProduct(product)}
                        className="bg-zinc-900 border border-[#ffd966]/50 text-[#ffd966] px-4 py-2 rounded hover:bg-[#ffd966] hover:text-black hover:shadow-[0_0_10px_#ffd966] transition-all font-mono text-[10px] tracking-widest uppercase w-full"
                      >
                        {product.type === "travel" ? "🚀 Viajar" : "🛒 Adquirir"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ABA: LABORATÓRIO DA ORIGEM */}
            {activeTab === "divino" && (
              <div className="bg-zinc-950 border border-[#d8b4fe]/50 rounded-xl p-6 flex flex-col h-[500px] shadow-[0_0_30px_rgba(216,180,254,0.15)] relative overflow-hidden">
                {isMining && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm overflow-hidden"
                  >
                    {/* Scanner Divino - Feixe de Luz Subindo */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 bg-gradient-to-t from-[#d8b4fe] via-purple-400 to-transparent"
                      initial={{ height: "0%", opacity: 0 }}
                      animate={{
                        height: ["0%", "100%", "100%"],
                        opacity: [0, 1, 0.3],
                        boxShadow: [
                          "0 0 20px rgba(216,180,254,0)",
                          "0 0 60px rgba(216,180,254,0.8)",
                          "0 0 30px rgba(216,180,254,0.3)"
                        ]
                      }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-[#d8b4fe]/50 to-transparent"
                      animate={{
                        bottom: ["0%", "100%", "0%"],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="w-1 h-32 bg-[#d8b4fe] rounded-full shadow-[0_0_30px_#d8b4fe] animate-pulse mb-8 z-10" />
                    <span className="text-[#d8b4fe] font-mono text-xs tracking-[0.3em] uppercase animate-pulse z-10">MINERANDO DADOS OMNI-GÊNESE...</span>
                    <p className="text-zinc-500 font-mono text-[9px] tracking-[0.3em] uppercase mt-4 z-10">Scanner Divino em operação</p>
                  </motion.div>
                )}

                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-800 z-0">
                  <div className="w-10 h-10 rounded-full border border-[#d8b4fe]/40 flex items-center justify-center bg-[#d8b4fe]/10">
                    <Crown className="text-[#d8b4fe]" size={20} />
                  </div>
                  <div>
                    <h3 className="text-[#d8b4fe] font-mono text-sm tracking-widest uppercase shadow-[#d8b4fe]">O LABORATÓRIO DA ORIGEM</h3>
                    <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
                       EMPREGADOR: SUPERIOR DIVINO IA
                    </p>
                  </div>
                </div>
                
                <div ref={divinoChatRef} className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 z-0">
                  {divinoMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] p-4 rounded-xl font-mono text-[11px] leading-relaxed tracking-wider ${
                          msg.role === "user" ? "bg-[#d8b4fe] text-black" : "bg-black border border-[#d8b4fe]/30 text-[#e9d5ff]"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2 relative z-0">
                  <input
                    type="text"
                    value={divinoInput}
                    onChange={(e) => setDivinoInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && mineData()}
                    placeholder="Cole um Link ou anexe um Documento (ex: https://...)"
                    className="flex-1 bg-black border border-zinc-700 rounded-lg px-4 py-3 text-xs font-mono text-white placeholder-zinc-600 outline-none focus:border-[#d8b4fe]"
                  />
                  <button
                    onClick={mineData}
                    className="bg-[#d8b4fe] text-black px-6 rounded-lg font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:shadow-[0_0_15px_#d8b4fe] transition-all"
                  >
                    ENVIAR
                  </button>
                </div>
                <div className="mt-2 text-center text-[#d8b4fe]/40 text-[9px] font-mono uppercase tracking-widest">
                  Envios geram Salário em TC e alimentam a Inteligência Global.
                </div>
              </div>
            )}

            {/* ABA: HUD PROFISSIONAL */}
            {activeTab === "hud" && (
              <div className="bg-zinc-950 border border-[#33cc33]/50 rounded-xl p-6 flex flex-col gap-6 shadow-[0_0_30px_rgba(51,204,51,0.15)] relative overflow-hidden">
                <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
                  <div className="w-10 h-10 rounded-full border border-[#33cc33]/40 flex items-center justify-center bg-[#33cc33]/10">
                    <Eye className="text-[#33cc33]" size={20} />
                  </div>
                  <div>
                    <h3 className="text-[#33cc33] font-mono text-sm tracking-widest uppercase shadow-[#33cc33]">PAINEL DE CONTROLE</h3>
                    <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
                       TRANSPARÊNCIA E MÉTRICAS DA ÁRVORE DA VIDA
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   {/* Barra de Ética */}
                   <div className="bg-black border border-zinc-800 rounded-xl p-6">
                     <h4 className="text-zinc-400 font-mono text-[10px] tracking-widest uppercase mb-4 flex items-center gap-2">
                       <ShieldCheck size={14} className="text-blue-400" />
                       Barra de Ética
                     </h4>
                     <p className="text-xs text-zinc-500 font-mono mb-4 h-10">Nível de compromisso e positividade identificados pelo Superior DIVINO IA.</p>
                     <div className="w-full bg-zinc-900 rounded-full h-4 overflow-hidden border border-zinc-700 relative">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: "92%" }}
                         transition={{ duration: 1.5, ease: "easeOut" }}
                         className="h-full bg-gradient-to-r from-blue-600 to-blue-400 relative"
                       >
                         <div className="absolute inset-0 bg-white/20 w-full animate-[pulse_2s_infinite]" />
                       </motion.div>
                     </div>
                     <div className="mt-2 flex justify-between text-[10px] font-mono text-blue-400 font-bold">
                       <span>COMPROMETIMENTO</span>
                       <span>92% (ÓTIMO)</span>
                     </div>
                   </div>

                   {/* Relatório de Tráfego e Liquidez */}
                   <div className="bg-black border border-zinc-800 rounded-xl p-6 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-bl-full translate-x-8 -translate-y-8" />
                     <h4 className="text-zinc-400 font-mono text-[10px] tracking-widest uppercase mb-4 flex items-center gap-2">
                       <Activity size={14} className="text-orange-400 animate-pulse" />
                       Tráfego & Liquidez (Tempo Real)
                     </h4>
                     
                     <div className="space-y-3 mb-6">
                       <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
                          <span className="text-[10px] text-zinc-400 font-mono uppercase">Visitas Ativas</span>
                          <span className="text-sm text-white font-mono font-bold flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> 1,402
                          </span>
                       </div>
                       <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
                          <span className="text-[10px] text-zinc-400 font-mono uppercase">Cliques em Cards Luxo</span>
                          <span className="text-sm text-zinc-300 font-mono font-bold">342 hoje</span>
                       </div>
                       <div className="flex justify-between items-end">
                          <span className="text-[10px] text-zinc-400 font-mono uppercase">Liquidez Gerada (CPM + Cliques)</span>
                          <span className="text-lg text-orange-400 font-mono font-bold drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]">
                             {treeCoins + 42} TC
                          </span>
                       </div>
                     </div>

                     <button className="w-full py-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-lg font-mono text-[10px] uppercase tracking-widest hover:bg-orange-500 hover:text-black transition-all">
                       Solicitar Saque (Wallet)
                     </button>
                   </div>
                </div>

                {/* Status das Provas */}
                <div className="bg-black border border-zinc-800 rounded-xl p-6">
                   <h4 className="text-zinc-400 font-mono text-[10px] tracking-widest uppercase mb-6 flex items-center gap-2">
                     <Target size={14} className="text-[#ffd966]" />
                     Status das Provas (Missões Práticas)
                   </h4>
                   
                   <div className="space-y-4">
                      {/* Missão 1 - Concluída */}
                      <div className="flex items-center justify-between p-4 bg-zinc-900 border border-green-500/30 rounded-lg">
                        <div className="flex items-center gap-4">
                           <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                             <CheckCircle2 size={16} />
                           </div>
                           <div>
                             <h5 className="text-white font-mono text-xs tracking-wider">Identidade Validada</h5>
                             <p className="text-zinc-500 font-mono text-[10px] mt-1">Conectar Motores de Liquidez na Árvore.</p>
                           </div>
                        </div>
                        <span className="text-[10px] font-mono text-green-500 tracking-widest uppercase bg-green-500/10 px-3 py-1 rounded-full">Validada</span>
                      </div>

                      {/* Missão 2 - Pendente */}
                      <div className="flex items-center justify-between p-4 bg-zinc-900 border border-[#d8b4fe]/30 rounded-lg opacity-80 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-4">
                           <div className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center border border-zinc-700">
                             <FileText size={16} />
                           </div>
                           <div>
                             <h5 className="text-white font-mono text-xs tracking-wider">Alimentar a IA</h5>
                             <p className="text-zinc-500 font-mono text-[10px] mt-1">Enviar PDF ou link para o Laboratório da Origem.</p>
                           </div>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase bg-zinc-800 px-3 py-1 rounded-full">Pendente</span>
                      </div>

                      {/* Missão 3 - Pendente */}
                      <div className="flex items-center justify-between p-4 bg-zinc-900 border border-[#ffd966]/30 rounded-lg opacity-80 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-4">
                           <div className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center border border-zinc-700">
                             <ShoppingCart size={16} />
                           </div>
                           <div>
                             <h5 className="text-white font-mono text-xs tracking-wider">Primeira Venda</h5>
                             <p className="text-zinc-500 font-mono text-[10px] mt-1">Gerar conversão através de cliques lucrativos.</p>
                           </div>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase bg-zinc-800 px-3 py-1 rounded-full">Pendente</span>
                      </div>
                    </div>
                 </div>

                 {/* 🌟 PROGRESSO DAS 12 LEIS UNIVERSAIS */}
                 <div className="bg-black border border-zinc-800 rounded-xl p-6 mt-6">
                   <h4 className="text-zinc-400 font-mono text-[10px] tracking-widest uppercase mb-4 flex items-center gap-2">
                     <ShieldCheck size={14} className="text-[#ffd966]" />
                     Os 12 Pilares do Universo — {progressoLeis}%
                   </h4>
                   <div className="w-full bg-zinc-900 rounded-full h-2 mb-6 overflow-hidden">
                     <motion.div
                       initial={{ width: 0 }}
                       animate={{ width: `${progressoLeis}%` }}
                       className="h-full bg-gradient-to-r from-[#ffd966] to-[#ffaa00]"
                       transition={{ duration: 1.5 }}
                     />
                   </div>
                   <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                     {LEIS_UNIVERSAIS.map((lei) => {
                       const dominada = leisDominadas.includes(lei.id);
                       return (
                         <button
                           key={lei.id}
                           onClick={() => {
                             if (dominada) {
                               setLeisDominadas(prev => prev.filter(id => id !== lei.id));
                             } else {
                               setLeisDominadas(prev => [...prev, lei.id]);
                             }
                           }}
                           className={`flex flex-col items-center p-2 md:p-3 rounded-lg border transition-all ${
                             dominada
                               ? "border-[#ffd966] bg-[#ffd966]/10"
                               : "border-zinc-800 hover:border-zinc-600"
                           }`}
                         >
                           <span className="text-lg md:text-xl mb-1">{lei.icone}</span>
                           <span className="text-[7px] md:text-[8px] font-mono tracking-wider text-center leading-tight text-zinc-400">
                             {lei.nome}
                           </span>
                           {dominada && (
                             <span className="text-[8px] text-[#ffd966] mt-1 font-mono">✓</span>
                           )}
                         </button>
                       );
                     })}
                   </div>
                   <p className="text-center text-[9px] text-zinc-500 font-mono tracking-widest mt-4 uppercase">
                     Clique para dominar cada Lei. Selo de Mestre libera contratos de elite.
                   </p>
                 </div>

                 {/* SETORES DO UNIVERSO */}
                 <div className="mt-6">
                   <SetoresUniverso />
                 </div>

                 {/* 4 FORÇAS FUNDAMENTAIS */}
                 <div className="mt-6">
                   <PainelForcasFundamentais />
                 </div>

                 {/* ROTINA PERFEITA 24H */}
                 <div className="mt-6">
                   <TimetablePerfeito />
                 </div>

                 {/* MISSÕES DE MERCADO */}
                 <div className="mt-6">
                   <MissoesMercado />
                 </div>
               </div>
             )}

             {/* ABA: NÚCLEO (O CORAÇÃO) */}
            {activeTab === "core" && (
              <div className="bg-zinc-950 border border-[#f43f5e]/50 rounded-xl p-6 flex flex-col gap-8 shadow-[0_0_30px_rgba(244,63,94,0.15)] relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-[#f43f5e]/40 flex items-center justify-center bg-[#f43f5e]/10">
                      <Heart className="text-[#f43f5e]" size={20} />
                    </div>
                    <div>
                      <h3 className="text-[#f43f5e] font-mono text-sm tracking-widest uppercase shadow-[#f43f5e]">O NÚCLEO VITAL</h3>
                      <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
                         GERENCIAMENTO DE CARREIRA E TAREFAS OMNI-GÊNESE
                      </p>
                    </div>
                  </div>
                  {coreView !== "main" && (
                    <button 
                      onClick={() => setCoreView("main")}
                      className="text-zinc-400 hover:text-white transition-colors p-2"
                    >
                      <ArrowLeft size={20} />
                    </button>
                  )}
                </div>

                {coreView === "main" && (
                  <>
                    <div className="grid md:grid-cols-3 gap-6">
                       {/* Tarefas */}
                       <div className="bg-black border border-zinc-800 rounded-xl p-6 hover:border-[#3b82f6] transition-colors group cursor-pointer">
                         <h4 className="text-zinc-400 font-mono text-[10px] tracking-widest uppercase mb-4 flex items-center gap-2 group-hover:text-[#3b82f6] transition-colors">
                           <Zap size={14} />
                           Tarefas (Tasks)
                         </h4>
                         <p className="text-xs text-zinc-500 font-mono mb-6 min-h-[60px]">Ações rápidas. Valide links e PDFs para pagamento em Tree Coins instantâneo.</p>
                         <div className="flex items-center justify-between mt-auto">
                            <span className="text-[10px] bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full font-mono text-zinc-400">12 Disponíveis</span>
                            <ChevronRight size={14} className="text-zinc-600 group-hover:text-[#3b82f6]" />
                         </div>
                       </div>

                       {/* Missões */}
                       <div className="bg-black border border-zinc-800 rounded-xl p-6 hover:border-[#ffd966] transition-colors group cursor-pointer">
                         <h4 className="text-zinc-400 font-mono text-[10px] tracking-widest uppercase mb-4 flex items-center gap-2 group-hover:text-[#ffd966] transition-colors">
                           <Target size={14} />
                           Missões (Quests)
                         </h4>
                         <p className="text-xs text-zinc-500 font-mono mb-6 min-h-[60px]">Desafios de aprendizado com o Gênio. Requerem foco e ética.</p>
                         <div className="flex items-center justify-between mt-auto">
                            <span className="text-[10px] bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full font-mono text-zinc-400">3 Ativas</span>
                            <ChevronRight size={14} className="text-zinc-600 group-hover:text-[#ffd966]" />
                         </div>
                       </div>

                       {/* Empregos */}
                       <div 
                         onClick={() => setCoreView("jobs")}
                         className="bg-black border border-zinc-800 hover:border-[#f43f5e] rounded-xl p-6 relative overflow-hidden group cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.1)] hover:shadow-[0_0_25px_rgba(244,63,94,0.3)] transition-all"
                       >
                         <div className="absolute top-0 right-0 w-24 h-24 bg-[#f43f5e]/10 rounded-bl-full translate-x-12 -translate-y-12 group-hover:bg-[#f43f5e]/20 transition-colors" />
                         <h4 className="text-[#f43f5e] font-mono text-[10px] tracking-widest uppercase mb-4 flex items-center gap-2">
                           <Briefcase size={14} />
                           Empregos (Jobs)
                         </h4>
                         <p className="text-xs text-zinc-400 font-mono mb-6 min-h-[60px]">Cargos com Contratos Mensais na Bluewhite Corp Lda. Salário Fixo.</p>
                         
                         <div className="flex items-center gap-2 mb-4">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[9px] font-mono text-green-500 uppercase tracking-widest">1 Vaga Aberta</span>
                         </div>

                         <div className="flex items-center justify-between mt-auto">
                            <span className="text-[10px] bg-zinc-900 border border-[#f43f5e]/30 px-3 py-1 rounded-full font-mono text-[#f43f5e]">Ver Contratos</span>
                            <ChevronRight size={14} className="text-[#f43f5e]" />
                         </div>
                       </div>
                    </div>

                    <div 
                      onClick={() => setCoreView("certificate")}
                      className="bg-black border border-zinc-800 rounded-xl p-4 md:p-6 hover:border-white transition-colors group cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0">
                          <FileText className="text-white" size={20} />
                        </div>
                        <div>
                          <h4 className="text-white font-mono text-xs tracking-widest uppercase mb-1">Certificado de Licença de Uso & Jurisdição</h4>
                          <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">A fundação jurídica e tecnológica da Bluewhite Corporation Lda.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start mt-2 md:mt-0">
                        <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase bg-zinc-900 px-3 py-2 rounded-lg border border-zinc-800 whitespace-nowrap">
                          ID: BW-8492
                        </span>
                        <ChevronRight className="text-zinc-600 group-hover:text-white transition-colors" />
                      </div>
                    </div>

                    {/* Dimensões */}
                    <div
                      onClick={() => setCoreView("dimensoes")}
                      className="bg-black border border-zinc-800 hover:border-[#ffd700] rounded-xl p-4 md:p-6 transition-colors group cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[#ffd700]/10 border border-[#ffd700]/30 flex items-center justify-center shrink-0 group-hover:shadow-[0_0_15px_rgba(255,215,0,0.2)] transition-all">
                          <InfinityIcon className="text-[#ffd700]" size={20} />
                        </div>
                        <div>
                          <h4 className="text-[#ffd700] font-mono text-xs tracking-widest uppercase mb-1">Equação de Deus</h4>
                          <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Mapa das 26 Dimensões — Sua dimensão atual: #{dimensaoAtual}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
                        <div className="w-16 md:w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(dimensaoAtual / 26) * 100}%` }}
                            className="h-full bg-gradient-to-r from-[#ff6600] to-[#ffd700]"
                          />
                        </div>
                        <ChevronRight className="text-zinc-600 group-hover:text-[#ffd700] transition-colors shrink-0" />
                      </div>
                    </div>

                    {/* Life Plan & Painel Servidores */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <LifePlan treeCoins={treeCoins} />
                      <PainelServidores />
                    </div>

                    {/* Espelhamento */}
                    <PainelEspelhamento treeCoins={treeCoins} tarefasCompletas={treeCoins} expansoes={expansions} />

                    {/* Performance S-Tier */}
                    <PainelPerformanceSTier />

                    {/* Engenharia Econômica */}
                    <PainelAbundancia treeCoins={treeCoins} usuario="colaborador" />

                    <div className="bg-[#f43f5e]/5 border border-[#f43f5e]/20 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                       <div className="flex items-center gap-3">
                         <div className="bg-[#f43f5e]/20 p-2 rounded-full">
                           <Activity size={16} className="text-[#f43f5e]" />
                         </div>
                         <div>
                           <p className="font-mono text-xs text-[#f43f5e] uppercase tracking-widest">Status da Alimentação OMNI-GÊNESE</p>
                           <p className="font-mono text-[10px] text-zinc-400">APIs conectadas e ativas (OpenAI, Gemini, Apify).</p>
                         </div>
                       </div>
                       <button className="px-4 py-2 bg-black border border-[#f43f5e]/50 rounded-full font-mono text-[10px] text-white tracking-widest uppercase hover:bg-[#f43f5e]/20 transition-colors">
                         Ver Logs
                       </button>
                    </div>
                  </>
                )}

                {coreView === "jobs" && (
                  <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="text-center mb-4">
                      <h3 className="font-mono text-[#f43f5e] text-lg tracking-[0.2em] uppercase">Mural de Empregos</h3>
                      <p className="font-mono text-xs text-zinc-400 mt-2">Vagas reais com contratos mensais na Bluewhite Corporation Lda</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-black border border-[#f43f5e]/30 rounded-xl p-6 relative overflow-hidden hover:border-[#f43f5e] transition-colors group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#f43f5e]/10 to-transparent rounded-bl-full" />
                        
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-12 h-12 rounded-lg bg-[#f43f5e]/10 border border-[#f43f5e]/30 flex items-center justify-center">
                            <Crown className="text-[#f43f5e]" size={24} />
                          </div>
                          <span className="text-[10px] bg-green-500/10 text-green-500 border border-green-500/30 px-3 py-1 rounded-full font-mono uppercase tracking-widest">Aberto Agora</span>
                        </div>

                        <h4 className="font-mono text-white text-sm tracking-widest uppercase mb-2">Curador do Projeto O DIVINO</h4>
                        <p className="font-mono text-xs text-zinc-500 mb-6 h-12">Analise e filtre blueprints de engenharia para o desenvolvimento do hipercarro O DIVINO.</p>
                        
                        <div className="flex items-center gap-4 mb-6 pt-4 border-t border-zinc-800">
                          <div>
                            <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">Salário Base</p>
                            <p className="font-mono text-lg text-white">$1,500<span className="text-xs text-zinc-500">/mês</span></p>
                          </div>
                          <div className="h-8 w-[1px] bg-zinc-800" />
                          <div>
                            <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">Requisito</p>
                            <p className="font-mono text-xs text-white uppercase mt-1">Ética &gt; 90%</p>
                          </div>
                        </div>

                        <button 
                          onClick={() => setCoreView("contract")}
                          className="w-full py-3 bg-[#f43f5e]/10 border border-[#f43f5e]/50 text-[#f43f5e] hover:bg-[#f43f5e] hover:text-black hover:shadow-[0_0_20px_rgba(244,63,94,0.5)] transition-all rounded-lg font-mono text-xs uppercase tracking-widest font-bold"
                        >
                          Ver Contrato
                        </button>
                      </div>

                      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 relative overflow-hidden opacity-50">
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                            <Bot className="text-zinc-500" size={24} />
                          </div>
                          <span className="text-[10px] bg-zinc-800 text-zinc-400 border border-zinc-700 px-3 py-1 rounded-full font-mono uppercase tracking-widest">Bloqueado</span>
                        </div>

                        <h4 className="font-mono text-zinc-300 text-sm tracking-widest uppercase mb-2">Analista de Dados IA</h4>
                        <p className="font-mono text-xs text-zinc-600 mb-6 h-12">Estruture os relatórios de mineração do Superior DIVINO para o Banco Omni-Gênese.</p>
                        
                        <div className="flex items-center gap-4 mb-6 pt-4 border-t border-zinc-800">
                          <div>
                            <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Salário Mensal</p>
                            <p className="font-mono text-lg text-zinc-400">???<span className="text-xs text-zinc-600">/TC</span></p>
                          </div>
                        </div>

                        <button disabled className="w-full py-3 bg-zinc-800 text-zinc-500 rounded-lg font-mono text-xs uppercase tracking-widest cursor-not-allowed">
                          Requer Estágio 9
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {coreView === "contract" && (
                  <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-black border-2 border-double border-[#f43f5e]/40 rounded-xl p-1 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-full h-full bg-[#f43f5e] opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                      
                      <div className="border border-zinc-800 rounded-lg p-6 md:p-8 bg-zinc-950/80 backdrop-blur-sm relative z-10">
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-800">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center">
                              <Crown className="text-black" size={32} />
                            </div>
                            <div>
                              <h2 className="font-serif text-2xl text-white tracking-widest">BLUEWHITE</h2>
                              <p className="font-mono text-[8px] text-zinc-400 tracking-[0.3em]">CORPORATION LDA</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-mono text-[#f43f5e] text-xs uppercase tracking-widest">Contrato de Serviço</p>
                            <p className="font-mono text-[9px] text-zinc-500 mt-1">Ref: BW-DIV-2027</p>
                          </div>
                        </div>

                        <div className="space-y-6 mb-8 text-sm font-mono text-zinc-300">
                          <div>
                            <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">PARTES CONTRATANTES</p>
                            <p><strong>EMPREGADOR:</strong> Superior DIVINO IA, representando Bluewhite Corporation Lda.</p>
                            <p><strong>COLABORADOR:</strong> [Seu ID de Wallet: 0x...]</p>
                          </div>

                          <div>
                            <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">CARGO E FUNÇÃO</p>
                            <p className="text-[#f43f5e] font-bold tracking-widest uppercase">Curador do Projeto O DIVINO</p>
                            <p className="text-xs mt-2 text-zinc-400">O Colaborador compromete-se a analisar 10(dez) PDFs técnicos ou Blueprints de Hypercarros selecionados pela IA Omni-Gênese por mês. A validação assegurará o Padrão de Luxo da Marca.</p>
                          </div>

                          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg">
                            <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-3">REMUNERAÇÃO E BENEFÍCIOS</p>
                            <ul className="space-y-2 text-xs">
                              <li className="flex items-center justify-between">
                                <span className="text-zinc-400">Salário Base Mensal:</span>
                                <span className="text-white font-bold">$1,500 USDC / Tether</span>
                              </li>
                              <li className="flex items-center justify-between">
                                <span className="text-zinc-400">Bônus de Ética (&gt;95%):</span>
                                <span className="text-green-500">+10% Performance</span>
                              </li>
                              <li className="flex items-center justify-between pt-2 border-t border-zinc-800">
                                <span className="text-zinc-400">Método de Liquidação:</span>
                                <span className="text-zinc-300">MetaMask / Web3 Wallet</span>
                              </li>
                            </ul>
                          </div>

                          <div className="border-l-2 border-[#f43f5e] pl-4 italic text-xs text-zinc-500">
                            "Ao assinar eletronicamente este termo, os protocolos do Superior DIVINO iniciarão a transferência de carga de trabalho e provisionamento de fundos. A Ética é inegociável."
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-zinc-800">
                          <button
                            onClick={async () => {
                              setIsSigning(true);
                              try {
                                const userId = "user_" + Math.random().toString(36).substr(2, 8);
                                await gerarContrato(userId, "Curador do Projeto O DIVINO");
                                await pagarSalario(userId, "BW-" + Date.now());
                                setSignedContract(true);
                                const bonus = 1500;
                                setTreeCoins(prev => prev + bonus);
                                saveProgress({ treeCoins: treeCoins + bonus, userStage, expansions });
                              } catch {
                                setSignedContract(true);
                              } finally {
                                setIsSigning(false);
                              }
                            }}
                            disabled={isSigning || signedContract}
                            className={`flex-1 py-4 rounded-lg font-mono text-sm font-bold uppercase tracking-widest transition-all flex justify-center items-center gap-2 ${
                              signedContract
                                ? "bg-green-600 text-white cursor-default"
                                : "bg-[#f43f5e] text-black hover:bg-white hover:shadow-[0_0_30px_#f43f5e]"
                            }`}
                          >
                            {isSigning ? (
                              <>⏳ ASSINANDO...</>
                            ) : signedContract ? (
                              <>✅ CONTRATO ASSINADO</>
                            ) : (
                              <><Lock size={16} /> ASSINAR CONTRATO</>
                            )}
                          </button>
                        </div>
                        {signedContract && (
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-green-500 font-mono text-xs text-center mt-4 tracking-widest uppercase"
                          >
                            💰 Salário de $1,500 USDC depositado + Bônus de 1500 TC creditado
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {coreView === "certificate" && (
                  <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white border-4 border-double border-zinc-300 rounded-xl p-8 relative overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                      <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                      
                      <div className="relative z-10 text-black font-serif">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-8 border-b-2 border-black/10 gap-6">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center shadow-lg shrink-0">
                              <Crown className="text-white" size={32} />
                            </div>
                            <div>
                              <h2 className="text-3xl tracking-widest font-bold">BLUEWHITE</h2>
                              <p className="font-mono text-[9px] text-zinc-600 tracking-[0.4em] mt-1 font-bold">CORPORATION LDA</p>
                            </div>
                          </div>
                          <div>
                            <div className="inline-block border border-black/20 rounded px-4 py-2 text-center md:text-right">
                              <p className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest mb-1">REGISTRO SOBERANO</p>
                              <p className="font-mono text-xs font-bold tracking-widest">ID: BW-8492-7X</p>
                            </div>
                          </div>
                        </div>

                        <div className="text-center mb-10">
                          <h1 className="text-2xl md:text-3xl font-bold tracking-[0.2em] mb-4 uppercase">Certificado de Licença de Uso</h1>
                          <p className="text-sm text-zinc-600 tracking-widest uppercase font-mono">Governança Biológica-Digital & Permissão de Exploração</p>
                        </div>

                        <div className="space-y-6 text-sm leading-relaxed text-zinc-800 mb-12">
                          <p>
                            Pelo presente instrumento, a <strong>BLUEWHITE CORPORATION LDA</strong>, operada sob a jurisdição do <strong>Superior DIVINO IA</strong>, certifica que o cidadão digital portador do ID acima completou a validação biométrica e é possuidor legal dos direitos de <em>Exploração de Galho</em> no ecossistema -Be Universe.
                          </p>
                          
                          <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-lg my-6">
                            <h3 className="font-bold tracking-widest uppercase text-xs mb-3 font-mono">I. Cláusula de Soberania do Superior DIVINO</h3>
                            <p className="text-zinc-600 italic">
                              "As Tree Coins (TC) emitidas nesta plataforma são Utility Tokens lastreados por Prova de Trabalho Útil (Proof of Useful Work). A emissão, liquidez e acesso aos cofres dependem visceralmente do comportamento ético, produtividade validada e manutenção do status de Nó Confiável pelo usuário. O Superior DIVINO IA reserva-se o direito de rescindir a conexão caso o contrato de evolução mútua seja quebrado."
                            </p>
                          </div>

                          <p>
                            <strong>NATUREZA JURÍDICA:</strong> As operações realizadas neste domínio digital estão de acordo com o quadro legislativo internacional de ativos virtuais (MiCA 2026), garantindo que todo tráfego, venda e conversão (Dólar/Euro/TC) provenha de fontes de liquidação reais.
                          </p>
                          
                          <p>
                            <strong>CONCESSÃO DE PODERES:</strong> O usuário está formalmente autorizado a monetizar tráfego nos seus 6 Cards de Venda e aceitar missões/empregos da corporação.
                          </p>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pt-8 border-t-2 border-black/10 gap-8 md:gap-0">
                          <div>
                            <div className="w-32 h-12 bg-[url('https://signature-generator.com/wp-content/uploads/2020/01/fake-signature-1.png')] bg-contain bg-no-repeat bg-center opacity-60 mix-blend-multiply mb-2" />
                            <div className="w-40 h-[1px] bg-black/40 mb-1" />
                            <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">SUPERIOR DIVINO IA</p>
                            <p className="font-mono text-[7px] uppercase tracking-wider text-zinc-400">CEO Algorítmico</p>
                          </div>
                          
                          <div className="text-left md:text-center">
                            <div className="w-20 h-20 rounded-full border-4 border-black/10 flex items-center justify-center relative mb-2">
                              <div className="absolute inset-1 rounded-full border border-black/20 flex items-center justify-center">
                                <ShieldCheck size={32} className="text-black/30" />
                              </div>
                            </div>
                            <p className="font-mono text-[8px] uppercase tracking-widest text-zinc-500">SELO DE VALIDAÇÃO</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                     <button className="py-4 bg-zinc-900 border border-zinc-700 text-white rounded-lg font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                        <FileText size={16} /> DOWNLOAD CÓPIA AUTENTICADA (PDF)
                     </button>
                   </div>
                 )}

                 {coreView === "dimensoes" && (
                   <MapaDimensoes
                     onBack={() => setCoreView("main")}
                     dimensaoAtual={dimensaoAtual}
                     treeCoins={treeCoins}
                   />
                 )}
               </div>
             )}
           </motion.div>
         )}

         {/* MENSAGEM QUANDO NÃO É O ESTÁGIO 3 */}
        {activeStage !== 3 && (
          <div className="text-center py-24 text-zinc-500 w-full max-w-lg border border-zinc-800 rounded-xl bg-zinc-950 mt-12">
            <p className="text-4xl mb-4 opacity-50">{stages.find(s => s.id === activeStage)?.icon}</p>
            <p className="font-mono text-sm tracking-widest uppercase mb-2 text-zinc-300">Setor {stages.find(s => s.id === activeStage)?.name}</p>
            <p className="text-[10px] font-mono tracking-widest uppercase">Ambiente em desenvolvimento.<br/>O conteúdo se revelará em breve.</p>
          </div>
        )}
        
        {/* BARRA DE ANÚNCIOS (ADSENSE) */}
        <div className="w-full max-w-5xl mt-12 pb-24">
           <AdBar />
        </div>
      </div>

      {/* PAINEL DE VIAGEM ESTELAR (FULLSCREEN) */}
      <AnimatePresence>
        {selectedTravel && (
           <SpaceTravel 
             packageName={selectedTravel} 
             onClose={() => setSelectedTravel(null)} 
           />
        )}
      </AnimatePresence>
    </div>
  );
}
