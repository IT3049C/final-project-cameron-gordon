import { useState, useEffect } from "react";
import { useGameRoom } from "./useGameRoom";
import { ArxivGame } from "./ArxivGame";
import { generateTitle } from "./generateTitle";

export default function ArxivApp() {
  const [nameField, setNameField] = useState("");
  const [playerId, setPlayerId] = useState("");
  const game = useGameRoom({ refetchInterval: 800 });
  const [registered, setRegistered] = useState(false);

  const [realPlayerId] = useState(() =>
  Math.random().toString(36).substring(2, 10)
  );

    useEffect(() => {
    if (!game.state || !game.roomId) return;

    const players = game.state.players || {};

    if (!players[playerId] && !registered) {
      console.log("Registering player:", playerId);
      setRegistered(true);

      game.pushState({
        players: {
          ...players,
          [playerId]: { score: 0 }
        }
      });
    }
  }, [game.state, game.roomId, playerId, registered]);

  async function createRoom(){
    const first = generateTitle();

    /*await game.createRoom({
      version: 0,
      roundNumber: 1,
      currentTitle: first.title,
      realAnswer: first.answer,
      players: { [playerId]: { score: 0 }},
      guesses: {}
    });**/ 
  await game.createRoom({
        initialState: {
          version: 0,
          roundNumber: 1,
          currentTitle: first.title,
          realAnswer: first.answer,
          players: { [playerId]: { score: 0 }},
          guesses: {}
        }
      });

  }

  function joinRoom(){
    const rid = prompt("Enter room id");
    game.setRoomId(rid);
  }

  // STEP 1: enter name
  if (!playerId){
    return (
      <div style={{padding:20}}>
        <h2>Enter your name:</h2>
        <input
          value={nameField}
          onChange={e => setNameField(e.target.value)}
        />
        <button 
          disabled={!nameField} 
          onClick={() => setPlayerId(nameField)}
        >
          Continue
        </button>
      </div>
    );
  }
 
  if (!game.roomId){
    return (
      <div style={{padding:20}}>
        <h2>Hello {playerId}!</h2>
        <button onClick={createRoom}>
          Create Room
        </button>
        <br /><br />
        <button onClick={joinRoom}>
          Join Room
        </button>
      </div>
    );
  }
 
  if (game.roomId && !game.state){
    return (
      <div style={{padding:20}}>
        <h2>Room Created!</h2>
        <p>Room ID: <strong>{game.roomId}</strong></p>
        <p>Waiting for state from server...</p>
      </div>
    );
  }  
  return (
    <ArxivGame
      playerId={playerId}
      game={game}
      pushState={game.pushState}
    />
  );
 /* if (game.state){
    return (
      <ArxivGame
        playerId={playerId}
        game={game}
        pushState={game.pushState}
      />
    );
  }**/

  return <div>Loading game…</div>;
}