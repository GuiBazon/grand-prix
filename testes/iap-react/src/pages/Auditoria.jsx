import { logAuditoria } from "../data/mockData";

export default function Auditoria() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">Log de auditoria</div>
        <div className="page-subtitle">Registro de todas as ações do sistema</div>
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", tableLayout: "fixed" }}>
          <thead>
            <tr style={{ background: "var(--color-background-secondary)" }}>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", width: "70px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Hora</th>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Ação</th>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", width: "120px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Usuário</th>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", width: "80px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>IP</th>
            </tr>
          </thead>
          <tbody>
            {logAuditoria.map((l, i) => (
              <tr key={i} style={{ borderBottom: "1px solid var(--color-border-tertiary)" }}>
                <td style={{ padding: "14px 16px", color: "var(--color-text-tertiary)", fontWeight: 500 }}>{l.hora}</td>
                <td style={{ padding: "14px 16px", fontWeight: 500 }}>{l.acao}</td>
                <td style={{ padding: "14px 16px", color: "var(--color-text-secondary)" }}>{l.usuario}</td>
                <td style={{ padding: "14px 16px", color: "var(--color-text-tertiary)", fontSize: "11px", fontFamily: "monospace" }}>{l.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
