// src/App.js
import React, { useState } from "react";
import ChessBoard from "./components/ChessBoard";
import GameOptions from "./components/GameOptions";

const App = () => {
  const [gameMode, setGameMode] = useState("player-vs-player");
  const [aiType, setAiType] = useState("minimax");

  return (
    <div>
      <h1>Advanced Chess Game</h1>
      <GameOptions setGameMode={setGameMode} setAiType={setAiType} />
      <ChessBoard gameMode={gameMode} aiType={aiType} />
    </div>
  );
};

export default App;
