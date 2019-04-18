import React, { Component } from "react";

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
    if (type == "board_space_identifier_horizontal") {
      return (
        <div className="board-decorator-horizontal">{this.props.position}</div>
      );
    } else if (type == "board_space_identifier_vertical") {
      return (
        <div className="board-decorator-vertical">
          <span>{this.props.position}</span>
        </div>
      );
    }
  }

  render() {
    return this.makeDecorator(this.props.type);
  }
}
