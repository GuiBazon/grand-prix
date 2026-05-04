import profiles from "../data/profiles";

/**
 * Componente Topbar — barra superior com logo e avatar
 */
export default function Topbar({ currentProfile }) {
  const profile = profiles[currentProfile];

  return (
    <div className="topbar">
      <div className="logo">
        IAP <span>·</span> Petrobras
      </div>

      <div style={{ flex: 1 }} />

      <div className="user-avatar" id="user-avatar">
        {profile.initials}
      </div>
    </div>
  );
}
