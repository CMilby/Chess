export function pawnPossibleMoves(
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
  color: string,
  lastMove: {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    piece: string;
    color: string;
  }
) {
  let moves = [] as number[][];
  let isSpecial = [] as string[];

  if ((color == "light" && y == 7) || (color == "dark" && y == 0)) {
    return { moves: moves, is_special: isSpecial };
  }

  if (!board[y][x].has_moved) {
    if (
      color == "light" &&
      board[y + 1][x].piece == "" &&
      board[y + 2][x].piece == ""
    ) {
      moves.push([x, y + 2]);
      isSpecial.push("");
    }

    if (
      color == "dark" &&
      board[y - 1][x].piece == "" &&
      board[y - 2][x].piece == ""
    ) {
      moves.push([x, y - 2]);
      isSpecial.push("");
    }
  }

  if (color == "light" && board[y + 1][x].piece == "") {
    moves.push([x, y + 1]);
    isSpecial.push("");
  }

  if (color == "dark" && board[y - 1][x].piece == "") {
    moves.push([x, y - 1]);
    isSpecial.push("");
  }

  if (color == "light") {
    if (x - 1 >= 0) {
      if (board[y + 1][x - 1].color == "dark") {
        moves.push([x - 1, y + 1]);
        isSpecial.push("");
      }
    }

    if (x + 1 < 8) {
      if (board[y + 1][x + 1].color == "dark") {
        moves.push([x + 1, y + 1]);
        isSpecial.push("");
      }
    }
  } else if (color == "dark") {
    if (x - 1 >= 0) {
      if (board[y - 1][x - 1].color == "light") {
        moves.push([x - 1, y - 1]);
        isSpecial.push("");
      }
    }

    if (x + 1 < 8) {
      if (board[y - 1][x + 1].color == "light") {
        moves.push([x + 1, y - 1]);
        isSpecial.push("");
      }
    }
  }

  // Check if promotion
  for (let i = 0; i < moves.length; i++) {
    if (color == "light" && moves[i][1] == 7) {
      isSpecial[i] = "promotion";
    } else if (color == "dark" && moves[i][1] == 0) {
      isSpecial[i] = "promotion";
    }
  }

  // Check en passant
  if (color == "light" && y == 4) {
    if (
      lastMove.piece == "pawn" &&
      lastMove.color == "dark" &&
      lastMove.fromY == 6 &&
      lastMove.toY == 4
    ) {
      if (lastMove.toX == x + 1) {
        moves.push([x + 1, y + 1]);
        isSpecial.push("en_passant_" + lastMove.toX + "_" + lastMove.toY);
      } else if (lastMove.toX == x - 1) {
        moves.push([x - 1, y + 1]);
        isSpecial.push("en_passant_" + lastMove.toX + "_" + lastMove.toY);
      }
    }
  } else if (color == "dark" && y == 3) {
    if (
      lastMove.piece == "pawn" &&
      lastMove.color == "light" &&
      lastMove.fromY == 1 &&
      lastMove.toY == 3
    ) {
      if (lastMove.toX == x + 1) {
        moves.push([x + 1, y - 1]);
        isSpecial.push("en_passant_" + lastMove.toX + "_" + lastMove.toY);
      } else if (lastMove.toX == x - 1) {
        moves.push([x - 1, y - 1]);
        isSpecial.push("en_passant_" + lastMove.toX + "_" + lastMove.toY);
      }
    }
  }

  return { moves: moves, is_special: isSpecial };
}

export function pawnCoveredSquares(x: number, y: number, color: string) {
  let moves = [] as number[][];

  if ((color == "light" && y == 7) || (color == "dark" && y == 0)) {
    return moves;
  }

  if (color == "light") {
    if (x - 1 >= 0) {
      moves.push([x - 1, y + 1]);
    }

    if (x + 1 < 8) {
      moves.push([x + 1, y + 1]);
    }
  } else if (color == "dark") {
    if (x - 1 >= 0) {
      moves.push([x - 1, y - 1]);
    }

    if (x + 1 < 8) {
      moves.push([x + 1, y - 1]);
    }
  }

  return moves;
}
