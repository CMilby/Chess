import Piece from "../Piece";

export default class Rook extends Piece {
  getCoveredSquares() {
    let x = +this.props.x;
    let y = +this.props.y;

    let ret = [] as number[][];

    let canMoveMore = true;
    for (let i = x + 1; i < 8; i++) {
      let canMove = this.canPieceMove(i, y);
      if (canMove >= 0) {
        ret.push([i, y]);
      }

      if (canMove == 2 || canMove == 0) {
        canMoveMore = false;
      }

      if (!canMoveMore) {
        break;
      }
    }

    canMoveMore = true;
    for (let i = x - 1; i >= 0; i--) {
      let canMove = this.canPieceMove(i, y);
      if (canMove >= 0) {
        ret.push([i, y]);
      }

      if (canMove == 2 || canMove == 0) {
        canMoveMore = false;
      }

      if (!canMoveMore) {
        break;
      }
    }

    canMoveMore = true;
    for (let i = y + 1; i < 8; i++) {
      let canMove = this.canPieceMove(x, i);
      if (canMove >= 0) {
        ret.push([x, i]);
      }

      if (canMove == 2 || canMove == 0) {
        canMoveMore = false;
      }

      if (!canMoveMore) {
        break;
      }
    }

    canMoveMore = true;
    for (let i = y - 1; i >= 0; i--) {
      let canMove = this.canPieceMove(x, i);
      if (canMove >= 0) {
        ret.push([x, i]);
      }

      if (canMove == 2 || canMove == 0) {
        canMoveMore = false;
      }

      if (!canMoveMore) {
        break;
      }
    }

    return ret;
  }

  getAllMoves() {
    return [] as number[][];
  }

  getPossibleMoves() {
    let x = +this.props.x;
    let y = +this.props.y;

    let ret = [] as number[][];
    let isSpecial = [] as string[];

    let canMoveMore = true;
    for (let i = x + 1; i < 8; i++) {
      let canMove = this.canPieceMove(i, y);
      if (canMove > 0) {
        ret.push([i, y]);
        isSpecial.push("");
      }

      if (canMove == 2 || canMove == 0) {
        canMoveMore = false;
      }

      if (!canMoveMore) {
        break;
      }
    }

    canMoveMore = true;
    for (let i = x - 1; i >= 0; i--) {
      let canMove = this.canPieceMove(i, y);
      if (canMove > 0) {
        ret.push([i, y]);
        isSpecial.push("");
      }

      if (canMove == 2 || canMove == 0) {
        canMoveMore = false;
      }

      if (!canMoveMore) {
        break;
      }
    }

    canMoveMore = true;
    for (let i = y + 1; i < 8; i++) {
      let canMove = this.canPieceMove(x, i);
      if (canMove > 0) {
        ret.push([x, i]);
        isSpecial.push("");
      }

      if (canMove == 2 || canMove == 0) {
        canMoveMore = false;
      }

      if (!canMoveMore) {
        break;
      }
    }

    canMoveMore = true;
    for (let i = y - 1; i >= 0; i--) {
      let canMove = this.canPieceMove(x, i);
      if (canMove > 0) {
        ret.push([x, i]);
        isSpecial.push("");
      }

      if (canMove == 2 || canMove == 0) {
        canMoveMore = false;
      }

      if (!canMoveMore) {
        break;
      }
    }

    return { moves: ret, is_special: isSpecial };
  }

  canPieceMove(toX: number, toY: number) {
    let pieceType = this.props.board[toY][toX];

    if (pieceType == "") {
      return 1;
    } else if (
      (this.props.piece_type.endsWith("light") && pieceType.endsWith("dark")) ||
      (this.props.piece_type.endsWith("dark") && pieceType.endsWith("light"))
    ) {
      return 2;
    } else if (
      (this.props.piece_type.endsWith("dark") && pieceType.endsWith("dark")) ||
      (this.props.piece_type.endsWith("light") && pieceType.endsWith("light"))
    ) {
      return 0;
    }

    return -1;
  }
}
