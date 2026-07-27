---
name: Auth and API architecture
description: How JWT auth and the Express backend are wired into the vanilla JS SPA
---

# Auth + API architecture

## The rule
Express (`server.js`) runs on port 5000 and serves BOTH the static frontend files AND `/api/*` routes. The `/api/` routes are registered BEFORE `express.static()` so API paths are never intercepted by the file server.

**Why:** Single-process, single-port — no CORS issues, no separate workflow. Works seamlessly in the Replit webview.

**How to apply:** If adding new backend routes, always add them BEFORE the `express.static(...)` middleware line in `server.js`.

## Auth flow (frontend)
1. `app.js` DOMContentLoaded: check `localStorage.getItem('iap-token')`
2. No token → `_mostrarLogin()` (shows `#login-screen`, hides topbar/layout)
3. Token exists → `GET /api/auth/me` to validate
4. Valid → `State.autenticar(usuario)` syncs PROFILES with real server data, then `State.fetchDemandas()`, then `_mostrarApp()` + `Router.render()`
5. Invalid → clear token, show login

## State API methods (async)
- `State.fetchDemandas()` — populates `State.demandas` from API (called once after login)
- `State.addDemandaAPI(demanda)` — POST, then unshifts into local array
- `State.resolveDemandaAPI(id)` — PUT, then updates local array entry
- `State.autenticar(usuario)` — syncs PROFILES[perfil] fields with server values
- `State.logout()` — clears token, calls `location.reload()`

## DB seed
`server.js` seeds users and demandas on startup only if tables are empty (`COUNT(*) = 0`). Safe to restart repeatedly.

## Demo credentials (seeded)
maria@petrobras.com / 123456 → funcionario
carlos@petrobras.com / 123456 → gestor
ana@petrobras.com / 123456 → rh
roberto@petrobras.com / 123456 → admin
All passwords hashed with bcrypt (10 rounds).
