/**
 * config.js — Configuração do cliente
 * ─────────────────────────────────────
 * Para adaptar para outro cliente (ex: SENAI):
 *   - Mude APP.name, APP.subtitle, APP.logoLetter
 *   - Troque as variáveis CSS em theme.css
 *   - Atualize PROFILES com os nomes/setores corretos
 *   - Ajuste DEMANDAS com os tipos de demanda do cliente
 *
 * Nota: name, initials, role, setor e avClass são sobrescritos
 * com os dados reais do servidor após autenticação (state.js → autenticar).
 */

const APP = {
  name:       'IAP · Petrobras',
  subtitle:   'Inteligência de Acessibilidade',
  logoLetter: 'P',
  version:    '2.0',
};

const PROFILES = {
  funcionario: {
    name:     'Funcionário',
    initials: '--',
    role:     'Funcionário',
    setor:    '',
    avClass:  'av-blue',
    nav: [
      { ico: '🏠', label: 'Início',          page: 'dash'     },
      { ico: '📋', label: 'Minhas demandas', page: 'demandas' },
      { ico: '➕', label: 'Nova demanda',    page: 'nova'     },
      { ico: '♿', label: 'Recursos',        page: 'recursos' },
      { ico: '⚙️', label: 'Acessibilidade',  page: 'acc'      },
    ],
  },
  gestor: {
    name:     'Gestor',
    initials: '--',
    role:     'Gestor',
    setor:    '',
    avClass:  'av-green',
    nav: [
      { ico: '📊', label: 'Painel do setor', page: 'dash'      },
      { ico: '📋', label: 'Demandas',        page: 'demandas'  },
      { ico: '🚨', label: 'Alertas',         page: 'alertas'   },
      { ico: '📈', label: 'Relatórios',      page: 'relatorios'},
      { ico: '⚙️', label: 'Acessibilidade',  page: 'acc'       },
    ],
  },
  rh: {
    name:     'RH',
    initials: '--',
    role:     'RH',
    setor:    '',
    avClass:  'av-yellow',
    nav: [
      { ico: '👥', label: 'Painel RH',       page: 'dash'        },
      { ico: '📋', label: 'Todas demandas',  page: 'demandas'    },
      { ico: '🧑‍💼', label: 'Funcionários',   page: 'funcionarios'},
      { ico: '📈', label: 'Relatórios',      page: 'relatorios'  },
      { ico: '⚙️', label: 'Acessibilidade',  page: 'acc'         },
    ],
  },
  admin: {
    name:     'Admin',
    initials: '--',
    role:     'Administrador',
    setor:    '',
    avClass:  'av-dark',
    nav: [
      { ico: '🖥️', label: 'Visão geral',     page: 'dash'     },
      { ico: '📡', label: 'Sensores IoT',    page: 'sensores' },
      { ico: '👤', label: 'Usuários',        page: 'usuarios' },
      { ico: '🔒', label: 'Auditoria',       page: 'auditoria'},
      { ico: '⚙️', label: 'Acessibilidade',  page: 'acc'      },
    ],
  },
};
