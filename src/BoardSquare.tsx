import React, { Component } from "react";

import Piece from "./Piece";

import Knight from "./pieces/Knight";
import Rook from "./pieces/Rook";

export interface IBoardSquareProps {
  x: number;
  y: number;
  piece_type: string;
  piece_has_moved: boolean;

  remove_piece_callback: any;
  add_piece_callback: any;

  board: any[];
}

export interface IBoardSquareState {
  occupied: number;
}

export default class BoardSquare extends Component<
  IBoardSquareProps,
  IBoardSquareState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      occupied: 0
    };
  }

  onDragOver(e: any) {
    e.preventDefault();
  }

  onDrop(e: any) {
    let piece = e.dataTransfer.getData("text/piece");
    let oldX = e.dataTransfer.getData("text/x") as number;
    let oldY = e.dataTransfer.getData("text/y") as number;

    let moves = e.dataTransfer.getData("text/moves").split(",");
    let movePairs = [] as number[][];
    for (let i = 0; i < moves.length; i += 2) {
      movePairs.push([moves[i + 0], moves[i + 1]]);
    }

    let isValid = false;
    for (let i = 0; i < movePairs.length; i++) {
      if (this.props.x == movePairs[i][0] && this.props.y == movePairs[i][1]) {
        isValid = true;
        break;
      }
    }

    if (isValid) {
      this.props.remove_piece_callback(oldX, oldY);
      this.props.add_piece_callback(this.props.x, this.props.y, piece);
    }
  }

  getPiece(piece_type: string) {
    if (piece_type.startsWith("knight")) {
      return (
        <Knight
          piece_type={piece_type}
          x={this.props.x}
          y={this.props.y}
          has_moved={this.props.piece_has_moved}
          board={this.props.board}
        />
      );
    } else if (piece_type.startsWith("rook")) {
      return (
        <Rook
          piece_type={piece_type}
          x={this.props.x}
          y={this.props.y}
          has_moved={this.props.piece_has_moved}
          board={this.props.board}
        />
      );
    }

    return (
      <Piece
        piece_type={piece_type}
        x={this.props.x}
        y={this.props.y}
        has_moved={this.props.piece_has_moved}
        board={this.props.board}
      />
    );
  }

  render() {
    let classes = "board-square ";
    let x = this.props.x as number;
    let y = this.props.y as number;

    if ((+x + +y) % 2 == 0) {
      classes += "even-square";
    } else {
      classes += "odd-square";
    }

    return (
      <td
        className={classes}
        key={"board_square_td_" + this.props.x + "_" + this.props.y}
        onDragOver={e => this.onDragOver(e)}
        onDrop={e => this.onDrop(e)}
      >
        {this.getPiece(this.props.piece_type)}
      </td>
    );
  }
}
