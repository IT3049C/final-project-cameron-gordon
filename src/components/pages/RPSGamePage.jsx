import { GameSection } from "..//game/GameSection";
import { HighScoresSection } from "../game/HighScoresSection";
import { PlayerInfoCard } from "..//game/PlayerInfoCard"; 
import { useEffect } from "react";


export function RPSGamePage() {
  const handleBackToSettings = () => {
    console.log(`going back to the settings view`);
  };
 
  return (
    <main>
      <header>
        <h2>Rock Paper Scissors</h2>
        <nav>
          <a onClick={handleBackToSettings} className="nav-link">
            ← Back to Settings
          </a>
        </nav>
      </header>
      <PlayerInfoCard playerName='aewfweafweaf' playerAvatar='wizard'/>
      <GameSection difficulty='easy' /> 
    </main>
  );
}
