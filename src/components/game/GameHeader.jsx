export function GameHeader({ difficulty }) {
  return (
    <>
      <h2>Rock Paper Scissors</h2>
      <h2 id="game-heading">Game</h2>
      <div className="difficulty-info">
        <span>
          Difficulty: <strong id="current-difficulty">{difficulty}</strong>
        </span>
      </div>
    </>
  );
}
