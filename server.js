/**
 * server.js — Servidor Express + API REST + Auth JWT
 * Serve os arquivos estáticos E a API /api/* no mesmo processo.
 * Porta 5000 (webview Replit).
 */
'use strict';

const express  = require('express');
const jwt      = require('jsonwebtoken');
const bcrypt   = require('bcryptjs');
const { Pool } = require('pg');
const path     = require('path');

const app        = express();
const pool       = new Pool(); // usa DATABASE_URL / PG* env vars automaticamente
const JWT_SECRET = process.env.SESSION_SECRET || 'iap-dev-secret-mude-em-producao';
const PORT       = 5000;

app.use(express.json({ limit: '5mb' }));

// ─── Middleware de autenticação ──────────────────────────────────────────────
function autenticar(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token ausente' });
  }
  try {
    req.usuario = jwt.verify(auth.slice(7), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ erro: 'Token inválido ou expirado. Faça login novamente.' });
  }
}

// ─── Auth ────────────────────────────────────────────────────────────────────

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, senha } = req.body ?? {};
    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
    }

    const { rows } = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email.toLowerCase().trim()]
    );
    const user = rows[0];

    if (!user || !(await bcrypt.compare(senha, user.senha_hash))) {
      return res.status(401).json({ erro: 'Email ou senha incorretos' });
    }

    const token = jwt.sign(
      { id: user.id, perfil: user.perfil, nome: user.nome },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      usuario: {
        id:         user.id,
        email:      user.email,
        perfil:     user.perfil,
        nome:       user.nome,
        initials:   user.initials,
        role_label: user.role_label,
        setor:      user.setor,
        av_class:   user.av_class,
      },
    });
  } catch (err) {
    console.error('[login]', err.message);
    res.status(500).json({ erro: 'Erro interno. Tente novamente.' });
  }
});

