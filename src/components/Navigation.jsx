import { NavLink } from "react-router-dom";

export function Navigation() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "18px",
        padding: "14px 20px",
        margin: "20px auto 30px",
        background: "linear-gradient(135deg, #E8F1FF 0%, #F7EDFF 100%)",
        borderRadius: "14px",
        width: "fit-content",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        fontWeight: 500,
      }}
    >
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/lobby">Lobby</StyledLink>
      <StyledLink to="/game/rps">Rock Paper Scissors</StyledLink>
      <StyledLink to="/game/tic-tac-toe">Tic Tac Toe</StyledLink>
      <StyledLink to="/game/wordle">Wordle</StyledLink>
      <StyledLink to="/game/arxiv_snarxiv">Arxiv vs. Snarxiv</StyledLink>
    </nav>
  );
}

function StyledLink({ to, children }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        padding: "8px 14px",
        borderRadius: "10px",
        textDecoration: "none",
        color: isActive ? "white" : "var(--color-primary)",
        background: isActive ? "var(--color-primary)" : "transparent",
        transition: "0.2s ease",
      })}
      onMouseEnter={(e) => {
        if (!e.target.classList.contains("active"))
          e.target.style.background = "rgba(0,0,0,0.05)";
      }}
      onMouseLeave={(e) => {
        if (!e.target.classList.contains("active"))
          e.target.style.background = "transparent";
      }}
    >
      {children}
    </NavLink>
  );
}