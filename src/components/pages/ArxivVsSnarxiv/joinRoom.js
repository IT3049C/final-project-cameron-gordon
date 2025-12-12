export function joinGame(playerId, game) {
  const state = game.state;
  if (!state) return;

  if (state.players[playerId]) return;

  game.pushState({
    ...state,
    players: {
      ...state.players,
      [playerId]: { score: 0 },
    },
  });
}
