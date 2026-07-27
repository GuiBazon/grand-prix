/**
 * pages/outros.js — Páginas secundárias
 * recursos, acc, alertas, relatórios, funcionários, sensores, usuários, auditoria
 */

// ── Recursos ──────────────────────────────────────────────────────────
Pages.recursos = function () {
  const itens = [
    {
      ico: '🤟', titulo: 'Intérprete de LIBRAS',
      desc: 'Solicite um intérprete certificado para reuniões e eventos.',
      btn: 'Solicitar',
      acao() { State.setAcc('libras', true); UI.toast('Player LIBRAS ativado!', 'ok'); },
    },
    {
      ico: '🔊', titulo: 'Narração automática',
      desc: 'Ative a leitura em voz alta de todo o conteúdo da interface.',
      btn: 'Ativar',
      acao() { State.setAcc('narr', true); UI.toast('Narração ativada!', 'ok'); },
    },
    {
      ico: '🎙️', titulo: 'Registro por voz',
      desc: 'Registre uma demanda apenas falando. STT em português.',
      btn: 'Gravar áudio',
      acao() { UI.toast('Gravação iniciada... fale sua demanda.'); setTimeout(() => UI.toast('Demanda registrada por voz! Processando...'), 3000); },
    },
    {
      ico: '🗺️', titulo: 'Mapa de acessibilidade',
      desc: 'Rotas acessíveis, rampas e elevadores no campus.',
      btn: 'Ver mapa',
      acao() { UI.toast('Mapa interativo do campus abrindo...'); },
    },
    {
      ico: '📄', titulo: 'Documentos adaptados',
      desc: 'Versões em LIBRAS, áudio e alto contraste de todos os documentos.',
      btn: 'Acessar',
      acao() { UI.toast('Central de documentos acessíveis aberta'); },
    },
    {
      ico: '🖨️', titulo: 'Totem de voz',
      desc: 'Acesse o sistema em qualquer totem do campus por voz.',
      btn: 'Como usar',
      acao() { UI.toast('Guia de uso dos totens enviado por e-mail'); },
    },
  ];

  return `
    <div class="pg-header">
      <div class="pg-title">Recursos de acessibilidade</div>
      <div class="pg-sub">Serviços e ferramentas disponíveis para você</div>
    </div>
    <div class="grid3">
      ${itens.map((item, i) => `
        <div class="card" style="display:flex;flex-direction:column;gap:10px">
          <div style="font-size:32px" aria-hidden="true">${item.ico}</div>
          <div>
            <div style="font-size:14px;font-weight:800;color:var(--text);margin-bottom:4px">${item.titulo}</div>
            <div style="font-size:12px;color:var(--text3);line-height:1.5">${item.desc}</div>
          </div>
          <button class="btn btn-primary"
                  style="margin-top:auto;justify-content:center"
                  onclick="Pages._recursoAcao(${i})"
                  aria-label="${item.btn}: ${item.titulo}">
            ${item.btn}
          </button>
        </div>`).join('')}
    </div>`;
};

// Ações dos recursos (referencia os itens definidos acima via índice)
Pages._recursoAcoes = [
  () => { State.setAcc('libras', true); UI.toast('Player LIBRAS ativado!', 'ok'); },
  () => { State.setAcc('narr',   true); UI.toast('Narração ativada!', 'ok'); },
  () => { UI.toast('Gravação iniciada... fale sua demanda.'); setTimeout(() => UI.toast('Processando...'), 3000); },
  () => UI.toast('Mapa interativo abrindo...'),
  () => UI.toast('Central de documentos aberta'),
  () => UI.toast('Guia de uso dos totens enviado por e-mail'),
];
Pages._recursoAcao = (i) => Pages._recursoAcoes[i]?.();


