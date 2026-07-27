/**
 * state.js — Estado global da aplicação
 * Centraliza todos os dados mutáveis em um único lugar.
 * Preferências de acessibilidade são persistidas via localStorage.
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
  demandas: [...DEMANDAS_INICIAL],
  acc:      _loadAccPrefs(),

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
    // Scroll ao topo do conteúdo
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

  /** Troca o perfil ativo */
  setProfile(profile) {
    this.profile = profile;
    this.page    = 'dash';
    Router.render();
    UI.toast('Perfil: ' + PROFILES[profile].name);
  },

  /** Adiciona uma nova demanda */
  addDemanda(demanda) {
    this.demandas.unshift(demanda);
  },

  /** Gera um ID único para nova demanda */
  nextId() {
    const ids = this.demandas
      .map(d => parseInt(d.id.replace('#', ''), 10))
      .filter(n => !isNaN(n));
    const max = ids.length > 0 ? Math.max(...ids) : 1042;
    return '#' + (max + 1);
  },

  /** Resolve uma demanda pelo id */
  resolveDemanda(id) {
    const d = this.demandas.find(x => x.id === id);
    if (!d) return;
    d.status    = 'Resolvida';
    d.statusTag = 't-ok';
    d.historico.push({ d: 'Agora', t: 'Demanda marcada como resolvida ✓', ok: true });
  },
};
