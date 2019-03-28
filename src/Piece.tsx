import React, { Component } from "react";

export interface IPieceProps {
  piece_type: string;
}

export interface IPieceState {}

export default class Piece extends Component<IPieceProps, IPieceState> {
  constructor(props: any) {
    super(props);
  }

  pieceImg(type: string) {
    if (type != "") {
      return (
        <div className="piece-square">
          <img
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
