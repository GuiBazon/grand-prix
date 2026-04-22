/**
 * pages/outros.js — Páginas secundárias
 * recursos, acc, alertas, relatórios, funcionários, sensores, usuários, auditoria
 */

// ── Recursos ──────────────────────────────────────────────────────────
Pages.recursos = function () {
  const itens = [
    ['🤟','Intérprete de LIBRAS','Solicite um intérprete certificado para reuniões e eventos.','Solicitar',
      () => { State.acc.libras = true; Accessibility.apply(); UI.toast('Player LIBRAS ativado!','ok'); }],
    ['🔊','Narração automática','Ative a leitura em voz alta de todo o conteúdo da interface.','Ativar',
      () => { State.acc.narr = true; Accessibility.apply(); UI.toast('Narração ativada!','ok'); }],
    ['🎙️','Registro por voz','Registre uma demanda apenas falando. STT em português.','Gravar áudio',
      () => { UI.toast('Gravação iniciada... fale sua demanda.'); setTimeout(()=>UI.toast('Demanda registrada por voz! Processando...'),3000); }],
    ['🗺️','Mapa de acessibilidade','Rotas acessíveis, rampas e elevadores no campus.','Ver mapa',
      () => UI.toast('Mapa interativo do campus abrindo...')],
    ['📄','Documentos adaptados','Versões em LIBRAS, áudio e alto contraste de todos os documentos.','Baixar',
      () => UI.toast('Central de documentos acessíveis aberta')],
    ['🖨️','Totem de voz','Acesse o sistema em qualquer totem do campus por voz.','Como usar',
      () => UI.toast('Guia de uso dos totens enviado por e-mail')],
  ];

  return `
    <div class="pg-header">
      <div class="pg-title">Recursos de acessibilidade</div>
      <div class="pg-sub">Serviços e ferramentas disponíveis para você</div>
    </div>
    <div class="grid3">
      ${itens.map(([ico,t,d,b], i) => `
        <div class="card" style="display:flex;flex-direction:column;gap:10px">
          <div style="font-size:32px">${ico}</div>
          <div>
            <div style="font-size:14px;font-weight:800;color:var(--text);margin-bottom:4px">${t}</div>
            <div style="font-size:12px;color:var(--text3);line-height:1.5">${d}</div>
          </div>
          <button class="btn btn-primary" style="margin-top:auto;justify-content:center" onclick="Pages._recursoAcao(${i})">${b}</button>
        </div>`).join('')}
    </div>`;
};

