import React, { Component } from "react";

export interface IPieceProps {
  piece_type: string;
  has_moved_piece: boolean;
  x: number;
  y: number;

  set_overlay_callback: any;

  board: string[][];
  has_moved: boolean[][];
  covered_squares: string[][][];
}

export interface IPieceState {
  possible_moves: number[][];
  is_special_move: string[];
}

export default class Piece extends Component<IPieceProps, IPieceState> {
  constructor(props: any) {
    super(props);

    this.state = {
      possible_moves: [],
      is_special_move: []
    };
  }

  recalculateCoveredSquares() {
    return this.getCoveredSquares();
  }

  recalculatePossibleMoves() {
    let possibleMoves = this.getPossibleMoves();
    if (
      JSON.stringify(possibleMoves) !==
      JSON.stringify(this.state.possible_moves)
    ) {
      this.setState({
        possible_moves: possibleMoves.moves,
        is_special_move: possibleMoves.is_special
      });
    }
  }

  onDragStart(e: any) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/x", e.target.getAttribute("data-x"));
    e.dataTransfer.setData("text/y", e.target.getAttribute("data-y"));
    e.dataTransfer.setData("text/piece", e.target.getAttribute("data-piece"));
    e.dataTransfer.setData("text/moves", this.state.possible_moves);
    e.dataTransfer.setData("text/special", this.state.is_special_move);

    for (let i = 0; i < this.state.possible_moves.length; i++) {
      this.props.set_overlay_callback(
        this.state.possible_moves[i][0],
        this.state.possible_moves[i][1],
        true
      );
    }
  }

  getCoveredSquares() {
    return [] as number[][];
  }

  getAllMoves() {
    return [] as number[][];
  }

  getPossibleMoves() {
    return { moves: [] as number[][], is_special: [] as string[] };
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
