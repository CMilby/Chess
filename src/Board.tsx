import React, { Component } from "react";

import BoardSquare from "./BoardSquare";

import "./Board.css";

export interface IBoardProps {}

export interface IBoardState {}

export default class Board extends Component<IBoardProps, IBoardState> {
  constructor(props: any) {
    super(props);
  }

  makeSquare(x: number, y: number) {
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

    return (
      <BoardSquare
        x={x}
        y={y}
        key={"board_square_" + x + "_" + y}
        piece_type={piece}
      />
    );
  }

  render() {
    let boardSquares: any[] = [];
    for (let y = 0; y < 8; y++) {
      boardSquares[y] = [];
      for (let x = 0; x < 8; x++) {
        boardSquares[y][x] = this.makeSquare(x, y);
      }
    }

    return (
      <div>
        <table className="board">
          <tbody>
            <tr>{boardSquares[7]}</tr>
            <tr>{boardSquares[6]}</tr>
            <tr>{boardSquares[5]}</tr>
            <tr>{boardSquares[4]}</tr>
            <tr>{boardSquares[3]}</tr>
            <tr>{boardSquares[2]}</tr>
            <tr>{boardSquares[1]}</tr>
            <tr>{boardSquares[0]}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}
