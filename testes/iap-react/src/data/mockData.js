/**
 * Dados mock centralizados do IAP
 * Todos os dados que antes estavam hardcoded dentro das funções render
 */

// ── Demandas ──────────────────────────────────────────
export const demandas = [
  {
    id: "#1042",
    titulo: "Rampa bloqueada — Bloco C",
    tipo: "Rampa",
    prio: "Alta",
    status: "Em análise",
    tag: "tag-warn",
    autor: "Maria F.",
    data: "12/07",
  },
  {
    id: "#1039",
    titulo: "Solicitação de intérprete LIBRAS para reunião",
    tipo: "LIBRAS",
    prio: "Média",
    status: "Aguardando",
    tag: "tag-info",
    autor: "João S.",
    data: "09/07",
  },
  {
    id: "#1035",
    titulo: "Elevador B2 — botão inacessível",
    tipo: "Equipamento",
    prio: "Alta",
    status: "Em andamento",
    tag: "tag-warn",
    autor: "Carla M.",
    data: "07/07",
  },
  {
    id: "#1028",
    titulo: "Solicitação de laudo ergonômico",
    tipo: "Ergonomia",
    prio: "Baixa",
    status: "Resolvida",
    tag: "tag-ok",
    autor: "Pedro L.",
    data: "01/07",
  },
  {
    id: "#1021",
    titulo: "Piso tátil danificado — corredor 3",
    tipo: "Infraestrutura",
    prio: "Média",
    status: "Resolvida",
    tag: "tag-ok",
    autor: "Ana K.",
    data: "28/06",
  },
];

// ── Tipos de demanda por setor (gestor) ───────────────
export const demandasPorTipo = [
  { label: "Rampas e acessos", valor: 72 },
  { label: "Intérprete LIBRAS", valor: 45 },
  { label: "Equipamentos", valor: 38 },
  { label: "Documentação", valor: 28 },
  { label: "Outros", valor: 17 },
];

// ── Alertas ───────────────────────────────────────────
export const alertas = [
  {
    titulo: "Elevador B2 fora de operação",
    descricao: "Sensor detectou falha no motor. Manutenção acionada.",
    severidade: "Crítico",
    alertClass: "alert-crit",
    dotClass: "dot-red",
    tempo: "há 40min",
  },
  {
    titulo: "Rampa C3 com obstáculo",
    descricao: "IA identificou caixas bloqueando a rampa pela câmera.",
    severidade: "Atenção",
    alertClass: "alert-warn",
    dotClass: "dot-amber",
    tempo: "há 1h 12min",
  },
  {
    titulo: "Banheiro adaptado F1 — vistoria vencida",
    descricao: "Última vistoria há 32 dias. Meta: 30 dias.",
    severidade: "Atenção",
    alertClass: "alert-warn",
    dotClass: "dot-amber",
    tempo: "há 2h",
  },
  {
    titulo: "Piso tátil A2 reparado",
    descricao: "Equipe de manutenção concluiu o reparo.",
    severidade: "Resolvido",
    alertClass: "alert-ok",
    dotClass: "dot-green",
    tempo: "há 3h 20min",
  },
];

// ── Alertas resumidos (dashboard gestor) ──────────────
export const alertasDashGestor = [
  {
    titulo: "Elevador B2 fora de operação",
    descricao: "Sensor detectou falha há 40min",
    alertClass: "alert-crit",
    dotClass: "dot-red",
  },
  {
    titulo: "Rampa C3 com obstáculo",
    descricao: "IA detectou bloqueio por foto",
    alertClass: "alert-warn",
    dotClass: "dot-amber",
  },
  {
    titulo: "Banheiro adaptado A1 — OK",
    descricao: "Última vistoria: hoje 08:14",
    alertClass: "alert-ok",
    dotClass: "dot-green",
  },
];

// ── Tipos de deficiência (RH) ─────────────────────────
export const tiposDeficiencia = [
  { label: "Visual", valor: 38 },
  { label: "Auditiva (LIBRAS)", valor: 29 },
  { label: "Física / motora", valor: 61 },
  { label: "Intelectual", valor: 18 },
  { label: "Múltipla", valor: 14 },
];

// ── Setores com mais demandas (RH) ────────────────────
export const setoresDemandas = [
  { label: "Operações", valor: 14, tag: "tag-err" },
  { label: "Manutenção", valor: 11, tag: "tag-warn" },
  { label: "Administrativo", valor: 9, tag: "tag-info" },
  { label: "Engenharia", valor: 7, tag: "tag-gray" },
  { label: "Logística", valor: 6, tag: "tag-gray" },
];

// ── Serviços do sistema (admin) ───────────────────────
export const servicosSistema = [
  { label: "API backend", status: "Operacional", tag: "tag-ok" },
  { label: "Microsserviço IA / visão", status: "Operacional", tag: "tag-ok" },
  { label: "STT / TTS", status: "Operacional", tag: "tag-ok" },
  { label: "WebSocket / alertas", status: "Operacional", tag: "tag-ok" },
  { label: "Sensor MQTT broker", status: "1 falha", tag: "tag-warn" },
  { label: "Banco de dados", status: "Operacional", tag: "tag-ok" },
];

// ── Últimas ações do sistema (admin) ──────────────────
export const acoesSistema = [
  { acao: "IA classificou 12 demandas", tempo: "há 2 min" },
  { acao: "Alerta: sensor E-07 offline", tempo: "há 8 min" },
  { acao: "Relatório mensal gerado (RH)", tempo: "há 31 min" },
  { acao: "Novo usuário: juliana.costa", tempo: "há 1h" },
  { acao: "Backup automático concluído", tempo: "há 3h" },
];

