import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Wallet, X, AlertCircle, Fingerprint, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IdentityRootProps {
  onBack: () => void;
  key?: string;
}

export function IdentityRoot({ onBack }: IdentityRootProps) {
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    setConnecting(true);
    setError(null);
    try {
      // @ts-ignore - ethereum is injected by metamask
      if (typeof window.ethereum !== 'undefined') {
        // @ts-ignore
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          setConnectedAddress(accounts[0]);
        } else {
          throw new Error('Nenhuma conta encontrada.');
        }
      } else {
        throw new Error('MetaMask não foi detectada. Por favor, instale a extensão do navegador.');
      }
    } catch (err: any) {
      console.error("MetaMask error:", err);
      if (err.code === 4001) {
        setError('Conexão rejeitada pelo usuário.');
      } else {
        setError('Failed to connect to MetaMask. ' + (err.message || 'Erro desconhecido.'));
      }
    } finally {
      setConnecting(false);
    }
  };

  return (
    <motion.div 
      className="absolute inset-0 z-50 bg-[#021f0a]/80 backdrop-blur-xl flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-2xl bg-black/80 border border-white/20 glass-panel rounded-2xl overflow-hidden box-glow-earth relative">
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={onBack}
            className="p-2 border border-white/20 hover:border-white rounded-full bg-black/50 transition-all hover:scale-110 aspect-square flex items-center justify-center"
          >
            <X size={16} className="text-zinc-400 hover:text-white" />
          </button>
        </div>

        <div className="p-8 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-[var(--color-earth-green)]/20 text-[var(--color-earth-green)] rounded-xl border border-[var(--color-earth-green)]/50">
              <Network size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-display text-white tracking-widest uppercase">Be Universe</h2>
              <p className="font-mono text-zinc-300 text-xs">ESTÁGIO 1 / PROTOCOLO DE VINCULAÇÃO WEB3</p>
            </div>
          </div>
          <p className="text-zinc-200 mt-4 text-sm max-w-lg leading-relaxed">
            Aterragem completa. Estabeleça sua raiz na Terra interagindo com os nós da blockchain. Sua carteira Web3 validará sua identidade na Seiva e concederá sua primeira Tree Coin (TC) minerada.
          </p>
        </div>

        <div className="p-8 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
          {/* Abstract Grid Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.5) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
          }} />

          <AnimatePresence mode="wait">
            {!connectedAddress ? (
              <motion.div 
                key="connect"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center z-10 w-full"
              >
                <button
                  onClick={connectWallet}
                  disabled={connecting}
                  className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/20 rounded-xl hover:border-[var(--color-earth-green)] hover:text-[var(--color-earth-green)] transition-all group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-earth-green)]/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  <Wallet size={20} className={connecting ? "animate-pulse" : ""} />
                  <span className="font-mono text-white group-hover:text-[var(--color-earth-green)] transition-colors uppercase tracking-widest text-sm">
                    {connecting ? 'Conectando...' : 'Conectar MetaMask'}
                  </span>
                </button>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 flex items-start gap-3 p-4 bg-red-950/30 border border-red-900/50 rounded-lg text-red-500 max-w-md w-full glass-panel"
                  >
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <p className="font-mono text-xs leading-relaxed">{error}</p>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="connected"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center z-10 w-full"
              >
                <div className="w-20 h-20 bg-[var(--color-earth-green)]/20 border border-[var(--color-earth-green)] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <CheckCircle size={32} className="text-[var(--color-earth-green)]" />
                </div>
                
                <h3 className="text-xl font-display text-white mb-2 uppercase tracking-widest text-center">Identidade Enraizada</h3>
                
                <div className="bg-black/50 border border-white/10 rounded-lg p-4 flex items-center gap-3 mt-4">
                  <Fingerprint size={16} className="text-zinc-400" />
                  <p className="font-mono text-xs text-white">
                    {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}
                  </p>
                </div>

                <div className="mt-8 p-4 border border-[var(--color-earth-green)]/30 bg-[var(--color-earth-green)]/10 rounded-lg max-w-sm text-center">
                  <p className="font-mono text-[var(--color-earth-green)] text-xs uppercase tracking-widest mb-1 font-bold">
                    +1.0000 TC (Tree Coins)
                  </p>
                  <p className="text-[10px] text-zinc-300">
                    Seu saldo na Superior IA foi inicializado. O Estágio 2 (Abertura Mental) está agora desbloqueado para aumentar sua taxa de mineração.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
