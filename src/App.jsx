import { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { LobbyView } from "./components/Lobby";
import { GameView } from "./components/Game";
import { Navigation } from "./components/Navigation";
import { ProtectedRoute } from "./auth/ProtectedRoute"; 
import { loadSettings, saveSettings } from "./logic/settings";
import Game from "./components/pages/TicTacToe";
import { HomePage } from "./components/pages/HomePage";
import ArxivApp from "./components/pages/ArxivVsSnarxiv/ArxivApp";

export function App() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [darkMode, setDarkMode] = useState(false);
  const handleSettingsSave = () => {
    const newSettings = { name, avatar, difficulty, darkMode };
    saveSettings(newSettings);
    console.log("Settings saved from parent:", newSettings);
  };

  
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <main>
            <h1>Welcome to the Games Lobby</h1>
            <Navigation />
          <Outlet />
        </main>
      ),
      children: [
                {
          path: "/",
          element: (
            <HomePage />
          ),
        },
        {
          path: "/lobby",
          element: (
              <LobbyView
                name={name}
                onSettingsSave={handleSettingsSave}  // ✅ add this line
                setName={setName}
                avatar={avatar}
                setAvatar={setAvatar}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
          ),
        },
        {
          path: "/game/rps",
          element: (
            <ProtectedRoute settings={{ name, avatar, difficulty, darkMode }}> 
              <GameView
                playerName={name}
                playerAvatar={avatar} 
                difficulty={difficulty}
                darkMode={darkMode}
              />
            </ProtectedRoute>
          ),
        }, 
                {
          path: "/game/tic-tac-toe",
          element: (
            <ProtectedRoute settings={{ name, avatar, difficulty, darkMode }}> 
              <ArxivApp /> 
            </ProtectedRoute>
          ),
        },  
                        {
          path: "/game/arxiv_snarxiv",
          element: (
            <ProtectedRoute settings={{ name, avatar, difficulty, darkMode }}> 
              <ArxivApp /> 
            </ProtectedRoute>
          ),
        },
      ],
    },
  ],  {
    basename: "/final-project-cameron-gordon",
  });

  return <RouterProvider router={router} />;
}