import {
  kingCoveredSquares,
  kingPossibleMoves
} from "./pieces_logic/KingLogic";
import {
  queenCoveredSquares,
  queenPossibleMoves
} from "./pieces_logic/QueenLogic";
import {
  rookCoveredSquares,
  rookPossibleMoves
} from "./pieces_logic/RookLogic";
import {
  bishopCoveredSquares,
  bishopPossibleMoves
} from "./pieces_logic/BishopLogic";
import {
  knightCoveredSquares,
  knightPossibleMoves
} from "./pieces_logic/KnightLogic";
import {
  pawnCoveredSquares,
  pawnPossibleMoves
} from "./pieces_logic/PawnLogic";

export function calculateAllMoves(
  board: {
    piece: string;
    color: string;
    has_moved: boolean;
    possible_moves: number[][];
    is_special: string[];
    covered: string[];
    show_overlay: boolean;
  }[][],
  lastMove: {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    piece: string;
    color: string;
  }
) {
  let coveredSquares = calculateCoveredSquares(board);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      board[y][x].covered = coveredSquares[y][x];
    }
  }

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      let possibleMoves = {
        moves: [] as number[][],
        is_special: [] as string[]
      };
      if (board[y][x].piece == "knight") {
        possibleMoves = knightPossibleMoves(x, y, board, board[y][x].color);
      } else if (board[y][x].piece == "king") {
        possibleMoves = kingPossibleMoves(x, y, board, board[y][x].color);
      } else if (board[y][x].piece == "bishop") {
        possibleMoves = bishopPossibleMoves(x, y, board, board[y][x].color);
      } else if (board[y][x].piece == "queen") {
        possibleMoves = queenPossibleMoves(x, y, board, board[y][x].color);
      } else if (board[y][x].piece == "rook") {
        possibleMoves = rookPossibleMoves(x, y, board, board[y][x].color);
      } else if (board[y][x].piece == "pawn") {
        possibleMoves = pawnPossibleMoves(
          x,
          y,
          board,
          board[y][x].color,
          lastMove
        );
      }

      board[y][x].possible_moves = possibleMoves.moves;
      board[y][x].is_special = possibleMoves.is_special;
    }
  }

  return board;
}

export function calculateCoveredSquares(
  board: {
    piece: string;
    color: string;
    has_moved: boolean;
    possible_moves: number[][];
    is_special: string[];
    covered: string[];
    show_overlay: boolean;
  }[][]
) {
  let coveredSquares = [] as string[][][];
  for (let y = 0; y < 8; y++) {
    coveredSquares[y] = [];
    for (let x = 0; x < 8; x++) {
      coveredSquares[y][x] = [];
    }
  }

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      let coveredSquaresPositions = [] as number[][];

      if (board[y][x].piece == "knight") {
        coveredSquaresPositions = knightCoveredSquares(x, y);
      } else if (board[y][x].piece == "king") {
        coveredSquaresPositions = kingCoveredSquares(x, y);
      } else if (board[y][x].piece == "bishop") {
        coveredSquaresPositions = bishopCoveredSquares(
          x,
          y,
          board,
          board[y][x].color
        );
      } else if (board[y][x].piece == "queen") {
        coveredSquaresPositions = queenCoveredSquares(
          x,
          y,
          board,
          board[y][x].color
        );
      } else if (board[y][x].piece == "rook") {
        coveredSquaresPositions = rookCoveredSquares(
          x,
          y,
          board,
          board[y][x].color
        );
      } else if (board[y][x].piece == "pawn") {
        coveredSquaresPositions = pawnCoveredSquares(x, y, board[y][x].color);
      }

      coveredSquaresPositions.map((i: number[]) => {
        coveredSquares[i[1]][i[0]].push(board[y][x].color);
      });
    }
  }

  return coveredSquares;
}

export function isInCheck(
  color: string,
  board: {
    piece: string;
    color: string;
    has_moved: boolean;
    possible_moves: number[][];
    is_special: string[];
    covered: string[];
    show_overlay: boolean;
  }[][]
) {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (board[y][x].piece == "king_" + color) {
        for (let i = 0; i < board[y][x].covered.length; i++) {
          if (board[y][x].covered[i] != color) {
            return true;
          }
        }
      }
    }
  }

  return false;
}
