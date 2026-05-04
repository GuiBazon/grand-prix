import { useState } from "react";
import { useToast } from "../components/Toast";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulação temporária de login enquanto não temos o backend
    // Define o perfil baseado no email digitado
    let role = "funcionario";
    if (email.includes("gestor")) role = "gestor";
    if (email.includes("rh")) role = "rh";
    if (email.includes("admin")) role = "admin";

    toast("✅ Login realizado com sucesso!");
    onLogin(role);
  };

  return (
    <div style={{ 
      display: "flex", 
      height: "100vh", 
      alignItems: "center", 
      justifyContent: "center", 
      background: "var(--color-background-tertiary)",
      padding: "20px"
    }}>
      <div className="card" style={{ width: "100%", maxWidth: "420px", padding: "40px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div className="logo" style={{ fontSize: "28px", marginBottom: "8px" }}>
            IAP <span>·</span> Petrobras
          </div>
          <div style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}>
            Acesso ao Sistema de Inteligência de Acessibilidade
          </div>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-row">
            <label className="form-label">E-mail corporativo</label>
            <input 
              className="form-input" 
              type="email" 
              placeholder="nome@petrobras.com.br" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-row" style={{ marginBottom: "24px" }}>
            <label className="form-label">Senha</label>
            <input 
              className="form-input" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button 
            className="btn-primary" 
            type="submit" 
            style={{ width: "100%", padding: "14px", fontSize: "15px" }}
          >
            Entrar no sistema
          </button>
        </form>

        <div style={{ 
          marginTop: "32px", 
          padding: "16px", 
          background: "var(--color-background-secondary)", 
          borderRadius: "var(--border-radius-md)",
          fontSize: "12px", 
          color: "var(--color-text-secondary)", 
          textAlign: "center" 
        }}>
          <strong>Dica para testar:</strong><br/>
          Use qualquer senha e digite no e-mail: <br/>
          <span className="tag tag-info" style={{marginTop: "4px"}}>gestor@</span>, <span className="tag tag-info">rh@</span>, ou <span className="tag tag-info">admin@</span> para mudar o perfil. <br/>
          (Qualquer outro e-mail entra como funcionário)
        </div>
      </div>
    </div>
  );
}
