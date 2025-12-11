import { useState, useEffect } from "react";
import { useGameRoom } from "./useGameRoom";
import { ArxivGame } from "./ArxivGame";
import { generateTitle } from "./generateTitle";
import { PlayerInfoCard } from "../../../components/game/PlayerInfoCard"; 

export default function ArxivApp({playerName, playerAvatar}) {
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
    /*return (
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
    );**/ 
    setPlayerId(playerName); 
  }
 
  if (!game.roomId){
        return (
          <div>
            <header>
              <nav>
              </nav>
            </header>
            <PlayerInfoCard playerName={playerName} playerAvatar={playerAvatar}/>
            <section aria-labelledby="as-game-heading" className="card" style={{
    background: "linear-gradient(180deg, #FFFFFF 0%, #F3F6FF 100%)",
    borderRadius: "18px",
    padding: "28px",
    margin: "30px auto",
    maxWidth: "700px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
    border: "1px solid var(--color-border)",
  }}>
                  <h2><b>Arxiv vs. Snarxiv</b></h2>

                    <h2>Setup Multiplayer Session</h2>
                    <br /> 
                    <button onClick={createRoom}>
                      Create Room
                    </button>
                    <br /><br />
                    <button onClick={joinRoom}>
                      Join Room
                    </button>
            </section>
          </div>
        );
    /*<*return (
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
    );**/
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
      gameRoomId={game.roomId}
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