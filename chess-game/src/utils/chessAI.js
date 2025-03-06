// Import Chess.js
import { Chess } from "chess.js";

// Create a new Chess game if none is provided
const getGameInstance = (game) => game || new Chess();

// Basic random move generator
export const getRandomMove = (game) => {
  const chess = getGameInstance(game);
  const moves = chess.moves();
  if (moves.length === 0) return null; // No legal moves (checkmate or stalemate)
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
};

// Minimax algorithm for basic AI
const minimax = (game, depth, isMaximizing) => {
  const chess = getGameInstance(game);

  if (depth === 0 || chess.game_over()) {
    return evaluateBoard(chess);
  }

  const moves = chess.moves();
  let bestEval = isMaximizing ? -Infinity : Infinity;

  for (const move of moves) {
    chess.move(move);
    const evaluation = minimax(chess, depth - 1, !isMaximizing);
    chess.undo();
    bestEval = isMaximizing
      ? Math.max(bestEval, evaluation)
      : Math.min(bestEval, evaluation);
  }

  return bestEval;
};

// Simple board evaluation: material count
const evaluateBoard = (game) => {
  const pieceValues = {
    p: 1, // Pawn
    n: 3, // Knight
    b: 3, // Bishop
    r: 5, // Rook
    q: 9, // Queen
    k: 0, // King (infinite value, but 0 here for simplicity)
  };

  const board = game.board();
  let evaluation = 0;

  for (const row of board) {
    for (const square of row) {
      if (square) {
        const value = pieceValues[square.type];
        evaluation += square.color === "w" ? value : -value;
      }
    }
  }

  return evaluation;
};

// Get the best move using Minimax
export const getBestMove = (game, depth = 2) => {
  const chess = getGameInstance(game);
  let bestMove = null;
  let bestEval = -Infinity;

  const moves = chess.moves();
  for (const move of moves) {
    chess.move(move);
    const evaluation = minimax(chess, depth - 1, false); // False -> opponent's move
    chess.undo();
    if (evaluation > bestEval) {
      bestEval = evaluation;
      bestMove = move;
    }
  }

  return bestMove || getRandomMove(chess); // Fallback to random move
};
