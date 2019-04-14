import Piece from "../Piece";

export default class Pawn extends Piece {
  getCoveredSquares() {
    let x = +this.props.x;
    let y = +this.props.y;

    let ret = [] as number[][];

    if (this.props.piece_type.endsWith("light")) {
      if (x - 1 >= 0) {
        ret.push([x - 1, y + 1]);
      }

      if (x + 1 < 8) {
        ret.push([x + 1, y + 1]);
      }
    } else if (this.props.piece_type.endsWith("dark")) {
      if (x - 1 >= 0) {
        ret.push([x - 1, y - 1]);
      }

      if (x + 1 < 8) {
        ret.push([x + 1, y - 1]);
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

    if (!this.props.has_moved_piece) {
      if (
        this.props.piece_type.endsWith("light") &&
        this.props.board[y + 1][x] == "" &&
        this.props.board[y + 2][x] == ""
      ) {
        ret.push([x, y + 2]);
        isSpecial.push("");
      }

      if (
        this.props.piece_type.endsWith("dark") &&
        this.props.board[y - 1][x] == "" &&
        this.props.board[y - 2][x] == ""
      ) {
        ret.push([x, y - 2]);
        isSpecial.push("");
      }
    }

    if (
      this.props.piece_type.endsWith("light") &&
      this.props.board[y + 1][x] == ""
    ) {
      ret.push([x, y + 1]);
      isSpecial.push("");
    }

    if (
      this.props.piece_type.endsWith("dark") &&
      this.props.board[y - 1][x] == ""
    ) {
      ret.push([x, y - 1]);
      isSpecial.push("");
    }

    if (this.props.piece_type.endsWith("light")) {
      if (x - 1 >= 0) {
        if (this.props.board[y + 1][x - 1].endsWith("dark")) {
          ret.push([x - 1, y + 1]);
          isSpecial.push("");
        }
      }

      if (x + 1 < 8) {
        if (this.props.board[y + 1][x + 1].endsWith("dark")) {
          ret.push([x + 1, y + 1]);
          isSpecial.push("");
        }
      }
    } else if (this.props.piece_type.endsWith("dark")) {
      if (x - 1 >= 0) {
        if (this.props.board[y - 1][x - 1].endsWith("light")) {
          ret.push([x - 1, y - 1]);
          isSpecial.push("");
        }
      }

      if (x + 1 < 8) {
        if (this.props.board[y - 1][x + 1].endsWith("light")) {
          ret.push([x + 1, y - 1]);
          isSpecial.push("");
        }
      }
    }

    return { moves: ret, is_special: isSpecial };
  }

  canPieceMove(toX: number, toY: number) {
    return 0;
  }
}
