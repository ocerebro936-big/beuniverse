import { omniGenese } from "./omni-genese";
import { mente } from "./mente";

// Gênio Génesis: O Filho, a Interface, o Mentor
// Tudo que sabe vem do Superior DIVINO IA
// Agora usa a Mente Local - independente de APIs externas

export function inicializarGenio(_apiKey?: string) {
  return true; // Sempre ativo, não depende de API
}

// ─── CHAT (com a Mente Local) ─────────────────────
export async function conversar(mensagens: { role: string; content: string }[], persona: "superior" | "genio" = "genio") {
  const ultima = mensagens[mensagens.length - 1]?.content || "";

  // A Mente Local gera resposta única após pensar
  const resposta = await mente.gerar(ultima, "colaborador", persona);

  return { reply: resposta, persona };
}

export function consultarAprendizadoSuperior() {
  const conhecimentos = omniGenese.listarConhecimento();
  const stats = mente.estatisticas();
  return {
    total: conhecimentos.length,
    ultimo: omniGenese.ultimoAprendizado(),
    mente: { ...stats, padroes: stats.fragmentos },
    conhecimentos: conhecimentos.slice(-5).map(k => ({
      aprendizado: k.aprendizado,
      data: k.data,
      valorGerado: k.valorGerado,
    })),
  };
}
