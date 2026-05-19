const API_BASE = "/api";

// Busca imagens dinâmicas via Pexels (proxy pelo servidor)
const cacheImagens = new Map<string, string[]>();

export async function buscarImagens(query: string, pagina: number = 1): Promise<string[]> {
  const cacheKey = `${query}-${pagina}`;
  if (cacheImagens.has(cacheKey)) return cacheImagens.get(cacheKey)!;

  try {
    const res = await fetch(`${API_BASE}/midia/buscar?q=${encodeURIComponent(query)}&page=${pagina}`);
    const data = await res.json();
    const fotos = data.fotos || [];
    cacheImagens.set(cacheKey, fotos);
    return fotos;
  } catch {
    return [];
  }
}

// Queries prontas por setor
export const QUERIES = {
  python: "software code programming python",
  java: "enterprise java code server",
  webdev: "web development responsive design",
  frances: "paris france elegant luxury",
  ingles: "london business professional",
  marketing: "digital marketing analytics social media",
  financas: "financial charts gold crypto trading",
  espiritual: "meditation universe spiritual energy",
  automacao: "ai robot automation technology",
  servidores: "data center server rack technology",
  universo: "space galaxy nebula cosmos",
  natureza: "forest nature tree landscape",
  luxo: "luxury gold premium wealth",
  tecnologia: "technology innovation future digital",
  negocios: "business meeting corporate professional",
};

const bgCache = new Map<string, string>();

export async function buscarBackground(query: string): Promise<string> {
  if (bgCache.has(query)) return bgCache.get(query)!;
  const fotos = await buscarImagens(query, 1);
  const url = fotos[0] || "";
  if (url) bgCache.set(query, url);
  return url;
}

export function precarregarURL(url: string) {
  if (!url) return;
  const img = new Image();
  img.src = url;
}
