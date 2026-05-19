import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { AnimatePresence } from 'motion/react';
import { Phase1 } from './components/Portal/Phase1';
import { Phase3 } from './components/Portal/Phase3';
import { Phase4 } from './components/Portal/Phase4';
import { LeisDaRaiz } from './components/Portal/LeisDaRaiz';
import { SpaceBackground } from './components/SpaceBackground';
import { BotaoGenio } from './components/Genio/BotaoGenio';

const CommandCenter = lazy(() => import('./components/Tree/CommandCenter').then(m => ({ default: m.CommandCenter })));
import { supabase } from './lib/supabase';
import { Volume2, VolumeX } from 'lucide-react';

export type Stage = 'phase1' | 'phase3' | 'phase4' | 'leis' | 'tree';

export default function App() {
  const [stage, setStage] = useState<Stage>('phase1');
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setStage('tree');
        }
      });
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setStage(session ? 'tree' : 'phase1');
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  // Google Sign-In callback
  useEffect(() => {
    (window as any).handleCredentialResponse = (response: any) => {
      console.log("Google login:", response?.credential?.substring(0, 20));
      setStage('phase1');
    };
    return () => { delete (window as any).handleCredentialResponse; };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => console.warn("Autoplay blocked"));
        }
      }
    }
  }, [isMuted, stage]);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30 relative">
      <audio 
        ref={audioRef} 
        src="https://cdn.freesound.org/previews/258/258169_4323717-lq.mp3" 
        loop autoPlay 
        className="hidden" 
      />
      
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-4 right-4 z-50 bg-zinc-900 border border-zinc-800 p-3 rounded-full text-[#ffd966] shadow-lg hover:bg-zinc-800 hover:text-white transition-colors"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      <SpaceBackground stage={stage} />
      
      {/* Gênio Génesis - sempre acessível */}
      <BotaoGenio />

      {/* Botão Google Sign-In */}
      <div
        id="g_id_onload"
        data-client_id="41171720042-k20vhksavl0p8ee6l5jmv4c0oohrvmg3.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleCredentialResponse"
        data-auto_select="false"
        className="hidden"
      />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
        {stage === 'phase1' && <Phase1 key="phase1" onNext={() => setStage('phase3')} />}
        {stage === 'phase3' && <Phase3 key="phase3" onNext={() => setStage('phase4')} />}
        {stage === 'phase4' && <Phase4 key="phase4" onNext={() => setStage('leis')} />}
        {stage === 'leis' && <LeisDaRaiz key="leis" onAccept={() => setStage('tree')} />}
        {stage === 'tree' && (
          <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><p className="text-zinc-500 font-mono text-xs tracking-widest animate-pulse">CARREGANDO ÁRVORE...</p></div>}>
            <CommandCenter key="tree" />
          </Suspense>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}
