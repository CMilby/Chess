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
    let isSpecial = [] as string[];

    let possibleMoves = [] as number[][];
    allMoves.map(x => {
      if (this.canPieceMove(x[0], x[1]) == 1) {
        possibleMoves.push(x);
        isSpecial.push("");
      }
    });

    // Check king side castle
    if (
      this.props.piece_type.endsWith("light") &&
      !this.props.has_moved_piece
    ) {
      if (
        this.props.board[0][5] == "" &&
        this.props.board[0][6] == "" &&
        this.props.board[0][7] == "rook_light" &&
        !this.props.has_moved[0][7]
      ) {
        if (
          !this.isSquareCovered(5, 0, this.props.piece_type) &&
          !this.isSquareCovered(6, 0, this.props.piece_type)
        ) {
          possibleMoves.push([6, 0]);
          isSpecial.push("OO_light");
        }
      }
    } else if (
      this.props.piece_type.endsWith("dark") &&
      !this.props.has_moved_piece
    ) {
      if (
        this.props.board[7][5] == "" &&
        this.props.board[7][6] == "" &&
        this.props.board[7][7] == "rook_dark" &&
        !this.props.has_moved[7][7]
      ) {
        if (
          !this.isSquareCovered(5, 7, this.props.piece_type) &&
          !this.isSquareCovered(6, 7, this.props.piece_type)
        ) {
          possibleMoves.push([6, 7]);
          isSpecial.push("OO_dark");
        }
      }
    }

    // Check queen side castle
    if (
      this.props.piece_type.endsWith("light") &&
      !this.props.has_moved_piece
    ) {
      if (
        this.props.board[0][1] == "" &&
        this.props.board[0][2] == "" &&
        this.props.board[0][3] == "" &&
        this.props.board[0][0] == "rook_light" &&
        !this.props.has_moved[0][0]
      ) {
        if (
          !this.isSquareCovered(1, 0, this.props.piece_type) &&
          !this.isSquareCovered(2, 0, this.props.piece_type) &&
          !this.isSquareCovered(3, 0, this.props.piece_type)
        ) {
          possibleMoves.push([2, 0]);
          isSpecial.push("OOO_light");
        }
      }
    } else if (
      this.props.piece_type.endsWith("dark") &&
      !this.props.has_moved_piece
    ) {
      if (
        this.props.board[7][1] == "" &&
        this.props.board[7][2] == "" &&
        this.props.board[7][3] == "" &&
        this.props.board[7][0] == "rook_dark" &&
        !this.props.has_moved[7][0]
      ) {
        if (
          !this.isSquareCovered(1, 7, this.props.piece_type) &&
          !this.isSquareCovered(2, 7, this.props.piece_type) &&
          !this.isSquareCovered(3, 7, this.props.piece_type)
        ) {
          possibleMoves.push([2, 7]);
          isSpecial.push("OOO_dark");
        }
      }
    }

    return { moves: possibleMoves, is_special: isSpecial };
  }

  isSquareCovered(x: number, y: number, piece: string) {
    if (piece.endsWith("light")) {
      for (let i = 0; i < this.props.covered_squares[y][x].length; i++) {
        let coveredBy = this.props.covered_squares[y][x][i];
        if (coveredBy != undefined && coveredBy.endsWith("dark")) {
          return true;
        }
      }
    } else if (piece.endsWith("dark")) {
      for (let i = 0; i < this.props.covered_squares[y][x].length; i++) {
        let coveredBy = this.props.covered_squares[y][x][i];
        if (coveredBy != undefined && coveredBy.endsWith("light")) {
          return true;
        }
      }
    }

    return false;
  }

  canPieceMove(toX: number, toY: number) {
    let pieceType = this.props.board[toY][toX];
    let covered = [] as string[];
    if (this.props.covered_squares.length > 0) {
      covered = this.props.covered_squares[toY][toX];
    }

    if (pieceType == "") {
      for (let i = 0; i < covered.length; i++) {
        if (
          this.props.piece_type.endsWith("light") &&
          covered[i].endsWith("dark")
        ) {
          return 0;
        } else if (
          this.props.piece_type.endsWith("dark") &&
          covered[i].endsWith("light")
        ) {
          return 0;
        }
      }

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
