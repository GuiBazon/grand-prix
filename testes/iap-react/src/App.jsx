import { useState } from "react";

// Componentes
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import { ToastProvider } from "./components/Toast";

// Páginas
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Demandas from "./pages/Demandas";
import NovaDemanda from "./pages/NovaDemanda";
import Recursos from "./pages/Recursos";
import Acessibilidade from "./pages/Acessibilidade";
import Alertas from "./pages/Alertas";
import Relatorios from "./pages/Relatorios";
import Funcionarios from "./pages/Funcionarios";
import Sensores from "./pages/Sensores";
import Usuarios from "./pages/Usuarios";
import Auditoria from "./pages/Auditoria";

// Estilos
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/utilities.css";

/**
 * Componente raiz da aplicação IAP
 */
export default function App() {
  // Estado de Autenticação (simulada por enquanto)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentProfile, setCurrentProfile] = useState("funcionario");
  const [currentPage, setCurrentPage] = useState("dash");

  const handleLogin = (profileKey) => {
    setCurrentProfile(profileKey);
    setIsAuthenticated(true);
    setCurrentPage("dash");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentProfile("funcionario");
    setCurrentPage("dash");
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dash": return <Dashboard currentProfile={currentProfile} onNavigate={handleNavigate} />;
      case "demandas": return <Demandas currentProfile={currentProfile} onNavigate={handleNavigate} />;
      case "nova": return <NovaDemanda onNavigate={handleNavigate} />;
      case "recursos": return <Recursos />;
      case "acessibilidade": return <Acessibilidade />;
      case "alertas": return <Alertas />;
      case "relatorios": return <Relatorios />;
      case "funcionarios": return <Funcionarios />;
      case "sensores": return <Sensores />;
      case "usuarios": return <Usuarios />;
      case "auditoria": return <Auditoria />;
      default: return <Dashboard currentProfile={currentProfile} onNavigate={handleNavigate} />;
    }
  };

  return (
    <ToastProvider>
      {/* Se não estiver logado, mostra a tela de Login */}
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        /* Se estiver logado, mostra o Layout da Aplicação */
        <div
          id="app"
          style={{
            borderRadius: "var(--border-radius-lg)",
            overflow: "hidden",
            border: "0.5px solid var(--color-border-tertiary)",
            position: "relative",
          }}
        >
          <Topbar currentProfile={currentProfile} />

          <div className="layout">
            <Sidebar
              currentProfile={currentProfile}
              currentPage={currentPage}
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />

            <div className="content">{renderPage()}</div>
          </div>
        </div>
      )}
    </ToastProvider>
  );
}
