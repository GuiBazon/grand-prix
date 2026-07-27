# IAP — Inteligência de Acessibilidade Petrobras

> **Sistema de gestão de demandas de acessibilidade com análise por IA, conformidade WCAG 2.1 AA e suporte a LIBRAS.**

Desenvolvido durante o **Grand Prix SENAI**, o IAP é um MVP profissional voltado à gestão de barreiras de acessibilidade no ambiente corporativo da Petrobras. O sistema permite que funcionários PCD registrem demandas, gestores acompanhem indicadores, o RH monitore o índice de inclusão e administradores gerenciem a infraestrutura de sensores IoT — tudo em uma única interface acessível e responsiva.

---

## ✨ Funcionalidades

| Módulo | Descrição |
|--------|-----------|
| **Dashboard por perfil** | Painéis distintos para Funcionário, Gestor, RH e Admin com métricas em tempo real |
| **Gestão de demandas** | Registro, acompanhamento e resolução de demandas com histórico de timeline |
| **Análise por IA** | Sugestões automáticas baseadas em texto e simulação de análise de imagem |
| **Sensores IoT** | Monitoramento ao vivo de elevadores, rampas, banheiros e piso tátil |
| **Narração automática** | TTS em português via Web Speech API (Chrome/Edge/Safari) |
| **Alto contraste** | Modo WCAG AAA para baixa visão |
| **LIBRAS** | Widget flutuante de interpretação sincronizado com a narração |
| **Escala de fonte** | Slider de 80% a 200%, afeta toda a interface via `rem` |
| **Responsivo** | Desktop, tablet e mobile com sidebar drawer |

---

## 🏗 Arquitetura

O projeto é uma **SPA (Single Page Application)** em Vanilla JS, sem dependências externas ou bundler. A estrutura foi desenhada para ser facilmente adaptável a outros clientes.

```
iap/
├── index.html              ← Entry point com estrutura semântica
│
├── css/
│   ├── theme.css           ← ⭐ Tokens de cor (trocar cliente aqui)
│   ├── base.css            ← Reset, topbar, sidebar, widgets
│   ├── components.css      ← Cards, tabelas, formulários, botões, modais
│   └── responsive.css      ← Breakpoints mobile/tablet
│
└── js/
    ├── config.js           ← ⭐ Nome, perfis e dados iniciais (trocar cliente aqui)
    ├── state.js            ← Estado global com persistência via localStorage
    ├── accessibility.js    ← TTS, escala de fonte, temas, LIBRAS
    ├── ui.js               ← Toast, sidebar, modal com armadilha de foco
    ├── router.js           ← Renderiza sidebar + despacha páginas
    ├── app.js              ← Inicialização
    │
    └── pages/
        ├── dash.js         ← Dashboards dos 4 perfis (dados dinâmicos)
        ├── demandas.js     ← Lista, modal de detalhe, resolução
        ├── nova.js         ← Formulário + upload real + IA suggest
        └── outros.js       ← Recursos, acc, alertas, relatórios,
                               funcionários, sensores, usuários, auditoria
```

### Padrão de dados

O estado da aplicação vive em `State` (global). Em produção, os dados mockados seriam substituídos por chamadas `fetch` a uma API REST. As preferências de acessibilidade são persistidas via `localStorage`.

---

## 🚀 Como executar

O projeto não tem dependências de build. Qualquer servidor HTTP estático funciona:

```bash
# Python (built-in)
python3 -m http.server 5000

# Node.js
npx serve . -p 5000

# VS Code
# Instale a extensão "Live Server" e clique em "Go Live"
```

Abra `http://localhost:5000` no navegador.

> **Requisitos de navegador:** Chrome 80+, Edge 80+ ou Safari 14+ para suporte completo ao TTS (narração automática).

---

## ♿ Acessibilidade

O IAP foi desenvolvido com acessibilidade como prioridade, em conformidade com os padrões **WCAG 2.1 AA** e **eMAG**.

| Recurso | Implementação |
|---------|--------------|
| Skip link | "Pular para o conteúdo" visível ao foco |
| Navegação por teclado | `Enter`/`Espaço` em todos os elementos interativos |
| Armadilha de foco | Modais prendem o foco até serem fechados |
| `aria-current="page"` | Item ativo na navegação |
| `role` e `aria-label` | Em todos os componentes relevantes |
| Alto contraste | WCAG AAA via CSS custom properties |
| Escala de fonte | 80%–200% via slider |
| TTS | Web Speech API em pt-BR |
| LIBRAS | Widget sincronizado com narração |
| Redução de movimento | `data-reduce-motion` remove animações |

---

## 🎨 Como adaptar para outro cliente

### 1. Cores — `css/theme.css`
```css
:root {
  --brand-primary:   #e30613;  /* ex: vermelho SENAI */
  --brand-secondary: #0066cc;
  --brand-accent:    #ffcc00;
}
```

### 2. Nome e perfis — `js/config.js`
```js
const APP = { name: 'SAI · SENAI', subtitle: 'Sistema de Acessibilidade Inclusiva', logoLetter: 'S' };
```

### 3. Nova página
1. Crie `js/pages/minhapagina.js` com `Pages.minhapagina = function() { return '<html>'; }`
2. Adicione ao nav do perfil em `config.js`
3. Registre em `router.js`: `minhapagina: () => Pages.minhapagina()`
4. Inclua o `<script>` no `index.html`

### 4. Conectar a uma API real
```js
// Em state.js
async loadDemandas() {
  const res = await fetch('/api/demandas');
  this.demandas = await res.json();
}
```

---

## 🛠 Stack tecnológica

| Tecnologia | Uso |
|------------|-----|
| HTML5 semântico | Estrutura e acessibilidade |
| CSS3 custom properties | Temas, dark mode, alto contraste |
| Vanilla JavaScript (ES2020) | Lógica, roteamento, estado |
| Web Speech API | TTS em português |
| localStorage | Persistência de preferências |

**Sem frameworks, sem bundler, sem dependências externas.**

---

## 🗺 Perfis de usuário

| Perfil | Acesso | Funcionalidades principais |
|--------|--------|---------------------------|
| **Funcionário** | Próprias demandas | Registrar, acompanhar, acessar recursos |
| **Gestor** | Demandas do setor | Painel de setor, alertas, relatórios |
| **RH** | Todos os setores | Índice de inclusão, funcionários PCD |
| **Admin** | Sistema completo | Sensores IoT, usuários, auditoria LGPD |

---

## 🔭 Roadmap

- [ ] Autenticação real (JWT + backend)
- [ ] API REST (Node.js/Laravel) com banco PostgreSQL
- [ ] Upload real de imagens com análise por IA (Vision API)
- [ ] Notificações push e WebSocket
- [ ] Integração com MQTT para sensores IoT em tempo real
- [ ] Relatórios exportáveis em PDF
- [ ] Player LIBRAS com avatar 3D (VLibras / Hand Talk)
- [ ] Aplicativo mobile (React Native)

---

## 📄 Licença

MIT — livre para uso, estudo e adaptação.

---

> Desenvolvido com 💙 no **Grand Prix SENAI** · Projeto de portfólio
