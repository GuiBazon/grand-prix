/**
 * pages/nova.js — Formulário de nova demanda
 */

Pages.nova = function () {
  return `
    <div class="pg-header">
      <div class="pg-title">Nova demanda</div>
      <div class="pg-sub">Preencha os dados — a IA irá classificar e rotear automaticamente</div>
    </div>
    <div style="max-width:580px">
      <div class="card mb16">
        <div class="card-title"><span class="card-accent"></span>Informações da demanda</div>
        <div class="form-group">
          <label class="form-label" for="nd-tipo">Tipo de demanda</label>
          <select class="form-select" id="nd-tipo">
            <option value="">Selecione...</option>
            <option>Rampa / acesso</option>
            <option>Equipamento adaptado</option>
            <option>Intérprete de LIBRAS</option>
            <option>Piso tátil</option>
            <option>Banheiro adaptado</option>
            <option>Ergonomia / posto de trabalho</option>
            <option>Sinalização</option>
            <option>Transporte acessível</option>
            <option>Outro</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label" for="nd-local">Localização</label>
          <input class="form-input" id="nd-local" type="text" placeholder="Ex: Bloco C, 2º andar, corredor principal">
        </div>
        <div class="form-group">
          <label class="form-label">Prioridade</label>
          <div class="chip-row" id="chips-prio">
            <span class="chip"     onclick="UI.selChip(this,'chips-prio')">Baixa</span>
            <span class="chip sel" onclick="UI.selChip(this,'chips-prio')">Média</span>
            <span class="chip"     onclick="UI.selChip(this,'chips-prio')">Alta</span>
            <span class="chip"     onclick="UI.selChip(this,'chips-prio')">Urgente</span>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="nd-desc">Descrição detalhada</label>
          <textarea class="form-textarea" id="nd-desc"
            placeholder="Descreva a situação com o máximo de detalhes. A IA irá analisar e sugerir soluções..."
            oninput="Pages._aiSuggest()"></textarea>
        </div>
      </div>

      <div class="card mb16">
        <div class="card-title"><span class="card-accent yellow"></span>Evidências</div>
        <div class="form-group">
          <div class="upload-zone" onclick="Pages._simularUpload()" role="button" tabindex="0">
            <div style="font-size:28px;margin-bottom:8px">📷</div>
            <div style="font-weight:700">Clique para anexar foto ou áudio</div>
            <div style="font-size:11px;color:var(--text3);margin-top:4px">A IA analisará imagens automaticamente</div>
          </div>
          <div id="upload-preview" style="display:none;margin-top:10px;padding:10px;background:var(--brand-secondary-l);border-radius:8px;border:1px solid var(--brand-secondary);font-size:12px;color:var(--brand-secondary-d)">
            ✅ Foto anexada — IA iniciando análise...
          </div>
        </div>
        <div id="ai-analysis" style="display:none" class="alert-box a-info">
          <span>🤖</span>
          <div>
            <div style="font-size:12px;font-weight:700;color:var(--text)">Análise da IA</div>
            <div style="font-size:11px;color:var(--text2);margin-top:2px" id="ai-analysis-text">Processando imagem...</div>
          </div>
        </div>
      </div>

      <div id="ai-suggest-box" style="display:none" class="card mb16">
        <div class="card-title"><span class="card-accent green"></span>💡 Sugestão da IA</div>
        <div id="ai-suggest-text" style="font-size:13px;color:var(--text2);line-height:1.6"></div>
      </div>

      <div style="display:flex;gap:8px">
        <button class="btn btn-primary" onclick="Pages._submeterDemanda()">✅ Registrar demanda</button>
        <button class="btn btn-ghost"   onclick="State.goTo('demandas')">Cancelar</button>
      </div>
    </div>`;
};

Pages._aiSuggest = function () {
  const desc = document.getElementById('nd-desc')?.value || '';
  const box  = document.getElementById('ai-suggest-box');
  const txt  = document.getElementById('ai-suggest-text');
  if (!box || !txt) return;

  const sugestoes = {
    rampa:    'Baseado em 14 demandas similares, tempo médio: 2,3 dias. Manutenção Civil foi responsável em 80% dos casos.',
    libras:   'Temos 3 intérpretes disponíveis. Demanda encaminhada ao RH. Prazo médio: 3 dias úteis.',
    elevador: 'Demandas de elevador têm SLA de 24h por impacto em mobilidade.',
    piso:     'Reparo de piso tátil: prazo médio 1,5 dias. Material em estoque no almoxarifado.',
  };

  if (desc.length > 20) {
    box.style.display = 'block';
    const key = Object.keys(sugestoes).find(k => desc.toLowerCase().includes(k));
    txt.textContent = key ? sugestoes[key] : 'Analisando o texto... Demanda será classificada automaticamente ao registrar.';
  } else {
    box.style.display = 'none';
  }
};

Pages._simularUpload = function () {
  const prev     = document.getElementById('upload-preview');
  const anal     = document.getElementById('ai-analysis');
  const analText = document.getElementById('ai-analysis-text');
  if (!prev) return;

  prev.style.display = 'block';
  if (anal) anal.style.display = 'flex';
  if (analText) analText.textContent = 'Processando imagem...';

  setTimeout(() => {
    if (analText) analText.textContent = '✅ Obstáculo físico detectado (confiança: 94%). Área de 2,3m² bloqueada. Recomenda-se prioridade Alta.';
    UI.toast('IA analisou a imagem com sucesso!', 'ok');
  }, 1800);
};

Pages._submeterDemanda = function () {
  const tipo  = document.getElementById('nd-tipo')?.value;
  const local = document.getElementById('nd-local')?.value;
  const desc  = document.getElementById('nd-desc')?.value;
  const prio  = document.querySelector('#chips-prio .chip.sel')?.textContent || 'Média';

  if (!tipo)              { UI.toast('Selecione o tipo de demanda', 'err'); return; }
  if (!local)             { UI.toast('Informe a localização', 'err'); return; }
  if (!desc || desc.length < 10) { UI.toast('Descreva a situação com mais detalhes', 'err'); return; }

  const novaId = '#' + (1043 + State.demandas.length);
  State.addDemanda({
    id: novaId,
    titulo: tipo + ' — ' + local,
    tipo, prioridade: prio,
    status: 'Em análise', statusTag: 't-warn',
    autor: PROFILES[State.profile].name,
    setor: 'Engenharia',
    data: new Date().toLocaleDateString('pt-BR'),
    desc, fotos: false,
    historico: [
      { d: 'Agora', t: 'Demanda registrada', ok: false },
      { d: 'Agora', t: 'IA iniciou análise e classificação automática', ok: true },
    ],
  });

  UI.toast('Demanda ' + novaId + ' registrada! IA iniciou análise.', 'ok');
  if (State.acc.narr) Accessibility.speak('Demanda registrada com sucesso. Número ' + novaId);
  setTimeout(() => State.goTo('demandas'), 1200);
};
