import { alertas } from "../data/mockData";

export default function Alertas() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">Alertas do setor</div>
        <div className="page-subtitle">{alertas.length} alertas ativos no momento</div>
      </div>
      <div style={{ display: "grid", gap: "10px" }}>
        {alertas.map((a) => (
          <div key={a.titulo} className={`alert-item ${a.alertClass}`}>
            <div className={`dot ${a.dotClass}`} style={{ marginTop: "6px" }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "14px", fontWeight: 600 }}>{a.titulo}</div>
                <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)", fontWeight: 500 }}>{a.tempo}</span>
              </div>
              <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginTop: "3px" }}>{a.descricao}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
