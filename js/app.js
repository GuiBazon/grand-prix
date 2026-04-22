/**
 * app.js — Inicialização da aplicação
 * Cria o namespace Pages e inicia tudo
 */

// Namespace para todas as funções de página
const Pages = {};

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Pré-carrega vozes TTS
  Accessibility.init();

  // Render inicial
  Router.render();

  // Hook: após cada renderContent, iniciar timers específicos
  const originalRenderContent = Router.renderContent.bind(Router);
  Router.renderContent = function () {
    originalRenderContent();
    // Timer ao vivo de sensores
    if (State.page === 'sensores') {
      Pages._startSensorLive();
    }
  };

  // Render inicial com hook já aplicado
  Router.render();
});
