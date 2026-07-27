/**
 * state.js — Estado global da aplicação
 * Centraliza todos os dados mutáveis em um único lugar.
 * Preferências de acessibilidade são persistidas via localStorage.
 * Dados de demandas e autenticação são gerenciados via API REST.
 */

const _ACC_STORAGE_KEY = 'iap-acc-prefs';

const _accDefault = {
  dark:      false,
  contrast:  false,
  font:      100,
  narr:      false,
  narrSpeed: 1,
  libras:    false,
  motion:    false,
};

function _loadAccPrefs() {
  try {
    const saved = localStorage.getItem(_ACC_STORAGE_KEY);
    return saved ? { ..._accDefault, ...JSON.parse(saved) } : { ..._accDefault };
  } catch {
    return { ..._accDefault };
  }
}

function _saveAccPrefs(acc) {
  try {
    localStorage.setItem(_ACC_STORAGE_KEY, JSON.stringify(acc));
  } catch { /* silencioso */ }
}

const State = {
  profile:  'funcionario',
  page:     'dash',
  demandas: [],          // preenchido via fetchDemandas() após autenticação
  acc:      _loadAccPrefs(),
  usuario:  null,        // dados do usuário autenticado

  /** Autentica o usuário e sincroniza PROFILES com os dados reais do servidor */
  autenticar(usuario) {
    this.usuario = usuario;
    this.profile = usuario.perfil;

    // Sobrescreve o perfil local com dados vindos do servidor
    const p = PROFILES[usuario.perfil];
    if (p) {
      p.name     = usuario.nome;
      p.initials = usuario.initials;
      p.role     = usuario.role_label;
      p.setor    = usuario.setor;
      p.avClass  = usuario.av_class;
    }
  },

  /** Encerra a sessão e volta para a tela de login */
  logout() {
    localStorage.removeItem('iap-token');
    location.reload();
  },

  /** Carrega demandas da API (chamado após autenticação) */
  async fetchDemandas() {
    const token = localStorage.getItem('iap-token');
    const resp  = await fetch('/api/demandas', {
      headers: { Authorization: 'Bearer ' + token },
    });
    if (!resp.ok) throw new Error('Erro ao buscar demandas');
    this.demandas = await resp.json();
  },

  /** Registra nova demanda na API e atualiza o estado local */
  async addDemandaAPI(demanda) {
    const token = localStorage.getItem('iap-token');
    const resp  = await fetch('/api/demandas', {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:  'Bearer ' + token,
      },
      body: JSON.stringify(demanda),
    });
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.erro || 'Erro ao registrar demanda');
    }
    const nova = await resp.json();
    this.demandas.unshift(nova);
    return nova;
  },

  /** Resolve uma demanda na API e atualiza o estado local */
  async resolveDemandaAPI(id) {
    const token = localStorage.getItem('iap-token');
    const resp  = await fetch(`/api/demandas/${encodeURIComponent(id)}/resolver`, {
      method:  'PUT',
      headers: { Authorization: 'Bearer ' + token },
    });
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.erro || 'Erro ao resolver demanda');
    }
    const updated = await resp.json();
    const idx = this.demandas.findIndex(d => d.id === id);
    if (idx >= 0) this.demandas[idx] = updated;
    return updated;
  },

  /** Atualiza qualquer chave de acc, re-aplica e persiste */
  setAcc(key, value) {
    this.acc[key] = value;
    _saveAccPrefs(this.acc);
    Accessibility.apply();
  },

  /** Persiste todas as preferências atuais */
  savePrefs() {
    _saveAccPrefs(this.acc);
  },

  /** Navega para uma página */
  goTo(page) {
    this.page = page;
    Router.render();
    const content = document.getElementById('content');
    if (content) content.scrollTop = 0;

    if (this.acc.narr) {
      const labels = {
        dash:         'Painel principal',
        demandas:     'Lista de demandas',
        nova:         'Nova demanda',
        recursos:     'Recursos de acessibilidade',
        acc:          'Configurações de acessibilidade',
        alertas:      'Alertas do setor',
        relatorios:   'Relatórios',
        funcionarios: 'Funcionários',
        sensores:     'Sensores IoT',
        usuarios:     'Usuários',
        auditoria:    'Auditoria',
      };
      Accessibility.speak('Página: ' + (labels[page] || page));
    }
  },

  /** Gera um ID único para nova demanda com base no maior ID existente */
  nextId() {
    const ids = this.demandas
      .map(d => parseInt(d.id.replace('#', ''), 10))
      .filter(n => !isNaN(n));
    const max = ids.length > 0 ? Math.max(...ids) : 1042;
    return '#' + (max + 1);
  },
};
