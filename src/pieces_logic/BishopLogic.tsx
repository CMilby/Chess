function bishopAllMoves(
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
  condition: number
) {
  let moves = [] as number[][];

  let canMoveMore = true;
  for (let i = 1; i < 8; i++) {
    if (x + i > 7 || y + i > 7) {
      break;
    }

    let canMove = bishopCanMoveTo(x + i, y + i, board, color);
    if (canMove >= condition) {
      moves.push([x + i, y + i]);
    }

    if (canMove == 2 || canMove == 0) {
      canMoveMore = false;
    }

    if (!canMoveMore) {
      break;
    }
  }

  canMoveMore = true;
  for (let i = 1; i < 8; i++) {
    if (x - i < 0 || y - i < 0) {
      break;
    }

    let canMove = bishopCanMoveTo(x - i, y - i, board, color);
    if (canMove >= condition) {
      moves.push([x - i, y - i]);
    }

    if (canMove == 2 || canMove == 0) {
      canMoveMore = false;
    }

    if (!canMoveMore) {
      break;
    }
  }

  canMoveMore = true;
  for (let i = 1; i < 8; i++) {
    if (x + i > 7 || y - i < 0) {
      break;
    }

    let canMove = bishopCanMoveTo(x + i, y - i, board, color);
    if (canMove >= condition) {
      moves.push([x + i, y - i]);
    }

    if (canMove == 2 || canMove == 0) {
      canMoveMore = false;
    }

    if (!canMoveMore) {
      break;
    }
  }

  canMoveMore = true;
  for (let i = 1; i < 8; i++) {
    if (x - i < 0 || y + i > 7) {
      break;
    }

    let canMove = bishopCanMoveTo(x - i, y + i, board, color);
    if (canMove >= condition) {
      moves.push([x - i, y + i]);
    }

    if (canMove == 2 || canMove == 0) {
      canMoveMore = false;
    }

    if (!canMoveMore) {
      break;
    }
  }

  return moves;
}

export function bishopPossibleMoves(
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
  let allMoves = bishopAllMoves(x, y, board, color, 1);
  let isSpecial = [] as string[];

  for (let i = 0; i < allMoves.length; i++) {
    isSpecial.push("");
  }

  return { moves: allMoves, is_special: isSpecial };
}

export function bishopCoveredSquares(
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
  return bishopAllMoves(x, y, board, color, 0);
}

function bishopCanMoveTo(
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

  if (otherPieceColor == "") {
    return 1;
  } else if (
    (color == "light" && otherPieceColor == "dark") ||
    (color == "dark" && otherPieceColor == "light")
  ) {
    return 2;
  } else if (
    (color == "dark" && otherPieceColor == "dark") ||
    (color == "light" && otherPieceColor == "light")
  ) {
    return 0;
  }

  return -1;
}
