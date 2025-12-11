import { GameSection } from "./game/GameSection";
import { HighScoresSection } from "./game/HighScoresSection";
import { PlayerInfoCard } from "./game/PlayerInfoCard";

export function GameView({ playerName, playerAvatar, difficulty }) {
  const handleBackToSettings = () => {
    console.log(`going back to the settings view`);
  };
  console.log(playerAvatar);
  return (
    <main>
      <header>  
      </header>
      <PlayerInfoCard playerName={playerName} playerAvatar={playerAvatar} />
      <GameSection difficulty={difficulty} />
      <HighScoresSection />
    </main>
  );
}
