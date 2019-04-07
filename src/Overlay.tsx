import React from "react";

export interface IOverlayProps {
  color: string;
  x: number;
  y: number;
}

export interface IOverlayState {}

export default class Overlay extends React.Component<
  IOverlayProps,
  IOverlayState
> {
  render() {
    let top = (7 - this.props.y) * 70 + 25;
    let left = this.props.x * 70 + 25;
    return (
      <div
        style={{
          position: "absolute",
          top: top,
          left: left,
          height: "20px",
          width: "20px",
          borderRadius: "10px",
          zIndex: 1,
          opacity: 0.5,
          backgroundColor: this.props.color
        }}
      />
    );
  }
}
