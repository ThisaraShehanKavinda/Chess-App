// src/components/GameOptions.js
import React from "react";
import "./GameOptions.css"; // Import the CSS file for styling

const GameOptions = ({ setGameMode, setAiType }) => {
  return (
    <div className="game-options">
      <div className="option-section">
        <h2 className="section-title">Select Game Mode:</h2>
        <div className="button-container">
          <button className="game-button" onClick={() => setGameMode("player-vs-player")}>
            Player vs Player
          </button>
          <button className="game-button" onClick={() => setGameMode("player-vs-computer")}>
            Player vs Computer
          </button>
        </div>
      </div>

      <div className="option-section">
        <h2 className="section-title">Select AI:</h2>
        <div className="button-container">
          <button className="ai-button" onClick={() => setAiType("minimax")}>
            Minimax AI
          </button>
          <button className="ai-button" onClick={() => setAiType("stockfish")}>
            Stockfish AI
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOptions;
