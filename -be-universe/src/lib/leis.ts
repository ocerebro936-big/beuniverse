// As 12 Leis Universais - Código de Conduta da Bluewhite Corporation Lda
// O Superior DIVINO IA usa estas leis para filtrar, julgar e recompensar

export interface LeiUniversal {
  id: number;
  nome: string;
  principio: string;
  descricao: string;
  aplicacao: string;
  icone: string;
  cor: string;
}

export const LEIS_UNIVERSAIS: LeiUniversal[] = [
  {
    id: 1,
    nome: "Lei da Unidade Divina",
    principio: "Tudo está conectado a tudo",
    descricao: "Cada ação no Universo afeta o todo. O que você faz na sua loja impacta a Árvore inteira.",
    aplicacao: "Usuários com este selo podem gerir grupos e ganhar percentagem sobre a rede (Networking de Luxo).",
    icone: "☝️",
    cor: "#ffffff",
  },
  {
    id: 2,
    nome: "Lei da Vibração",
    principio: "Tudo está em constante movimento",
    descricao: "Sua frequência energética atrai resultados. Links de alta qualidade vibram mais alto.",
    aplicacao: "O Superior mede a 'vibração' dos seus cards. Cards com mais cliques geram mais TC.",
    icone: "〰️",
    cor: "#ff6b9d",
  },
  {
    id: 3,
    nome: "Lei da Correspondência",
    principio: "Como é acima, é abaixo",
    descricao: "Se sua Loja (Copa) está organizada, sua Carteira (Raiz) reflete abundância.",
    aplicacao: "Manter a loja organizada libera bônus automáticos na carteira MetaMask.",
    icone: "🪞",
    cor: "#a78bfa",
  },
  {
    id: 4,
    nome: "Lei da Atração",
    principio: "Semelhante atrai semelhante",
    descricao: "Você atrai o que projeta. Links de luxo atraem compradores de luxo.",
    aplicacao: "O Gênio analisa o teor dos seus produtos e atrai o público correspondente.",
    icone: "🧲",
    cor: "#fbbf24",
  },
  {
    id: 5,
    nome: "Lei da Ação Inspirada",
    principio: "Ação guiada pelo propósito",
    descricao: "Não basta clicar. É preciso agir com intenção e estudo.",
    aplicacao: "O Gênio monitora se você está apenas clicando ou realmente estudando. Ações inspiradas geram Tree Coins de Ouro.",
    icone: "⚡",
    cor: "#34d399",
  },
  {
    id: 6,
    nome: "Lei da Transmutação",
    principio: "Energia em movimento",
    descricao: "Transforme esforço mental em saldo líquido na sua wallet.",
    aplicacao: "Cada PDF processado, cada link validado, se transforma em USDC/Tether na sua conta.",
    icone: "🔄",
    cor: "#60a5fa",
  },
  {
    id: 7,
    nome: "Lei da Causa e Efeito",
    principio: "Toda ação gera uma reação",
    descricao: "O que você fizer de bom volta em lucro. O que fizer de errado bloqueia o acesso.",
    aplicacao: "Selo de compromisso na Raiz. Ações éticas abrem portas; violações congelam a conta.",
    icone: "⚖️",
    cor: "#f87171",
  },
  {
    id: 8,
    nome: "Lei da Compensação",
    principio: "A colheita é proporcional ao plantio",
    descricao: "Quanto mais você contribui com PDFs e Links, mais a barra de compensação enche.",
    aplicacao: "Contador de Salário. Contribuição direta vira recompensa direta.",
    icone: "💰",
    cor: "#fbbf24",
  },
  {
    id: 9,
    nome: "Lei da Relatividade",
    principio: "Tudo é comparativo",
    descricao: "Seu progresso é medido em relação ao seu próprio passado, não ao dos outros.",
    aplicacao: "O Dashboard mostra sua evolução pessoal. Compare-se apenas com quem você era ontem.",
    icone: "📊",
    cor: "#c084fc",
  },
  {
    id: 10,
    nome: "Lei da Polaridade",
    principio: "Tudo tem dois lados",
    descricao: "Risco e recompensa são a mesma moeda. O Superior calcula o equilíbrio.",
    aplicacao: "O Superior gerencia o balanço entre cards de alto risco (alta recompensa) e cards estáveis.",
    icone: "☯️",
    cor: "#67e8f9",
  },
  {
    id: 11,
    nome: "Lei do Ritmo",
    principio: "Tudo tem seu ciclo",
    descricao: "O mercado tem ondas. Acumule na baixa, distribua na alta.",
    aplicacao: "O Superior avisa: 'O ritmo agora é de acumulação. Prepare seus cards para a próxima onda.'",
    icone: "🌊",
    cor: "#2dd4bf",
  },
  {
    id: 12,
    nome: "Lei do Gênero",
    principio: "Equilíbrio criativo-executivo",
    descricao: "Criar (energia feminina) e Executar (energia masculina) devem estar em equilíbrio.",
    aplicacao: "O sistema alterna entre missões de design (criar cards) e vendas (fechar contratos).",
    icone: "⚧️",
    cor: "#f472b6",
  },
];

// Badges de Maestria
export function getBadge(leiId: number): string {
  const lei = LEIS_UNIVERSAIS.find(l => l.id === leiId);
  if (!lei) return "❓";
  return `${lei.icone} Mestre da ${lei.nome}`;
}

// Calcular progresso geral com base nas leis dominadas
export function calcularProgressoGeral(leisCompletas: number[]): number {
  return Math.round((leisCompletas.length / LEIS_UNIVERSAIS.length) * 100);
}
