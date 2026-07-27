/**
 * router.js — Roteador e renderizador principal
 * Renderiza sidebar e despacha para o módulo de página correto.
 */

// Namespace global para as funções de página.
// Deve ser declarado aqui pois router.js carrega antes dos scripts de pages/.
const Pages = {}; // eslint-disable-line no-unused-vars

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

  /** Renderiza sidebar e conteúdo */
  render() {
    this.renderSidebar();
    this.renderContent();
    this._updateTopbar();
  },

  /** Atualiza avatar e iniciais da topbar conforme perfil */
  _updateTopbar() {
    const p  = PROFILES[State.profile];
    const av = document.getElementById('topbar-av');
    if (av) {
      av.textContent  = p.initials;
      av.title        = p.name;
      av.setAttribute('aria-label', 'Usuário: ' + p.name);
    }
  },

  renderSidebar() {
    const p  = PROFILES[State.profile];
    const el = document.getElementById('sidebar');
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
      <div class="nav-section" aria-hidden="true">Menu</div>
      <nav role="menu" aria-label="Menu principal">
        ${p.nav.map(n => `
          <div class="nav-item ${State.page === n.page ? 'active' : ''}"
               onclick="UI.closeSidebar(); State.goTo('${n.page}')"
               onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();UI.closeSidebar();State.goTo('${n.page}');}"
               role="menuitem"
               tabindex="0"
               aria-label="${n.label}${n.badge ? ', ' + n.badge + ' novas notificações' : ''}"
               aria-current="${State.page === n.page ? 'page' : 'false'}">
            <span class="nav-icon" aria-hidden="true">${n.ico}</span>
            <span style="flex:1">${n.label}</span>
            ${n.badge ? `<span class="nbadge" aria-label="${n.badge} novas">${n.badge}</span>` : ''}
          </div>`).join('')}
      </nav>
      <div style="flex:1"></div>
      <div class="nav-sep"></div>
      <div class="nav-item"
           onclick="UI.toast('Sessão encerrada. Até logo, ${p.name}!')"
           onkeydown="if(event.key==='Enter'||event.key===' '){UI.toast('Sessão encerrada. Até logo, ${p.name}!');}"
           tabindex="0"
           role="menuitem"
           aria-label="Sair do sistema">
        <span class="nav-icon" aria-hidden="true">🚪</span><span>Sair</span>
      </div>
      <div style="padding:10px 14px;font-size:10px;color:var(--text3)" aria-hidden="true">
        ${APP.name} v${APP.version}
      </div>`;
  },

  renderContent() {
    const el = document.getElementById('content');
    if (!el) return;

    const fn = this.pages[State.page] || this.pages.dash;

    el.innerHTML = fn();

    // Transição suave via CSS keyframe (não interfere com screenshots)
    el.classList.remove('page-enter');
    void el.offsetWidth; // força reflow
    el.classList.add('page-enter');

    // Foca o conteúdo principal para leitores de tela
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });

    // Pós-render: sincroniza controles de ACC
    if (State.page === 'acc') UI.syncAccControls();

    // Narra o título da página
    if (State.acc && State.acc.narr) {
      const title = el.querySelector('.pg-title');
      if (title) Accessibility.speak(title.textContent);
    }
  },
};