// ── Acessibilidade ────────────────────────────────────────────────────
Pages.acc = function () {
  return `
    <div class="pg-header">
      <div class="pg-title">Configurações de acessibilidade</div>
      <div class="pg-sub">Preferências salvas por perfil · Padrão eMAG e WCAG 2.1 AA</div>
    </div>
    <div style="max-width:520px;display:flex;flex-direction:column;gap:14px">

      <div class="card">
        <div class="acc-section">Aparência e contraste</div>
        <div class="toggle-row">
          <div class="toggle-info">
            <div class="toggle-label">🌙 Modo escuro</div>
            <div class="toggle-desc">Interface com fundo escuro para reduzir cansaço visual</div>
          </div>
          <label class="switch" aria-label="Modo escuro">
            <input type="checkbox" id="sw-dark"
              onchange="State.setAcc('dark',this.checked);UI.toast('Modo '+(this.checked?'escuro':'claro')+' ativado')">
            <span class="switch-slider"></span>
          </label>
        </div>
        <div class="toggle-row">
          <div class="toggle-info">
            <div class="toggle-label">⬛ Alto contraste</div>
            <div class="toggle-desc">Máximo contraste — padrão WCAG AAA para baixa visão</div>
          </div>
          <label class="switch" aria-label="Alto contraste">
            <input type="checkbox" id="sw-contrast"
              onchange="State.setAcc('contrast',this.checked);UI.toast('Alto contraste '+(this.checked?'ativado':'desativado'))">
            <span class="switch-slider"></span>
          </label>
        </div>
        <div class="range-row">
          <div style="flex:1">
            <div class="toggle-label">🔡 Tamanho do texto</div>
            <div class="toggle-desc">Atual: <strong id="val-font">100%</strong></div>
          </div>
          <input type="range" id="rng-font" min="80" max="200" step="5" value="100"
            aria-label="Tamanho do texto"
            oninput="State.setAcc('font',+this.value);document.getElementById('val-font').textContent=this.value+'%'">
          <span class="range-val" aria-hidden="true">%</span>
        </div>
      </div>

      <div class="card">
        <div class="acc-section">Narração e áudio</div>
        <div class="toggle-row">
          <div class="toggle-info">
            <div class="toggle-label">🔊 Narração automática (TTS)</div>
            <div class="toggle-desc">Lê o conteúdo da tela em voz alta em português</div>
          </div>
          <label class="switch" aria-label="Narração automática">
            <input type="checkbox" id="sw-narr"
              onchange="State.setAcc('narr',this.checked);if(this.checked){Accessibility.speak('Narração ativada. Bem-vindo ao ${APP.name}.');}UI.toast('Narração '+(this.checked?'ativada':'desativada'))">
            <span class="switch-slider"></span>
          </label>
        </div>
        <div class="range-row">
          <div style="flex:1">
            <div class="toggle-label">⏩ Velocidade da narração</div>
            <div class="toggle-desc">Atual: <strong id="val-narr">100%</strong></div>
          </div>
          <input type="range" id="rng-narr" min="40" max="200" step="10" value="100"
            aria-label="Velocidade da narração"
            oninput="State.setAcc('narrSpeed',this.value/100);document.getElementById('val-narr').textContent=this.value+'%'">
          <span class="range-val" aria-hidden="true">%</span>
        </div>
        <div class="toggle-row" style="border-bottom:none">
          <div class="toggle-info">
            <div class="toggle-label">🎵 Teste de narração</div>
            <div class="toggle-desc">Clique para ouvir um exemplo com as configurações atuais</div>
          </div>
          <button class="btn btn-secondary"
            onclick="State.setAcc('narr',true);document.getElementById('sw-narr').checked=true;Accessibility.speak('Olá. Bem-vindo ao sistema ${APP.name}. A narração está funcionando corretamente.');UI.toast('Testando narração...','ok')">
            ▶ Testar
          </button>
        </div>
      </div>

      <div class="card">
        <div class="acc-section">LIBRAS</div>
        <div class="toggle-row" style="border-bottom:none">
          <div class="toggle-info">
            <div class="toggle-label">🤟 Player de LIBRAS</div>
            <div class="toggle-desc">Exibe intérprete de LIBRAS em janela flutuante na tela</div>
          </div>
          <label class="switch" aria-label="Player de LIBRAS">
            <input type="checkbox" id="sw-libras"
              onchange="State.setAcc('libras',this.checked);UI.toast('Player LIBRAS '+(this.checked?'ativado — veja o canto inferior esquerdo':'desativado'))">
            <span class="switch-slider"></span>
          </label>
        </div>
      </div>

      <div class="card">
        <div class="acc-section">Movimento</div>
        <div class="toggle-row" style="border-bottom:none">
          <div class="toggle-info">
            <div class="toggle-label">🛑 Reduzir animações</div>
            <div class="toggle-desc">Remove transições (para sensibilidade a movimento)</div>
          </div>
          <label class="switch" aria-label="Reduzir animações">
            <input type="checkbox" id="sw-motion"
              onchange="State.setAcc('motion',this.checked);UI.toast('Animações '+(this.checked?'reduzidas':'normais'))">
            <span class="switch-slider"></span>
          </label>
        </div>
      </div>

      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-primary"
          onclick="State.savePrefs();UI.toast('Preferências salvas!','ok')">
          💾 Salvar preferências
        </button>
        <button class="btn btn-ghost"
          onclick="Accessibility.reset();Router.render();UI.toast('Configurações restauradas ao padrão')">
          ↺ Restaurar padrão
        </button>
      </div>
    </div>`;
};


