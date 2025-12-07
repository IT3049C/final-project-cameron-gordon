import { useState } from 'react';

export function ArxivGame({ playerId, game, pushState }) {
  const state = game.state;
  const [myGuess, setMyGuess] = useState(null);

  if (!state) return <div>Loading...</div>;

  const { currentTitle, roundNumber, players, guesses } = state;

  function submitGuess(choice){
    setMyGuess(choice);
    pushState({
      ...state,
      guesses: {
        ...state.guesses,
        [playerId]: choice
      }
    });
  }

  const numPlayers = Object.keys(players || {}).length;
  const numGuesses = Object.keys(guesses || {}).length;

  const everyoneGuessed = numPlayers > 0 && numPlayers === numGuesses;

  return (
    <div style={{padding: 20}}>
      <h2>Round {roundNumber}</h2>

      <h3>{currentTitle}</h3>

      {!myGuess && (
        <div style={{marginTop: 10}}>
          <button onClick={() => submitGuess("real")}>
            Real ArXiv Paper
          </button>
          <button onClick={() => submitGuess("fake")}>
            SnarXiv Troll Paper
          </button>
        </div>
      )}

      {myGuess && !everyoneGuessed && (
        <div style={{marginTop: 10}}>
          Waiting for other players…
        </div>
      )}

      {everyoneGuessed && (
        <Results state={state} />
      )}
    </div>
  );
}

function Results({ state }) {
  return (
    <div style={{marginTop: 20}}>
      <h3>Results</h3>
      {Object.entries(state.guesses || {}).map(([pid, val]) => (
        <div key={pid}>
          {pid}: <strong>{val}</strong>
        </div>
      ))}
    </div>
  );
}