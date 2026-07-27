/**
 * app.js — Inicialização da aplicação
 * O namespace Pages é criado em router.js (carregado antes das páginas).
 */

document.addEventListener('DOMContentLoaded', () => {
  // Pré-carrega vozes TTS
  Accessibility.init();

  // Aplica preferências salvas antes do primeiro render
  Accessibility.apply();

  // Hook: após cada renderContent, iniciar timers específicos
  const _originalRenderContent = Router.renderContent.bind(Router);
  Router.renderContent = function () {
    _originalRenderContent();
    if (State.page === 'sensores') {
      Pages._startSensorLive();
    }
  };

  // Render inicial
  Router.render();
});
