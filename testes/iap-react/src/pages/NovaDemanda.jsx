import { useState } from "react";
import { useToast } from "../components/Toast";
import { tiposDemanda } from "../data/mockData";

export default function NovaDemanda({ onNavigate }) {
  const toast = useToast();
  const [prioridade, setPrioridade] = useState("Média");

  const prioridades = ["Baixa", "Média", "Alta", "Urgente"];

  return (
    <>
      <div className="page-header">
        <div className="page-title">Nova demanda</div>
        <div className="page-subtitle">Registre uma nova solicitação de acessibilidade</div>
      </div>

      <div className="card" style={{ maxWidth: "560px" }}>
        <div className="form-row">
          <label className="form-label">Tipo de demanda</label>
          <select className="form-input">
            {tiposDemanda.map((tipo) => (
              <option key={tipo}>{tipo}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label className="form-label">Localização</label>
          <input className="form-input" type="text" placeholder="Ex: Bloco C, 2º andar, sala 214" />
        </div>

        <div className="form-row">
          <label className="form-label">Prioridade</label>
          <div className="chip-row">
            {prioridades.map((p) => (
              <span key={p} className={`chip ${prioridade === p ? "sel" : ""}`} onClick={() => setPrioridade(p)}>
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="form-row">
          <label className="form-label">Descrição detalhada</label>
          <textarea className="form-textarea" placeholder="Descreva a situação com o máximo de detalhes possível..." />
        </div>

        <div className="form-row">
          <label className="form-label">Evidência (foto ou áudio)</label>
          <div className="upload-area" onClick={() => toast("📎 Seletor de arquivo aberto")}>
            📷 Clique para anexar foto ou áudio
          </div>
          <div style={{ fontSize: "11px", color: "var(--color-text-tertiary)", marginTop: "6px" }}>
            A IA analisará automaticamente as imagens enviadas
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
          <button className="btn-primary" onClick={() => toast("✅ Demanda registrada com sucesso!")}>
            Registrar demanda
          </button>
          <button className="btn-sec" onClick={() => onNavigate("demandas")}>
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}
