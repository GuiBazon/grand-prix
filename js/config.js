/**
 * config.js — Configuração do cliente
 * ─────────────────────────────────────
 * Para adaptar para outro cliente (ex: SENAI):
 *   - Mude APP.name, APP.subtitle, APP.logoLetter
 *   - Troque as variáveis CSS em theme.css
 *   - Atualize PROFILES com os nomes/setores corretos
 *   - Ajuste DEMANDAS com os tipos de demanda do cliente
 */

const APP = {
  name:      'IAP · Petrobras',
  subtitle:  'Inteligência de Acessibilidade',
  logoLetter: 'P',
  version:   '2.0',
};

const PROFILES = {
  funcionario: {
    name: 'Maria Ferreira',
    initials: 'MF',
    role: 'Funcionária · Engenharia',
    avClass: 'av-blue',
    nav: [
      { ico: '🏠', label: 'Início',          page: 'dash' },
      { ico: '📋', label: 'Minhas demandas', page: 'demandas', badge: 2 },
      { ico: '➕', label: 'Nova demanda',    page: 'nova' },
      { ico: '♿', label: 'Recursos',        page: 'recursos' },
      { ico: '⚙️', label: 'Acessibilidade',  page: 'acc' },
    ],
  },
  gestor: {
    name: 'Carlos Lima',
    initials: 'CL',
    role: 'Gestor · Operações',
    avClass: 'av-green',
    nav: [
      { ico: '📊', label: 'Painel do setor', page: 'dash' },
      { ico: '📋', label: 'Demandas',        page: 'demandas', badge: 5 },
      { ico: '🚨', label: 'Alertas',         page: 'alertas',  badge: 1 },
      { ico: '📈', label: 'Relatórios',      page: 'relatorios' },
      { ico: '⚙️', label: 'Acessibilidade',  page: 'acc' },
    ],
  },
  rh: {
    name: 'Ana Paula',
    initials: 'AP',
    role: 'Analista · RH',
    avClass: 'av-yellow',
    nav: [
      { ico: '👥', label: 'Painel RH',       page: 'dash' },
      { ico: '📋', label: 'Todas demandas',  page: 'demandas' },
      { ico: '🧑‍💼', label: 'Funcionários',   page: 'funcionarios' },
      { ico: '📈', label: 'Relatórios',      page: 'relatorios' },
      { ico: '⚙️', label: 'Acessibilidade',  page: 'acc' },
    ],
  },
  admin: {
    name: 'Roberto Souza',
    initials: 'RS',
    role: 'Administrador · TI',
    avClass: 'av-dark',
    nav: [
      { ico: '🖥️', label: 'Visão geral',     page: 'dash' },
      { ico: '📡', label: 'Sensores IoT',    page: 'sensores' },
      { ico: '👤', label: 'Usuários',        page: 'usuarios' },
      { ico: '🔒', label: 'Auditoria',       page: 'auditoria' },
      { ico: '⚙️', label: 'Acessibilidade',  page: 'acc' },
    ],
  },
};

// Dados iniciais de demandas (em produção viria de uma API)
const DEMANDAS_INICIAL = [
  {
    id: '#1042',
    titulo: 'Rampa bloqueada — Bloco C',
    tipo: 'Rampa',
    prioridade: 'Alta',
    status: 'Em análise',
    statusTag: 't-warn',
    autor: 'Maria Ferreira',
    setor: 'Engenharia',
    data: '12/07/2025',
    desc: 'A rampa de acesso ao Bloco C está completamente obstruída por materiais de construção. Funcionários com cadeira de rodas não conseguem acessar o setor.',
    fotos: true,
    historico: [
      { d: '12/07 09:14', t: 'Demanda registrada', ok: false },
      { d: '12/07 09:16', t: 'IA analisou foto — obstáculo confirmado', ok: true },
      { d: '12/07 10:00', t: 'Roteamento automático → Manutenção', ok: true },
      { d: '12/07 14:30', t: 'Equipe designada: Manutenção Civil', ok: false },
    ],
  },
  {
    id: '#1039',
    titulo: 'Intérprete LIBRAS para reunião estratégica',
    tipo: 'LIBRAS',
    prioridade: 'Média',
    status: 'Aguardando',
    statusTag: 't-info',
    autor: 'João Santos',
    setor: 'Operações',
    data: '09/07/2025',
    desc: 'Reunião de planejamento trimestral em 15/07. Necessário intérprete de LIBRAS certificado para funcionário surdo.',
    fotos: false,
    historico: [
      { d: '09/07 11:00', t: 'Demanda registrada', ok: false },
      { d: '09/07 11:02', t: 'IA classificou prioridade como Média', ok: true },
      { d: '09/07 15:00', t: 'Encaminhado ao RH', ok: false },
    ],
  },
  {
    id: '#1035',
    titulo: 'Elevador B2 — botão de acionamento inacessível',
    tipo: 'Equipamento',
    prioridade: 'Alta',
    status: 'Em andamento',
    statusTag: 't-warn',
    autor: 'Carla Mendes',
    setor: 'Administrativo',
    data: '07/07/2025',
    desc: 'O painel do elevador B2 não possui identificação em braille e os botões estão posicionados acima de 1,20m, fora do padrão NBR 9050.',
    fotos: true,
    historico: [
      { d: '07/07 08:30', t: 'Demanda registrada', ok: false },
      { d: '07/07 08:32', t: 'IA analisou imagem — não conformidade confirmada', ok: true },
      { d: '07/07 09:00', t: 'Aberto chamado junto ao fornecedor', ok: true },
    ],
  },
  {
    id: '#1028',
    titulo: 'Laudo ergonômico para estação de trabalho',
    tipo: 'Ergonomia',
    prioridade: 'Baixa',
    status: 'Resolvida',
    statusTag: 't-ok',
    autor: 'Pedro Lima',
    setor: 'Logística',
    data: '01/07/2025',
    desc: 'Funcionário com LER necessita adaptação da estação de trabalho com suporte para monitor e teclado ergonômico.',
    fotos: false,
    historico: [
      { d: '01/07', t: 'Demanda registrada', ok: false },
      { d: '02/07', t: 'Fisioterapeuta realizou vistoria', ok: true },
      { d: '05/07', t: 'Equipamentos instalados', ok: true },
      { d: '08/07', t: 'Demanda encerrada ✓', ok: true },
    ],
  },
  {
    id: '#1021',
    titulo: 'Piso tátil danificado — corredor 3',
    tipo: 'Infraestrutura',
    prioridade: 'Média',
    status: 'Resolvida',
    statusTag: 't-ok',
    autor: 'Ana Keller',
    setor: 'Engenharia',
    data: '28/06/2025',
    desc: 'Piso tátil danificado em trecho de 4m no corredor 3, risco para funcionários com deficiência visual.',
    fotos: true,
    historico: [
      { d: '28/06', t: 'Demanda registrada', ok: false },
      { d: '29/06', t: 'Vistoria técnica realizada', ok: true },
      { d: '02/07', t: 'Piso substituído e sinalizado', ok: true },
      { d: '03/07', t: 'Demanda encerrada ✓', ok: true },
    ],
  },
];
