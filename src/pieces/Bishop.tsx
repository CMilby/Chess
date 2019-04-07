import Piece from "../Piece";

export default class Bishop extends Piece {
  getAllMoves() {
    let x = +this.props.x;
    let y = +this.props.y;

    let ret = [] as number[][];
    let canMoveMore = true;
    for (let i = 1; i < 8; i++) {
      if (x + i > 7 || y + i > 7) {
        break;
      }

      let canMove = this.canPieceMove(x + i, y + i);
      if (canMove > 0) {
        ret.push([x + i, y + i]);
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

      let canMove = this.canPieceMove(x - i, y - i);
      if (canMove > 0) {
        ret.push([x - i, y - i]);
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

      let canMove = this.canPieceMove(x + i, y - i);
      if (canMove > 0) {
        ret.push([x + i, y - i]);
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

      let canMove = this.canPieceMove(x - i, y + i);
      if (canMove > 0) {
        ret.push([x - i, y + i]);
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

  getPossibleMoves() {
    return this.getAllMoves();
  }

  canPieceMove(toX: number, toY: number) {
    let pieceType = this.props.board[toY][toX].props.piece_type;

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
