import React, { Component } from "react";

import "../resc/css/BoardDecorator.css";

export interface IBoardDecoratorProps {
  type: string;
  position: any;
}

export interface IBoardDecoratorState {}

export default class BoardDecorator extends Component<
  IBoardDecoratorProps,
  IBoardDecoratorState
> {
  constructor(props: any) {
    super(props);
  }

  makeDecorator(type: string) {
    if (type == "horizontal") {
      return (
        <div className="board-decorator-horizontal">{this.props.position}</div>
      );
    } else if (type == "vertical") {
      return (
        <div className="board-decorator-vertical">
          <div>{this.props.position}</div>
        </div>
      );
    }
  }

  render() {
    return this.makeDecorator(this.props.type);
  }
}