Pages._recursoAcoes = [
  () => { State.acc.libras = true; Accessibility.apply(); UI.toast('Player LIBRAS ativado!','ok'); },
  () => { State.acc.narr = true;   Accessibility.apply(); UI.toast('Narração ativada!','ok'); },
  () => { UI.toast('Gravação iniciada... fale sua demanda.'); setTimeout(()=>UI.toast('Processando...'),3000); },
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
          <div class="toggle-info"><div class="toggle-label">🌙 Modo escuro</div><div class="toggle-desc">Interface com fundo escuro para reduzir cansaço visual</div></div>
          <label class="switch"><input type="checkbox" id="sw-dark" onchange="State.setAcc('dark',this.checked);UI.toast('Modo '+(this.checked?'escuro':'claro')+' ativado')"><span class="switch-slider"></span></label>
        </div>
        <div class="toggle-row">
          <div class="toggle-info"><div class="toggle-label">⬛ Alto contraste</div><div class="toggle-desc">Máximo contraste — padrão WCAG AAA para baixa visão</div></div>
          <label class="switch"><input type="checkbox" id="sw-contrast" onchange="State.setAcc('contrast',this.checked);UI.toast('Alto contraste '+(this.checked?'ativado':'desativado'))"><span class="switch-slider"></span></label>
        </div>
        <div class="range-row">
          <div style="flex:1"><div class="toggle-label">🔡 Tamanho do texto</div><div class="toggle-desc">Atual: <strong id="val-font">100%</strong></div></div>
          <input type="range" id="rng-font" min="80" max="200" step="5" value="100"
            oninput="State.setAcc('font',+this.value);document.getElementById('val-font').textContent=this.value+'%'">
          <span class="range-val">%</span>
        </div>
      </div>

      <div class="card">
        <div class="acc-section">Narração e áudio</div>
        <div class="toggle-row">
          <div class="toggle-info"><div class="toggle-label">🔊 Narração automática (TTS)</div><div class="toggle-desc">Lê o conteúdo da tela em voz alta em português</div></div>
          <label class="switch"><input type="checkbox" id="sw-narr" onchange="State.setAcc('narr',this.checked);if(this.checked){Accessibility.speak('Narração ativada. Bem-vindo ao ${APP.name}.');}UI.toast('Narração '+(this.checked?'ativada':'desativada'))"><span class="switch-slider"></span></label>
        </div>
        <div class="range-row">
          <div style="flex:1"><div class="toggle-label">⏩ Velocidade da narração</div><div class="toggle-desc">Atual: <strong id="val-narr">100%</strong></div></div>
          <input type="range" id="rng-narr" min="40" max="200" step="10" value="100"
            oninput="State.setAcc('narrSpeed',this.value/100);document.getElementById('val-narr').textContent=this.value+'%'">
          <span class="range-val">%</span>
        </div>
        <div class="toggle-row" style="border-bottom:none">
          <div class="toggle-info"><div class="toggle-label">🎵 Teste de narração</div><div class="toggle-desc">Clique para ouvir um exemplo com as configurações atuais</div></div>
          <button class="btn btn-secondary" onclick="State.setAcc('narr',true);document.getElementById('sw-narr').checked=true;Accessibility.speak('Olá. Bem-vindo ao sistema ${APP.name}. A narração está funcionando corretamente.');UI.toast('Testando narração...','ok')">▶ Testar</button>
        </div>
      </div>

      <div class="card">
        <div class="acc-section">LIBRAS</div>
        <div class="toggle-row" style="border-bottom:none">
          <div class="toggle-info"><div class="toggle-label">🤟 Player de LIBRAS</div><div class="toggle-desc">Exibe intérprete de LIBRAS em janela flutuante na tela</div></div>
          <label class="switch"><input type="checkbox" id="sw-libras" onchange="State.setAcc('libras',this.checked);UI.toast('Player LIBRAS '+(this.checked?'ativado — veja o canto inferior esquerdo':'desativado'))"><span class="switch-slider"></span></label>
        </div>
      </div>

      <div class="card">
        <div class="acc-section">Movimento</div>
        <div class="toggle-row" style="border-bottom:none">
          <div class="toggle-info"><div class="toggle-label">🛑 Reduzir animações</div><div class="toggle-desc">Remove transições (para sensibilidade a movimento)</div></div>
          <label class="switch"><input type="checkbox" id="sw-motion" onchange="State.setAcc('motion',this.checked);UI.toast('Animações '+(this.checked?'reduzidas':'normais'))"><span class="switch-slider"></span></label>
        </div>
      </div>

      <div style="display:flex;gap:8px">
        <button class="btn btn-primary" onclick="UI.toast('Preferências salvas!','ok')">💾 Salvar preferências</button>
        <button class="btn btn-ghost"   onclick="Accessibility.reset();Router.render();UI.toast('Configurações restauradas ao padrão')">↺ Restaurar padrão</button>
      </div>
    </div>`;
};

// ── Alertas ────────────────────────────────────────────────────────────
Pages.alertas = function () {
  const alertas = [
    ['🔴','Elevador B2 fora de operação','a-crit','d-red','Crítico','t-err','há 40min','Sensor IoT detectou falha no motor. Manutenção acionada automaticamente. Usuários redirecionados para elevador A1.'],
    ['🟡','Rampa C3 — obstáculo detectado pela IA','a-warn','d-warn','Atenção','t-warn','há 1h 12min','Câmera de monitoramento enviou imagem. IA identificou caixas bloqueando 80% da rampa. Demanda #1043 aberta automaticamente.'],
    ['🟡','Banheiro adaptado F1 — vistoria vencida','a-warn','d-warn','Atenção','t-warn','há 2h','Última vistoria há 32 dias (meta: 30 dias). Sistema agendou inspeção para amanhã às 08:00.'],
    ['🟢','Piso tátil A2 — reparo concluído','a-ok','d-green','Resolvido','t-ok','há 3h 20min','Demanda #1021 encerrada. Equipe substituiu 4m de piso tátil. Área liberada.'],
    ['🔵','Atualização firmware — sensores P-01 a P-05','a-info','d-blue','Info','t-info','há 5h','Firmware v2.3.1 instalado em 5 sensores. Melhoria de 15% na detecção de ocupação.'],
  ];

  return `
    <div class="pg-header">
      <div class="pg-title">Alertas do setor</div>
      <div class="pg-sub">Monitoramento em tempo real via sensores IoT e IA</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${alertas.map(([ico,t,ac,dc,s,stag,h,desc]) => `
        <div class="alert-box ${ac}">
          <div class="dot ${dc}"></div>
          <div style="flex:1">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:4px">
              <div style="font-size:13px;font-weight:800;color:var(--text)">${ico} ${t}</div>
              <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
                <span class="tag ${stag}">${s}</span>
                <span style="font-size:10px;color:var(--text3)">${h}</span>
              </div>
            </div>
            <div style="font-size:12px;color:var(--text2);line-height:1.5">${desc}</div>
          </div>
        </div>`).join('')}
    </div>`;
};

// ── Relatórios ─────────────────────────────────────────────────────────
Pages.relatorios = function () {
  const relatorios = [
    ['📊','Relatório mensal — Julho 2025','Consolidado de todas as demandas por setor','Gerado em 01/07/2025','t-ok','Disponível'],
    ['📈','Relatório de SLA — Q2 2025','Cumprimento de prazo por setor e tipo','Gerado em 01/06/2025','t-ok','Disponível'],
    ['🤖','Análise de padrões — 2025','IA detectou tendências nas demandas','Gerado em 15/06/2025','t-info','IA'],
    ['🔧','Diagnóstico de infraestrutura','Estado atual de sensores e equipamentos','Em geração...','t-warn','Aguarde'],
    ['👥','Índice de inclusão — Jun/2025','Score por setor: eMAG, NBR 9050 e LGPD','Gerado em 01/07/2025','t-ok','Disponível'],
    ['📋','Auditoria LGPD — 2025','Registro de acessos a dados pessoais','Gerado em 10/07/2025','t-ok','Disponível'],
  ];

  return `
    <div class="flex-between mb16">
      <div><div class="pg-title">Relatórios</div><div class="pg-sub">Gerados automaticamente por IA</div></div>
      <button class="btn btn-primary" onclick="UI.toast('Gerando relatório com IA...');setTimeout(()=>UI.toast('Relatório gerado!','ok'),2500)">🤖 Gerar com IA</button>
    </div>
    <div class="grid2">
      ${relatorios.map(([ico,t,d,s,tag,l]) => `
        <div class="card hover-row" onclick="UI.toast('Abrindo: ${t}')">
          <div style="font-size:24px;margin-bottom:8px">${ico}</div>
          <div style="font-size:14px;font-weight:800;color:var(--text);margin-bottom:4px">${t}</div>
          <div style="font-size:12px;color:var(--text3);line-height:1.5;margin-bottom:12px">${d}</div>
          <div style="display:flex;align-items:center;justify-content:space-between">
            <span style="font-size:11px;color:var(--text3)">${s}</span>
            <span class="tag ${tag}">${l}</span>
          </div>
        </div>`).join('')}
    </div>`;
};

// ── Funcionários ───────────────────────────────────────────────────────
Pages.funcionarios = function () {
  const lista = [
    {n:'Maria Ferreira', e:'maria.ferreira', s:'Engenharia',    t:'Motora',          st:'t-ok',  stl:'Ativo',   d:'2 em aberto'},
    {n:'João Santos',    e:'joao.santos',    s:'Operações',     t:'Auditiva (LIBRAS)',st:'t-ok',  stl:'Ativo',   d:'1 em aberto'},
    {n:'Carla Mendes',   e:'carla.mendes',   s:'Administrativo',t:'Visual',           st:'t-warn',stl:'Atenção', d:'Vistoria pendente'},
    {n:'Pedro Lima',     e:'pedro.lima',     s:'Logística',     t:'Motora',           st:'t-ok',  stl:'Ativo',   d:'Sem demandas'},
    {n:'Ana Keller',     e:'ana.keller',     s:'TI',            t:'Múltipla',         st:'t-err', stl:'Crítico', d:'3 em aberto'},
    {n:'Juliana Costa',  e:'juliana.costa',  s:'Logística',     t:'Auditiva',         st:'t-ok',  stl:'Ativo',   d:'Sem demandas'},
  ];

  return `
    <div class="flex-between mb16">
      <div><div class="pg-title">Funcionários PCD</div><div class="pg-sub">284 cadastrados · 12,4% do quadro total</div></div>
      <button class="btn btn-primary" onclick="UI.toast('Formulário de cadastro aberto')">➕ Cadastrar</button>
    </div>
    <div class="card">
      <div class="tbl-wrap">
        <table class="tbl">
          <thead><tr>
            <th>Nome</th><th style="width:120px">Setor</th><th style="width:130px">Tipo PCD</th><th style="width:80px">Status</th><th style="width:120px">Situação</th>
          </tr></thead>
          <tbody>
            ${lista.map(f => `
              <tr class="hover-row" onclick="UI.toast('Perfil: ${f.n}')">
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

// ── Sensores ───────────────────────────────────────────────────────────
let _sensorTimer = null;

Pages.sensores = function () {
  const sensores = [
    ['E-01','Elevador A — térreo',        'Elevador',   'Operando','t-ok', '1min'],
    ['E-07','Elevador B — 2º andar',      'Elevador',   'OFFLINE', 't-err','43min'],
    ['R-14','Rampa C3 — entrada sul',     'Câmera IA',  'ALERTA',  't-warn','12min'],
    ['R-02','Rampa A1 — entrada norte',   'Câmera IA',  'Livre',   't-ok', '2min'],
    ['P-03','Banheiro adaptado A1',       'Ocupação',   'Livre',   't-ok', '2min'],
    ['P-08','Banheiro adaptado F1',       'Ocupação',   'Livre',   't-ok', '4min'],
    ['S-11','Sinalização sonora — recep.','Áudio',      'Ativo',   't-ok', '1min'],
    ['T-04','Piso tátil — entrada',       'Pressão',    'Normal',  't-ok', '3min'],
  ];

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
        <span class="pulse ok live-dot" style="margin-left:auto"></span>
        <span style="font-size:11px;color:var(--text3);margin-left:4px" id="sensor-time">Ao vivo</span>
      </div>
      <div class="tbl-wrap">
        <table class="tbl">
          <thead><tr>
            <th style="width:55px">ID</th><th>Local</th><th style="width:90px">Tipo</th><th style="width:80px">Leitura</th><th style="width:75px">Status</th><th style="width:80px">Atualizado</th>
          </tr></thead>
          <tbody>
            ${sensores.map(([id,l,t,r,tag,u]) => `
              <tr>
                <td style="font-size:11px;font-weight:700;color:var(--text3)">${id}</td>
                <td style="color:var(--text)">${l}</td>
                <td style="color:var(--text2);font-size:12px">${t}</td>
                <td><span class="tag ${tag}">${r}</span></td>
                <td><span class="tag ${tag}">${tag==='t-ok'?'Online':tag==='t-warn'?'Alerta':'Offline'}</span></td>
                <td style="font-size:11px;color:var(--text3)">há ${u}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
};

// Timer ao vivo para sensores — iniciado pelo router após render
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
    {n:'Maria Ferreira', e:'maria.ferreira', s:'Engenharia', p:'Funcionário', u:'hoje 10:41', t:'t-ok'},
    {n:'Carlos Lima',    e:'carlos.lima',    s:'Operações',  p:'Gestor',      u:'hoje 09:30', t:'t-info'},
    {n:'Ana Paula',      e:'ana.paula',      s:'RH',         p:'RH',          u:'hoje 08:15', t:'t-info'},
    {n:'Roberto Souza',  e:'roberto.souza',  s:'TI',         p:'Admin',       u:'hoje 07:00', t:'t-warn'},
    {n:'Juliana Costa',  e:'juliana.costa',  s:'Logística',  p:'Funcionário', u:'ontem',      t:'t-ok'},
  ];

  return `
    <div class="flex-between mb16">
      <div><div class="pg-title">Usuários do sistema</div><div class="pg-sub">Gerenciamento de perfis e permissões</div></div>
      <button class="btn btn-primary" onclick="Pages._modalNovoUsuario()">➕ Novo usuário</button>
    </div>
    <div class="card">
      <div class="tbl-wrap">
        <table class="tbl">
          <thead><tr>
            <th>Usuário</th><th style="width:110px">Setor</th><th style="width:90px">Perfil</th><th style="width:100px">Último acesso</th><th style="width:80px">Ações</th>
          </tr></thead>
          <tbody>
            ${users.map(u => `
              <tr>
                <td><div style="font-weight:700;color:var(--text)">${u.n}</div><div style="font-size:11px;color:var(--text3)">${u.e}@petrobras.com</div></td>
                <td style="color:var(--text2)">${u.s}</td>
                <td><span class="tag ${u.t}">${u.p}</span></td>
                <td style="font-size:11px;color:var(--text3)">${u.u}</td>
                <td><button class="btn btn-ghost" style="font-size:11px;padding:4px 10px" onclick="UI.toast('Editando: ${u.n}')">Editar</button></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
};

