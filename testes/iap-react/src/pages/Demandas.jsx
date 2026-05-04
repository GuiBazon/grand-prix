import { useToast } from "../components/Toast";
import { demandas } from "../data/mockData";

export default function Demandas({ currentProfile, onNavigate }) {
  const toast = useToast();

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <div className="page-title">Demandas</div>
          <div className="page-subtitle">{demandas.length} registros encontrados</div>
        </div>
        {currentProfile === "funcionario" && (
          <button className="btn-primary" onClick={() => onNavigate("nova")}>+ Nova demanda</button>
        )}
      </div>

      <div className="card" style={{ padding: "0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", tableLayout: "fixed" }}>
          <thead>
            <tr style={{ background: "var(--color-background-secondary)" }}>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", width: "60px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>ID</th>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Descrição</th>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", width: "100px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Tipo</th>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", width: "100px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Status</th>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", width: "70px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Data</th>
            </tr>
          </thead>
          <tbody>
            {demandas.map((item) => (
              <tr key={item.id} style={{ borderBottom: "1px solid var(--color-border-tertiary)", cursor: "pointer" }}
                onClick={() => toast(`📋 Demanda ${item.id} aberta`)}>
                <td style={{ padding: "14px 16px", color: "var(--color-text-tertiary)", fontWeight: 500 }}>{item.id}</td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ fontWeight: 600, marginBottom: "2px" }}>{item.titulo}</div>
                  <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>{item.autor}</div>
                </td>
                <td style={{ padding: "14px 16px" }}><span className="tag tag-gray">{item.tipo}</span></td>
                <td style={{ padding: "14px 16px" }}><span className={`tag ${item.tag}`}>{item.status}</span></td>
                <td style={{ padding: "14px 16px", color: "var(--color-text-secondary)", fontSize: "12px" }}>{item.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
