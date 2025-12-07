import { useEffect } from "react";
import { Navigation } from "./Navigation";
import { applySavedTheme } from "../utils/theme";
import "../App.css";
import { useNavigate, Outlet } from "react-router-dom"; // 👈 import useNavigate here

export function AppLayout() { 
  useEffect(() => {
    applySavedTheme();
  }, []);
  const isLoggedIn =
    localStorage.getItem("game.settings"); 
  function handleLogout() {
    const navigate = useNavigate();

    localStorage.removeItem("game.settings");
    navigate("/");
  }

  return (
    <main>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          borderBottom: "1px solid #ccc",
        }}
      >
        <h1 style={{ margin: 0 }}>Welcome to the Games Lobby</h1>

        {isLoggedIn && (
          <button onClick={handleLogout}>Logout</button>
        )}
      </header> 
      <Navigation />

      <Outlet />
    </main>
  );
}