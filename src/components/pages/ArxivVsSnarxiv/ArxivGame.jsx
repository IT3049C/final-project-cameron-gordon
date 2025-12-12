import { PlayerInfoCard } from "../../../components/game/PlayerInfoCard"; 
import { generateTitle } from './generateTitle';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export function ArxivGame({ playerId, game, pushState, gameRoomId }) {
  const state = game.state;
  const [myGuess, setMyGuess] = useState(null); 

    useEffect(() => {
    setMyGuess(null);
  }, [state.roundNumber]);

  useEffect(() => {
  function handleUnload() {
    leaveRoom(playerId, state, pushState);  
  }

  window.addEventListener("beforeunload", handleUnload);
  window.addEventListener("unload", handleUnload);

  return () => {
    window.removeEventListener("beforeunload", handleUnload);
    window.removeEventListener("unload", handleUnload);
  };
}, [playerId, state, pushState]);

  const navigate = useNavigate();  // ← create navigate function


async function leaveRoom(playerId, state, pushState) {
  const newPlayers = {};
  for (const [pid, data] of Object.entries(state.players || {})) {
    if (pid !== playerId) {
      newPlayers[pid] = data;   // keep everyone except the leaver
    }
  }

  await pushState({
    players: newPlayers,
    version: (state.version ?? 0) + 1
  }); 

  setTimeout(() => navigate("/"), 100); // 100ms is enough
}


  if (!state) return <div>Loading...</div>;

  const { currentTitle, roundNumber, players, guesses } = state;
function submitGuess(choice) {
  const firstGuess = Object.keys(state.guesses).length === 0;

  const newState = {
    ...state,
    guesses: {
      ...state.guesses,
      [playerId]: choice
    }, 
    reset: false
  };

  // Generate new answer only when the round begins
  if (firstGuess) {
    const { answer } = generateTitle();
    newState.correctAnswer = answer;
  }

  setMyGuess(choice);
  pushState(newState);
}
  /*function submitGuess(choice){
    setMyGuess(choice);
    pushState({
      ...state,
      guesses: {
        ...state.guesses,
        [playerId]: choice
      }
    });
  }; **/
function nextRound() {
  //const next = generateTitle().title;
  const { title, answer } = generateTitle();

  pushState({
    ...state,
    currentTitle: title,
    guesses: {},
    roundNumber: roundNumber + 1
  });

  setMyGuess(null);
} 

function resetGame() {
  const { title, answer } = generateTitle();

  const freshState = {
    // ONLY include fields that should exist at the start of the game
    currentTitle: title,
    correctAnswer: answer,
    guesses: {},
    players: state.players,
    roundNumber: 1,

    // Optional: force update signal
    resetId: Date.now(),
    reset: true   // <-- IMPORTANT
  };

  pushState(freshState);
  setMyGuess(null);
}
  const numPlayers = Object.keys(players || {}).length;
  const numGuesses = Object.keys(guesses || {}).length;
  console.log(players); 
  //const everyoneGuessed = numPlayers > 0 && numPlayers === numGuesses;
const everyoneGuessed =
  !state.reset && numPlayers > 0 && numPlayers === numGuesses;
/** 
 * 
 *       {Object.entries(players || {}).map(([pid, player]) => (
        <PlayerInfoCard
          key={pid}
          playerName={pid}
          playerAvatar={player.avatar || "wizard"} 
        />
      ))}   
 */
  return (
    <div>

{Object.entries(players || {}).map(([pid, player]) => {
  const playerCount = Object.keys(players || {}).length;

  const iAmHere = players[playerId] !== undefined; // YOU are still in the session
  const playerIsHere = players[pid] !== undefined; // THIS player still exists

  return (
    <div key={pid}>
      <div>
        <PlayerInfoCard
          playerName={pid}
          playerAvatar={player.avatar || "wizard"}
        />
      </div>

      {/* 
        Show second div ONLY if:
        1. exactly 2 players exist
        2. this player exists
        3. YOU still exist in players (haven't left)
      */}
      {playerCount === 2 && iAmHere && playerIsHere && (
        <div className="second-div"> 
        </div>
      )}
    </div>
  );
})}


    <section aria-labelledby="game-heading" className="card" style={{
    background: "linear-gradient(180deg, #FFFFFF 0%, #F3F6FF 100%)",
    borderRadius: "18px",
    padding: "28px",
    margin: "30px auto",
    maxWidth: "700px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
    border: "1px solid var(--color-border)",
  }}>
    <div style={{padding: 20}}>
      <h2>Arxiv vs. Snarxiv</h2>
            <button 
  onClick={resetGame} 
  style={{ marginBottom: 20, background: "crimson", color: "white" }}
>
  Reset Game
</button>
<button onClick={() => leaveRoom(playerId, state, pushState)}>
  Leave Game
</button><br /> 
        <b>Your game room id:</b> {gameRoomId}

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

      {myGuess && !everyoneGuessed && !state.reset && (
        <div style={{marginTop: 10}}>
          Waiting for other players…
        </div>
      )}

        {everyoneGuessed && (
  <Results state={state} onNextRound={nextRound} />
        )}
    </div>
    </section>
    </div>
  );
}

/*f
      {everyoneGuessed && (
        <Results state={state} />
      )}
unction Results({ state }) {
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
}**/ 
/*function Results({ state, pushState, setMyGuess }) {
  const first = generateTitle(); 
  function nextRound() {
    pushState({
      ...state,
      guesses: {},      // Clear guesses
      currentTitle: first.title, // Or however you generate the next title
      roundNumber: state.roundNumber + 1
    });
    setMyGuess(null);   // Reset local player's guess
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Results</h3>
      {Object.entries(state.guesses || {}).map(([pid, val]) => (
        <div key={pid}>
          {pid}: <strong>{val}</strong>
        </div>
      ))}

      <button onClick={nextRound} style={{ marginTop: 20 }}>
        Next Round
      </button>
    </div>
  );
}
**/ 
function Results({ state, onNextRound }) {
  const correct = state.correctAnswer;

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Results</h3>

      <div><strong>Correct answer:</strong> {correct}</div>

      {Object.entries(state.guesses || {}).map(([pid, val]) => {
        const isCorrect = val === correct;

        return (
          <div key={pid}>
            {pid}: <strong>{val}</strong> —
            {isCorrect ? (
              <span style={{ color: "green" }}>✔ Correct</span>
            ) : (
              <span style={{ color: "red" }}>✘ Wrong</span>
            )}
          </div>
        );
      })}

      <button onClick={onNextRound} style={{ marginTop: 20 }}>
        Next Round
      </button> 
    </div>
  );
}