// ── Alertas ────────────────────────────────────────────────────────────
Pages.alertas = function () {
  const alertas = [
    {
      ico: '🔴', titulo: 'Elevador B2 fora de operação',
      classe: 'a-crit', dot: 'd-red', status: 'Crítico', stag: 't-err', tempo: 'há 40min',
      desc: 'Sensor IoT detectou falha no motor. Manutenção acionada automaticamente. Usuários redirecionados para elevador A1.',
    },
    {
      ico: '🟡', titulo: 'Rampa C3 — obstáculo detectado pela IA',
      classe: 'a-warn', dot: 'd-warn', status: 'Atenção', stag: 't-warn', tempo: 'há 1h 12min',
      desc: 'Câmera de monitoramento enviou imagem. IA identificou caixas bloqueando 80% da rampa. Demanda #1043 aberta automaticamente.',
    },
    {
      ico: '🟡', titulo: 'Banheiro adaptado F1 — vistoria vencida',
      classe: 'a-warn', dot: 'd-warn', status: 'Atenção', stag: 't-warn', tempo: 'há 2h',
      desc: 'Última vistoria há 32 dias (meta: 30 dias). Sistema agendou inspeção para amanhã às 08:00.',
    },
    {
      ico: '🟢', titulo: 'Piso tátil A2 — reparo concluído',
      classe: 'a-ok', dot: 'd-green', status: 'Resolvido', stag: 't-ok', tempo: 'há 3h 20min',
      desc: 'Demanda #1021 encerrada. Equipe substituiu 4m de piso tátil. Área liberada.',
    },
    {
      ico: '🔵', titulo: 'Atualização firmware — sensores P-01 a P-05',
      classe: 'a-info', dot: 'd-blue', status: 'Info', stag: 't-info', tempo: 'há 5h',
      desc: 'Firmware v2.3.1 instalado em 5 sensores. Melhoria de 15% na detecção de ocupação.',
    },
  ];

  return `
    <div class="pg-header">
      <div class="pg-title">Alertas do setor</div>
      <div class="pg-sub">Monitoramento em tempo real via sensores IoT e IA</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px" role="list" aria-label="Lista de alertas">
      ${alertas.map(a => `
        <div class="alert-box ${a.classe}" role="listitem">
          <div class="dot ${a.dot}" aria-hidden="true"></div>
          <div style="flex:1">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:4px">
              <div style="font-size:13px;font-weight:800;color:var(--text)">${a.ico} ${a.titulo}</div>
              <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
                <span class="tag ${a.stag}">${a.status}</span>
                <span style="font-size:10px;color:var(--text3)">${a.tempo}</span>
              </div>
            </div>
            <div style="font-size:12px;color:var(--text2);line-height:1.5">${a.desc}</div>
          </div>
        </div>`).join('')}
    </div>`;
};


