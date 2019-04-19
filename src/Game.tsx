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

import cloneDeep from "lodash/cloneDeep";

export function calculateAllMoves(
  board: {
    piece: string;
    color: string;
    has_moved: boolean;
    possible_moves: number[][];
    is_special: string[];
    covered: string[];
    show_overlay: boolean;
    overlay: {
      type: string;
      piece: string;
      color: string;
      x: number;
      y: number;
    };
  }[][],
  lastMove: {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    piece: string;
    color: string;
  },
  game: {
    move: string;
    light: {
      in_check: boolean;
      in_checkmate: boolean;
      x: number;
      y: number;
    };
    dark: {
      in_check: boolean;
      in_checkmate: boolean;
      x: number;
      y: number;
    };
  }
) {
  let coveredSquares = calculateCoveredSquares(board);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      board[y][x].covered = coveredSquares[y][x];
    }
  }

  game.light = isInCheck("light", board);
  game.dark = isInCheck("dark", board);

  let totalPossibleMovesDark = 0;
  let totalPossibleMovesLight = 0;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (game.move != board[y][x].color) {
        continue;
      }

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

      if (
        game.dark.in_check &&
        board[y][x].piece != "" &&
        board[y][x].color == "dark"
      ) {
        removeNonCheckBlockingMoves(
          x,
          y,
          game.dark.x,
          game.dark.y,
          possibleMoves,
          board
        );
      } else if (
        game.light.in_check &&
        board[y][x].piece != "" &&
        board[y][x].color == "light"
      ) {
        removeNonCheckBlockingMoves(
          x,
          y,
          game.light.x,
          game.light.y,
          possibleMoves,
          board
        );
      }

      board[y][x].possible_moves = possibleMoves.moves;
      board[y][x].is_special = possibleMoves.is_special;

      if (board[y][x].color == "light") {
        totalPossibleMovesLight += possibleMoves.moves.length;
      } else if (board[y][x].color == "dark") {
        totalPossibleMovesDark += possibleMoves.moves.length;
      }
    }
  }

  if (totalPossibleMovesLight == 0) {
    game.light.in_checkmate = true;
  } else if (totalPossibleMovesDark == 0) {
    game.dark.in_checkmate = true;
  }

  console.log(totalPossibleMovesLight);
  console.log(totalPossibleMovesDark);

  return board;
}

function removeNonCheckBlockingMoves(
  x: number,
  y: number,
  xCheckPos: number,
  yCheckPos: number,
  possibleMoves: { moves: number[][]; is_special: string[] },
  board: {
    piece: string;
    color: string;
    has_moved: boolean;
    possible_moves: number[][];
    is_special: string[];
    covered: string[];
    show_overlay: boolean;
    overlay: {
      type: string;
      piece: string;
      color: string;
      x: number;
      y: number;
    };
  }[][]
) {
  for (let i = 0; i < possibleMoves.moves.length; i++) {
    let myBoard = cloneDeep(board);
    let boardAndLastMove = setAndRemovePiece(
      myBoard,
      x,
      y,
      possibleMoves.moves[i][0],
      possibleMoves.moves[i][1],
      myBoard[y][x].piece,
      myBoard[y][x].color
    );

    let coveredSquares = calculateCoveredSquares(boardAndLastMove.board);
    let coveredAtPos = coveredSquares[yCheckPos][xCheckPos];

    for (let j = 0; j < coveredAtPos.length; j++) {
      if (coveredAtPos[j] != board[y][x].color) {
        possibleMoves.moves.splice(i, 1);
        possibleMoves.is_special.splice(i, 1);
        i--;
        break;
      }
    }
  }
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
    overlay: {
      type: string;
      piece: string;
      color: string;
      x: number;
      y: number;
    };
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
      if (board[y][x].piece == "king" && board[y][x].color == color) {
        for (let i = 0; i < board[y][x].covered.length; i++) {
          if (board[y][x].covered[i] != color) {
            return { in_check: true, in_checkmate: false, x: x, y: y };
          }
        }
      }
    }
  }

  return { in_check: false, in_checkmate: false, x: -1, y: -1 };
}

export function setAndRemovePiece(
  board: {
    piece: string;
    color: string;
    has_moved: boolean;
    possible_moves: number[][];
    is_special: string[];
    covered: string[];
    show_overlay: boolean;
    overlay: {
      type: string;
      piece: string;
      color: string;
      x: number;
      y: number;
    };
  }[][],
  xRemove: number,
  yRemove: number,
  xSet: number,
  ySet: number,
  piece: string,
  color: string
) {
  let lastMove = {
    piece: piece,
    color: color,
    first_move: !board[yRemove][xRemove].has_moved,
    fromX: xRemove,
    fromY: yRemove,
    toX: xSet,
    toY: ySet
  };

  board[yRemove][xRemove] = {
    piece: "",
    color: "",
    has_moved: true,
    possible_moves: [],
    is_special: [],
    covered: [],
    show_overlay: false,
    overlay: {
      type: "move",
      piece: "",
      color: "",
      x: -1,
      y: -1
    }
  };

  board[ySet][xSet] = {
    piece: piece,
    color: color,
    has_moved: true,
    possible_moves: [],
    is_special: [],
    covered: [],
    show_overlay: false,
    overlay: {
      type: "move",
      piece: "",
      color: "",
      x: -1,
      y: -1
    }
  };

  return { board: board, last_move: lastMove };
}
