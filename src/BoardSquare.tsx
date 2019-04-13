import React, { Component } from "react";

import Overlay from "./Overlay";

import Piece from "./Piece";
import Knight from "./pieces/Knight";
import Rook from "./pieces/Rook";
import Pawn from "./pieces/Pawn";
import Bishop from "./pieces/Bishop";
import Queen from "./pieces/Queen";
import King from "./pieces/King";

export interface IBoardSquareProps {
  x: number;
  y: number;
  piece_type: string;
  piece_has_moved: boolean;

  remove_piece_callback: any;
  add_piece_callback: any;
  set_overlay_callback: any;

  board: string[][];
  has_moved: boolean[][];
  covered_squares: string[][][];
}

export interface IBoardSquareState {
  show_overlay: boolean;
}

export default class BoardSquare extends Component<
  IBoardSquareProps,
  IBoardSquareState
> {
  private pieceRef: React.RefObject<any>;
  constructor(props: any) {
    super(props);

    this.state = {
      show_overlay: false
    };

    this.pieceRef = React.createRef();
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
      if (moves.length == 1) {
        break;
      }

      movePairs.push([moves[i + 0], moves[i + 1]]);
      this.props.set_overlay_callback(moves[i + 0], moves[i + 1], false);
    }

    let isValid = false;
    for (let i = 0; i < movePairs.length; i++) {
      if (this.props.x == movePairs[i][0] && this.props.y == movePairs[i][1]) {
        isValid = true;
        break;
      }
    }

    if (isValid) {
      this.props.remove_piece_callback(oldX, oldY, false);
      this.props.add_piece_callback(this.props.x, this.props.y, piece, true);
    }
  }

  getPiece(piece_type: string) {
    if (piece_type.startsWith("knight")) {
      return (
        <Knight
          piece_type={piece_type}
          x={this.props.x}
          y={this.props.y}
          has_moved_piece={this.props.piece_has_moved}
          board={this.props.board}
          has_moved={this.props.has_moved}
          covered_squares={this.props.covered_squares}
          set_overlay_callback={this.props.set_overlay_callback}
          ref={this.pieceRef}
        />
      );
    } else if (piece_type.startsWith("rook")) {
      return (
        <Rook
          piece_type={piece_type}
          x={this.props.x}
          y={this.props.y}
          has_moved_piece={this.props.piece_has_moved}
          board={this.props.board}
          has_moved={this.props.has_moved}
          covered_squares={this.props.covered_squares}
          set_overlay_callback={this.props.set_overlay_callback}
          ref={this.pieceRef}
        />
      );
    } else if (piece_type.startsWith("pawn")) {
      return (
        <Pawn
          piece_type={piece_type}
          x={this.props.x}
          y={this.props.y}
          has_moved_piece={this.props.piece_has_moved}
          board={this.props.board}
          has_moved={this.props.has_moved}
          covered_squares={this.props.covered_squares}
          set_overlay_callback={this.props.set_overlay_callback}
          ref={this.pieceRef}
        />
      );
    } else if (piece_type.startsWith("bishop")) {
      return (
        <Bishop
          piece_type={piece_type}
          x={this.props.x}
          y={this.props.y}
          has_moved_piece={this.props.piece_has_moved}
          board={this.props.board}
          has_moved={this.props.has_moved}
          covered_squares={this.props.covered_squares}
          set_overlay_callback={this.props.set_overlay_callback}
          ref={this.pieceRef}
        />
      );
    } else if (piece_type.startsWith("queen")) {
      return (
        <Queen
          piece_type={piece_type}
          x={this.props.x}
          y={this.props.y}
          has_moved_piece={this.props.piece_has_moved}
          board={this.props.board}
          has_moved={this.props.has_moved}
          covered_squares={this.props.covered_squares}
          set_overlay_callback={this.props.set_overlay_callback}
          ref={this.pieceRef}
        />
      );
    } else if (piece_type.startsWith("king")) {
      return (
        <King
          piece_type={piece_type}
          x={this.props.x}
          y={this.props.y}
          has_moved_piece={this.props.piece_has_moved}
          board={this.props.board}
          has_moved={this.props.has_moved}
          covered_squares={this.props.covered_squares}
          set_overlay_callback={this.props.set_overlay_callback}
          ref={this.pieceRef}
        />
      );
    }

    return (
      <Piece
        piece_type={piece_type}
        x={this.props.x}
        y={this.props.y}
        has_moved_piece={this.props.piece_has_moved}
        board={this.props.board}
        has_moved={this.props.has_moved}
        covered_squares={this.props.covered_squares}
        set_overlay_callback={this.props.set_overlay_callback}
        ref={this.pieceRef}
      />
    );
  }

  setOverlay(show: boolean) {
    this.setState({ show_overlay: show });
  }

  calculateMoves() {
    this.pieceRef.current.recalculatePossibleMoves();
  }

  calculateCoveredSquares() {
    return this.pieceRef.current.recalculateCoveredSquares();
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
    if (this.state.show_overlay) {
      overlay = <Overlay color="green" x={this.props.x} y={this.props.y} />;
    }

    return (
      <td
        className={classes}
        key={"board_square_td_" + this.props.x + "_" + this.props.y}
        onDragOver={e => this.onDragOver(e)}
        onDrop={e => this.onDrop(e)}
      >
        <div>{overlay}</div>
        <div>{this.getPiece(this.props.piece_type)}</div>
      </td>
    );
  }
}