// ── Relatórios ─────────────────────────────────────────────────────────
Pages.relatorios = function () {
  const relatorios = [
    { ico: '📊', titulo: 'Relatório mensal — Julho 2025',     desc: 'Consolidado de todas as demandas por setor',          data: 'Gerado em 01/07/2025', tag: 't-ok',   label: 'Disponível' },
    { ico: '📈', titulo: 'Relatório de SLA — Q2 2025',        desc: 'Cumprimento de prazo por setor e tipo',               data: 'Gerado em 01/06/2025', tag: 't-ok',   label: 'Disponível' },
    { ico: '🤖', titulo: 'Análise de padrões — 2025',          desc: 'IA detectou tendências nas demandas',                 data: 'Gerado em 15/06/2025', tag: 't-info', label: 'IA' },
    { ico: '🔧', titulo: 'Diagnóstico de infraestrutura',      desc: 'Estado atual de sensores e equipamentos',             data: 'Em geração...',        tag: 't-warn', label: 'Aguarde' },
    { ico: '👥', titulo: 'Índice de inclusão — Jun/2025',      desc: 'Score por setor: eMAG, NBR 9050 e LGPD',             data: 'Gerado em 01/07/2025', tag: 't-ok',   label: 'Disponível' },
    { ico: '📋', titulo: 'Auditoria LGPD — 2025',              desc: 'Registro de acessos a dados pessoais',                data: 'Gerado em 10/07/2025', tag: 't-ok',   label: 'Disponível' },
  ];

  return `
    <div class="flex-between mb16">
      <div>
        <div class="pg-title">Relatórios</div>
        <div class="pg-sub">Gerados automaticamente por IA</div>
      </div>
      <button class="btn btn-primary"
        onclick="UI.toast('Gerando relatório com IA...');setTimeout(()=>UI.toast('Relatório gerado e disponível para download!','ok'),2500)">
        🤖 Gerar com IA
      </button>
    </div>
    <div class="grid2">
      ${relatorios.map(r => `
        <div class="card hover-row"
             onclick="${r.label !== 'Aguarde' ? `UI.toast('Abrindo: ${r.titulo}')` : `UI.toast('Aguarde, este relatório ainda está sendo gerado.','err')`}"
             onkeydown="if(event.key==='Enter'||event.key===' '){${r.label !== 'Aguarde' ? `UI.toast('Abrindo: ${r.titulo}')` : `UI.toast('Aguarde, este relatório está sendo gerado.','err')`}}"
             role="button" tabindex="0"
             aria-label="${r.titulo} — ${r.label}">
          <div style="font-size:24px;margin-bottom:8px" aria-hidden="true">${r.ico}</div>
          <div style="font-size:14px;font-weight:800;color:var(--text);margin-bottom:4px">${r.titulo}</div>
          <div style="font-size:12px;color:var(--text3);line-height:1.5;margin-bottom:12px">${r.desc}</div>
          <div style="display:flex;align-items:center;justify-content:space-between">
            <span style="font-size:11px;color:var(--text3)">${r.data}</span>
            <span class="tag ${r.tag}">${r.label}</span>
          </div>
        </div>`).join('')}
    </div>`;
};


// ── Funcionários ───────────────────────────────────────────────────────
const _FUNCIONARIOS = [
  { n: 'Maria Ferreira', e: 'maria.ferreira', s: 'Engenharia',     t: 'Física / motora',  st: 't-ok',   stl: 'Ativo',    d: '2 em aberto',        recursos: 'Cadeira de rodas; rampa adaptada', contato: '(21) 9 8800-0001' },
  { n: 'João Santos',    e: 'joao.santos',    s: 'Operações',      t: 'Auditiva (LIBRAS)', st: 't-ok',   stl: 'Ativo',    d: '1 em aberto',        recursos: 'Intérprete LIBRAS', contato: '(21) 9 8800-0002' },
  { n: 'Carla Mendes',   e: 'carla.mendes',   s: 'Administrativo', t: 'Visual',            st: 't-warn', stl: 'Atenção',  d: 'Vistoria pendente',  recursos: 'Leitor de tela; fonte ampliada', contato: '(21) 9 8800-0003' },
  { n: 'Pedro Lima',     e: 'pedro.lima',     s: 'Logística',      t: 'Física / motora',  st: 't-ok',   stl: 'Ativo',    d: 'Sem demandas',       recursos: 'Mesa ergonômica', contato: '(21) 9 8800-0004' },
  { n: 'Ana Keller',     e: 'ana.keller',     s: 'TI',             t: 'Múltipla',          st: 't-err',  stl: 'Crítico',  d: '3 em aberto',        recursos: 'Cadeira; LIBRAS; leitor de tela', contato: '(21) 9 8800-0005' },
  { n: 'Juliana Costa',  e: 'juliana.costa',  s: 'Logística',      t: 'Auditiva',          st: 't-ok',   stl: 'Ativo',    d: 'Sem demandas',       recursos: 'Legenda automática', contato: '(21) 9 8800-0006' },
];

