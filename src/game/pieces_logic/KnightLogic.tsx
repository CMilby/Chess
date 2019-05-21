function knightAllMoves(x: number, y: number) {
  let moves = [] as number[][];
  if (x + 1 < 8) {
    if (y + 2 < 8) {
      moves.push([x + 1, y + 2]);
    }

    if (y - 2 >= 0) {
      moves.push([x + 1, y - 2]);
    }
  }

  if (x - 1 >= 0) {
    if (y + 2 < 8) {
      moves.push([x - 1, y + 2]);
    }

    if (y - 2 >= 0) {
      moves.push([x - 1, y - 2]);
    }
  }

  if (x + 2 < 8) {
    if (y + 1 < 8) {
      moves.push([x + 2, y + 1]);
    }

    if (y - 1 >= 0) {
      moves.push([x + 2, y - 1]);
    }
  }

  if (x - 2 >= 0) {
    if (y + 1 < 8) {
      moves.push([x - 2, y + 1]);
    }

    if (y - 1 >= 0) {
      moves.push([x - 2, y - 1]);
    }
  }

  return moves;
}

export function knightPossibleMoves(
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
  let allMoves = knightAllMoves(x, y);

  let possibleMoves = [] as number[][];
  let isSpecial = [] as string[];

  allMoves.map(x => {
    if (knightCanMoveTo(x[0], x[1], board, color) == 1) {
      possibleMoves.push(x);
      isSpecial.push("");
    }
  });

  return { moves: possibleMoves, is_special: isSpecial };
}

export function knightCoveredSquares(x: number, y: number) {
  return knightAllMoves(x, y);
}

function knightCanMoveTo(
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
  let otherPieceColor = board[toY][toX].color;

  if (
    otherPieceColor == "" ||
    (color == "light" && otherPieceColor == "dark") ||
    (color == "dark" && otherPieceColor == "light")
  ) {
    return 1;
  }

  return 0;
}
