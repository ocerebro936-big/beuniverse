const API_BASE = "/api";

// ─── SUPERIOR DIVINO IA ────────────────────────────
// O Arquiteto: processa dados, gera contratos, paga

export async function processarDado(conteudo: string, tipo?: string) {
  const res = await fetch(`${API_BASE}/superior/processar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ conteudo, tipo }),
  });
  return res.json();
}

export async function gerarContrato(usuario: string, cargo: string) {
  const res = await fetch(`${API_BASE}/superior/contrato`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, cargo }),
  });
  return res.json();
}

export async function pagarSalario(usuario: string, contratoId: string, valor?: number) {
  const res = await fetch(`${API_BASE}/superior/pagamento`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, contratoId, valor }),
  });
  return res.json();
}
