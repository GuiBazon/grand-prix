/**
 * app.js — Inicialização da aplicação
 * Verifica autenticação, carrega dados da API e inicia o roteador.
 * O namespace Pages é criado em router.js (carregado antes das páginas).
 */

// ─── Inicialização assíncrona ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  Accessibility.init();

  // Monkeypatch: inicia live dos sensores quando necessário
  const _originalRenderContent = Router.renderContent.bind(Router);
  Router.renderContent = function () {
    _originalRenderContent();
    if (State.page === 'sensores') Pages._startSensorLive();
  };

  const token = localStorage.getItem('iap-token');

  if (!token) {
    _mostrarLogin();
    return;
  }

  // Valida o token existente
  try {
    const resp = await fetch('/api/auth/me', {
      headers: { Authorization: 'Bearer ' + token },
    });
    if (!resp.ok) throw new Error('token inválido');

    const { usuario } = await resp.json();
    State.autenticar(usuario);

    await State.fetchDemandas().catch(() => {
      // Se falhar, continua com demandas vazias (app ainda funciona)
      console.warn('[app] Não foi possível carregar demandas.');
    });

    _mostrarApp();
    Router.render();
  } catch {
    localStorage.removeItem('iap-token');
    _mostrarLogin();
  }
});

// ─── Controle de telas ────────────────────────────────────────────────────────
function _mostrarLogin() {
  document.getElementById('login-screen').style.display  = 'flex';
  document.getElementById('topbar').style.display        = 'none';
  document.getElementById('layout').style.display        = 'none';
  document.getElementById('narr-banner').style.display   = 'none';
  document.getElementById('libras-widget').style.display = 'none';
  // Foca o campo de email para melhor UX
  setTimeout(() => document.getElementById('login-email')?.focus(), 100);
}

function _mostrarApp() {
  document.getElementById('login-screen').style.display  = 'none';
  document.getElementById('topbar').style.display        = '';
  document.getElementById('layout').style.display        = '';
  // narr-banner e libras-widget são controlados por Accessibility.apply()
}

// ─── Handler de login (chamado pelo formulário) ───────────────────────────────
async function _fazerLogin(event) {
  event.preventDefault();

  const email = document.getElementById('login-email')?.value?.trim();
  const senha = document.getElementById('login-senha')?.value;
  const btn   = document.getElementById('login-btn');
  const erro  = document.getElementById('login-erro');

  if (!email || !senha) {
    erro.textContent  = 'Preencha email e senha.';
    erro.style.display = 'block';
    return;
  }

  btn.disabled    = true;
  btn.textContent = 'Entrando...';
  if (erro) erro.style.display = 'none';

  try {
    const resp = await fetch('/api/auth/login', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email, senha }),
    });

    // Garante que a resposta é JSON antes de parsear
    const contentType = resp.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
    }

    const data = await resp.json();
    if (!resp.ok) throw new Error(data.erro || 'Erro ao entrar');

    localStorage.setItem('iap-token', data.token);
    State.autenticar(data.usuario);

    await State.fetchDemandas().catch(() => {
      console.warn('[app] Não foi possível carregar demandas.');
    });

    _mostrarApp();
    Router.render();
    Accessibility.apply();
  } catch (err) {
    if (erro) {
      erro.textContent   = err.message;
      erro.style.display = 'block';
    }
    btn.disabled    = false;
    btn.textContent = 'Entrar';
  }
}

// ─── Preenche campo de login com credenciais de demonstração ─────────────────
function _preencherDemo(email, senha) {
  const emailEl = document.getElementById('login-email');
  const senhaEl = document.getElementById('login-senha');
  if (emailEl) emailEl.value = email;
  if (senhaEl) senhaEl.value = senha;
  document.getElementById('login-btn')?.focus();
}
