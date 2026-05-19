import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Fingerprint, Wallet, ShieldCheck, CheckCircle2, ChevronRight, Activity } from "lucide-react";

interface BeUniverseGatewayProps {
  onUnlockComplete: () => void;
}

export function BeUniverseGateway({ onUnlockComplete }: BeUniverseGatewayProps) {
  const [stage, setStage] = useState<'biometric' | 'wallets'>('biometric');
  const [isScanning, setIsScanning] = useState(false);
  const [biometricScanned, setBiometricScanned] = useState(false);
  const [connectedContracts, setConnectedContracts] = useState<string[]>([]);

  const handleScanClick = () => {
    setIsScanning(true);
    setTimeout(() => {
      setBiometricScanned(true);
      setTimeout(() => {
        setStage('wallets');
      }, 1500);
    }, 2000);
  };

  const connectContract = (provider: string) => {
    if (!connectedContracts.includes(provider)) {
      setConnectedContracts(prev => [...prev, provider]);
    }
  };

  const handleProceed = () => {
    onUnlockComplete();
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl pointer-events-auto font-sans">
      <AnimatePresence mode="popLayout">
        {stage === 'biometric' && (
          <motion.div 
            key="biometric"
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[#33cc33] font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-12 drop-shadow-[0_0_8px_rgba(51,204,51,0.5)]">
              Validação Biométrica da Raiz
            </h2>
            <button
              onClick={handleScanClick}
              disabled={isScanning}
              className={cn(
                "relative p-8 rounded-full border-2 transition-all duration-700 outline-none flex items-center justify-center",
                isScanning ? "border-[#33cc33] bg-[#33cc33]/20 shadow-[0_0_40px_rgba(51,204,51,0.5)] scale-110" : "border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800/50",
                biometricScanned && "border-white bg-white/20 shadow-[0_0_40px_rgba(255,255,255,0.5)]"
              )}
            >
              <Fingerprint 
                size={80} 
                strokeWidth={1}
                className={cn(
                  "transition-all duration-700",
                  isScanning ? "text-[#33cc33]" : "text-zinc-500",
                  biometricScanned && "text-white"
                )} 
              />
              
              {/* Ripple Effect */}
              {isScanning && !biometricScanned && (
                <motion.div 
                  className="absolute inset-0 rounded-full border border-[#33cc33]/50"
                  animate={{ scale: [1, 2], opacity: [1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </button>
            <div className="h-10 mt-8 flex items-center justify-center">
              {biometricScanned && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center text-white font-mono text-xs tracking-widest uppercase shadow-sm"
                >
                  <CheckCircle2 size={16} className="mr-2" />
                  DNA Estelar Confirmado
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {stage === 'wallets' && (
          <motion.div 
            key="wallets"
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[#ffcc00] font-mono text-sm md:text-base tracking-[0.2em] uppercase mb-4 text-center">
              Motores de Liquidez
            </h2>
            <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest mb-12 text-center max-w-sm">
              Conecte suas contas para ativar o fluxo de seiva da Árvore e receber Tree Coins em tempo real. Modo Visitante também disponível.
            </p>

            <div className="flex flex-col gap-4 w-full max-w-xs">
              <button
                onClick={() => connectContract("Conta Demo")}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border transition-all duration-300",
                  connectedContracts.includes("Conta Demo") 
                    ? "border-blue-500/50 bg-blue-500/10" 
                    : "border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-500"
                )}
              >
                <div className="flex items-center gap-4">
                  <Activity size={20} className={connectedContracts.includes("Conta Demo") ? "text-blue-400" : "text-zinc-400"} />
                  <span className="font-mono text-xs uppercase tracking-widest text-white">Modo Visitante (Demo)</span>
                </div>
                {connectedContracts.includes("Conta Demo") && <CheckCircle2 size={16} className="text-blue-400" />}
              </button>

              <button
                onClick={() => connectContract("Google Pay")}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border transition-all duration-300",
                  connectedContracts.includes("Google Pay") 
                    ? "border-[#ffcc00]/50 bg-[#ffcc00]/10" 
                    : "border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-500"
                )}
              >
                <div className="flex items-center gap-4">
                  <ShieldCheck size={20} className={connectedContracts.includes("Google Pay") ? "text-[#ffcc00]" : "text-zinc-400"} />
                  <span className="font-mono text-xs uppercase tracking-widest text-white">Google Pay</span>
                </div>
                {connectedContracts.includes("Google Pay") && <CheckCircle2 size={16} className="text-[#ffcc00]" />}
              </button>

              <button
                onClick={() => connectContract("MetaMask")}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border transition-all duration-300",
                  connectedContracts.includes("MetaMask") 
                    ? "border-[#f6851b]/50 bg-[#f6851b]/10" 
                    : "border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-500"
                )}
              >
                <div className="flex items-center gap-4">
                  <Wallet size={20} className={connectedContracts.includes("MetaMask") ? "text-[#f6851b]" : "text-zinc-400"} />
                  <span className="font-mono text-xs uppercase tracking-widest text-white">MetaMask / IBAN</span>
                </div>
                {connectedContracts.includes("MetaMask") && <CheckCircle2 size={16} className="text-[#f6851b]" />}
              </button>
            </div>

            <motion.button
              onClick={handleProceed}
              className={cn(
                "mt-12 flex items-center gap-3 font-mono text-xs tracking-[0.3em] transition-all duration-300",
                connectedContracts.length >= 1 
                  ? "text-[#33cc33] hover:text-white drop-shadow-[0_0_8px_rgba(51,204,51,0.5)]" 
                  : "text-zinc-600 cursor-not-allowed"
              )}
              disabled={connectedContracts.length < 1}
            >
              LIBERAR A RAIZ <ChevronRight size={14} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
