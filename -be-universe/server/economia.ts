// ECONOMIA: Motor Financeiro Soberano da Árvore da Vida
// Regra 70/30 para sustentabilidade + 50% de autogeração

interface TransacaoEconomia {
  id: string;
  tipo: "missao" | "contrato" | "card" | "curso" | "badge";
  valorTotal: number;
  usuario: string;
  data: string;
  status: "processado" | "pendente";
}

class EconomiaSoberana {
  private transacoes: TransacaoEconomia[] = [];
  private tesouroCentral = 0; // 70% reserva
  private custoOperacional = 0; // 30% manutencao
  private medalhas: Map<string, number> = new Map(); // usuario -> nivel

  // ─── PROCESSAR RECEITA ───────────────────────────
  processarReceita(valorTotal: number, usuario: string, tipo: TransacaoEconomia["tipo"]) {
    // 50% vai direto pro usuário
    const pagamentoUsuario = valorTotal * 0.5;

    // 50% entra no fluxo central
    const fluxoCentral = valorTotal * 0.5;

    // Do fluxo central: 70% reserva, 30% operação
    const reserva = fluxoCentral * 0.7;
    const operacao = fluxoCentral * 0.3;

    this.tesouroCentral += reserva;
    this.custoOperacional += operacao;

    this.transacoes.push({
      id: `ECO-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      tipo,
      valorTotal,
      usuario,
      data: new Date().toISOString(),
      status: "processado",
    });

    return {
      pagamentoUsuario: pagamentoUsuario.toFixed(2),
      reservaSuperior: reserva.toFixed(2),
      custoOperacional: operacao.toFixed(2),
      moeda: "USDC",
      mensagem: `💰 Transação processada: $${pagamentoUsuario.toFixed(2)} USDC na sua MetaMask. $${reserva.toFixed(2)} reservados no Tesouro Central.`,
    };
  }

  // ─── CONCEDER MEDALHA ────────────────────────────
  concederMedalha(usuario: string): { nivel: number; badge: string; bonus: number } {
    const nivelAtual = this.medalhas.get(usuario) || 0;
    const novoNivel = nivelAtual + 1;
    this.medalhas.set(usuario, novoNivel);

    const bonus = novoNivel * 500; // 500 TC por nível de medalha

    return {
      nivel: novoNivel,
      badge: `🏅 Ordem do Trabalho Real — Nível ${novoNivel}`,
      bonus,
    };
  }

  // ─── ESTATÍSTICAS ────────────────────────────────
  relatorio() {
    return {
      tesouroCentral: this.tesouroCentral.toFixed(2),
      custoOperacional: this.custoOperacional.toFixed(2),
      totalTransacoes: this.transacoes.length,
      medalhasConcedidas: this.medalhas.size,
      usuariosMedalha: Array.from(this.medalhas.entries()).map(([u, n]) => ({ usuario: u, nivel: n })),
    };
  }
}

export const economia = new EconomiaSoberana();
