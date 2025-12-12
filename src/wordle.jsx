import React, { useEffect, useState, useCallback } from "react";
import "./WordleGame.css"; // for grid + animations
import { PlayerInfoCard } from "./components/game/PlayerInfoCard";

const config = {
  wordLength: 5,
  maxAttempts: 6,
};

const fallbackWords = ["apple", "world", "words", "hello", "react", "games"];

export default function WordleGame({playerName, playerAvatar}) {
  const [grid, setGrid] = useState([]);
  const [targetWord, setTargetWord] = useState("");
  const [gameReady, setGameReady] = useState(false);
  const [gameResult, setGameResult] = useState("");
  const [gameState, setGameState] = useState({
    currentAttempt: 0,
    currentPosition: 0,
  });

  // Fetch target word
  const fetchTargetWord = async () => {
    try {
      const res = await fetch("https://random-word-api.vercel.app/api?words=1&length=5");
      if (!res.ok) throw new Error("API failed");
      const data = await res.json();
      if (!Array.isArray(data) || !data[0]) throw new Error("Bad response");
      return data[0].toLowerCase();
    } catch (err) {
      console.warn("Falling back to local word list:", err.message);
      return fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
    }
  };

  // Initialize grid and word
  useEffect(() => {
    async function setupGame() {
      const word = await fetchTargetWord();
      console.log("Target word:", word); // For debugging
      setTargetWord(word);
      const emptyGrid = Array.from({ length: config.maxAttempts }, () =>
        Array(config.wordLength).fill("")
      );
      setGrid(emptyGrid);
      setGameReady(true);
      setGameResult("");
    }
    setupGame();
  }, []);

  // Validate word - with improved error handling
  const isValidWord = async (word) => {
    if (fallbackWords.includes(word.toLowerCase())) {
      return true;
    }
    
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      return res.ok;
    } catch {
      return false;
    }
  };

  // Check guess
  const checkGuess = async (guess) => {
    const targetLetters = targetWord.split("");
    const guessLetters = guess.toLowerCase().split("");

    const isValid = await isValidWord(guess);
    if (!isValid) return null;

    // Create a copy of target letters to track which have been matched
    const targetLettersCopy = [...targetLetters];
    const results = Array(config.wordLength).fill("incorrect");

    // First pass: find correct letters
    for (let i = 0; i < guessLetters.length; i++) {
      if (guessLetters[i] === targetLettersCopy[i]) {
        results[i] = "correct";
        targetLettersCopy[i] = null; // Mark as used
      }
    }

    // Second pass: find misplaced letters
    for (let i = 0; i < guessLetters.length; i++) {
      if (results[i] === "correct") continue;
      
      const foundIndex = targetLettersCopy.indexOf(guessLetters[i]);
      if (foundIndex !== -1) {
        results[i] = "misplaced";
        targetLettersCopy[foundIndex] = null; // Mark as used
      }
    }

    return results;
  };

  // Handle typing input
// Handle typing input
const handleKeyDown = useCallback(
  async (e) => {
    if (!gameReady) return;

    // Prevent input after game ended
    if (gameResult.includes("won") || gameResult.includes("over")) return;

    if (/^[a-zA-Z]$/.test(e.key) && gameState.currentPosition < config.wordLength) {
      setGrid((prev) => {
        const newGrid = [...prev];
        newGrid[gameState.currentAttempt] = [...newGrid[gameState.currentAttempt]]; // Copy the row
        newGrid[gameState.currentAttempt][gameState.currentPosition] = e.key.toLowerCase();
        return newGrid;
      });
      setGameState((prev) => ({
        ...prev,
        currentPosition: Math.min(prev.currentPosition + 1, config.wordLength),
      }));
    } else if (e.key === "Backspace" && gameState.currentPosition > 0) {
      setGameState((prev) => {
        const newPos = Math.max(prev.currentPosition - 1, 0);
        setGrid((g) => {
          const newGrid = [...g];
          newGrid[prev.currentAttempt] = [...newGrid[prev.currentAttempt]]; // Copy the row
          newGrid[prev.currentAttempt][newPos] = "";
          return newGrid;
        });
        return { ...prev, currentPosition: newPos };
      });
    } else if (e.key === "Enter") {
      // Only process Enter if the current row is complete
      if (gameState.currentPosition !== config.wordLength) {
        setGameResult("Not enough letters!");
        setTimeout(() => setGameResult(""), 2000);
        return;
      }

      const guess = grid[gameState.currentAttempt].join("");
      const results = await checkGuess(guess);

      if (!results) {
        setGameResult("Invalid word");
        setTimeout(() => setGameResult(""), 2000);
        return;
      }

      // Update colors
      const newGrid = [...grid];
      newGrid[gameState.currentAttempt] = grid[gameState.currentAttempt].map((letter, index) => ({
        letter,
        state: results[index],
      }));
      setGrid(newGrid);

      const isWon = results.every((r) => r === "correct");
      if (isWon) {
        setGameResult("You won! 🎉");
        setGameReady(false);
        return;
      }

      // Move to next attempt
      const nextAttempt = gameState.currentAttempt + 1;
      if (nextAttempt >= config.maxAttempts) {
        setGameResult(`Game over! Word was "${targetWord.toUpperCase()}"`);
        setGameReady(false);
      } else {
        // This is the key line - reset position and move to next attempt
        setGameState({ 
          currentAttempt: nextAttempt, 
          currentPosition: 0 
        });
        setGameResult(""); // Clear any previous messages
      }
    }
  },
  [gameReady, gameState, grid, targetWord, gameResult]
);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Reset game function
  const resetGame = async () => {
    setGameReady(false);
    const word = await fetchTargetWord(); 
    setTargetWord(word);
    const emptyGrid = Array.from({ length: config.maxAttempts }, () =>
      Array(config.wordLength).fill("")
    );
    setGrid(emptyGrid);
    setGameState({
      currentAttempt: 0,
      currentPosition: 0,
    });
    setGameResult("");
    setGameReady(true);
  };

  //let playerName = "Cameron"; 
   //playerAvatar = "wizard"; 

  return (
    <div>

            <PlayerInfoCard playerName={playerName} playerAvatar={playerAvatar} />

          <section style={{
    background: "linear-gradient(180deg, #FFFFFF 0%, #F3F6FF 100%)",
    borderRadius: "18px",
    padding: "28px",
    margin: "30px auto",
    maxWidth: "700px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
    border: "1px solid var(--color-border)",
  }}>
          <div className="wordle-container"> 
                        <h2>Wordle, built in React</h2>
        <button onClick={resetGame} className="reset-button">
          Reset Game
        </button>

      <div
        id="wordle-grid"
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${config.wordLength}, 60px)`,
        }}
      >
        {grid.map((row, rIdx) =>
          row.map((cell, cIdx) => {
            const letter = typeof cell === "object" ? cell.letter : cell;
            const state = typeof cell === "object" ? cell.state : "";
            return (
              <div key={`${rIdx}-${cIdx}`} className={`cell ${state}`}>
                {letter}
              </div>
            );
          })
        )}
      </div>
      <p id="game-result">{gameResult}</p>
      {(gameResult.includes("won") || gameResult.includes("over")) && (
        <button onClick={resetGame} className="reset-button">
          Play Again
        </button>
      )}
    </div>
    </section>
    </div>
  );
}