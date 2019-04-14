import React, { Component } from "react";

import BoardSquare from "./BoardSquare";

import "./Board.css";

export interface IBoardProps {}

export interface IBoardState {
  board: { piece: string; has_moved: boolean }[][];
  covered_squares: string[][][];
  last_move: any;
}

export default class Board extends Component<IBoardProps, IBoardState> {
  private boardRefs: React.RefObject<any>[][];
  constructor(props: any) {
    super(props);

    this.state = {
      board: [],
      covered_squares: [],
      last_move: {}
    };

    this.boardRefs = [];
    for (let y = 0; y < 8; y++) {
      this.state.board[y] = [];
      this.boardRefs[y] = [];

      for (let x = 0; x < 8; x++) {
        this.boardRefs[y][x] = React.createRef();
        this.state.board[y][x] = {
          piece: this.setupGame(x, y),
          has_moved: false
        };
      }
    }
  }

  componentDidMount() {
    this.calculateAllMoves();
  }

  componentDidUpdate() {
    this.calculateAllMoves();
  }

  setupGame(x: number, y: number) {
    let piece: string = "";
    if (y == 0) {
      if (x == 0) {
        piece = "rook_light";
      } else if (x == 1) {
        piece = "knight_light";
      } else if (x == 2) {
        piece = "bishop_light";
      } else if (x == 3) {
        piece = "queen_light";
      } else if (x == 4) {
        piece = "king_light";
      } else if (x == 5) {
        piece = "bishop_light";
      } else if (x == 6) {
        piece = "knight_light";
      } else if (x == 7) {
        piece = "rook_light";
      }
    } else if (y == 1) {
      piece = "pawn_light";
    } else if (y == 6) {
      piece = "pawn_dark";
    } else if (y == 7) {
      if (x == 0) {
        piece = "rook_dark";
      } else if (x == 1) {
        piece = "knight_dark";
      } else if (x == 2) {
        piece = "bishop_dark";
      } else if (x == 3) {
        piece = "queen_dark";
      } else if (x == 4) {
        piece = "king_dark";
      } else if (x == 5) {
        piece = "bishop_dark";
      } else if (x == 6) {
        piece = "knight_dark";
      } else if (x == 7) {
        piece = "rook_dark";
      }
    }

    return piece;
  }

  makeSquare(x: number, y: number, piece: any) {
    return (
      <BoardSquare
        x={x}
        y={y}
        key={"board_square_" + x + "_" + y}
        piece_type={piece.piece}
        piece_has_moved={piece.has_moved}
        set_overlay_callback={this.setOverlay.bind(this)}
        set_and_remove_callback={this.setAndRemovePiece.bind(this)}
        board={this.state.board}
        covered_squares={this.state.covered_squares}
        last_move={this.state.last_move}
        ref={this.boardRefs[y][x]}
      />
    );
  }

  setOverlay(x: number, y: number, show: boolean) {
    this.boardRefs[y][x].current.setOverlay(show);
  }

  setAndRemovePiece(
    xRemove: number,
    yRemove: number,
    xSet: number,
    ySet: number,
    piece: string
  ) {
    let board = this.state.board;
    let lastMove = {
      piece: piece,
      first_move: !board[yRemove][xRemove].has_moved,
      fromX: xRemove,
      fromY: yRemove,
      toX: xSet,
      toY: ySet
    };

    board[yRemove][xRemove] = { piece: "", has_moved: true };
    board[ySet][xSet] = { piece: piece, has_moved: true };

    this.setState({ board: board, last_move: lastMove });
  }

  /*
  setPiece(x: number, y: number, piece: string, xFrom: number, yFrom: number) {
    let lastMove = {
      piece: piece,
      first_move: false
    };

    let board = this.state.board;
    board[y][x] = { piece: piece, has_moved: true };

    /* let hasMoved = this.state.has_moved;

    let lastMove = {
      piece: piece,
      first_move: !hasMoved[y][x],
      to: [x, y]
    };

    // hasMoved[y][x] = true;

    this.setState({ board: board, last_move: lastMove });
  }

  removePiece(x: number, y: number) {
    let board = this.state.board;
    board[y][x] = { piece: "", has_moved: true };

    this.setState({ board: board });
  }*/

  calculateAllMoves() {
    let states = [] as string[][][];
    for (let y = 0; y < 8; y++) {
      states[y] = [];
      for (let x = 0; x < 8; x++) {
        states[y][x] = [];
      }
    }

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        this.boardRefs[y][x].current.calculateMoves();
        let coveredSquares = this.boardRefs[y][
          x
        ].current.calculateCoveredSquares();

        coveredSquares.map((i: any) => {
          states[i[1]][i[0]].push(this.state.board[y][x].piece);
        });
      }
    }

    if (JSON.stringify(states) !== JSON.stringify(this.state.covered_squares)) {
      this.setState({ covered_squares: states });
    }
  }

  render() {
    let board = [] as any[][];
    for (let y = 0; y < 8; y++) {
      board[y] = [];
      for (let x = 0; x < 8; x++) {
        board[y][x] = this.makeSquare(x, y, this.state.board[y][x]);
      }
    }

    return (
      <div>
        <table className="board">
          <tbody>
            <tr>{board[7]}</tr>
            <tr>{board[6]}</tr>
            <tr>{board[5]}</tr>
            <tr>{board[4]}</tr>
            <tr>{board[3]}</tr>
            <tr>{board[2]}</tr>
            <tr>{board[1]}</tr>
            <tr>{board[0]}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}
