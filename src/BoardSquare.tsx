import React, { Component } from "react";

import Overlay from "./Overlay";

import Piece from "./Piece";

export interface IBoardSquareProps {
  x: number;
  y: number;
  piece: string;
  color: string;

  set_overlay_callback: any;
  set_and_remove_callback: any;
  promotion_overlay_show_callback: any;
  promotion_overlay_click_callback: any;

  board: {
    piece: string;
    color: string;
    has_moved: boolean;
    possible_moves: number[][];
    is_special: string[];
    covered: string[];
    show_overlay: boolean;
    overlay: {
      type: string;
      piece: string;
      color: string;
      x: number;
      y: number;
    };
  }[][];
  last_move: {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    piece: string;
    color: string;
  };
}

export interface IBoardSquareState {}

export default class BoardSquare extends Component<
  IBoardSquareProps,
  IBoardSquareState
> {
  constructor(props: any) {
    super(props);
  }

  onDragOver(e: any) {
    e.preventDefault();
  }

  onDrop(e: any) {
    let piece = e.dataTransfer.getData("text/piece");
    let color = e.dataTransfer.getData("text/color");
    let oldX = e.dataTransfer.getData("text/x") as number;
    let oldY = e.dataTransfer.getData("text/y") as number;

    let moves = e.dataTransfer.getData("text/moves").split(",");
    let isSpecial = e.dataTransfer.getData("text/special").split(",");

    let movePairs = [] as number[][];

    for (let i = 0; i < moves.length; i += 2) {
      if (moves.length == 1) {
        break;
      }

      movePairs.push([moves[i + 0], moves[i + 1]]);
      this.props.set_overlay_callback(moves[i + 0], moves[i + 1], false);
    }

    let special = "";
    let isValid = false;
    for (let i = 0; i < movePairs.length; i++) {
      if (this.props.x == movePairs[i][0] && this.props.y == movePairs[i][1]) {
        isValid = true;
        special = isSpecial[i];
        break;
      }
    }

    if (isValid) {
      this.props.set_and_remove_callback(
        oldX,
        oldY,
        this.props.x,
        this.props.y,
        piece,
        color
      );

      if (special == "OO_light") {
        this.props.set_and_remove_callback(7, 0, 5, 0, "rook", "light");
      } else if (special == "OOO_light") {
        this.props.set_and_remove_callback(0, 0, 3, 0, "rook", "light");
      } else if (special == "OO_dark") {
        this.props.set_and_remove_callback(7, 7, 5, 7, "rook", "dark");
      } else if (special == "OOO_dark") {
        this.props.set_and_remove_callback(0, 7, 3, 7, "rook", "dark");
      } else if (special.startsWith("en_passant")) {
        let tokens = special.split("_");
        this.props.set_and_remove_callback(
          tokens[2],
          tokens[3],
          tokens[2],
          tokens[3],
          ""
        );
      } else if (special.startsWith("promotion")) {
        this.props.promotion_overlay_show_callback(
          color,
          this.props.x,
          this.props.y
        );
      }
    }
  }

  getPiece() {
    return (
      <Piece
        piece={this.props.piece}
        color={this.props.color}
        x={this.props.x}
        y={this.props.y}
        set_overlay_callback={this.props.set_overlay_callback}
        board={this.props.board}
        last_move={this.props.last_move}
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

    let overlay = <div />;
    if (this.props.board[y][x].show_overlay) {
      overlay = (
        <Overlay
          color="green"
          x={this.props.x}
          y={this.props.y}
          promotion_overlay_click_callback={
            this.props.promotion_overlay_click_callback
          }
          overlay={this.props.board[y][x].overlay}
        />
      );
    }

    return (
      <td
        className="board-square-td"
        key={"board_square_td_" + this.props.x + "_" + this.props.y}
        onDragOver={e => this.onDragOver(e)}
        onDrop={e => this.onDrop(e)}
      >
        <div className={classes}>
          <div>{overlay}</div>
          <div className="board-square-content">{this.getPiece()}</div>
        </div>
      </td>
    );
  }
}
