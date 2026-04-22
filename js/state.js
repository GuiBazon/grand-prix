/**
 * state.js — Estado global da aplicação
 * Centraliza todos os dados mutáveis em um único lugar.
 */

const State = {
  profile:  'funcionario',
  page:     'dash',
  demandas: [...DEMANDAS_INICIAL],

  acc: {
    dark:      false,
    contrast:  false,
    font:      100,
    narr:      false,
    narrSpeed: 1,
    libras:    false,
    motion:    false,
  },

  /** Atualiza qualquer chave de acc e re-aplica */
  setAcc(key, value) {
    this.acc[key] = value;
    Accessibility.apply();
  },

  /** Navega para uma página */
  goTo(page) {
    this.page = page;
    Router.render();
    if (this.acc.narr) {
      const labels = {
        dash: 'Painel principal', demandas: 'Lista de demandas',
        nova: 'Nova demanda', recursos: 'Recursos de acessibilidade',
        acc: 'Configurações de acessibilidade', alertas: 'Alertas do setor',
        relatorios: 'Relatórios', funcionarios: 'Funcionários',
        sensores: 'Sensores IoT', usuarios: 'Usuários', auditoria: 'Auditoria',
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

  /** Resolve uma demanda pelo id */
  resolveDemanda(id) {
    const d = this.demandas.find(x => x.id === id);
    if (!d) return;
    d.status    = 'Resolvida';
    d.statusTag = 't-ok';
    d.historico.push({ d: 'Agora', t: 'Demanda marcada como resolvida ✓', ok: true });
  },
};