// ── Recursos de acessibilidade ────────────────────────
export const recursos = [
  {
    titulo: "Intérprete de LIBRAS",
    descricao: "Solicite um intérprete para reuniões e eventos",
    icone: "◈",
    botao: "Solicitar",
  },
  {
    titulo: "Leitor de tela",
    descricao: "Ative narração automática da interface",
    icone: "◉",
    botao: "Ativar",
  },
  {
    titulo: "Guia em áudio",
    descricao: "Orientação por voz para espaços do campus",
    icone: "◑",
    botao: "Acessar",
  },
  {
    titulo: "Transcrição automática",
    descricao: "Converta áudio de reuniões em texto",
    icone: "◐",
    botao: "Usar",
  },
  {
    titulo: "Mapa de acessibilidade",
    descricao: "Rotas acessíveis no campus Petrobras",
    icone: "◎",
    botao: "Ver mapa",
  },
  {
    titulo: "Documentos adaptados",
    descricao: "Versões em LIBRAS, áudio e alto contraste",
    icone: "◈",
    botao: "Baixar",
  },
];

// ── Relatórios ────────────────────────────────────────
export const relatorios = [
  {
    titulo: "Relatório mensal — Julho 2025",
    descricao: "Consolidado de todas as demandas",
    status: "Gerado em 01/07",
    tag: "tag-ok",
  },
  {
    titulo: "Relatório de SLA — Q2 2025",
    descricao: "Cumprimento de prazo por setor",
    status: "Gerado em 01/06",
    tag: "tag-ok",
  },
  {
    titulo: "Análise de padrões — 2025",
    descricao: "Detecção de tendências pela IA",
    status: "Gerado em 15/06",
    tag: "tag-info",
  },
  {
    titulo: "Diagnóstico de infraestrutura",
    descricao: "Sensores e equipamentos críticos",
    status: "Em geração...",
    tag: "tag-warn",
  },
];

// ── Funcionários PCD (RH) ─────────────────────────────
export const funcionariosPCD = [
  { nome: "Maria F.", setor: "Engenharia", tipo: "Motora", tag: "tag-ok" },
  { nome: "João S.", setor: "Operações", tipo: "Auditiva", tag: "tag-ok" },
  { nome: "Carla M.", setor: "Admin", tipo: "Visual", tag: "tag-warn" },
  { nome: "Pedro L.", setor: "Logística", tipo: "Motora", tag: "tag-ok" },
  { nome: "Ana K.", setor: "TI", tipo: "Múltipla", tag: "tag-err" },
];

// ── Sensores (admin) ──────────────────────────────────
export const sensores = [
  {
    id: "E-01",
    local: "Elevador A — térreo",
    tipo: "Elevador",
    status: "Online",
    tag: "tag-ok",
    atualizado: "1min",
  },
  {
    id: "E-07",
    local: "Elevador B — 2º andar",
    tipo: "Elevador",
    status: "Offline",
    tag: "tag-err",
    atualizado: "43min",
  },
  {
    id: "R-14",
    local: "Rampa C3 — entrada",
    tipo: "Câmera IA",
    status: "Alerta",
    tag: "tag-warn",
    atualizado: "12min",
  },
  {
    id: "P-03",
    local: "Banheiro adaptado A1",
    tipo: "Ocupação",
    status: "Online",
    tag: "tag-ok",
    atualizado: "2min",
  },
  {
    id: "P-08",
    local: "Banheiro adaptado F1",
    tipo: "Ocupação",
    status: "Online",
    tag: "tag-ok",
    atualizado: "4min",
  },
];

// ── Usuários do sistema (admin) ───────────────────────
export const usuarios = [
  {
    nome: "Maria Ferreira",
    setor: "Engenharia",
    perfil: "Funcionário",
    ultimoAcesso: "hoje",
  },
  {
    nome: "Carlos Lima",
    setor: "Operações",
    perfil: "Gestor",
    ultimoAcesso: "hoje",
  },
  {
    nome: "Ana Paula",
    setor: "RH",
    perfil: "RH",
    ultimoAcesso: "hoje",
  },
  {
    nome: "Roberto Souza",
    setor: "TI",
    perfil: "Admin",
    ultimoAcesso: "hoje",
  },
  {
    nome: "Juliana Costa",
    setor: "Logística",
    perfil: "Funcionário",
    ultimoAcesso: "ontem",
  },
];

// ── Log de auditoria (admin) ──────────────────────────
export const logAuditoria = [
  { hora: "10:41", acao: "Login", usuario: "roberto.souza", ip: "10.0.1.4" },
  {
    hora: "10:38",
    acao: "Demanda #1042 atualizada",
    usuario: "carlos.lima",
    ip: "10.0.2.11",
  },
  {
    hora: "10:31",
    acao: "Relatório mensal exportado",
    usuario: "ana.paula",
    ip: "10.0.3.7",
  },
  {
    hora: "10:14",
    acao: "Sensor E-07 marcado offline",
    usuario: "sistema",
    ip: "—",
  },
  {
    hora: "09:58",
    acao: "Usuário juliana.costa criado",
    usuario: "roberto.souza",
    ip: "10.0.1.4",
  },
  {
    hora: "09:30",
    acao: "Login",
    usuario: "carlos.lima",
    ip: "10.0.2.11",
  },
];

// ── Tipos de demanda (formulário nova demanda) ────────
export const tiposDemanda = [
  "Rampa / acesso",
  "Equipamento adaptado",
  "Intérprete LIBRAS",
  "Piso tátil",
  "Banheiro adaptado",
  "Ergonomia",
  "Outro",
];