Pages._modalNovoUsuario = function () {
  UI.openModal(`
    <div class="modal-title">Novo usuário <button class="modal-close" onclick="UI.closeModal('modal-user')">✕</button></div>
    <div class="form-group"><label class="form-label">Nome completo</label><input class="form-input" placeholder="Ex: Fernanda Oliveira"></div>
    <div class="form-group"><label class="form-label">E-mail</label><input class="form-input" placeholder="fernanda.oliveira@petrobras.com"></div>
    <div class="form-group">
      <label class="form-label">Setor</label>
      <select class="form-select"><option>Engenharia</option><option>Operações</option><option>RH</option><option>TI</option><option>Logística</option><option>Manutenção</option></select>
    </div>
    <div class="form-group">
      <label class="form-label">Perfil de acesso</label>
      <div class="chip-row" id="chips-perfil">
        <span class="chip sel" onclick="UI.selChip(this,'chips-perfil')">Funcionário</span>
        <span class="chip" onclick="UI.selChip(this,'chips-perfil')">Gestor</span>
        <span class="chip" onclick="UI.selChip(this,'chips-perfil')">RH</span>
        <span class="chip" onclick="UI.selChip(this,'chips-perfil')">Admin</span>
      </div>
    </div>
    <div style="display:flex;gap:8px;margin-top:8px">
      <button class="btn btn-primary" onclick="UI.closeModal('modal-user');UI.toast('Usuário criado com sucesso!','ok')">Criar usuário</button>
      <button class="btn btn-ghost"   onclick="UI.closeModal('modal-user')">Cancelar</button>
    </div>
  `, 'modal-user');
};

