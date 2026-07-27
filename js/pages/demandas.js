/**
 * pages/demandas.js — Lista de demandas + modal de detalhe
 */

Pages.demandas = function () {
  const p     = PROFILES[State.profile];
  const lista = State.profile === 'funcionario'
    ? State.demandas.filter(d => d.autor === p.name)
    : State.demandas;

  const abertas   = lista.filter(d => d.status !== 'Resolvida').length;
  const resolvidas = lista.filter(d => d.status === 'Resolvida').length;

  return `
    <div class="flex-between mb16">
      <div>
        <div class="pg-title">Demandas</div>
        <div class="pg-sub">
          ${lista.length} demanda${lista.length !== 1 ? 's' : ''} encontrada${lista.length !== 1 ? 's' : ''}
          · <span style="color:var(--brand-primary);font-weight:700">${abertas} em aberto</span>
          · <span style="color:var(--brand-secondary);font-weight:700">${resolvidas} resolvida${resolvidas !== 1 ? 's' : ''}</span>
        </div>
      </div>
      ${State.profile === 'funcionario'
        ? `<button class="btn btn-primary" onclick="State.goTo('nova')">➕ Nova demanda</button>`
        : ''}
    </div>
    ${lista.length === 0 ? `
      <div class="card" style="text-align:center;padding:48px 24px">
        <div style="font-size:40px;margin-bottom:12px">📋</div>
        <div style="font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px">Nenhuma demanda encontrada</div>
        <div style="font-size:13px;color:var(--text3)">Quando você registrar uma demanda, ela aparecerá aqui.</div>
        ${State.profile === 'funcionario' ? `<button class="btn btn-primary mt12" onclick="State.goTo('nova')">➕ Registrar primeira demanda</button>` : ''}
      </div>` : `
    <div class="card">
      <div class="tbl-wrap">
        <table class="tbl" aria-label="Lista de demandas">
          <thead>
            <tr>
              <th style="width:65px" scope="col">ID</th>
              <th scope="col">Título</th>
              <th style="width:100px" scope="col">Tipo</th>
              <th style="width:80px"  scope="col">Prioridade</th>
              <th style="width:105px" scope="col">Status</th>
              <th style="width:65px"  scope="col">Data</th>
            </tr>
          </thead>
          <tbody>
            ${lista.map(d => `
              <tr class="hover-row"
                  onclick="Pages._openDemanda('${d.id}')"
                  onkeydown="if(event.key==='Enter'||event.key===' '){Pages._openDemanda('${d.id}');}"
                  tabindex="0"
                  role="button"
                  aria-label="Demanda ${d.id}: ${d.titulo}, status ${d.status}">
                <td style="color:var(--text3);font-size:11px;font-weight:700">${d.id}</td>
                <td>
                  <div style="font-weight:700;color:var(--text)">${d.titulo}</div>
                  <div style="font-size:11px;color:var(--text3)">${d.autor} · ${d.setor}</div>
                </td>
                <td><span class="tag t-gray">${d.tipo}</span></td>
                <td><span class="tag ${d.prioridade === 'Alta' || d.prioridade === 'Urgente' ? 't-err' : d.prioridade === 'Média' ? 't-warn' : 't-gray'}">${d.prioridade}</span></td>
                <td><span class="tag ${d.statusTag}">${d.status}</span></td>
                <td style="font-size:11px;color:var(--text3)">${d.data}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`}`;
};

Pages._openDemanda = function (id) {
  const d = State.demandas.find(x => x.id === id);
  if (!d) return;

  if (State.acc.narr) Accessibility.speak(`Demanda ${d.id}: ${d.titulo}. Status: ${d.status}`);

  UI.openModal(`
    <div class="modal-title">
      <div>
        <span style="font-size:12px;color:var(--text3);font-weight:400;display:block;margin-bottom:4px">${d.id}</span>
        ${d.titulo}
      </div>
      <button class="modal-close" onclick="UI.closeModal('modal-demanda')" aria-label="Fechar modal">✕</button>
    </div>
    <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap">
      <span class="tag t-gray">${d.tipo}</span>
      <span class="tag ${d.statusTag}">${d.status}</span>
      <span class="tag ${d.prioridade === 'Alta' || d.prioridade === 'Urgente' ? 't-err' : 't-warn'}">${d.prioridade}</span>
      ${d.fotos ? `<span class="tag t-info">📷 Foto anexada</span>` : ''}
    </div>
    <div style="font-size:12px;color:var(--text2);line-height:1.7;margin-bottom:16px;padding:12px;background:var(--surface2);border-radius:8px">${d.desc}</div>
    <div style="font-size:11px;font-weight:800;color:var(--text3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:10px">Histórico</div>
    <div class="demanda-timeline" aria-label="Histórico da demanda">
      ${d.historico.map(h => `
        <div class="dt-item ${h.ok ? 'ok' : ''}">
          <div style="font-size:12px;font-weight:700;color:var(--text)">${h.t}</div>
          <div style="font-size:10px;color:var(--text3)">${h.d}</div>
        </div>`).join('')}
    </div>
    <div style="display:flex;gap:8px;margin-top:18px;flex-wrap:wrap">
      ${d.status !== 'Resolvida'
        ? `<button class="btn btn-secondary" onclick="Pages._resolverDemanda('${d.id}')">✅ Marcar como resolvida</button>`
        : `<div class="tag t-ok" style="padding:8px 14px;font-size:12px">✅ Demanda resolvida</div>`}
      <button class="btn btn-ghost" onclick="UI.closeModal('modal-demanda')">Fechar</button>
    </div>
  `, 'modal-demanda');
};

Pages._resolverDemanda = function (id) {
  State.resolveDemanda(id);
  UI.closeModal('modal-demanda');
  Router.render();
  UI.toast('Demanda ' + id + ' marcada como resolvida!', 'ok');
};
