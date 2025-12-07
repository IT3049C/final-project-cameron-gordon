export function makeGuess(playerId, guess, game) {
  const state = game.state;
  if (!state) return;

  game.pushState({
    ...state,
    guesses: {
      ...state.guesses,
      [playerId]: guess,
    },
  });
}
