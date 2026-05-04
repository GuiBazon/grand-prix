/**
 * Definição dos perfis de usuário do IAP
 * Cada perfil contém: nome, iniciais, cargo e itens de navegação
 */
const profiles = {
  funcionario: {
    name: "Maria Ferreira",
    initials: "MF",
    role: "Funcionária · Engenharia",
    nav: [
      { icon: "◎", label: "Início", page: "dash" },
      { icon: "◈", label: "Minhas demandas", page: "demandas", badge: 2 },
      { icon: "◉", label: "Nova demanda", page: "nova" },
      { icon: "◑", label: "Recursos", page: "recursos" },
      { icon: "◐", label: "Acessibilidade", page: "acessibilidade" },
    ],
  },
  gestor: {
    name: "Carlos Lima",
    initials: "CL",
    role: "Gestor · Operações",
    nav: [
      { icon: "◎", label: "Painel do setor", page: "dash" },
      { icon: "◈", label: "Demandas", page: "demandas", badge: 5 },
      { icon: "◉", label: "Alertas", page: "alertas", badge: 1 },
      { icon: "◑", label: "Relatórios", page: "relatorios" },
      { icon: "◐", label: "Acessibilidade", page: "acessibilidade" },
    ],
  },
  rh: {
    name: "Ana Paula",
    initials: "AP",
    role: "Analista · RH",
    nav: [
      { icon: "◎", label: "Painel RH", page: "dash" },
      { icon: "◈", label: "Todas demandas", page: "demandas" },
      { icon: "◉", label: "Funcionários", page: "funcionarios" },
      { icon: "◑", label: "Relatórios", page: "relatorios" },
      { icon: "◐", label: "Acessibilidade", page: "acessibilidade" },
    ],
  },
  admin: {
    name: "Roberto Souza",
    initials: "RS",
    role: "Administrador · TI",
    nav: [
      { icon: "◎", label: "Visão geral", page: "dash" },
      { icon: "◈", label: "Sensores", page: "sensores" },
      { icon: "◉", label: "Usuários", page: "usuarios" },
      { icon: "◑", label: "Auditoria", page: "auditoria" },
      { icon: "◐", label: "Acessibilidade", page: "acessibilidade" },
    ],
  },
};

export default profiles;
