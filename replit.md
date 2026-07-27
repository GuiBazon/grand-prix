# IAP — Inteligência de Acessibilidade Petrobras

## Visão geral
SPA (Single Page Application) em Vanilla JS para gestão de demandas de acessibilidade na Petrobras. Desenvolvida como projeto de portfólio a partir de um protótipo criado no Grand Prix SENAI.

## Como executar
```
python3 -m http.server 5000
```
Acesse `http://localhost:5000`.

## Stack
- HTML5, CSS3 custom properties, Vanilla JavaScript (ES2020)
- Sem frameworks, sem bundler, sem dependências externas
- Web Speech API (TTS), localStorage (persistência de preferências)

## Estrutura
- `css/theme.css` — tokens de cor (trocar para outro cliente aqui)
- `js/config.js` — nome, perfis e dados (trocar para outro cliente aqui)
- `js/router.js` — roteador + namespace `Pages` (declarado aqui, antes das páginas)
- `js/pages/` — um arquivo por grupo de páginas
- `js/state.js` — estado global com localStorage

## Nota importante de arquitetura
`const Pages = {}` está declarado em `router.js` (não em `app.js`) porque os scripts de páginas carregam antes de `app.js` e precisam do namespace disponível.

## User preferences
- Projeto em português brasileiro
- Preservar identidade visual Petrobras (azul #003DA5, verde #009640, amarelo #FFD100)
- Não reescrever do zero; preservar estrutura e proposta original
