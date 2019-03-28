import React, { Component } from "react";

import Piece from "./Piece";

export interface IBoardSquareProps {
  x: number;
  y: number;
  piece_type: string;
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

  render() {
    let classes = "board-square ";
    if ((this.props.x + this.props.y) % 2 == 0) {
      classes += "even-square";
    } else {
      classes += "odd-square";
    }

    return (
      <td
        className={classes}
        key={"board_square_td_" + this.props.x + "_" + this.props.y}
      >
        <Piece piece_type={this.props.piece_type} />
      </td>
    );
  }
}
