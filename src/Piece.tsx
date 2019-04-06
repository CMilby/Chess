import React, { Component } from "react";

export interface IPieceProps {
  piece_type: string;
  has_moved: boolean;
  x: number;
  y: number;

  board: any[];
}

export interface IPieceState {
  has_moved: boolean;
}

export default class Piece extends Component<IPieceProps, IPieceState> {
  constructor(props: any) {
    super(props);

    this.state = {
      has_moved: this.props.has_moved
    };
  }

  onDragStart(e: any) {
    let possibleMoves = this.getPossibleMoves();

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/x", e.target.getAttribute("data-x"));
    e.dataTransfer.setData("text/y", e.target.getAttribute("data-y"));
    e.dataTransfer.setData("text/piece", e.target.getAttribute("data-piece"));
    e.dataTransfer.setData("text/moves", possibleMoves);

    console.log(possibleMoves);
  }

  getAllMoves() {
    return [] as number[][];
  }

  getPossibleMoves() {
    return [] as number[][];
  }

  canPieceMove(toX: number, toY: number) {
    return 0;
  }

  pieceImg(type: string) {
    if (type != "") {
      return (
        <div
          className="piece-square draggable"
          draggable
          onDragStart={e => this.onDragStart(e)}
        >
          <img
            data-piece={this.props.piece_type}
            data-x={this.props.x}
            data-y={this.props.y}
            className="piece-img"
            src={
              process.env.PUBLIC_URL +
              "/pieces/" +
              this.props.piece_type +
              ".png"
            }
          />
        </div>
      );
    }

    return <div />;
  }

  render() {
    let img = this.pieceImg(this.props.piece_type);
    return <div>{img}</div>;
  }
}
