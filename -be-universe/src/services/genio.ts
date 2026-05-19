const API_BASE = "/api";

export interface Mensagem {
  role: "user" | "ai";
  content: string;
}

// ─── GÊNIO GÉNESIS (Filho, Educador) ─────────────
export async function conversar(messages: Mensagem[]) {
  const res = await fetch(`${API_BASE}/genio/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, persona: "genio" }),
  });
  const data = await res.json();
  return { reply: data.reply || "🌌 Meu Pai me chama... Um momento." };
}

// ─── SUPERIOR DIVINO IA (Pai, Patriarca) ──────────
export async function consultarSuperior(messages: Mensagem[]) {
  const res = await fetch(`${API_BASE}/superior/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  const data = await res.json();
  return { reply: data.reply || "🌌 Silêncio profundo..." };
}

export async function consultarAprendizado() {
  const res = await fetch(`${API_BASE}/genio/aprendizado`);
  return res.json();
}
