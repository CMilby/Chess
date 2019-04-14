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
        this.props.board[y + 1][x].piece == "" &&
        this.props.board[y + 2][x].piece == ""
      ) {
        ret.push([x, y + 2]);
        isSpecial.push("");
      }

      if (
        this.props.piece_type.endsWith("dark") &&
        this.props.board[y - 1][x].piece == "" &&
        this.props.board[y - 2][x].piece == ""
      ) {
        ret.push([x, y - 2]);
        isSpecial.push("");
      }
    }

    if (
      this.props.piece_type.endsWith("light") &&
      this.props.board[y + 1][x].piece == ""
    ) {
      ret.push([x, y + 1]);
      isSpecial.push("");
    }

    if (
      this.props.piece_type.endsWith("dark") &&
      this.props.board[y - 1][x].piece == ""
    ) {
      ret.push([x, y - 1]);
      isSpecial.push("");
    }

    if (this.props.piece_type.endsWith("light")) {
      if (x - 1 >= 0) {
        if (this.props.board[y + 1][x - 1].piece.endsWith("dark")) {
          ret.push([x - 1, y + 1]);
          isSpecial.push("");
        }
      }

      if (x + 1 < 8) {
        if (this.props.board[y + 1][x + 1].piece.endsWith("dark")) {
          ret.push([x + 1, y + 1]);
          isSpecial.push("");
        }
      }
    } else if (this.props.piece_type.endsWith("dark")) {
      if (x - 1 >= 0) {
        if (this.props.board[y - 1][x - 1].piece.endsWith("light")) {
          ret.push([x - 1, y - 1]);
          isSpecial.push("");
        }
      }

      if (x + 1 < 8) {
        if (this.props.board[y - 1][x + 1].piece.endsWith("light")) {
          ret.push([x + 1, y - 1]);
          isSpecial.push("");
        }
      }
    }

    // Check en passant
    if (this.props.piece_type.endsWith("light") && y == 4) {
      let lastMove = this.props.last_move;
      if (
        lastMove.piece == "pawn_dark" &&
        lastMove.fromY == 6 &&
        lastMove.toY == 4
      ) {
        if (lastMove.toX == x + 1) {
          ret.push([x + 1, y + 1]);
          isSpecial.push("en_passant_" + lastMove.toX + "_" + lastMove.toY);
        } else if (lastMove.toX == x - 1) {
          ret.push([x - 1, y + 1]);
          isSpecial.push("en_passant_" + lastMove.toX + "_" + lastMove.toY);
        }
      }
    } else if (this.props.piece_type.endsWith("dark") && y == 3) {
      let lastMove = this.props.last_move;
      if (
        lastMove.piece == "pawn_light" &&
        lastMove.fromY == 1 &&
        lastMove.toY == 3
      ) {
        if (lastMove.toX == x + 1) {
          ret.push([x + 1, y - 1]);
          isSpecial.push("en_passant_" + lastMove.toX + "_" + lastMove.toY);
        } else if (lastMove.toX == x - 1) {
          ret.push([x - 1, y - 1]);
          isSpecial.push("en_passant_" + lastMove.toX + "_" + lastMove.toY);
        }
      }
    }

    return { moves: ret, is_special: isSpecial };
  }

  canPieceMove(toX: number, toY: number) {
    return 0;
  }
}
