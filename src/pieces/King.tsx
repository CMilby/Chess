import Piece from "../Piece";

export default class King extends Piece {
  getCoveredSquares() {
    return this.getAllMoves();
  }

  getAllMoves() {
    let x = +this.props.x;
    let y = +this.props.y;

    let ret = [] as number[][];
    if (x + 1 < 8) {
      if (y + 1 < 8) {
        ret.push([x + 1, y + 1]);
      }

      if (y - 1 >= 0) {
        ret.push([x + 1, y - 1]);
      }

      ret.push([x + 1, y]);
    }

    if (x - 1 >= 0) {
      if (y + 1 < 8) {
        ret.push([x - 1, y + 1]);
      }

      if (y - 1 >= 0) {
        ret.push([x - 1, y - 1]);
      }

      ret.push([x - 1, y]);
    }

    if (y + 1 < 8) {
      ret.push([x, y + 1]);
    }

    if (y - 1 >= 0) {
      ret.push([x, y - 1]);
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
    let pieceType = this.props.board[toY][toX];
    let covered = [] as string[];
    if (this.props.covered_squares.length > 0) {
      covered = this.props.covered_squares[toY][toX];
    }

    if (pieceType == "") {
      return 1;
    } else if (
      this.props.piece_type.endsWith("light") &&
      pieceType.endsWith("dark")
    ) {
      for (let i = 0; i < covered.length; i++) {
        if (covered[i].endsWith("dark")) {
          return 0;
        }
      }

      return 1;
    } else if (
      this.props.piece_type.endsWith("dark") &&
      pieceType.endsWith("light")
    ) {
      for (let i = 0; i < covered.length; i++) {
        if (covered[i].endsWith("light")) {
          return 0;
        }
      }

      return 1;
    }

    return 0;
  }
}
