import { useState } from "react";
import { useToast } from "../components/Toast";

/**
 * Página de configurações de acessibilidade
 * Modo escuro e alto contraste funcionam de verdade
 * alterando data-theme e data-contrast no <html>
 */
export default function Acessibilidade() {
  const toast = useToast();
  const [fonteVal, setFonteVal] = useState(100);
  const [narrVal, setNarrVal] = useState(100);
  const [modoEscuro, setModoEscuro] = useState(false);
  const [altoContraste, setAltoContraste] = useState(false);
  const [narracao, setNarracao] = useState(false);
  const [libras, setLibras] = useState(false);
  const [reducao, setReducao] = useState(false);

  const toggleTema = (checked) => {
    setModoEscuro(checked);
    document.documentElement.setAttribute("data-theme", checked ? "dark" : "light");
    toast(checked ? "🌙 Modo escuro ativado" : "☀️ Modo claro ativado");
  };

  const toggleContraste = (checked) => {
    setAltoContraste(checked);
    document.documentElement.setAttribute("data-contrast", checked ? "high" : "normal");
    toast(checked ? "Alto contraste ativado" : "Contraste normal");
  };

  const toggleNarracao = (checked) => {
    setNarracao(checked);
    toast(checked ? "🔊 Narração ativada" : "🔇 Narração desativada");
  };

  const toggleLibras = (checked) => {
    setLibras(checked);
    toast(checked ? "🤟 Player LIBRAS ativado" : "Player LIBRAS desativado");
  };

  const toggleReducao = (checked) => {
    setReducao(checked);
    document.documentElement.style.setProperty("--transition-fast", checked ? "0s" : "0.15s ease");
    document.documentElement.style.setProperty("--transition-normal", checked ? "0s" : "0.25s ease");
    toast(checked ? "Animações reduzidas" : "Animações normais");
  };

  const handleFonte = (val) => {
    setFonteVal(val);
    document.documentElement.style.fontSize = `${val}%`;
    toast(`Fonte: ${val}%`);
  };

  const restaurar = () => {
    setModoEscuro(false);
    setAltoContraste(false);
    setNarracao(false);
    setLibras(false);
    setReducao(false);
    setFonteVal(100);
    setNarrVal(100);
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.setAttribute("data-contrast", "normal");
    document.documentElement.style.fontSize = "100%";
    document.documentElement.style.setProperty("--transition-fast", "0.15s ease");
    document.documentElement.style.setProperty("--transition-normal", "0.25s ease");
    toast("✅ Configurações restauradas ao padrão");
  };

  return (
    <>
      <div className="page-header">
        <div className="page-title">Configurações de acessibilidade</div>
        <div className="page-subtitle">Personalize a interface de acordo com suas necessidades</div>
      </div>

      <div className="card" style={{ maxWidth: "560px" }}>
        {/* Aparência */}
        <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-tertiary)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Aparência
        </div>

        <div className="acc-control">
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600 }}>Modo escuro</div>
            <div style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>Reduz brilho para menor fadiga visual</div>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={modoEscuro} onChange={(e) => toggleTema(e.target.checked)} />
            <span className="tslider" />
          </label>
        </div>

        <div className="acc-control">
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600 }}>Alto contraste</div>
            <div style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>Aumenta contraste de texto e bordas</div>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={altoContraste} onChange={(e) => toggleContraste(e.target.checked)} />
            <span className="tslider" />
          </label>
        </div>

        <div className="acc-control">
          <div style={{ flex: 1, marginRight: "16px" }}>
            <div style={{ fontSize: "14px", fontWeight: 600 }}>Tamanho do texto</div>
            <div style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>
              Atual: <strong style={{ color: "var(--color-text-info)" }}>{fonteVal}%</strong>
            </div>
          </div>
          <input type="range" min="80" max="150" step="5" value={fonteVal} style={{ width: "140px" }}
            onChange={(e) => handleFonte(Number(e.target.value))} />
        </div>

        {/* Áudio */}
        <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-tertiary)", margin: "20px 0 8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Áudio e narração
        </div>

        <div className="acc-control">
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600 }}>Narração automática</div>
            <div style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>Lê o conteúdo da tela em voz alta</div>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={narracao} onChange={(e) => toggleNarracao(e.target.checked)} />
            <span className="tslider" />
          </label>
        </div>

        <div className="acc-control">
          <div style={{ flex: 1, marginRight: "16px" }}>
            <div style={{ fontSize: "14px", fontWeight: 600 }}>Velocidade da narração</div>
            <div style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>
              Atual: <strong style={{ color: "var(--color-text-info)" }}>{narrVal}%</strong>
            </div>
          </div>
          <input type="range" min="60" max="160" step="10" value={narrVal} style={{ width: "140px" }}
            onChange={(e) => setNarrVal(Number(e.target.value))} />
        </div>

        {/* LIBRAS */}
        <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-tertiary)", margin: "20px 0 8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          LIBRAS
        </div>

        <div className="acc-control">
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600 }}>Player de LIBRAS</div>
            <div style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>Exibe vídeo em LIBRAS ao lado do conteúdo</div>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={libras} onChange={(e) => toggleLibras(e.target.checked)} />
            <span className="tslider" />
          </label>
        </div>

        {/* Movimento */}
        <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-tertiary)", margin: "20px 0 8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Movimento e animação
        </div>

        <div className="acc-control">
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600 }}>Reduzir animações</div>
            <div style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>Para sensibilidade a movimento</div>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={reducao} onChange={(e) => toggleReducao(e.target.checked)} />
            <span className="tslider" />
          </label>
        </div>

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button className="btn-primary" onClick={() => toast("✅ Preferências salvas com sucesso!")}>
            Salvar preferências
          </button>
          <button className="btn-sec" onClick={restaurar}>
            Restaurar padrão
          </button>
        </div>
      </div>
    </>
  );
}
