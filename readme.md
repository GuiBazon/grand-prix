# IAP — Inteligência de Acessibilidade
## Estrutura do projeto

```
iap/
├── index.html              ← HTML puro, sem CSS nem JS inline
│
├── css/
│   ├── theme.css           ← ⭐ TROCAR CLIENTE AQUI (cores, marca)
│   ├── base.css            ← Layout, topbar, sidebar, toast, libras
│   ├── components.css      ← Cards, tabelas, forms, botões, tags...
│   └── responsive.css      ← Breakpoints mobile/tablet
│
└── js/
    ├── config.js           ← ⭐ TROCAR CLIENTE AQUI (nome, perfis, dados)
    ├── state.js            ← Estado global (profile, page, demandas, acc)
    ├── accessibility.js    ← TTS, font scale, temas, LIBRAS
    ├── ui.js               ← Toast, sidebar, modal, chips
    ├── router.js           ← Renderiza sidebar + despacha para páginas
    ├── app.js              ← Inicialização (carrega por último)
    │
    └── pages/
        ├── dash.js         ← Painéis dos 4 perfis
        ├── demandas.js     ← Lista, modal de detalhe, resolver
        ├── nova.js         ← Formulário + IA suggest + upload
        └── outros.js       ← recursos, acc, alertas, relatórios,
                               funcionários, sensores, usuários, auditoria
```

---

## Como adaptar para outro cliente (ex: SENAI)

### 1. Trocar as cores — `css/theme.css`
```css
:root {
  --brand-primary:   #e30613;  /* vermelho SENAI */
  --brand-secondary: #0066cc;  /* azul */
  --brand-accent:    #ffcc00;  /* amarelo */
}
```

### 2. Trocar nome e perfis — `js/config.js`
```js
const APP = {
  name:       'SAI · SENAI',
  subtitle:   'Sistema de Acessibilidade Inclusiva',
  logoLetter: 'S',
};
```

### 3. Adicionar uma nova página
1. Crie `js/pages/minhapagina.js` com `Pages.minhapagina = function() { return '<html>'; }`
2. Adicione `{ ico: '🆕', label: 'Minha página', page: 'minhapagina' }` no nav do perfil em `config.js`
3. Registre em `router.js`: `minhapagina: () => Pages.minhapagina()`
4. Inclua o script no `index.html`: `<script src="js/pages/minhapagina.js"></script>`

### 4. Conectar a uma API real
Substitua os dados em `state.js` por chamadas `fetch`:
```js
// Em state.js
async loadDemandas() {
  const res = await fetch('/api/demandas');
  this.demandas = await res.json();
}
```

---

## Responsividade
- Desktop (>768px): sidebar fixa + conteúdo ao lado
- Tablet/Mobile (≤768px): sidebar se torna drawer com botão ☰
- Todas as tabelas têm scroll horizontal em telas pequenas

## Acessibilidade
- WCAG 2.1 AA por padrão, AAA no modo alto contraste
- TTS em português via Web Speech API (funciona no Chrome/Edge/Safari)
- Font scale: slider de 80% a 200%, escala todo o sistema via `html { font-size }`
- Redução de animações via `data-reduce-motion`
- Player LIBRAS com animação e legenda sincronizada com narração
