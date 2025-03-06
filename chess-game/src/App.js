// src/App.js
import React, { useState } from "react";
import '../src/styles/App.css'; // Importing the CSS file for modern styles
import ChessBoard from "./components/ChessBoard";
import GameOptions from "./components/GameOptions";

const App = () => {
  const [gameMode, setGameMode] = useState("player-vs-player");
  const [aiType, setAiType] = useState("minimax");

  return (
    <div className="app-container">
      <h1 className="app-title">Advanced Chess Game</h1>
      <GameOptions setGameMode={setGameMode} setAiType={setAiType} />
      <ChessBoard gameMode={gameMode} aiType={aiType} />
    </div>
  );
};

export default App;
