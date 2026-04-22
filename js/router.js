/**
 * router.js — Roteador e renderizador principal
 * Renderiza sidebar e despacha para o módulo de página correto
 */

const Router = {
  /** Mapa de páginas → funções de render */
  pages: {
    dash:         () => Pages.dash(),
    demandas:     () => Pages.demandas(),
    nova:         () => Pages.nova(),
    recursos:     () => Pages.recursos(),
    acc:          () => Pages.acc(),
    alertas:      () => Pages.alertas(),
    relatorios:   () => Pages.relatorios(),
    funcionarios: () => Pages.funcionarios(),
    sensores:     () => Pages.sensores(),
    usuarios:     () => Pages.usuarios(),
    auditoria:    () => Pages.auditoria(),
  },

  /** Renderiza tudo */
  render() {
    this.renderSidebar();
    this.renderContent();
  },

  renderSidebar() {
    const p   = PROFILES[State.profile];
    const el  = document.getElementById('sidebar');
    if (!el) return;

    el.innerHTML = `
      <div class="user-block">
        <div class="user-inner">
          <div class="av ${p.avClass}">${p.initials}</div>
          <div>
            <div class="uname">${p.name}</div>
            <div class="urole">${p.role}</div>
          </div>
        </div>
      </div>
      <div class="nav-section">Menu</div>
      ${p.nav.map(n => `
        <div class="nav-item ${State.page === n.page ? 'active' : ''}"
             onclick="UI.closeSidebar(); State.goTo('${n.page}')"
             role="menuitem" tabindex="0" aria-label="${n.label}">
          <span class="nav-icon">${n.ico}</span>
          <span style="flex:1">${n.label}</span>
          ${n.badge ? `<span class="nbadge" aria-label="${n.badge} novos">${n.badge}</span>` : ''}
        </div>`).join('')}
      <div style="flex:1"></div>
      <div class="nav-sep"></div>
      <div class="nav-item" onclick="UI.toast('Sessão encerrada. Até logo, ${p.name}!')" tabindex="0">
        <span class="nav-icon">🚪</span><span>Sair</span>
      </div>
      <div style="padding:10px 14px;font-size:10px;color:var(--text3)">
        ${APP.name} v${APP.version}
      </div>`;
  },

  renderContent() {
    const el = document.getElementById('content');
    if (!el) return;

    const fn = this.pages[State.page] || this.pages.dash;
    el.innerHTML = fn();

    // Pós-render: sincroniza controles de ACC se for a página de acessibilidade
    if (State.page === 'acc') UI.syncAccControls();

    // Narra o título da página
    if (State.acc && State.acc.narr) {
      const title = el.querySelector('.pg-title');
      if (title) Accessibility.speak(title.textContent);
    }
  },
};