app.get('/api/auth/me', autenticar, async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, email, perfil, nome, initials, role_label, setor, av_class FROM usuarios WHERE id = $1',
      [req.usuario.id]
    );
    if (!rows[0]) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json({ usuario: rows[0] });
  } catch (err) {
    console.error('[me]', err.message);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

// ─── Demandas ─────────────────────────────────────────────────────────────────

app.get('/api/demandas', autenticar, async (req, res) => {
  try {
    let rows;
    if (req.usuario.perfil === 'funcionario') {
      ({ rows } = await pool.query(
        'SELECT * FROM demandas WHERE autor = $1 ORDER BY criado_em DESC',
        [req.usuario.nome]
      ));
    } else {
      ({ rows } = await pool.query('SELECT * FROM demandas ORDER BY criado_em DESC'));
    }
    res.json(rows.map(rowParaCamel));
  } catch (err) {
    console.error('[GET demandas]', err.message);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

app.post('/api/demandas', autenticar, async (req, res) => {
  try {
    const d = req.body;
    if (!d.id || !d.titulo || !d.tipo) {
      return res.status(400).json({ erro: 'Campos obrigatórios ausentes' });
    }
    const { rows } = await pool.query(
      `INSERT INTO demandas
         (id, titulo, tipo, prioridade, status, status_tag, autor, setor, data, descricao, fotos, historico)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       ON CONFLICT (id) DO NOTHING
       RETURNING *`,
      [
        d.id, d.titulo, d.tipo, d.prioridade, d.status, d.statusTag,
        d.autor, d.setor, d.data, d.desc || '', d.fotos || false,
        JSON.stringify(d.historico ?? []),
      ]
    );
    if (!rows[0]) return res.status(409).json({ erro: 'ID duplicado' });
    res.status(201).json(rowParaCamel(rows[0]));
  } catch (err) {
    console.error('[POST demandas]', err.message);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

app.put('/api/demandas/:id/resolver', autenticar, async (req, res) => {
  try {
    const { id } = req.params;
    const agora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const novaEntrada = JSON.stringify([{ d: agora, t: 'Demanda marcada como resolvida ✓', ok: true }]);

    const { rows } = await pool.query(
      `UPDATE demandas
       SET status     = 'Resolvida',
           status_tag = 't-ok',
           historico  = historico || $1::jsonb
       WHERE id = $2
       RETURNING *`,
      [novaEntrada, id]
    );
    if (!rows[0]) return res.status(404).json({ erro: 'Demanda não encontrada' });
    res.json(rowParaCamel(rows[0]));
  } catch (err) {
    console.error('[PUT resolver]', err.message);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

// ─── Converter snake_case do DB para camelCase do front ───────────────────────
function rowParaCamel(row) {
  return {
    id:         row.id,
    titulo:     row.titulo,
    tipo:       row.tipo,
    prioridade: row.prioridade,
    status:     row.status,
    statusTag:  row.status_tag,
    autor:      row.autor,
    setor:      row.setor,
    data:       row.data,
    desc:       row.descricao,
    fotos:      row.fotos,
    historico:  row.historico,
  };
}

// ─── Arquivos estáticos (SPA) — sempre depois das rotas /api ──────────────────
app.use(express.static(path.join(__dirname)));

// Fallback: retorna index.html para qualquer rota não-API (SPA routing)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

// ─── Setup do banco de dados ──────────────────────────────────────────────────
async function setupDB() {
  // Tabela de usuários
  await pool.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id         SERIAL       PRIMARY KEY,
      email      VARCHAR(255) UNIQUE NOT NULL,
      senha_hash VARCHAR(255) NOT NULL,
      perfil     VARCHAR(50)  NOT NULL,
      nome       VARCHAR(255) NOT NULL,
      initials   VARCHAR(10)  NOT NULL,
      role_label VARCHAR(100) NOT NULL,
      setor      VARCHAR(100) NOT NULL,
      av_class   VARCHAR(50)  NOT NULL,
      criado_em  TIMESTAMP    DEFAULT NOW()
    )
  `);

  // Tabela de demandas
  await pool.query(`
    CREATE TABLE IF NOT EXISTS demandas (
      id         VARCHAR(20)  PRIMARY KEY,
      titulo     VARCHAR(500) NOT NULL,
      tipo       VARCHAR(100) NOT NULL,
      prioridade VARCHAR(50)  NOT NULL,
      status     VARCHAR(100) NOT NULL,
      status_tag VARCHAR(50)  NOT NULL,
      autor      VARCHAR(255) NOT NULL,
      setor      VARCHAR(100) NOT NULL,
      data       VARCHAR(20)  NOT NULL,
      descricao  TEXT         NOT NULL DEFAULT '',
      fotos      BOOLEAN      DEFAULT FALSE,
      historico  JSONB        DEFAULT '[]'::jsonb,
      criado_em  TIMESTAMP    DEFAULT NOW()
    )
  `);

  // Seed: usuários (só se vazio)
  const { rows: contUsuarios } = await pool.query('SELECT COUNT(*) FROM usuarios');
  if (parseInt(contUsuarios[0].count) === 0) {
    console.log('[seed] Criando usuários de demonstração...');
    const usuarios = [
      {
        email:      'maria@petrobras.com',
        senha:      '123456',
        perfil:     'funcionario',
        nome:       'Maria Ferreira',
        initials:   'MF',
        role_label: 'Funcionária · Engenharia',
        setor:      'Engenharia',
        av_class:   'av-blue',
      },
      {
        email:      'carlos@petrobras.com',
        senha:      '123456',
        perfil:     'gestor',
        nome:       'Carlos Lima',
        initials:   'CL',
        role_label: 'Gestor · Operações',
        setor:      'Operações',
        av_class:   'av-green',
      },
      {
        email:      'ana@petrobras.com',
        senha:      '123456',
        perfil:     'rh',
        nome:       'Ana Paula',
        initials:   'AP',
        role_label: 'Analista · RH',
        setor:      'RH',
        av_class:   'av-yellow',
      },
      {
        email:      'roberto@petrobras.com',
        senha:      '123456',
        perfil:     'admin',
        nome:       'Roberto Souza',
        initials:   'RS',
        role_label: 'Administrador · TI',
        setor:      'TI',
        av_class:   'av-dark',
      },
    ];

    for (const u of usuarios) {
      const hash = await bcrypt.hash(u.senha, 10);
      await pool.query(
        `INSERT INTO usuarios (email, senha_hash, perfil, nome, initials, role_label, setor, av_class)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         ON CONFLICT (email) DO NOTHING`,
        [u.email, hash, u.perfil, u.nome, u.initials, u.role_label, u.setor, u.av_class]
      );
    }
    console.log('[seed] Usuários criados.');
  }

  // Seed: demandas (só se vazio)
  const { rows: contDemandas } = await pool.query('SELECT COUNT(*) FROM demandas');
  if (parseInt(contDemandas[0].count) === 0) {
    console.log('[seed] Inserindo demandas iniciais...');
    const demandas = [
      {
        id: '#1042', titulo: 'Rampa bloqueada — Bloco C', tipo: 'Rampa', prioridade: 'Alta',
        status: 'Em análise', status_tag: 't-warn', autor: 'Maria Ferreira', setor: 'Engenharia',
        data: '12/07/2025',
        descricao: 'A rampa de acesso ao Bloco C está completamente obstruída por materiais de construção. Funcionários com cadeira de rodas não conseguem acessar o setor.',
        fotos: true,
        historico: [
          { d: '12/07 09:14', t: 'Demanda registrada', ok: false },
          { d: '12/07 09:16', t: 'IA analisou foto — obstáculo confirmado', ok: true },
          { d: '12/07 10:00', t: 'Roteamento automático → Manutenção', ok: true },
          { d: '12/07 14:30', t: 'Equipe designada: Manutenção Civil', ok: false },
        ],
      },
      {
        id: '#1039', titulo: 'Intérprete LIBRAS para reunião estratégica', tipo: 'LIBRAS', prioridade: 'Média',
        status: 'Aguardando', status_tag: 't-info', autor: 'João Santos', setor: 'Operações',
        data: '09/07/2025',
        descricao: 'Reunião de planejamento trimestral em 15/07. Necessário intérprete de LIBRAS certificado para funcionário surdo.',
        fotos: false,
        historico: [
          { d: '09/07 11:00', t: 'Demanda registrada', ok: false },
          { d: '09/07 11:02', t: 'IA classificou prioridade como Média', ok: true },
          { d: '09/07 15:00', t: 'Encaminhado ao RH', ok: false },
        ],
      },
      {
        id: '#1035', titulo: 'Elevador B2 — botão de acionamento inacessível', tipo: 'Equipamento', prioridade: 'Alta',
        status: 'Em andamento', status_tag: 't-warn', autor: 'Carla Mendes', setor: 'Administrativo',
        data: '07/07/2025',
        descricao: 'O painel do elevador B2 não possui identificação em braille e os botões estão posicionados acima de 1,20m, fora do padrão NBR 9050.',
        fotos: true,
        historico: [
          { d: '07/07 08:30', t: 'Demanda registrada', ok: false },
          { d: '07/07 08:32', t: 'IA analisou imagem — não conformidade confirmada', ok: true },
          { d: '07/07 09:00', t: 'Aberto chamado junto ao fornecedor', ok: true },
        ],
      },
      {
        id: '#1028', titulo: 'Laudo ergonômico para estação de trabalho', tipo: 'Ergonomia', prioridade: 'Baixa',
        status: 'Resolvida', status_tag: 't-ok', autor: 'Pedro Lima', setor: 'Logística',
        data: '01/07/2025',
        descricao: 'Funcionário com LER necessita adaptação da estação de trabalho com suporte para monitor e teclado ergonômico.',
        fotos: false,
        historico: [
          { d: '01/07', t: 'Demanda registrada', ok: false },
          { d: '02/07', t: 'Fisioterapeuta realizou vistoria', ok: true },
          { d: '05/07', t: 'Equipamentos instalados', ok: true },
          { d: '08/07', t: 'Demanda encerrada ✓', ok: true },
        ],
      },
      {
        id: '#1021', titulo: 'Piso tátil danificado — corredor 3', tipo: 'Infraestrutura', prioridade: 'Média',
        status: 'Resolvida', status_tag: 't-ok', autor: 'Ana Keller', setor: 'Engenharia',
        data: '28/06/2025',
        descricao: 'Piso tátil danificado em trecho de 4m no corredor 3, risco para funcionários com deficiência visual.',
        fotos: true,
        historico: [
          { d: '28/06', t: 'Demanda registrada', ok: false },
          { d: '29/06', t: 'Vistoria técnica realizada', ok: true },
          { d: '02/07', t: 'Piso substituído e sinalizado', ok: true },
          { d: '03/07', t: 'Demanda encerrada ✓', ok: true },
        ],
      },
    ];

    for (const d of demandas) {
      await pool.query(
        `INSERT INTO demandas (id, titulo, tipo, prioridade, status, status_tag, autor, setor, data, descricao, fotos, historico)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
         ON CONFLICT (id) DO NOTHING`,
        [d.id, d.titulo, d.tipo, d.prioridade, d.status, d.status_tag, d.autor, d.setor, d.data, d.descricao, d.fotos, JSON.stringify(d.historico)]
      );
    }
    console.log('[seed] Demandas inseridas.');
  }
}

// ─── Iniciar ──────────────────────────────────────────────────────────────────
setupDB()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`IAP server running on :${PORT}`);
    });
  })
  .catch(err => {
    console.error('[FATAL] DB setup failed:', err.message);
    process.exit(1);
  });
