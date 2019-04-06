import Piece from "../Piece";

export default class Knight extends Piece {
  getAllMoves() {
    let x = +this.props.x;
    let y = +this.props.y;

    let ret = [] as number[][];
    if (x + 1 < 8) {
      if (y + 2 < 8) {
        ret.push([x + 1, y + 2]);
      }

      if (y - 2 >= 0) {
        ret.push([x + 1, y - 2]);
      }
    }

    if (x - 1 >= 0) {
      if (y + 2 < 8) {
        ret.push([x - 1, y + 2]);
      }

      if (y - 2 >= 0) {
        ret.push([x - 1, y - 2]);
      }
    }

    if (x + 2 < 8) {
      if (y + 1 < 8) {
        ret.push([x + 2, y + 1]);
      }

      if (y - 1 >= 0) {
        ret.push([x + 2, y - 1]);
      }
    }

    if (x - 2 >= 0) {
      if (y + 1 < 8) {
        ret.push([x - 2, y + 1]);
      }

      if (y - 1 >= 0) {
        ret.push([x - 2, y - 1]);
      }
    }

    return ret;
  }

  getPossibleMoves() {
    let allMoves = this.getAllMoves();

    let possibleMoves = [] as number[][];
    allMoves.map(x => {
      if (this.canPieceMove(x[0], x[1]) == 1) {
        possibleMoves.push(x);
      }
    });

    return possibleMoves;
  }

  canPieceMove(toX: number, toY: number) {
    let pieceType = this.props.board[toY][toX].props.piece_type;

    if (
      pieceType == "" ||
      (this.props.piece_type.endsWith("light") && pieceType.endsWith("dark")) ||
      (this.props.piece_type.endsWith("dark") && pieceType.endsWith("light"))
    ) {
      return 1;
    }

    return 0;
  }
}