Pages.funcionarios = function () {
  return `
    <div class="flex-between mb16">
      <div>
        <div class="pg-title">Funcionários PCD</div>
        <div class="pg-sub">284 cadastrados · 12,4% do quadro total</div>
      </div>
      <button class="btn btn-primary" onclick="Pages._modalNovoFuncionario()">➕ Cadastrar</button>
    </div>
    <div class="card">
      <div class="tbl-wrap">
        <table class="tbl" aria-label="Lista de funcionários PCD">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th style="width:120px" scope="col">Setor</th>
              <th style="width:130px" scope="col">Tipo PCD</th>
              <th style="width:80px"  scope="col">Status</th>
              <th style="width:120px" scope="col">Situação</th>
            </tr>
          </thead>
          <tbody>
            ${_FUNCIONARIOS.map((f, i) => `
              <tr class="hover-row"
                  onclick="Pages._openFuncionario(${i})"
                  onkeydown="if(event.key==='Enter'||event.key===' '){Pages._openFuncionario(${i});}"
                  tabindex="0" role="button"
                  aria-label="${f.n}, ${f.s}, ${f.t}, ${f.stl}">
                <td>
                  <div style="font-weight:700;color:var(--text)">${f.n}</div>
                  <div style="font-size:11px;color:var(--text3)">${f.e}@petrobras.com</div>
                </td>
                <td style="color:var(--text2)">${f.s}</td>
                <td><span class="tag t-gray">${f.t}</span></td>
                <td><span class="tag ${f.st}">${f.stl}</span></td>
                <td style="font-size:11px;color:var(--text3)">${f.d}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
};

Pages._openFuncionario = function (i) {
  const f = _FUNCIONARIOS[i];
  if (!f) return;
  UI.openModal(`
    <div class="modal-title">
      <div>
        <span style="font-size:12px;color:var(--text3);font-weight:400;display:block;margin-bottom:4px">${f.s} · ${f.t}</span>
        ${f.n}
      </div>
      <button class="modal-close" onclick="UI.closeModal('modal-func')" aria-label="Fechar">✕</button>
    </div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px">
      <span class="tag ${f.st}">${f.stl}</span>
      <span class="tag t-gray">${f.t}</span>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px;font-size:13px">
      <div style="display:flex;gap:8px">
        <span style="font-weight:700;color:var(--text2);min-width:110px">E-mail</span>
        <span style="color:var(--text)">${f.e}@petrobras.com</span>
      </div>
      <div style="display:flex;gap:8px">
        <span style="font-weight:700;color:var(--text2);min-width:110px">Contato</span>
        <span style="color:var(--text)">${f.contato}</span>
      </div>
      <div style="display:flex;gap:8px">
        <span style="font-weight:700;color:var(--text2);min-width:110px">Recursos ativos</span>
        <span style="color:var(--text)">${f.recursos}</span>
      </div>
      <div style="display:flex;gap:8px">
        <span style="font-weight:700;color:var(--text2);min-width:110px">Situação</span>
        <span style="color:var(--text)">${f.d}</span>
      </div>
    </div>
    <div style="display:flex;gap:8px;margin-top:18px;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="UI.closeModal('modal-func');UI.toast('E-mail enviado para ${f.n}','ok')">✉️ Enviar e-mail</button>
      <button class="btn btn-ghost"   onclick="UI.closeModal('modal-func')">Fechar</button>
    </div>
  `, 'modal-func');
};

