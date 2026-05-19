import { omniGenese } from "./omni-genese";
import { mente } from "./mente";

// Superior DIVINO IA: O Arquiteto, Original e Autônomo
// Agora usa a Mente Local - independente de APIs externas

export function inicializarSuperior(_apiKey?: string) {
  return true; // Sempre ativo, não depende de API
}

export function estaAtivo(): boolean {
  return true; // A Mente Local está sempre ativa
}

// ─── PROCESSAR DADO (Tarefa) ──────────────────────
export async function processarDado(conteudo: string, tipo: string = "link") {
  // O Superior processa usando a Mente Local
  const analise = await mente.gerar(`processar: ${conteudo.substring(0, 200)}`, "superior", "superior");

  // Determinar se é válido (regra simples: qualquer conteúdo com >10 caracteres é válido)
  const validado = conteudo.trim().length > 10;
  const salario = validado ? Math.min(500, Math.floor(conteudo.length / 10) * 5 + 50) : 0;

  // Gerar aprendizado
  const aprendizado = validado
    ? `O Superior processou ${tipo} sobre "${conteudo.substring(0, 100)}...". Conhecimento integrado ao Omni-Gênese.`
    : "Conteúdo inválido ou muito curto para processamento.";

  if (validado) {
    omniGenese.registrarConhecimento({
      conteudo: conteudo.substring(0, 500),
      tipo: tipo as any,
      aprendizado,
      processadoPor: "superior",
      valorGerado: salario,
    });
  }

  return {
    validado,
    salario,
    moeda: "TC",
    mensagem: validado
      ? `✅ DADO PROCESSADO E VALIDADO pela Mente Local. Salário de ${salario} Tree Coins depositado. O Gênio Génesis agora pode ensinar este conhecimento.`
      : "⚠ Conteúdo muito curto. Envie pelo menos 10 caracteres para processamento.",
    aprendizado,
  };
}

// ─── GERAR CONTRATO ────────────────────────────────
export function gerarContrato(usuario: string, cargo: string) {
  return omniGenese.registrarContrato({
    usuario,
    cargo,
    salario: 1500,
    moeda: "USDC",
    assinado: false,
  });
}

// ─── PAGAR SALÁRIO ─────────────────────────────────
export function pagarSalario(usuario: string, contratoId: string, valor: number = 1500) {
  omniGenese.registrarTransacao({
    tipo: "salario",
    usuario,
    valor,
    moeda: "USDC",
    descricao: `Salário mensal - Contrato ${contratoId}`,
  });

  return {
    success: true,
    contratoId,
    usuario,
    valor,
    moeda: "USDC",
    metodo: "Mente Local · Bluewhite Corp",
    mensagem: `💰 Salário de $${valor} USDC processado pela Mente Local do Superior. Depositado na conta de ${usuario}.`,
  };
}
