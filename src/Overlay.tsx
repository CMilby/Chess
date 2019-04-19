import React from "react";

import "./Overlay.css";

export interface IOverlayProps {
  color: string;
  x: number;
  y: number;

  promotion_overlay_click_callback: any;

  overlay: {
    type: string;
    piece: string;
    color: string;
    x: number;
    y: number;
  };
}

export interface IOverlayState {}

export default class Overlay extends React.Component<
  IOverlayProps,
  IOverlayState
> {
  handleClick(piece: string, x: number, y: number) {
    this.props.promotion_overlay_click_callback(
      piece,
      this.props.overlay.color,
      x,
      y
    );
  }

  makeOverlay(overlay: {
    type: string;
    piece: string;
    color: string;
    x: number;
    y: number;
  }) {
    if (overlay.type == "move") {
      return (
        <div
          className="overlay-circle"
          style={{
            backgroundColor: this.props.color
          }}
        />
      );
    } else if (overlay.type == "promote") {
      return (
        <div className="overlay-piece">
          <button
            className="overlay-piece-btn"
            onClick={e => this.handleClick(overlay.piece, overlay.x, overlay.y)}
          >
            <img
              className="piece-overlay-img"
              src={
                process.env.PUBLIC_URL +
                "/pieces/" +
                overlay.piece +
                "_" +
                overlay.color +
                ".png"
              }
            />
          </button>
        </div>
      );
    }

    return <div />;
  }

  render() {
    return this.makeOverlay(this.props.overlay);
  }
}
