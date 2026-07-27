/**
 * ui.js — Helpers de interface
 * Toast, sidebar mobile, chips, modal genérico.
 */

const UI = {
  _lastFocused: null,

  /** Exibe um toast de notificação */
  toast(msg, type = 'info') {
    const el = document.getElementById('toast');
    if (!el) return;

    el.textContent = msg;
    el.style.background =
      type === 'ok'  ? 'var(--brand-secondary)' :
      type === 'err' ? '#c0392b'                :
                       'var(--brand-primary)';

    el.classList.add('show');
    if (State.acc.narr) Accessibility.speak(msg);

    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 3000);
  },

  /** Abre/fecha a sidebar no mobile */
  toggleSidebar() {
    const sb  = document.getElementById('sidebar');
    const ov  = document.getElementById('sidebar-overlay');
    const btn = document.getElementById('menu-btn');
    if (!sb) return;

    const open = sb.classList.toggle('open');
    if (ov)  ov.classList.toggle('active', open);
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  },

  /** Fecha a sidebar (usado ao navegar no mobile) */
  closeSidebar() {
    const sb  = document.getElementById('sidebar');
    const ov  = document.getElementById('sidebar-overlay');
    const btn = document.getElementById('menu-btn');
    if (sb)  sb.classList.remove('open');
    if (ov)  ov.classList.remove('active');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  },

  /** Seleciona um chip dentro de um grupo */
  selChip(el, groupId) {
    document.getElementById(groupId)
      ?.querySelectorAll('.chip')
      .forEach(c => c.classList.remove('sel'));
    el.classList.add('sel');
  },

  /**
   * Cria e exibe um modal.
   * - Remove modal anterior com mesmo id se existir.
   * - Armazena o elemento que tinha foco para restaurar ao fechar.
   * - Move o foco para dentro do modal.
   * - Fecha ao clicar no overlay ou pressionar Escape.
   */
  openModal(htmlContent, id = 'modal-generic') {
    document.getElementById(id)?.remove();

    this._lastFocused = document.activeElement;

    const wrap = document.createElement('div');
    wrap.className = 'modal-bg';
    wrap.id        = id;
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.innerHTML = `<div class="modal">${htmlContent}</div>`;

    // Fecha ao clicar fora
    wrap.addEventListener('click', e => { if (e.target === wrap) this.closeModal(id); });

    // Fecha com Escape
    wrap.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.closeModal(id);
      // Armadilha de foco
      if (e.key === 'Tab') this._trapFocus(e, wrap);
    });

    document.body.appendChild(wrap);

    // Move foco para o primeiro elemento focável dentro do modal
    requestAnimationFrame(() => {
      const focusable = wrap.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) focusable[0].focus();
    });

    return wrap;
  },

  /** Fecha um modal pelo id e restaura o foco */
  closeModal(id) {
    document.getElementById(id)?.remove();
    if (this._lastFocused && typeof this._lastFocused.focus === 'function') {
      this._lastFocused.focus();
    }
  },

  /** Mantém o foco preso dentro do modal (acessibilidade) */
  _trapFocus(e, container) {
    const focusable = Array.from(container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )).filter(el => !el.disabled);

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  },

  /** Restaura os controles da página de acessibilidade com os valores do State */
  syncAccControls() {
    const acc = State.acc;
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.checked = val; };
    const rng = (id, val) => { const el = document.getElementById(id); if (el) el.value  = val; };
    const txt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

    set('sw-dark',     acc.dark);
    set('sw-contrast', acc.contrast);
    set('sw-narr',     acc.narr);
    set('sw-libras',   acc.libras);
    set('sw-motion',   acc.motion);

    rng('rng-font', acc.font);
    txt('val-font', acc.font + '%');

    rng('rng-narr', Math.round(acc.narrSpeed * 100));
    txt('val-narr', Math.round(acc.narrSpeed * 100) + '%');
  },
};
