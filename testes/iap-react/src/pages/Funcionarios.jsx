import { useToast } from "../components/Toast";
import { funcionariosPCD } from "../data/mockData";

export default function Funcionarios() {
  const toast = useToast();
  const statusLabel = (tag) => tag === "tag-ok" ? "Ativo" : tag === "tag-warn" ? "Atenção" : "Crítico";

  return (
    <>
      <div className="page-header">
        <div className="page-title">Funcionários PCD</div>
        <div className="page-subtitle">{funcionariosPCD.length} funcionários cadastrados</div>
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", tableLayout: "fixed" }}>
          <thead>
            <tr style={{ background: "var(--color-background-secondary)" }}>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Nome</th>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", width: "100px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Setor</th>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", width: "110px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Tipo PCD</th>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", width: "80px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {funcionariosPCD.map((f) => (
              <tr key={f.nome} style={{ borderBottom: "1px solid var(--color-border-tertiary)", cursor: "pointer" }} onClick={() => toast(`👤 Perfil: ${f.nome}`)}>
                <td style={{ padding: "14px 16px", fontWeight: 600 }}>{f.nome}</td>
                <td style={{ padding: "14px 16px", color: "var(--color-text-secondary)" }}>{f.setor}</td>
                <td style={{ padding: "14px 16px" }}><span className="tag tag-gray">{f.tipo}</span></td>
                <td style={{ padding: "14px 16px" }}><span className={`tag ${f.tag}`}>{statusLabel(f.tag)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
