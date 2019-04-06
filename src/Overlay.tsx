import React from "react";

export interface IOverlayProps {
  color: string;
}

export interface IOverlayState {}

export default class Overlay extends React.Component<
  IOverlayProps,
  IOverlayState
> {
  render() {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: 1,
          opacity: 0.5,
          backgroundColor: this.props.color
        }}
      />
    );
  }
}
