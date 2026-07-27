# IAP — Inteligência de Acessibilidade Petrobras

## Visão geral
SPA (Single Page Application) em Vanilla JS para gestão de demandas de acessibilidade na Petrobras. Desenvolvida como projeto de portfólio a partir de um protótipo criado no Grand Prix SENAI.

## Como executar
```
node server.js
```
Acesse `http://localhost:5000`.

## Stack
- **Frontend:** HTML5, CSS3 custom properties, Vanilla JavaScript (ES2020) — sem framework, sem bundler
- **Backend:** Node.js + Express — serve arquivos estáticos e API REST no mesmo processo
- **Banco:** PostgreSQL (Replit managed) via `pg`
- **Auth:** JWT (`jsonwebtoken`) + bcrypt — token salvo em localStorage, 8h de expiração
- **Outras APIs:** Web Speech API (TTS), localStorage (preferências de acessibilidade)

## Estrutura
- `css/theme.css` — tokens de cor (trocar para outro cliente aqui)
- `js/config.js` — nome, perfis e dados (trocar para outro cliente aqui)
- `js/router.js` — roteador + namespace `Pages` (declarado aqui, antes das páginas)
- `js/pages/` — um arquivo por grupo de páginas
- `js/state.js` — estado global com localStorage

## Notas importantes de arquitetura

### Namespace Pages
`const Pages = {}` está declarado em `router.js` (não em `app.js`) porque os scripts de páginas carregam antes de `app.js` e precisam do namespace disponível.

### Fluxo de autenticação
1. `app.js` (DOMContentLoaded) verifica `localStorage.getItem('iap-token')`
2. Sem token → mostra `#login-screen`, esconde topbar/layout
3. Com token → valida via `GET /api/auth/me`
4. Sucesso → `State.autenticar(usuario)` sincroniza PROFILES, `State.fetchDemandas()` carrega dados, mostra app
5. Sair → `State.logout()` limpa token e recarrega a página

### API REST
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/login` | Retorna JWT + dados do usuário |
| GET | `/api/auth/me` | Valida token, retorna usuário |
| GET | `/api/demandas` | Lista demandas (filtrada por perfil) |
| POST | `/api/demandas` | Registra nova demanda |
| PUT | `/api/demandas/:id/resolver` | Marca demanda como resolvida |

### Credenciais de demonstração
| Email | Senha | Perfil |
|-------|-------|--------|
| maria@petrobras.com | 123456 | Funcionário |
| carlos@petrobras.com | 123456 | Gestor |
| ana@petrobras.com | 123456 | RH |
| roberto@petrobras.com | 123456 | Admin |

## User preferences
- Projeto em português brasileiro
- Preservar identidade visual Petrobras (azul #003DA5, verde #009640, amarelo #FFD100)
- Não reescrever do zero; preservar estrutura e proposta original
