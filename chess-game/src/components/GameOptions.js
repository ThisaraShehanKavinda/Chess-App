// src/components/GameOptions.js
import React from "react";

const GameOptions = ({ setGameMode, setAiType }) => {
  return (
    <div className="game-options">
      <h2>Select Game Mode:</h2>
      <button onClick={() => setGameMode("player-vs-player")}>
        Player vs Player
      </button>
      <button onClick={() => setGameMode("player-vs-computer")}>
        Player vs Computer
      </button>

      <h2>Select AI:</h2>
      <button onClick={() => setAiType("minimax")}>Minimax AI</button>
      <button onClick={() => setAiType("stockfish")}>Stockfish AI</button>
    </div>
  );
};

export default GameOptions;
