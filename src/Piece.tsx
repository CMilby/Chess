import React, { Component } from "react";

export interface IPieceProps {
  piece: string;
  color: string;
  x: number;
  y: number;

  set_overlay_callback: any;

  board: {
    piece: string;
    color: string;
    has_moved: boolean;
    possible_moves: number[][];
    is_special: string[];
    covered: string[];
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

export interface IPieceState {}

export default class Piece extends Component<IPieceProps, IPieceState> {
  constructor(props: any) {
    super(props);

    this.state = {
      possible_moves: [],
      is_special_move: []
    };
  }

  onDragStart(e: any) {
    let square = this.props.board[this.props.y][this.props.x];

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/x", e.target.getAttribute("data-x"));
    e.dataTransfer.setData("text/y", e.target.getAttribute("data-y"));
    e.dataTransfer.setData("text/piece", e.target.getAttribute("data-piece"));
    e.dataTransfer.setData("text/color", e.target.getAttribute("data-color"));
    e.dataTransfer.setData("text/moves", square.possible_moves);
    e.dataTransfer.setData("text/special", square.is_special);

    for (let i = 0; i < square.possible_moves.length; i++) {
      this.props.set_overlay_callback(
        square.possible_moves[i][0],
        square.possible_moves[i][1],
        true
      );
    }
  }

  pieceImg() {
    if (this.props.piece != "") {
      return (
        <div
          className="piece-square draggable"
          draggable
          onDragStart={e => this.onDragStart(e)}
        >
          <img
            data-piece={this.props.piece}
            data-color={this.props.color}
            data-x={this.props.x}
            data-y={this.props.y}
            className="piece-img"
            src={
              process.env.PUBLIC_URL +
              "/pieces/" +
              this.props.piece +
              "_" +
              this.props.color +
              ".png"
            }
          />
        </div>
      );
    }

    return <div />;
  }

  render() {
    return <div>{this.pieceImg()}</div>;
  }
}
