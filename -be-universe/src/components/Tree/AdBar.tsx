import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdBar = () => {
  const adClientId = import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT;

  useEffect(() => {
    if (!adClientId) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, [adClientId]);

  if (!adClientId) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
        <div className="col-span-2 md:col-span-4 bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center text-xs text-zinc-500 font-mono">
          AdSense não configurado (Configure VITE_GOOGLE_ADSENSE_CLIENT no .env)
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
      {/* Google AdSense - Banner Responsivo */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClientId}
        data-ad-slot="YOUR_AD_SLOT_ID_HERE"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      
      {/* AdMob para mobile placeholder */}
      <div className="bg-gradient-to-r from-[#ffd966]/10 to-[#ffaa66]/10 border border-[#ffd966]/30 rounded-xl p-3 text-center text-xs font-mono text-[#ffd966]">
        <div id="admob-banner">PUBLICIDADE MOBILE</div>
      </div>
      
      {/* Native Ad placeholder */}
      <div className="bg-gradient-to-r from-[#ffd966]/10 to-[#ffaa66]/10 border border-[#ffd966]/30 rounded-xl p-3 text-center text-xs font-mono text-[#ffd966]">
        <div className="native-ad" data-native-ad="true">CONTEÚDO PATROCINADO</div>
      </div>
      
      {/* Link Patrocinado */}
      <div className="bg-gradient-to-r from-[#ffd966]/10 to-[#ffaa66]/10 border border-[#ffd966]/30 rounded-xl p-3 text-center text-xs">
        <a href="#" className="font-mono text-[#ffd966] hover:underline uppercase tracking-wider">🔗 Link Patrocinado</a>
      </div>
    </div>
  );
};
