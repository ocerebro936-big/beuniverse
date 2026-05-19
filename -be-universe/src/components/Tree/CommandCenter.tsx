import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { VerticalTree } from "./VerticalTree";
import { OrganicMap } from "./OrganicMap";
import { BeUniverseGateway } from "./BeUniverseGateway";

const ProfessorPortal = lazy(() => import("../Professor/ProfessorPortal").then(m => ({ default: m.ProfessorPortal })));
const ConnectPortal = lazy(() => import("../Connect/ConnectPortal").then(m => ({ default: m.ConnectPortal })));
const SpaceTravelPortal = lazy(() => import("../SpaceTravel/SpaceTravelPortal").then(m => ({ default: m.SpaceTravelPortal })));

export function CommandCenter() {
  const [activeView, setActiveView] = useState<'vertical-tree' | 'organic-map' | 'professor' | 'connect' | 'travel'>(() => {
    return (localStorage.getItem('bw_initial_view') as any) || 'vertical-tree';
  });
  const [showGateway, setShowGateway] = useState(false);
  const [isRootUnlocked, setIsRootUnlocked] = useState(false);

  useEffect(() => {
    localStorage.removeItem('bw_initial_view');
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden overflow-y-auto font-sans">
      
      {/* Overlay Gateway for Be Universe Click */}
      <AnimatePresence>
        {showGateway && (
          <BeUniverseGateway 
            onUnlockComplete={() => {
              setShowGateway(false);
              setIsRootUnlocked(true);
            }} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {activeView === 'vertical-tree' && (
          <motion.div
            key="vertical"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 1 }}
            className={`absolute inset-0 ${showGateway ? 'filter blur-md' : ''}`}
          >
            <VerticalTree onNodeClick={(node) => {
              if (node === 'be-universe') {
                setShowGateway(true);
              } else if (node === 'store') {
                setActiveView('organic-map');
              } else if (node === 'professor') {
                if (isRootUnlocked) {
                  setActiveView('professor');
                } else {
                  alert("Você precisa liberar a Raiz (Be Universe) primeiro!");
                }
              } else if (node === 'connect') {
                setActiveView('connect');
              } else if (node === 'travel') {
                setActiveView('travel');
              }
            }} />
          </motion.div>
        )}

        {activeView === 'organic-map' && (
          <motion.div
            key="organic"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-30"
          >
            <div className="absolute top-4 left-4 z-40">
               <button 
                 className="px-4 py-2 flex items-center gap-2 text-[10px] md:text-xs text-[#ffcc00] border border-[#ffcc00]/30 rounded-full hover:bg-[#ffcc00]/10 hover:border-[#ffcc00] transition-colors uppercase font-mono tracking-widest"
                 onClick={() => setActiveView('vertical-tree')}
               >
                 <span className="text-xl leading-none">&rsaquo;</span> VOLTAR À ÁRVORE
               </button>
            </div>
            <OrganicMap onBack={() => setActiveView('vertical-tree')} />
          </motion.div>
        )}

        {activeView === 'professor' && (
          <motion.div
            key="professor"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-30"
          >
            <Suspense fallback={<div className="h-full flex items-center justify-center"><p className="text-zinc-500 font-mono text-xs animate-pulse">CARREGANDO...</p></div>}>
              <ProfessorPortal onBack={() => setActiveView('vertical-tree')} />
            </Suspense>
          </motion.div>
        )}

        {activeView === 'connect' && (
          <motion.div
            key="connect"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-30"
          >
            <Suspense fallback={<div className="h-full flex items-center justify-center"><p className="text-zinc-500 font-mono text-xs animate-pulse">CARREGANDO...</p></div>}>
              <ConnectPortal onBack={() => setActiveView('vertical-tree')} />
            </Suspense>
          </motion.div>
        )}

        {activeView === 'travel' && (
          <motion.div
            key="travel"
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-30"
          >
            <Suspense fallback={<div className="h-full flex items-center justify-center"><p className="text-zinc-500 font-mono text-xs animate-pulse">PREPARANDO VIAGEM...</p></div>}>
              <SpaceTravelPortal onBack={() => setActiveView('vertical-tree')} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
