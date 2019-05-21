function kingAllMoves(x: number, y: number) {
  let moves = [] as number[][];
  if (x + 1 < 8) {
    if (y + 1 < 8) {
      moves.push([x + 1, y + 1]);
    }

    if (y - 1 >= 0) {
      moves.push([x + 1, y - 1]);
    }

    moves.push([x + 1, y]);
  }

  if (x - 1 >= 0) {
    if (y + 1 < 8) {
      moves.push([x - 1, y + 1]);
    }

    if (y - 1 >= 0) {
      moves.push([x - 1, y - 1]);
    }

    moves.push([x - 1, y]);
  }

  if (y + 1 < 8) {
    moves.push([x, y + 1]);
  }

  if (y - 1 >= 0) {
    moves.push([x, y - 1]);
  }

  return moves;
}

export function kingPossibleMoves(
  x: number,
  y: number,
  board: {
    piece: string;
    color: string;
    has_moved: boolean;
    possible_moves: number[][];
    is_special: string[];
    covered: string[];
    show_overlay: boolean;
  }[][],
  color: string
) {
  let allMoves = kingAllMoves(x, y);
  let isSpecial = [] as string[];

  let possibleMoves = [] as number[][];
  allMoves.map(x => {
    if (kingCanMoveTo(x[0], x[1], board, color) == 1) {
      possibleMoves.push(x);
      isSpecial.push("");
    }
  });

  // Check king side castle
  if (color == "light" && !board[y][x].has_moved) {
    if (
      board[0][5].piece == "" &&
      board[0][6].piece == "" &&
      board[0][7].piece == "rook" &&
      board[0][7].color == "light" &&
      !board[0][7].has_moved
    ) {
      if (
        !isSquareCovered(5, 0, color, board) &&
        !isSquareCovered(6, 0, color, board)
      ) {
        possibleMoves.push([6, 0]);
        isSpecial.push("OO_light");
      }
    }
  } else if (color == "dark" && !board[y][x].has_moved) {
    if (
      board[7][5].piece == "" &&
      board[7][6].piece == "" &&
      board[7][7].piece == "rook" &&
      board[7][7].color == "dark" &&
      !board[7][7].has_moved
    ) {
      if (
        !isSquareCovered(5, 7, color, board) &&
        !isSquareCovered(6, 7, color, board)
      ) {
        possibleMoves.push([6, 7]);
        isSpecial.push("OO_dark");
      }
    }
  }

  // Check queen side castle
  if (color == "light" && !board[y][x].has_moved) {
    if (
      board[0][1].piece == "" &&
      board[0][2].piece == "" &&
      board[0][3].piece == "" &&
      board[0][0].piece == "rook" &&
      board[0][0].color == "light" &&
      !board[0][0].has_moved
    ) {
      if (
        !isSquareCovered(1, 0, color, board) &&
        !isSquareCovered(2, 0, color, board) &&
        !isSquareCovered(3, 0, color, board)
      ) {
        possibleMoves.push([2, 0]);
        isSpecial.push("OOO_light");
      }
    }
  } else if (color == "dark" && !board[y][x].has_moved) {
    if (
      board[7][1].piece == "" &&
      board[7][2].piece == "" &&
      board[7][3].piece == "" &&
      board[7][0].piece == "rook" &&
      board[7][0].color == "dark" &&
      !board[7][0].has_moved
    ) {
      if (
        !isSquareCovered(1, 7, color, board) &&
        !isSquareCovered(2, 7, color, board) &&
        !isSquareCovered(3, 7, color, board)
      ) {
        possibleMoves.push([2, 7]);
        isSpecial.push("OOO_dark");
      }
    }
  }

  return { moves: possibleMoves, is_special: isSpecial };
}

export function kingCoveredSquares(x: number, y: number) {
  return kingAllMoves(x, y);
}

function kingCanMoveTo(
  toX: number,
  toY: number,
  board: {
    piece: string;
    color: string;
    has_moved: boolean;
    possible_moves: number[][];
    is_special: string[];
    covered: string[];
    show_overlay: boolean;
  }[][],
  color: string
) {
  let otherPiece = board[toY][toX].piece;
  let otherPieceColor = board[toY][toX].color;
  let covered = board[toY][toX].covered;

  if (otherPiece == "") {
    for (let i = 0; i < covered.length; i++) {
      if (color == "light" && covered[i] == "dark") {
        return 0;
      } else if (color == "dark" && covered[i] == "light") {
        return 0;
      }
    }

    return 1;
  } else if (color == "light" && otherPieceColor == "dark") {
    for (let i = 0; i < covered.length; i++) {
      if (covered[i] == "dark") {
        return 0;
      }
    }

    return 1;
  } else if (color == "dark" && otherPieceColor == "light") {
    for (let i = 0; i < covered.length; i++) {
      if (covered[i] == "light") {
        return 0;
      }
    }

    return 1;
  }

  return 0;
}

function isSquareCovered(
  x: number,
  y: number,
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
  if (color == "light") {
    for (let i = 0; i < board[y][x].covered.length; i++) {
      let coveredBy = board[y][x].covered[i];
      if (coveredBy != undefined && coveredBy == "dark") {
        return true;
      }
    }
  } else if (color == "dark") {
    for (let i = 0; i < board[y][x].covered.length; i++) {
      let coveredBy = board[y][x].covered[i];
      if (coveredBy != undefined && coveredBy == "light") {
        return true;
      }
    }
  }

  return false;
}