Pages._modalNovoFuncionario = function () {
  UI.openModal(`
    <div class="modal-title">
      Novo funcionário PCD
      <button class="modal-close" onclick="UI.closeModal('modal-func')" aria-label="Fechar">✕</button>
    </div>
    <div class="form-group">
      <label class="form-label" for="nf-nome">Nome completo</label>
      <input class="form-input" id="nf-nome" placeholder="Ex: Fernanda Oliveira">
    </div>
    <div class="form-group">
      <label class="form-label" for="nf-email">E-mail</label>
      <input class="form-input" id="nf-email" type="email" placeholder="fernanda.oliveira@petrobras.com">
    </div>
    <div class="form-group">
      <label class="form-label" for="nf-setor">Setor</label>
      <select class="form-select" id="nf-setor">
        <option>Engenharia</option><option>Operações</option><option>RH</option>
        <option>TI</option><option>Logística</option><option>Manutenção</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label" for="nf-tipo">Tipo de PCD</label>
      <select class="form-select" id="nf-tipo">
        <option>Física / motora</option><option>Visual</option>
        <option>Auditiva (LIBRAS)</option><option>Intelectual</option><option>Múltipla</option>
      </select>
    </div>
    <div style="display:flex;gap:8px;margin-top:8px">
      <button class="btn btn-primary"
        onclick="UI.closeModal('modal-func');UI.toast('Funcionário cadastrado com sucesso!','ok')">
        Cadastrar
      </button>
      <button class="btn btn-ghost" onclick="UI.closeModal('modal-func')">Cancelar</button>
    </div>
  `, 'modal-func');
};


// ── Sensores ───────────────────────────────────────────────────────────
let _sensorTimer = null;

Pages.sensores = function () {
  const sensores = [
    { id: 'E-01', local: 'Elevador A — térreo',         tipo: 'Elevador',  leitura: 'Operando', tag: 't-ok',   upd: '1min' },
    { id: 'E-07', local: 'Elevador B — 2º andar',       tipo: 'Elevador',  leitura: 'OFFLINE',  tag: 't-err',  upd: '43min' },
    { id: 'R-14', local: 'Rampa C3 — entrada sul',      tipo: 'Câmera IA', leitura: 'ALERTA',   tag: 't-warn', upd: '12min' },
    { id: 'R-02', local: 'Rampa A1 — entrada norte',    tipo: 'Câmera IA', leitura: 'Livre',    tag: 't-ok',   upd: '2min' },
    { id: 'P-03', local: 'Banheiro adaptado A1',        tipo: 'Ocupação',  leitura: 'Livre',    tag: 't-ok',   upd: '2min' },
    { id: 'P-08', local: 'Banheiro adaptado F1',        tipo: 'Ocupação',  leitura: 'Livre',    tag: 't-ok',   upd: '4min' },
    { id: 'S-11', local: 'Sinalização sonora — recep.', tipo: 'Áudio',     leitura: 'Ativo',    tag: 't-ok',   upd: '1min' },
    { id: 'T-04', local: 'Piso tátil — entrada',        tipo: 'Pressão',   leitura: 'Normal',   tag: 't-ok',   upd: '3min' },
  ];

  const statusLabel = { 't-ok': 'Online', 't-warn': 'Alerta', 't-err': 'Offline' };

  return `
    <div class="pg-header">
      <div class="pg-title">Monitoramento de sensores IoT</div>
      <div class="pg-sub">Atualização a cada 30 segundos via MQTT</div>
    </div>
    <div class="grid4">
      <div class="metric">       <div class="mlabel">Total</div><div class="mval">148</div></div>
      <div class="metric green"> <div class="mlabel">Online</div><div class="mval green">142</div></div>
      <div class="metric yellow"><div class="mlabel">Em alerta</div><div class="mval warn">4</div></div>
      <div class="metric red">   <div class="mlabel">Offline</div><div class="mval red">2</div></div>
    </div>
    <div class="card">
      <div class="card-title">
        <span class="card-accent"></span>Sensores ativos
        <span class="pulse ok live-dot" style="margin-left:auto" aria-hidden="true"></span>
        <span style="font-size:11px;color:var(--text3);margin-left:4px" id="sensor-time" aria-live="polite">Ao vivo</span>
      </div>
      <div class="tbl-wrap">
        <table class="tbl" aria-label="Tabela de sensores">
          <thead>
            <tr>
              <th style="width:55px" scope="col">ID</th>
              <th scope="col">Local</th>
              <th style="width:90px" scope="col">Tipo</th>
              <th style="width:80px" scope="col">Leitura</th>
              <th style="width:75px" scope="col">Conexão</th>
              <th style="width:80px" scope="col">Atualizado</th>
            </tr>
          </thead>
          <tbody>
            ${sensores.map(s => `
              <tr>
                <td style="font-size:11px;font-weight:700;color:var(--text3)">${s.id}</td>
                <td style="color:var(--text)">${s.local}</td>
                <td style="color:var(--text2);font-size:12px">${s.tipo}</td>
                <td><span class="tag ${s.tag}">${s.leitura}</span></td>
                <td><span class="tag ${s.tag}">${statusLabel[s.tag] || 'Online'}</span></td>
                <td style="font-size:11px;color:var(--text3)">há ${s.upd}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
};

