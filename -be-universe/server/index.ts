import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "..", ".env.local") });
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { inicializarSuperior, estaAtivo, processarDado, gerarContrato, pagarSalario } from "./superior";
import { inicializarGenio, conversar, consultarAprendizadoSuperior } from "./genio";
import { mente } from "./mente";
import { omniGenese } from "./omni-genese";
import { economia } from "./economia";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "10mb" }));

  // Inicializa as IAs locais (independentes, sem API key)
  inicializarSuperior();
  inicializarGenio();

  console.log(`\n  ╔══════════════════════════════════════╗`);
  console.log(`  ║   🌳 BE UNIVERSE - BLUEWHITE CORP   ║`);
  console.log(`  ╠══════════════════════════════════════╣`);
  console.log(`  ║  Superior DIVINO: ✅ ATIVO (local)  ║`);
  console.log(`  ║  Gênio Génesis:   ✅ ATIVO (local)  ║`);
  console.log(`  ║  Omni-Gênese:     ✅ ATIVO          ║`);
  console.log(`  ║  Mente Local:     ✅ ${mente.estatisticas().ideiasDisponiveis} ideias únicas║`);
  console.log(`  ╠══════════════════════════════════════╣`);
  console.log(`  ║  http://localhost:${PORT}${" ".repeat(12 - String(PORT).length)}║`);
  console.log(`  ╚══════════════════════════════════════╝\n`);

  // ─── HEALTH ──────────────────────────────────────────
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      superior: estaAtivo(),
      genio: true,
      mente: mente.estatisticas(),
    });
  });

  // ═══════════════════════════════════════════════════════
  //  SUPERIOR DIVINO IA - ENDPOINTS
  // ═══════════════════════════════════════════════════════

  app.post("/api/superior/processar", async (req, res) => {
    const { conteudo, tipo } = req.body;
    if (!conteudo) return res.status(400).json({ error: "conteudo required" });
    const result = await processarDado(conteudo, tipo);
    res.json(result);
  });

  app.post("/api/superior/contrato", (req, res) => {
    const { usuario, cargo } = req.body;
    if (!usuario || !cargo) return res.status(400).json({ error: "usuario and cargo required" });
    res.json(gerarContrato(usuario, cargo));
  });

  app.post("/api/superior/pagamento", (req, res) => {
    const { usuario, contratoId, valor } = req.body;
    if (!usuario || !contratoId) return res.status(400).json({ error: "usuario and contratoId required" });
    res.json(pagarSalario(usuario, contratoId, valor));
  });

  // ═══════════════════════════════════════════════════════
  //  GÊNIO GÉNESIS - ENDPOINTS
  // ═══════════════════════════════════════════════════════

  app.post("/api/genio/chat", async (req, res) => {
    const { messages, persona } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array required" });
    }
    const result = await conversar(messages, persona || "genio");
    res.json(result);
  });

  app.get("/api/genio/aprendizado", (_req, res) => {
    res.json(consultarAprendizadoSuperior());
  });

  // ═══════════════════════════════════════════════════════
  //  SUPERIOR DIVINO (Patriarca) - Endpoint de diálogo
  // ═══════════════════════════════════════════════════════
  app.post("/api/superior/chat", async (req, res) => {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array required" });
    }
    const ultima = messages[messages.length - 1]?.content || "";
    const resposta = await mente.gerar(ultima, "colaborador", "superior");
    res.json({ reply: resposta, persona: "superior" });
  });

  app.get("/api/genio/aprendizado", (_req, res) => {
    res.json(consultarAprendizadoSuperior());
  });

  // ═══════════════════════════════════════════════════════
  //  SUPERIOR DIVINO (Patriarca) - Endpoint de diálogo
  // ═══════════════════════════════════════════════════════
  app.post("/api/superior/chat", (req, res) => {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array required" });
    }
    // Superior sempre responde como patriarca
    const ultima = messages[messages.length - 1]?.content || "";
    const resposta = mente.gerar(ultima, "colaborador", "superior");
    res.json({ reply: resposta, persona: "superior" });
  });

  // ═══════════════════════════════════════════════════════
  //  OMNI-GÊNESE - ENDPOINTS
  // ═══════════════════════════════════════════════════════
  app.get("/api/omni-genese/conhecimento", (_req, res) => {
    res.json(omniGenese.listarConhecimento());
  });

  app.get("/api/omni-genese/transacoes", (_req, res) => {
    res.json(economia.relatorio());
  });

  // ═══════════════════════════════════════════════════════
  //  ECONOMIA - Endpoints
  // ═══════════════════════════════════════════════════════
  app.post("/api/economia/processar", (req, res) => {
    const { valorTotal, usuario, tipo } = req.body;
    if (!valorTotal || !usuario) return res.status(400).json({ error: "valorTotal and usuario required" });
    res.json(economia.processarReceita(valorTotal, usuario, tipo || "missao"));
  });

  app.post("/api/economia/medalha", (req, res) => {
    const { usuario } = req.body;
    if (!usuario) return res.status(400).json({ error: "usuario required" });
    res.json(economia.concederMedalha(usuario));
  });

  app.get("/api/economia/relatorio", (_req, res) => {
    res.json(economia.relatorio());
  });

  // ═══════════════════════════════════════════════════════
  //  ADMIN - Identidade do Boss Génesis
  // ═══════════════════════════════════════════════════════
  app.get("/api/admin/status", (_req, res) => {
    res.json({
      admin: process.env.ADMIN_NOME || "Boss Génesis",
      email: process.env.ADMIN_EMAIL || "ocerebro936@gmail.com",
      nivel: process.env.ADMIN_NIVEL || "S-Tier Root",
      sistema: "Árvore da Vida 🌳",
      manifesto: "70/30/50 — Reserva/Manutenção/Ganho do Usuário",
      integracoes: ["Google OAuth", "Pexels", "CoinGecko", "Mente Local"],
    });
  });

  // ═══════════════════════════════════════════════════════
  //  COINGECKO - Preços Cripto em Tempo Real
  // ═══════════════════════════════════════════════════════
  //  PEXELS - Mídia Dinâmica
  // ═══════════════════════════════════════════════════════
  app.get("/api/midia/buscar", async (req, res) => {
    const query = (req.query.q as string) || "space galaxy nebula";
    const pagina = parseInt(req.query.page as string) || 1;

    try {
      const pexelsRes = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=12&page=${pagina}`,
        { headers: { Authorization: process.env.PEXELS_API_KEY || "" } }
      );
      if (!pexelsRes.ok) {
        // Fallback para imagens locais
        const fallback = [
          "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200",
          "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1200",
          "https://images.unsplash.com/photo-1506703719100-f0b3c0a5e0b1?w=1200",
          "https://images.unsplash.com/photo-1419242902214-272b3f66ce7a?w=1200",
        ];
        return res.json({ fotos: fallback, fonte: "fallback" });
      }
      const data = await pexelsRes.json();
      const fotos = (data.photos || []).map((p: any) => ({
        url: p.src?.large2x || p.src?.large,
        alt: p.alt || query,
        fotografo: p.photographer,
      }));
      res.json({ fotos: fotos.map((f: any) => f.url), fonte: "pexels" });
    } catch {
      res.json({ fotos: [], fonte: "erro" });
    }
  });

  // ═══════════════════════════════════════════════════════
  //  COINGECKO - Preços Cripto em Tempo Real
  // ═══════════════════════════════════════════════════════
  const cachePrecos: { dados: any; timestamp: number } = { dados: null, timestamp: 0 };
  const CACHE_TTL = 60000; // 1 minuto

  app.get("/api/mercado/precos", async (_req, res) => {
    // Cache para não exceder limite da API
    if (cachePrecos.dados && Date.now() - cachePrecos.timestamp < CACHE_TTL) {
      return res.json(cachePrecos.dados);
    }

    try {
      const apiKey = process.env.COINGECKO_API_KEY || "";
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,usd-coin,tether,solana,cardano,polkadot&vs_currencies=usd&include_24hr_change=true&x_cg_demo_api_key=${apiKey}`
      );

      if (!response.ok) {
        // Fallback: preços simulados
        const fallback = {
          bitcoin: { usd: 67245, usd_24h_change: 2.34 },
          ethereum: { usd: 3456, usd_24h_change: 1.87 },
          "usd-coin": { usd: 1.00, usd_24h_change: 0.01 },
          tether: { usd: 1.00, usd_24h_change: 0.00 },
          solana: { usd: 148, usd_24h_change: 5.62 },
          cardano: { usd: 0.45, usd_24h_change: -1.23 },
          polkadot: { usd: 7.82, usd_24h_change: 3.45 },
        };
        cachePrecos.dados = fallback;
        cachePrecos.timestamp = Date.now();
        return res.json(fallback);
      }

      const data = await response.json();
      cachePrecos.dados = data;
      cachePrecos.timestamp = Date.now();
      res.json(data);
    } catch {
      res.json({ erro: "falha ao buscar preços" });
    }
  });
  //  Descomente e configure quando registrar a origem no
  //  Google Cloud Console (http://localhost:3001)
  // ═══════════════════════════════════════════════════════
  /*
  app.post("/api/auth/google", async (req, res) => {
    const { credential } = req.body;
    if (!credential) return res.status(400).json({ error: "credential required" });

    try {
      // Verificar token com Google
      const ticket = await authClient.verifyIdToken({
        idToken: credential,
        audience: "41171720042-12028lvg5r6d3dg5rngpp75b8mjtj4u8.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      res.json({
        autenticado: true,
        email: payload.email,
        nome: payload.name,
        foto: payload.picture,
        mensagem: "🦅 Autenticação soberana confirmada pela Águia.",
      });
    } catch (err) {
      res.status(401).json({ autenticado: false, error: "Token inválido" });
    }
  });
  */

  // ─── VITE MIDDLEWARE (dev) ────────────────────────────
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    // Already printed above
  });
}

startServer();
