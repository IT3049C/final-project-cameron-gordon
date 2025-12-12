import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { HomePage } from "./components/pages/HomePage";
import { LobbyView } from "./components/Lobby";
import { applySavedTheme } from "./utils/theme";  
import { RPSGamePage } from "./components/pages/RPSGamePage";
import Game from "./components/pages/TicTacToe"; 
import { SettingsProvider } from "./context/SettingsContext";
import { App } from "./App";   
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

 
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </QueryClientProvider>
);