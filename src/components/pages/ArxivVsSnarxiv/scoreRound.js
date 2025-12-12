import { generateTitle } from "./titleGenerator";

export function allPlayersGuessed(state) {
  return (
    Object.keys(state.guesses).length > 0 &&
    Object.keys(state.guesses).length === Object.keys(state.players).length
  );
}

export function scoreRound(state) {
  const updated = JSON.parse(JSON.stringify(state));

  for (const playerId of Object.keys(state.players)) {
    const guess = state.guesses[playerId];
    if (guess === state.realAnswer) {
      updated.players[playerId].score++;
    }
  }

  updated.roundNumber++;
  updated.guesses = {};

  const next = generateTitle();
  updated.currentTitle = next.title;
  updated.realAnswer = next.answer;

  return updated;
}
