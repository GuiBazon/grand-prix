import { sensores } from "../data/mockData";

export default function Sensores() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">Monitoramento de sensores</div>
        <div className="page-subtitle">Dados em tempo real dos dispositivos IoT</div>
      </div>
      <div className="grid4" style={{ marginBottom: "20px" }}>
        <div className="metric"><div className="metric-label">Total</div><div className="metric-value">148</div><div className="metric-sub">Sensores registrados</div></div>
        <div className="metric"><div className="metric-label">Online</div><div className="metric-value" style={{ color: "var(--color-text-success)" }}>142</div><div className="metric-sub">Funcionando normalmente</div></div>
        <div className="metric"><div className="metric-label">Em alerta</div><div className="metric-value" style={{ color: "var(--color-text-warning)" }}>4</div><div className="metric-sub">Necessitam atenção</div></div>
        <div className="metric"><div className="metric-label">Offline</div><div className="metric-value" style={{ color: "var(--color-text-danger)" }}>2</div><div className="metric-sub">Fora de operação</div></div>
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", tableLayout: "fixed" }}>
          <thead>
            <tr style={{ background: "var(--color-background-secondary)" }}>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", width: "70px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>ID</th>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Local</th>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", width: "100px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Tipo</th>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", width: "80px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Status</th>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", width: "90px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Atualizado</th>
            </tr>
          </thead>
          <tbody>
            {sensores.map((s) => (
              <tr key={s.id} style={{ borderBottom: "1px solid var(--color-border-tertiary)" }}>
                <td style={{ padding: "14px 16px", color: "var(--color-text-tertiary)", fontWeight: 500 }}>{s.id}</td>
                <td style={{ padding: "14px 16px", fontWeight: 500 }}>{s.local}</td>
                <td style={{ padding: "14px 16px", color: "var(--color-text-secondary)" }}>{s.tipo}</td>
                <td style={{ padding: "14px 16px" }}><span className={`tag ${s.tag}`}>{s.status}</span></td>
                <td style={{ padding: "14px 16px", color: "var(--color-text-tertiary)", fontSize: "12px" }}>há {s.atualizado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
