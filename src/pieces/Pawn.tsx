import Piece from "../Piece";

export default class Pawn extends Piece {
  getAllMoves() {
    let x = +this.props.x;
    let y = +this.props.y;

    let ret = [] as number[][];
    if (!this.state.has_moved) {
      if (
        this.props.piece_type.endsWith("light") &&
        this.props.board[y + 1][x].props.piece_type == "" &&
        this.props.board[y + 2][x].props.piece_type == ""
      ) {
        ret.push([x, y + 2]);
      }

      if (
        this.props.piece_type.endsWith("dark") &&
        this.props.board[y - 1][x].props.piece_type == "" &&
        this.props.board[y - 2][x].props.piece_type == ""
      ) {
        ret.push([x, y - 2]);
      }
    }

    if (
      this.props.piece_type.endsWith("light") &&
      this.props.board[y + 1][x].props.piece_type == ""
    ) {
      ret.push([x, y + 1]);
    }

    if (
      this.props.piece_type.endsWith("dark") &&
      this.props.board[y - 1][x].props.piece_type == ""
    ) {
      ret.push([x, y - 1]);
    }

    if (this.props.piece_type.endsWith("light")) {
      if (x - 1 >= 0) {
        if (this.props.board[y + 1][x - 1].props.piece_type.endsWith("dark")) {
          ret.push([x - 1, y + 1]);
        }
      }

      if (x + 1 < 8) {
        if (this.props.board[y + 1][x + 1].props.piece_type.endsWith("dark")) {
          ret.push([x + 1, y + 1]);
        }
      }
    } else if (this.props.piece_type.endsWith("dark")) {
      if (x - 1 >= 0) {
        if (this.props.board[y - 1][x - 1].props.piece_type.endsWith("light")) {
          ret.push([x - 1, y - 1]);
        }
      }

      if (x + 1 < 8) {
        if (this.props.board[y - 1][x + 1].props.piece_type.endsWith("light")) {
          ret.push([x + 1, y - 1]);
        }
      }
    }

    return ret;
  }

  getPossibleMoves() {
    return this.getAllMoves();
  }

  canPieceMove(toX: number, toY: number) {
    return 0;
  }
}
