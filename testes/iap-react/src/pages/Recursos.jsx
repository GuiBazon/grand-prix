import { useToast } from "../components/Toast";
import { recursos } from "../data/mockData";

export default function Recursos() {
  const toast = useToast();

  return (
    <>
      <div className="page-header">
        <div className="page-title">Recursos de acessibilidade</div>
        <div className="page-subtitle">Ferramentas e serviços disponíveis para você</div>
      </div>
      <div className="grid2">
        {recursos.map((r) => (
          <div key={r.titulo} className="card" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ fontSize: "28px", color: "var(--color-text-info)" }}>{r.icone}</div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "4px" }}>{r.titulo}</div>
              <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>{r.descricao}</div>
            </div>
            <button className="btn-sec" style={{ marginTop: "auto", alignSelf: "flex-start" }}
              onClick={() => toast(`🚀 ${r.titulo} — iniciado`)}>
              {r.botao}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
