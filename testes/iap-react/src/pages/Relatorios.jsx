import { useToast } from "../components/Toast";
import { relatorios } from "../data/mockData";

export default function Relatorios() {
  const toast = useToast();
  const tagLabel = (tag) => tag === "tag-ok" ? "Disponível" : tag === "tag-info" ? "IA" : "Aguarde";

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <div className="page-title">Relatórios</div>
          <div className="page-subtitle">Relatórios gerados e disponíveis para download</div>
        </div>
        <button className="btn-primary" onClick={() => toast("🤖 Gerando relatório com IA...")}>Gerar com IA</button>
      </div>
      <div className="grid2">
        {relatorios.map((r) => (
          <div key={r.titulo} className="card" style={{ cursor: "pointer" }} onClick={() => toast(`📄 Abrindo: ${r.titulo}`)}>
            <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "6px" }}>{r.titulo}</div>
            <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "14px" }}>{r.descricao}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>{r.status}</span>
              <span className={`tag ${r.tag}`}>{tagLabel(r.tag)}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