Pages._startSensorLive = function () {
  clearInterval(_sensorTimer);
  _sensorTimer = setInterval(() => {
    const el = document.getElementById('sensor-time');
    if (!el) { clearInterval(_sensorTimer); return; }
    el.textContent = 'Atualizado: ' + new Date().toLocaleTimeString('pt-BR');
  }, 5000);
};


// ── Usuários ───────────────────────────────────────────────────────────
Pages.usuarios = function () {
  const users = [
    { n: 'Maria Ferreira', e: 'maria.ferreira', s: 'Engenharia', p: 'Funcionário', u: 'hoje 10:41', t: 't-ok'   },
    { n: 'Carlos Lima',    e: 'carlos.lima',    s: 'Operações',  p: 'Gestor',      u: 'hoje 09:30', t: 't-info' },
    { n: 'Ana Paula',      e: 'ana.paula',      s: 'RH',         p: 'RH',          u: 'hoje 08:15', t: 't-info' },
    { n: 'Roberto Souza',  e: 'roberto.souza',  s: 'TI',         p: 'Admin',       u: 'hoje 07:00', t: 't-warn' },
    { n: 'Juliana Costa',  e: 'juliana.costa',  s: 'Logística',  p: 'Funcionário', u: 'ontem',      t: 't-ok'   },
  ];

  return `
    <div class="flex-between mb16">
      <div>
        <div class="pg-title">Usuários do sistema</div>
        <div class="pg-sub">Gerenciamento de perfis e permissões</div>
      </div>
      <button class="btn btn-primary" onclick="Pages._modalNovoUsuario()">➕ Novo usuário</button>
    </div>
    <div class="card">
      <div class="tbl-wrap">
        <table class="tbl" aria-label="Lista de usuários">
          <thead>
            <tr>
              <th scope="col">Usuário</th>
              <th style="width:110px" scope="col">Setor</th>
              <th style="width:90px"  scope="col">Perfil</th>
              <th style="width:100px" scope="col">Último acesso</th>
              <th style="width:80px"  scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            ${users.map(u => `
              <tr>
                <td>
                  <div style="font-weight:700;color:var(--text)">${u.n}</div>
                  <div style="font-size:11px;color:var(--text3)">${u.e}@petrobras.com</div>
                </td>
                <td style="color:var(--text2)">${u.s}</td>
                <td><span class="tag ${u.t}">${u.p}</span></td>
                <td style="font-size:11px;color:var(--text3)">${u.u}</td>
                <td>
                  <button class="btn btn-ghost" style="font-size:11px;padding:4px 10px"
                    onclick="UI.toast('Editando perfil de ${u.n}')">
                    Editar
                  </button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
};

