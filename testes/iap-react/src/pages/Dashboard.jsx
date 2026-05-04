import { useToast } from "../components/Toast";
import {
  demandasPorTipo,
  alertasDashGestor,
  tiposDeficiencia,
  setoresDemandas,
  servicosSistema,
  acoesSistema,
} from "../data/mockData";

/**
 * Componente Dashboard — renderiza variante diferente por perfil
 */
export default function Dashboard({ currentProfile, onNavigate }) {
  switch (currentProfile) {
    case "funcionario":
      return <DashFuncionario onNavigate={onNavigate} />;
    case "gestor":
      return <DashGestor />;
    case "rh":
      return <DashRH />;
    case "admin":
      return <DashAdmin />;
    default:
      return <DashFuncionario onNavigate={onNavigate} />;
  }
}

/* ══ Dashboard Funcionário ════════════════════════════ */
function DashFuncionario({ onNavigate }) {
  const toast = useToast();

  return (
    <>
      <div className="page-header">
        <div className="page-title">Bom dia, Maria 👋</div>
        <div className="page-subtitle">Você tem 2 demandas em andamento</div>
      </div>

      <div className="grid4" style={{ marginBottom: "20px" }}>
        <div className="metric">
          <div className="metric-label">Demandas abertas</div>
          <div className="metric-value" style={{ color: "var(--color-text-info)" }}>2</div>
          <div className="metric-sub">1 aguardando resposta</div>
        </div>
        <div className="metric">
          <div className="metric-label">Resolvidas</div>
          <div className="metric-value" style={{ color: "var(--color-text-success)" }}>7</div>
          <div className="metric-sub">Últimos 30 dias</div>
        </div>
        <div className="metric">
          <div className="metric-label">Tempo médio</div>
          <div className="metric-value">3,2d</div>
          <div className="metric-sub">De resolução</div>
        </div>
        <div className="metric">
          <div className="metric-label">Recursos ativos</div>
          <div className="metric-value">4</div>
          <div className="metric-sub">Disponíveis para você</div>
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <div className="section-title">Últimas demandas</div>
          <div className="row" style={{ cursor: "pointer" }} onClick={() => toast("📋 Abrindo demanda #1042")}>
            <div className="avatar av-warn" style={{ fontSize: "14px" }}>!</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "13px", fontWeight: 600 }}>Rampa bloqueada — Bloco C</div>
              <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>Aberta há 2 dias</div>
            </div>
            <span className="tag tag-warn">Em análise</span>
          </div>
          <div className="row" style={{ cursor: "pointer" }} onClick={() => toast("📋 Abrindo demanda #1039")}>
            <div className="avatar av-blue" style={{ fontSize: "14px" }}>i</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "13px", fontWeight: 600 }}>Solicitação de intérprete LIBRAS</div>
              <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>Aberta há 5 dias</div>
            </div>
            <span className="tag tag-info">Aguardando</span>
          </div>
        </div>

        <div className="card">
          <div className="section-title">Ações rápidas</div>
          <div style={{ display: "grid", gap: "10px", marginTop: "4px" }}>
            <button className="btn-primary" onClick={() => onNavigate("nova")}
              style={{ width: "100%", textAlign: "left", padding: "12px 16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>+</span> Registrar nova demanda
            </button>
            <button className="btn-sec" onClick={() => onNavigate("recursos")}
              style={{ width: "100%", textAlign: "left", padding: "12px 16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>◑</span> Recursos de acessibilidade
            </button>
            <button className="btn-sec" onClick={() => onNavigate("acessibilidade")}
              style={{ width: "100%", textAlign: "left", padding: "12px 16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>◐</span> Configurar interface
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ══ Dashboard Gestor ═════════════════════════════════ */
function DashGestor() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">Painel — Operações</div>
        <div className="page-subtitle">Atualizado há 3 minutos</div>
      </div>

      <div className="grid4" style={{ marginBottom: "20px" }}>
        <div className="metric">
          <div className="metric-label">Demandas abertas</div>
          <div className="metric-value" style={{ color: "var(--color-text-warning)" }}>14</div>
          <div className="metric-sub">+3 esta semana</div>
        </div>
        <div className="metric">
          <div className="metric-label">Resolvidas no mês</div>
          <div className="metric-value" style={{ color: "var(--color-text-success)" }}>31</div>
          <div className="metric-sub">Meta: 28 ✓</div>
        </div>
        <div className="metric">
          <div className="metric-label">Tempo médio</div>
          <div className="metric-value">2,8d</div>
          <div className="metric-sub">Abaixo da meta</div>
        </div>
        <div className="metric">
          <div className="metric-label">SLA cumprido</div>
          <div className="metric-value" style={{ color: "var(--color-text-success)" }}>89%</div>
          <div className="metric-sub">Meta: 85%</div>
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <div className="section-title">Demandas por tipo</div>
          {demandasPorTipo.map((item) => (
            <div key={item.label} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                <span style={{ fontWeight: 500 }}>{item.label}</span>
                <span style={{ color: "var(--color-text-info)", fontWeight: 600 }}>{item.valor}%</span>
              </div>
              <div className="bar-bg">
                <div className="bar-fill" style={{ width: `${item.valor}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="section-title">Alertas ativos</div>
          {alertasDashGestor.map((alerta) => (
            <div key={alerta.titulo} className={`alert-item ${alerta.alertClass}`}>
              <div className={`dot ${alerta.dotClass}`} />
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600 }}>{alerta.titulo}</div>
                <div style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginTop: "2px" }}>{alerta.descricao}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ══ Dashboard RH ═════════════════════════════════════ */
function DashRH() {
  const maxValor = Math.max(...tiposDeficiencia.map((t) => t.valor));

  return (
    <>
      <div className="page-header">
        <div className="page-title">Painel de Inclusão — RH</div>
        <div className="page-subtitle">Visão consolidada de todos os setores</div>
      </div>

      <div className="grid4" style={{ marginBottom: "20px" }}>
        <div className="metric">
          <div className="metric-label">Funcionários PCD</div>
          <div className="metric-value" style={{ color: "var(--color-text-info)" }}>284</div>
          <div className="metric-sub">12,4% do quadro</div>
        </div>
        <div className="metric">
          <div className="metric-label">Demandas abertas</div>
          <div className="metric-value" style={{ color: "var(--color-text-warning)" }}>47</div>
          <div className="metric-sub">Todos os setores</div>
        </div>
        <div className="metric">
          <div className="metric-label">Setores críticos</div>
          <div className="metric-value" style={{ color: "var(--color-text-danger)" }}>3</div>
          <div className="metric-sub">Abaixo do SLA</div>
        </div>
        <div className="metric">
          <div className="metric-label">Índice inclusão</div>
          <div className="metric-value">7,4</div>
          <div className="metric-sub">Meta: 8,0</div>
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <div className="section-title">Tipos de deficiência atendidos</div>
          {tiposDeficiencia.map((item) => (
            <div key={item.label} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                <span style={{ fontWeight: 500 }}>{item.label}</span>
                <span style={{ color: "var(--color-text-secondary)" }}>{item.valor} funcionários</span>
              </div>
              <div className="bar-bg">
                <div className="bar-fill" style={{ width: `${Math.round((item.valor / maxValor) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="section-title">Setores com mais demandas</div>
          {setoresDemandas.map((item) => (
            <div key={item.label} className="row">
              <div style={{ flex: 1, fontSize: "13px", fontWeight: 500 }}>{item.label}</div>
              <span className={`tag ${item.tag}`}>{item.valor} demandas</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ══ Dashboard Admin ══════════════════════════════════ */
function DashAdmin() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">Visão geral do sistema</div>
        <div className="page-subtitle">Status em tempo real</div>
      </div>

      <div className="grid4" style={{ marginBottom: "20px" }}>
        <div className="metric">
          <div className="metric-label">Usuários ativos</div>
          <div className="metric-value">1.247</div>
          <div className="metric-sub">Online agora: 38</div>
        </div>
        <div className="metric">
          <div className="metric-label">Sensores online</div>
          <div className="metric-value" style={{ color: "var(--color-text-success)" }}>142/148</div>
          <div className="metric-sub">6 em alerta</div>
        </div>
        <div className="metric">
          <div className="metric-label">Uptime</div>
          <div className="metric-value" style={{ color: "var(--color-text-success)" }}>99,8%</div>
          <div className="metric-sub">Últimos 30 dias</div>
        </div>
        <div className="metric">
          <div className="metric-label">Chamadas de IA</div>
          <div className="metric-value" style={{ color: "var(--color-text-info)" }}>3.412</div>
          <div className="metric-sub">Hoje</div>
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <div className="section-title">Status dos serviços</div>
          {servicosSistema.map((item) => (
            <div key={item.label} className="row">
              <div style={{ flex: 1, fontSize: "13px", fontWeight: 500 }}>{item.label}</div>
              <span className={`tag ${item.tag}`}>{item.status}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="section-title">Últimas ações do sistema</div>
          {acoesSistema.map((item, i) => (
            <div key={i} className="row">
              <div style={{ flex: 1, fontSize: "13px", fontWeight: 500 }}>{item.acao}</div>
              <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)", fontWeight: 500, whiteSpace: "nowrap" }}>{item.tempo}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
