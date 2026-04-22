/**
 * pages/demandas.js — Lista de demandas + modal de detalhe
 */

Pages.demandas = function () {
  const lista = State.profile === 'funcionario'
    ? State.demandas.filter(d => d.autor.includes('Maria'))
    : State.demandas;

  return `
    <div class="flex-between mb16">
      <div>
        <div class="pg-title">Demandas</div>
        <div class="pg-sub">${lista.length} demandas encontradas</div>
      </div>
      ${State.profile === 'funcionario' ? `<button class="btn btn-primary" onclick="State.goTo('nova')">➕ Nova demanda</button>` : ''}
    </div>
    <div class="card">
      <div class="tbl-wrap">
        <table class="tbl">
          <thead><tr>
            <th style="width:65px">ID</th>
            <th>Título</th>
            <th style="width:90px">Tipo</th>
            <th style="width:70px">Prioridade</th>
            <th style="width:100px">Status</th>
            <th style="width:60px">Data</th>
          </tr></thead>
          <tbody>
            ${lista.map(d => `
              <tr class="hover-row" onclick="Pages._openDemanda('${d.id}')" title="Clique para ver detalhes">
                <td style="color:var(--text3);font-size:11px;font-weight:700">${d.id}</td>
                <td>
                  <div style="font-weight:700;color:var(--text)">${d.titulo}</div>
                  <div style="font-size:11px;color:var(--text3)">${d.autor} · ${d.setor}</div>
                </td>
                <td><span class="tag t-gray">${d.tipo}</span></td>
                <td><span class="tag ${d.prioridade === 'Alta' || d.prioridade === 'Urgente' ? 't-err' : 't-warn'}">${d.prioridade}</span></td>
                <td><span class="tag ${d.statusTag}">${d.status}</span></td>
                <td style="font-size:11px;color:var(--text3)">${d.data}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
};

Pages._openDemanda = function (id) {
  const d = State.demandas.find(x => x.id === id);
  if (!d) return;

  if (State.acc.narr) Accessibility.speak(`Demanda ${d.id}: ${d.titulo}. Status: ${d.status}`);

  UI.openModal(`
    <div class="modal-title">
      <div>
        <span style="font-size:13px;color:var(--text3);font-weight:400">${d.id}</span><br>
        ${d.titulo}
      </div>
      <button class="modal-close" onclick="UI.closeModal('modal-demanda')" aria-label="Fechar">✕</button>
    </div>
    <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap">
      <span class="tag t-gray">${d.tipo}</span>
      <span class="tag ${d.statusTag}">${d.status}</span>
      <span class="tag ${d.prioridade === 'Alta' ? 't-err' : 't-warn'}">${d.prioridade}</span>
      ${d.fotos ? `<span class="tag t-info">📷 Foto anexada</span>` : ''}
    </div>
    <div style="font-size:12px;color:var(--text2);line-height:1.6;margin-bottom:16px;padding:10px;background:var(--surface2);border-radius:8px">${d.desc}</div>
    <div style="font-size:11px;font-weight:800;color:var(--text3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:10px">Histórico</div>
    <div class="demanda-timeline">
      ${d.historico.map(h => `
        <div class="dt-item ${h.ok ? 'ok' : ''}">
          <div style="font-size:12px;font-weight:700;color:var(--text)">${h.t}</div>
          <div style="font-size:10px;color:var(--text3)">${h.d}</div>
        </div>`).join('')}
    </div>
    <div style="display:flex;gap:8px;margin-top:18px">
      ${d.status !== 'Resolvida' ? `<button class="btn btn-secondary" onclick="Pages._resolverDemanda('${d.id}')">✅ Marcar como resolvida</button>` : ''}
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