Pages._modalNovoUsuario = function () {
  UI.openModal(`
    <div class="modal-title">
      Novo usuário
      <button class="modal-close" onclick="UI.closeModal('modal-user')" aria-label="Fechar">✕</button>
    </div>
    <div class="form-group">
      <label class="form-label" for="nu-nome">Nome completo</label>
      <input class="form-input" id="nu-nome" placeholder="Ex: Fernanda Oliveira">
    </div>
    <div class="form-group">
      <label class="form-label" for="nu-email">E-mail</label>
      <input class="form-input" id="nu-email" type="email" placeholder="fernanda.oliveira@petrobras.com">
    </div>
    <div class="form-group">
      <label class="form-label" for="nu-setor">Setor</label>
      <select class="form-select" id="nu-setor">
        <option>Engenharia</option><option>Operações</option><option>RH</option>
        <option>TI</option><option>Logística</option><option>Manutenção</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label" id="label-perfil">Perfil de acesso</label>
      <div class="chip-row" id="chips-perfil" role="radiogroup" aria-labelledby="label-perfil">
        <span class="chip sel" onclick="UI.selChip(this,'chips-perfil')" role="radio" tabindex="0">Funcionário</span>
        <span class="chip"     onclick="UI.selChip(this,'chips-perfil')" role="radio" tabindex="0">Gestor</span>
        <span class="chip"     onclick="UI.selChip(this,'chips-perfil')" role="radio" tabindex="0">RH</span>
        <span class="chip"     onclick="UI.selChip(this,'chips-perfil')" role="radio" tabindex="0">Admin</span>
      </div>
    </div>
    <div style="display:flex;gap:8px;margin-top:8px">
      <button class="btn btn-primary"
        onclick="UI.closeModal('modal-user');UI.toast('Usuário criado com sucesso!','ok')">
        Criar usuário
      </button>
      <button class="btn btn-ghost" onclick="UI.closeModal('modal-user')">Cancelar</button>
    </div>
  `, 'modal-user');
};


// ── Auditoria ──────────────────────────────────────────────────────────
Pages.auditoria = function () {
  const logs = [
    { h: '10:41', a: 'Login no sistema',                              u: 'roberto.souza',  p: 'Admin',       ip: '10.0.1.4',   tag: 't-ok'   },
    { h: '10:38', a: 'Demanda #1042 atualizada (status: Em análise)', u: 'carlos.lima',    p: 'Gestor',      ip: '10.0.2.11',  tag: 't-ok'   },
    { h: '10:31', a: 'Relatório mensal exportado em PDF',             u: 'ana.paula',      p: 'RH',          ip: '10.0.3.7',   tag: 't-ok'   },
    { h: '10:14', a: 'Sensor E-07 marcado como offline',              u: 'sistema',        p: 'Automático',  ip: '—',          tag: 't-warn' },
    { h: '09:58', a: 'Novo usuário criado: juliana.costa',            u: 'roberto.souza',  p: 'Admin',       ip: '10.0.1.4',   tag: 't-info' },
    { h: '09:30', a: 'Login no sistema',                              u: 'carlos.lima',    p: 'Gestor',      ip: '10.0.2.11',  tag: 't-ok'   },
    { h: '09:14', a: 'Demanda #1042 registrada por Maria Ferreira',   u: 'maria.ferreira', p: 'Funcionário', ip: '10.0.4.22',  tag: 't-ok'   },
    { h: '08:15', a: 'Login no sistema',                              u: 'ana.paula',      p: 'RH',          ip: '10.0.3.7',   tag: 't-ok'   },
    { h: '07:00', a: 'Backup automático concluído — 2,3 GB',          u: 'sistema',        p: 'Automático',  ip: '—',          tag: 't-ok'   },
  ];

  const statusLabel = { 't-ok': 'OK', 't-warn': 'Aviso', 't-info': 'Info', 't-err': 'Erro' };

  return `
    <div class="pg-header">
      <div class="pg-title">Log de auditoria</div>
      <div class="pg-sub">Todos os acessos a dados pessoais registrados — conformidade LGPD Art. 37</div>
    </div>
    <div class="card">
      <div class="tbl-wrap">
        <table class="tbl" aria-label="Log de auditoria">
          <thead>
            <tr>
              <th style="width:55px" scope="col">Hora</th>
              <th scope="col">Ação</th>
              <th style="width:120px" scope="col">Usuário</th>
              <th style="width:80px"  scope="col">Perfil</th>
              <th style="width:80px"  scope="col">IP</th>
              <th style="width:65px"  scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            ${logs.map(l => `
              <tr class="hover-row">
                <td style="font-size:11px;font-weight:700;color:var(--brand-primary)">${l.h}</td>
                <td style="color:var(--text);font-size:12px">${l.a}</td>
                <td style="color:var(--text3);font-size:11px">${l.u}</td>
                <td><span class="tag t-gray">${l.p}</span></td>
                <td style="font-size:11px;color:var(--text3)">${l.ip}</td>
                <td><span class="tag ${l.tag}">${statusLabel[l.tag] || 'OK'}</span></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
};
