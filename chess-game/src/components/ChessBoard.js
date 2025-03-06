import Chess from "chess.js";
import React, { useState } from "react";
import { Chessboard } from "react-chessboard";
import { FaSpinner } from "react-icons/fa"; // For loading spinner icon
import { animated, useSpring } from "react-spring";
import { getBestMove, getRandomMove, getStockfishMove } from "../utils/chessAI";

const ChessBoard = ({ gameMode }) => {
  const [game, setGame] = useState(new Chess());
  const [aiType, setAiType] = useState("minimax"); // Default AI type
  const [moveHistory, setMoveHistory] = useState([]); // To track move history
  const [isAiMoving, setIsAiMoving] = useState(false); // To track if AI is moving
  const [aiMoveDetails, setAiMoveDetails] = useState(null); // To store details of AI's move for animation

  const moveAnimation = useSpring({
    opacity: aiMoveDetails ? 1 : 0,
    transform: aiMoveDetails
      ? `translate(${aiMoveDetails.fromSquare.x}px, ${aiMoveDetails.fromSquare.y}px)`
      : `translate(0px, 0px)`,
  });

  const onDrop = (sourceSquare, targetSquare) => {
    if (isAiMoving) return false; // Prevent move if AI is still thinking

    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // Always promote to a queen
    });

    if (move === null) return false; // Invalid move
    setMoveHistory([...moveHistory, move]); // Update move history
    setGame(new Chess(game.fen())); // Update game state

    if (gameMode === "player-vs-computer") {
      setTimeout(() => makeComputerMove(), 500); // Wait before AI move
    }

    return true;
  };

  const makeComputerMove = () => {
    setIsAiMoving(true); // Set AI to moving state
    let move;

    if (aiType === "stockfish") {
      getStockfishMove(game, (move) => {
        animateAIMove(move);
      });
    } else if (aiType === "random") {
      move = getRandomMove(game);
      animateAIMove(move);
    } else {
      move = getBestMove(game);
      animateAIMove(move);
    }
  };

  const animateAIMove = (move) => {
    setAiMoveDetails({
      fromSquare: getPositionFromSquare(move.from),
      toSquare: getPositionFromSquare(move.to),
    });

    game.move(move);
    setMoveHistory([...moveHistory, move]); // Update move history
    setGame(new Chess(game.fen())); // Update game state
    setIsAiMoving(false); // Reset AI moving state
  };

  const getPositionFromSquare = (square) => {
    const file = square.charAt(0); // 'a' to 'h'
    const rank = square.charAt(1); // '1' to '8'

    return {
      x: (file.charCodeAt(0) - 'a'.charCodeAt(0)) * 60, // 60px per file
      y: (8 - parseInt(rank)) * 60, // 60px per rank, invert Y axis
    };
  };

  const resetGame = () => {
    setGame(new Chess());
    setMoveHistory([]); // Clear move history
    setAiMoveDetails(null); // Clear AI move details
  };

  return (
    <div className="chessboard-container">
      <h2>
        Chess Game: {gameMode === "player-vs-computer" ? "Player vs Computer" : "Player vs Player"}
      </h2>

      {gameMode === "player-vs-computer" && (
        <div>
          <label htmlFor="ai-select">Select AI Difficulty: </label>
          <select
            id="ai-select"
            value={aiType}
            onChange={(e) => setAiType(e.target.value)}
          >
            <option value="random">Easy (Random Moves)</option>
            <option value="minimax">Medium (Minimax Algorithm)</option>
            <option value="stockfish">Hard (Stockfish AI)</option>
          </select>
        </div>
      )}

      {/* Move history display */}
      <div>
        <h3>Move History:</h3>
        <ul>
          {moveHistory.map((move, index) => (
            <li key={index}>
              {move.san}
            </li>
          ))}
        </ul>
      </div>

      {/* Reset Button */}
      <button onClick={resetGame}>Reset Game</button>

      {/* Show loading spinner if AI is moving */}
      {isAiMoving && (
        <div className="loading-spinner">
          <FaSpinner className="spinner-icon" />
          <p>AI is thinking...</p>
        </div>
      )}

      {/* Chessboard */}
      <Chessboard position={game.fen()} onPieceDrop={onDrop} />

      {/* AI Move Animation */}
      {aiMoveDetails && (
        <animated.div style={moveAnimation}>
          <div className="ai-move-animation">
            {/* Custom UI for the AI move animation */}
            <p>AI is making a move...</p>
          </div>
        </animated.div>
      )}
    </div>
  );
};

export default ChessBoard;
