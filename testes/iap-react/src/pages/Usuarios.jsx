import { useToast } from "../components/Toast";
import { usuarios } from "../data/mockData";

export default function Usuarios() {
  const toast = useToast();

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <div className="page-title">Usuários do sistema</div>
          <div className="page-subtitle">{usuarios.length} usuários cadastrados</div>
        </div>
        <button className="btn-primary" onClick={() => toast("✅ Novo usuário criado")}>+ Novo usuário</button>
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", tableLayout: "fixed" }}>
          <thead>
            <tr style={{ background: "var(--color-background-secondary)" }}>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Usuário</th>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", width: "100px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Setor</th>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", width: "100px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Perfil</th>
              <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, color: "var(--color-text-secondary)", width: "100px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Último acesso</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.nome} style={{ borderBottom: "1px solid var(--color-border-tertiary)", cursor: "pointer" }} onClick={() => toast(`✏️ Editando: ${u.nome}`)}>
                <td style={{ padding: "14px 16px", fontWeight: 600 }}>{u.nome}</td>
                <td style={{ padding: "14px 16px", color: "var(--color-text-secondary)" }}>{u.setor}</td>
                <td style={{ padding: "14px 16px" }}><span className="tag tag-info">{u.perfil}</span></td>
                <td style={{ padding: "14px 16px", color: "var(--color-text-tertiary)" }}>{u.ultimoAcesso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