// ── Auditoria ──────────────────────────────────────────────────────────
Pages.auditoria = function () {
  const logs = [
    ['10:41','Login no sistema',                           'roberto.souza', 'Admin',      '10.0.1.4',  't-ok'],
    ['10:38','Demanda #1042 atualizada (status: Em análise)','carlos.lima', 'Gestor',     '10.0.2.11', 't-ok'],
    ['10:31','Relatório mensal exportado em PDF',          'ana.paula',    'RH',          '10.0.3.7',  't-ok'],
    ['10:14','Sensor E-07 marcado como offline',           'sistema',      'Auto',        '—',         't-warn'],
    ['09:58','Novo usuário criado: juliana.costa',         'roberto.souza','Admin',       '10.0.1.4',  't-info'],
    ['09:30','Login no sistema',                           'carlos.lima',  'Gestor',      '10.0.2.11', 't-ok'],
    ['09:14','Demanda #1042 registrada por Maria Ferreira','maria.ferreira','Funcionário','10.0.4.22', 't-ok'],
    ['08:15','Login no sistema',                           'ana.paula',    'RH',          '10.0.3.7',  't-ok'],
    ['07:00','Backup automático concluído — 2,3 GB',       'sistema',      'Auto',        '—',         't-ok'],
  ];

  return `
    <div class="pg-header">
      <div class="pg-title">Log de auditoria</div>
      <div class="pg-sub">Todos os acessos a dados pessoais registrados — conformidade LGPD Art. 37</div>
    </div>
    <div class="card">
      <div class="tbl-wrap">
        <table class="tbl">
          <thead><tr>
            <th style="width:55px">Hora</th><th>Ação</th><th style="width:120px">Usuário</th><th style="width:75px">Perfil</th><th style="width:75px">IP</th><th style="width:65px">Status</th>
          </tr></thead>
          <tbody>
            ${logs.map(([h,a,u,p,ip,tag]) => `
              <tr class="hover-row">
                <td style="font-size:11px;font-weight:700;color:var(--brand-primary)">${h}</td>
                <td style="color:var(--text);font-size:12px">${a}</td>
                <td style="color:var(--text3);font-size:11px">${u}</td>
                <td><span class="tag t-gray">${p}</span></td>
                <td style="font-size:11px;color:var(--text3)">${ip}</td>
                <td><span class="tag ${tag}">${tag==='t-ok'?'OK':tag==='t-warn'?'Aviso':'Info'}</span></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
};
