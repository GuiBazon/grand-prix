/**
 * pages/dash.js — Painel principal (por perfil)
 */

Pages.dash = function () {
  const now = new Date();
  const hora = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const hoje = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  if (State.profile === 'funcionario') {
    const recentes = State.demandas.slice(0, 2);
    return `
      <div class="pg-header">
        <div class="pg-title">Bom dia, Maria 👋</div>
        <div class="pg-sub">Você tem 2 demandas em aberto · ${hoje}</div>
      </div>
      <div class="grid4">
        <div class="metric">       <div class="mlabel">Demandas abertas</div><div class="mval blue">2</div><div class="msub">1 aguarda retorno</div></div>
        <div class="metric green"> <div class="mlabel">Resolvidas (30d)</div><div class="mval green">7</div><div class="msub">Dentro do prazo</div></div>
        <div class="metric">       <div class="mlabel">Tempo médio</div><div class="mval">3,2d</div><div class="msub">Última resolução</div></div>
        <div class="metric yellow"><div class="mlabel">Recursos ativos</div><div class="mval yellow">4</div><div class="msub">Disponíveis para você</div></div>
      </div>
      <div class="grid2">
        <div class="card">
          <div class="card-title"><span class="card-accent"></span>Minhas demandas recentes</div>
          ${recentes.map(d => `
            <div class="trow hover-row" onclick="Pages._openDemanda('${d.id}')">
              <div style="flex:1">
                <div style="font-weight:700;font-size:13px;color:var(--text)">${d.titulo}</div>
                <div style="font-size:11px;color:var(--text3)">${d.tipo} · ${d.data}</div>
              </div>
              <span class="tag ${d.statusTag}">${d.status}</span>
            </div>`).join('')}
          <div class="mt12">
            <button class="btn btn-ghost" style="width:100%;justify-content:center" onclick="State.goTo('demandas')">Ver todas as demandas →</button>
          </div>
        </div>
        <div class="card">
          <div class="card-title"><span class="card-accent yellow"></span>Ações rápidas</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <button class="btn btn-primary"   onclick="State.goTo('nova')"    style="justify-content:center">➕ Registrar nova demanda</button>
            <button class="btn btn-secondary" onclick="State.goTo('recursos')" style="justify-content:center">♿ Recursos de acessibilidade</button>
            <button class="btn btn-ghost"     onclick="State.goTo('acc')"      style="justify-content:center">⚙️ Configurar acessibilidade</button>
          </div>
          <div class="alert-box a-info mt12">
            <div class="dot d-blue"></div>
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--text)">Dica de acessibilidade</div>
              <div style="font-size:11px;color:var(--text2);margin-top:2px">Ative a narração automática em ⚙️ para ouvir o conteúdo da tela em voz alta.</div>
            </div>
          </div>
        </div>
      </div>`;
  }

  if (State.profile === 'gestor') return `
    <div class="pg-header">
      <div class="pg-title">Painel — Operações</div>
      <div class="pg-sub">Atualizado às ${hora} · Setor com <b>14 demandas abertas</b></div>
    </div>
    <div class="grid4">
      <div class="metric">      <div class="mlabel">Demandas abertas</div><div class="mval blue">14</div><div class="msub">+3 nesta semana</div></div>
      <div class="metric green"><div class="mlabel">Resolvidas (mês)</div><div class="mval green">31</div><div class="msub">Meta: 28 ✓</div></div>
      <div class="metric">      <div class="mlabel">Tempo médio</div><div class="mval">2,8d</div><div class="msub">Abaixo da meta</div></div>
      <div class="metric green"><div class="mlabel">SLA cumprido</div><div class="mval green">89%</div><div class="msub">Meta: 85% ✓</div></div>
    </div>
    <div class="grid2">
      <div class="card">
        <div class="card-title"><span class="card-accent"></span>Demandas por tipo</div>
        ${[['Rampas e acessos',72],['Intérprete LIBRAS',45],['Equipamentos',38],['Documentação',28],['Infraestrutura',17],['Outros',12]].map(([l,v]) => `
          <div style="margin-bottom:12px">
            <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text2);margin-bottom:2px"><span>${l}</span><span style="font-weight:700;color:var(--brand-primary)">${v}%</span></div>
            <div class="bar-bg"><div class="bar-fill" style="width:${v}%"></div></div>
          </div>`).join('')}
      </div>
      <div class="card">
        <div class="card-title"><span class="card-accent red"></span>Alertas ativos</div>
        <div class="alert-box a-crit"><div class="dot d-red"></div><div><div style="font-size:12px;font-weight:700;color:var(--text)">🔴 Elevador B2 fora de operação</div><div style="font-size:11px;color:var(--text2)">Sensor IoT detectou falha há 40min.</div><button class="btn btn-ghost mt8" style="font-size:11px;padding:4px 10px" onclick="State.goTo('alertas')">Ver detalhe →</button></div></div>
        <div class="alert-box a-warn"><div class="dot d-warn"></div><div><div style="font-size:12px;font-weight:700;color:var(--text)">🟡 Rampa C3 — obstáculo detectado</div><div style="font-size:11px;color:var(--text2)">IA identificou bloqueio por foto há 1h12min.</div></div></div>
        <div class="alert-box a-ok"><div class="dot d-green"></div><div><div style="font-size:12px;font-weight:700;color:var(--text)">✅ Banheiro adaptado A1 — OK</div><div style="font-size:11px;color:var(--text2)">Vistoria confirmada hoje às 08:14.</div></div></div>
      </div>
    </div>`;

  if (State.profile === 'rh') return `
    <div class="pg-header">
      <div class="pg-title">Painel de Inclusão — RH</div>
      <div class="pg-sub">Visão consolidada · Todos os setores</div>
    </div>
    <div class="grid4">
      <div class="metric">       <div class="mlabel">Funcionários PCD</div><div class="mval blue">284</div><div class="msub">12,4% do quadro</div></div>
      <div class="metric yellow"><div class="mlabel">Demandas abertas</div><div class="mval warn">47</div><div class="msub">Todos os setores</div></div>
      <div class="metric red">   <div class="mlabel">Setores críticos</div><div class="mval red">3</div><div class="msub">Abaixo do SLA</div></div>
      <div class="metric">       <div class="mlabel">Índice de inclusão</div><div class="mval">7,4</div><div class="msub">Meta: 8,0</div></div>
    </div>
    <div class="grid2">
      <div class="card">
        <div class="card-title"><span class="card-accent green"></span>Tipos de deficiência</div>
        ${[['Física / motora',61,'green'],['Visual',38,''],['Auditiva — LIBRAS',29,''],['Intelectual',18,''],['Múltipla',14,'']].map(([l,v,c]) => `
          <div style="margin-bottom:12px">
            <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text2)"><span>${l}</span><span style="font-weight:700">${v} func.</span></div>
            <div class="bar-bg"><div class="bar-fill ${c}" style="width:${Math.round(v/61*100)}%"></div></div>
          </div>`).join('')}
      </div>
      <div class="card">
        <div class="card-title"><span class="card-accent red"></span>Setores com mais demandas</div>
        ${[['Operações',14,'t-err'],['Manutenção',11,'t-warn'],['Administrativo',9,'t-info'],['Engenharia',7,'t-gray'],['Logística',6,'t-gray']].map(([l,v,t]) => `
          <div class="trow"><div style="flex:1;font-size:13px;font-weight:600;color:var(--text)">${l}</div><span class="tag ${t}">${v} demandas</span></div>`).join('')}
        <div class="mt12"><button class="btn btn-primary" onclick="State.goTo('relatorios')" style="width:100%;justify-content:center">📈 Ver relatório completo</button></div>
      </div>
    </div>`;

  // Admin
  return `
    <div class="pg-header">
      <div class="pg-title">Visão geral do sistema</div>
      <div class="pg-sub">Status em tempo real · Administrador</div>
    </div>
    <div class="grid4">
      <div class="metric">      <div class="mlabel">Usuários ativos</div><div class="mval blue">1.247</div><div class="msub">Online: 38</div></div>
      <div class="metric green"><div class="mlabel">Sensores online</div><div class="mval green">142/148</div><div class="msub">6 com alerta</div></div>
      <div class="metric">      <div class="mlabel">Uptime</div><div class="mval green">99,8%</div><div class="msub">Últimos 30 dias</div></div>
      <div class="metric yellow"><div class="mlabel">Chamadas de IA</div><div class="mval">3.412</div><div class="msub">Hoje</div></div>
    </div>
    <div class="grid2">
      <div class="card">
        <div class="card-title"><span class="card-accent green"></span>Status dos serviços</div>
        ${[['API backend (Laravel)','Operacional','t-ok'],['Microsserviço IA — visão','Operacional','t-ok'],['STT Whisper / TTS','Operacional','t-ok'],['WebSocket / alertas','Operacional','t-ok'],['MQTT broker — sensores','1 falha ativa','t-warn'],['Banco PostgreSQL','Operacional','t-ok'],['Redis / cache','Operacional','t-ok']].map(([l,s,t]) => `
          <div class="trow"><div style="flex:1;font-size:12px;color:var(--text)">${l}</div><span class="tag ${t}">${s}</span></div>`).join('')}
      </div>
      <div class="card">
        <div class="card-title"><span class="card-accent"></span>Ações recentes</div>
        ${[['IA classificou 12 demandas automaticamente','há 2 min'],['Alerta: sensor E-07 offline (Elevador B2)','há 8 min'],['Relatório mensal gerado pelo RH','há 31 min'],['Novo usuário criado: juliana.costa','há 1h'],['Backup automático concluído','há 3h']].map(([a,t]) => `
          <div class="trow"><div style="flex:1;font-size:12px;color:var(--text)">${a}</div><span style="font-size:10px;color:var(--text3);flex-shrink:0">${t}</span></div>`).join('')}
      </div>
    </div>`;
};
