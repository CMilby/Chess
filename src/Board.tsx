import React, { Component } from "react";

import BoardSquare from "./BoardSquare";

import "./Board.css";

export interface IBoardProps {}

export interface IBoardState {
  board_squares: any[];
}

export default class Board extends Component<IBoardProps, IBoardState> {
  constructor(props: any) {
    super(props);

    this.state = {
      board_squares: []
    };

    for (let y = 0; y < 8; y++) {
      this.state.board_squares[y] = [];
      for (let x = 0; x < 8; x++) {
        this.state.board_squares[y][x] = this.setupGame(x, y);
      }
    }
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
        board={this.state.board_squares}
      />
    );
  }

  setPiece(x: number, y: number, piece: string) {
    let boardSquares = this.state.board_squares;
    boardSquares[y][x] = this.makeSquare(x, y, piece, true);
    this.setState({ board_squares: boardSquares });
  }

  removePiece(x: number, y: number) {
    this.setPiece(x, y, "");
  }

  render() {
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
      </div>
    );
  }
}
