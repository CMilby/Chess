import React, { Component } from "react";

import BoardSquare from "./BoardSquare";

import "./Board.css";

export interface IBoardProps {}

export interface IBoardState {
  board_squares: any[];
  test: string;
}

export default class Board extends Component<IBoardProps, IBoardState> {
  private boardRefs: React.RefObject<any>[][];
  constructor(props: any) {
    super(props);

    this.state = {
      board_squares: [],
      test: ""
    };

    this.boardRefs = [];
    for (let y = 0; y < 8; y++) {
      this.state.board_squares[y] = [];
      this.boardRefs[y] = [];
      for (let x = 0; x < 8; x++) {
        this.boardRefs[y][x] = React.createRef();
        this.state.board_squares[y][x] = this.setupGame(x, y);
      }
    }
  }

  componentDidMount() {
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

    return this.makeSquare(x, y, piece, false);
  }

  makeSquare(x: number, y: number, piece: string, has_moved: boolean) {
    return (
      <BoardSquare
        x={x}
        y={y}
        key={"board_square_" + x + "_" + y}
        piece_type={piece}
        piece_has_moved={has_moved}
        remove_piece_callback={this.removePiece.bind(this)}
        add_piece_callback={this.setPiece.bind(this)}
        set_overlay_callback={this.setOverlay.bind(this)}
        calculate_moves_callback={this.calculateAllMoves.bind(this)}
        board={this.state.board_squares}
        ref={this.boardRefs[y][x]}
      />
    );
  }

  setOverlay(x: number, y: number, show: boolean) {
    this.boardRefs[y][x].current.setOverlay(show);
  }

  setPiece(x: number, y: number, piece: string, recalculate: boolean) {
    let boardSquares = this.state.board_squares;
    boardSquares[y][x] = this.makeSquare(x, y, piece, true);

    let self = this;
    this.setState({ board_squares: boardSquares }, function() {
      if (recalculate) {
        self.calculateAllMoves();
      }
    });
  }

  removePiece(x: number, y: number, recalculate: boolean) {
    this.setPiece(x, y, "", recalculate);
  }

  calculateAllMoves() {
    let states = [] as string[][][];
    for (let y = 0; y < 8; y++) {
      states[y] = [];
      for (let x = 0; x < 8; x++) {
        states[y][x] = [];
        this.boardRefs[y][x].current.clearPieceCoveringSquares();
      }
    }

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        this.boardRefs[y][x].current.calculateMoves();
        let coveredSquares = this.boardRefs[y][
          x
        ].current.calculateCoveredSquares();

        coveredSquares.map((i: any) => {
          states[i[1]][i[0]].push(
            this.state.board_squares[y][x].props.piece_type
          );
        });
      }
    }

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        this.boardRefs[y][x].current.setPiecesCoveringSquares(states[y][x]);
      }
    }
  }

  testOnClick() {
    this.setState({ test: "d" });
  }

  render() {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (this.boardRefs[y][x].current != null) {
          console.log(
            "x: " +
              x +
              " | y: " +
              y +
              " | " +
              this.boardRefs[y][x].current.state.pieces_covering_square
          );
        }
      }
    }

    return (
      <div>
        <table className="board">
          <tbody>
            <tr>{this.state.board_squares[7]}</tr>
            <tr>{this.state.board_squares[6]}</tr>
            <tr>{this.state.board_squares[5]}</tr>
            <tr>{this.state.board_squares[4]}</tr>
            <tr>{this.state.board_squares[3]}</tr>
            <tr>{this.state.board_squares[2]}</tr>
            <tr>{this.state.board_squares[1]}</tr>
            <tr>{this.state.board_squares[0]}</tr>
          </tbody>
        </table>
        <button onClick={this.testOnClick.bind(this)}>test</button>
      </div>
    );
  }
}
