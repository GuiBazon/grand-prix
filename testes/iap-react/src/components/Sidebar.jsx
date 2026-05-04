import profiles from "../data/profiles";
import { useToast } from "./Toast";

/**
 * Componente Sidebar — navegação lateral com info do perfil
 */
export default function Sidebar({ currentProfile, currentPage, onNavigate, onLogout }) {
  const profile = profiles[currentProfile];
  const toast = useToast();

  const handleSair = () => {
    toast("👋 Sessão encerrada.");
    onLogout();
  };

  return (
    <div className="sidebar" id="sidebar">
      {/* Informações do usuário */}
      <div style={{ padding: "16px 14px 10px" }}>
        <div className="sidebar-user">
          <div
            className="avatar av-blue"
            style={{ width: "30px", height: "30px", fontSize: "11px" }}
          >
            {profile.initials}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {profile.name}
            </div>
            <div style={{ fontSize: "10px", color: "var(--color-text-tertiary)", fontWeight: 450 }}>
              {profile.role}
            </div>
          </div>
        </div>
      </div>

      {/* Itens de navegação */}
      <div style={{ padding: "0 0 8px", flex: 1 }}>
        {profile.nav.map((item) => (
          <div
            key={item.page}
            className={`nav-item ${currentPage === item.page ? "active" : ""}`}
            onClick={() => onNavigate(item.page)}
          >
            <span style={{ fontSize: "15px", opacity: 0.8 }}>{item.icon}</span>
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.badge && <span className="badge">{item.badge}</span>}
          </div>
        ))}
      </div>

      {/* Botão sair chamando a função de logout real */}
      <div style={{ padding: "12px 10px", borderTop: "1px solid var(--color-border-tertiary)" }}>
        <div className="nav-item" onClick={handleSair}>
          <span style={{ fontSize: "15px", opacity: 0.8 }}>◁</span>Sair
        </div>
      </div>
    </div>
  );
}
