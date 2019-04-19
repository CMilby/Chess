import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import BoardSquare from "./BoardSquare";
import BoardDecorator from "./BoardDecorator";

import { calculateAllMoves } from "./Game";

import "./Board.css";

export interface IBoardProps {
  game: {
    move: string;
    increment_millis: number;
    light: {
      in_check: boolean;
      in_checkmate: boolean;
      x: number;
      y: number;
    };
    dark: {
      in_check: boolean;
      in_checkmate: boolean;
      x: number;
      y: number;
    };
  };
}

export interface IBoardState {
  board: {
    piece: string;
    color: string;
    has_moved: boolean;
    possible_moves: number[][];
    is_special: string[];
    covered: string[];
    show_overlay: boolean;
    overlay: {
      type: string;
      piece: string;
      color: string;
      x: number;
      y: number;
    };
  }[][];
  last_move: {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    piece: string;
    color: string;
  };
  promotion_modal: {
    show: boolean;
    color: string;
    x: number;
    y: number;
  };
}

export default class Board extends Component<IBoardProps, IBoardState> {
  constructor(props: any) {
    super(props);

    this.state = {
      board: [],
      last_move: { fromX: 0, fromY: 0, toX: 0, toY: 0, piece: "", color: "" },
      promotion_modal: {
        show: false,
        color: "light",
        x: -1,
        y: -1
      }
    };

    for (let y = 0; y < 8; y++) {
      this.state.board[y] = [];
      for (let x = 0; x < 8; x++) {
        let pieceAndColor = this.setupGame(x, y);
        this.state.board[y][x] = {
          piece: pieceAndColor.piece,
          color: pieceAndColor.color,
          has_moved: false,
          possible_moves: [],
          is_special: [],
          covered: [],
          show_overlay: false,
          overlay: {
            type: "move",
            piece: "",
            color: "",
            x: -1,
            y: -1
          }
        };
      }
    }
  }

  componentDidMount() {
    calculateAllMoves(this.state.board, this.state.last_move, this.props.game);
  }

  componentDidUpdate() {
    calculateAllMoves(this.state.board, this.state.last_move, this.props.game);
  }

  setupGame(x: number, y: number) {
    let piece: string = "";
    let color: string = "";

    if (y == 0) {
      color = "light";
      if (x == 0) {
        piece = "rook";
      } else if (x == 1) {
        piece = "knight";
      } else if (x == 2) {
        piece = "bishop";
      } else if (x == 3) {
        piece = "queen";
      } else if (x == 4) {
        piece = "king";
      } else if (x == 5) {
        piece = "bishop";
      } else if (x == 6) {
        piece = "knight";
      } else if (x == 7) {
        piece = "rook";
      }
    } else if (y == 1) {
      color = "light";
      piece = "pawn";
    } else if (y == 6) {
      color = "dark";
      piece = "pawn";
    } else if (y == 7) {
      color = "dark";
      if (x == 0) {
        piece = "rook";
      } else if (x == 1) {
        piece = "knight";
      } else if (x == 2) {
        piece = "bishop";
      } else if (x == 3) {
        piece = "queen";
      } else if (x == 4) {
        piece = "king";
      } else if (x == 5) {
        piece = "bishop";
      } else if (x == 6) {
        piece = "knight";
      } else if (x == 7) {
        piece = "rook";
      }
    }

    return { piece: piece, color: color };
  }

  changeTurn() {
    if (this.props.game.move == "light") {
      this.props.game.move = "dark";
    } else if (this.props.game.move == "dark") {
      this.props.game.move = "light";
    }
  }

  makeSquare(x: number, y: number, piece: string, color: string) {
    return (
      <BoardSquare
        x={x}
        y={y}
        key={"board_square_" + x + "_" + y}
        piece={piece}
        color={color}
        set_overlay_callback={this.setOverlay.bind(this)}
        set_and_remove_callback={this.setAndRemovePiece.bind(this)}
        promotion_overlay_show_callback={this.showPromotionOverlay.bind(this)}
        promotion_overlay_click_callback={this.handlePromotionOverlayClick.bind(
          this
        )}
        change_turn_callback={this.changeTurn.bind(this)}
        board={this.state.board}
        last_move={this.state.last_move}
      />
    );
  }

  setOverlay(x: number, y: number, show: boolean) {
    let board = this.state.board;
    board[y][x].show_overlay = show;
    this.setState({ board: board });
  }

  setAndRemovePiece(
    xRemove: number,
    yRemove: number,
    xSet: number,
    ySet: number,
    piece: string,
    color: string
  ) {
    let board = this.state.board;
    let lastMove = {
      piece: piece,
      color: color,
      first_move: !board[yRemove][xRemove].has_moved,
      fromX: xRemove,
      fromY: yRemove,
      toX: xSet,
      toY: ySet
    };

    board[yRemove][xRemove] = {
      piece: "",
      color: "",
      has_moved: true,
      possible_moves: [],
      is_special: [],
      covered: [],
      show_overlay: false,
      overlay: {
        type: "move",
        piece: "",
        color: "",
        x: -1,
        y: -1
      }
    };

    board[ySet][xSet] = {
      piece: piece,
      color: color,
      has_moved: true,
      possible_moves: [],
      is_special: [],
      covered: [],
      show_overlay: false,
      overlay: {
        type: "move",
        piece: "",
        color: "",
        x: -1,
        y: -1
      }
    };

    this.setState({ board: board, last_move: lastMove });
  }

  handlePromotionOverlayClick(
    piece: string,
    color: string,
    x: number,
    y: number
  ) {
    let board = this.state.board;

    for (let i = 0; i < 4; i++) {
      if (color == "light") {
        board[y - i][x].show_overlay = false;
        board[y - i][x].overlay.type = "move";
        board[y - i][x].overlay.piece = "";
        board[y - i][x].overlay.color = "";
        board[y - i][x].overlay.x = -1;
        board[y - i][x].overlay.y = -1;
      } else if (color == "dark") {
        board[y + i][x].show_overlay = false;
        board[y + i][x].overlay.type = "move";
        board[y + i][x].overlay.piece = "";
        board[y + i][x].overlay.color = "";
        board[y + i][x].overlay.x = -1;
        board[y + i][x].overlay.y = -1;
      }
    }

    this.setState({ board: board });
    this.setAndRemovePiece(x, y, x, y, piece, color);
  }

  showPromotionOverlay(color: string, x: number, y: number) {
    let pieces = ["queen", "rook", "bishop", "knight"];
    let board = this.state.board;

    for (let i = 0; i < 4; i++) {
      if (color == "light") {
        board[y - i][x].show_overlay = true;
        board[y - i][x].overlay.type = "promote";
        board[y - i][x].overlay.piece = pieces[i];
        board[y - i][x].overlay.color = color;
        board[y - i][x].overlay.x = x;
        board[y - i][x].overlay.y = y;
      } else if (color == "dark") {
        board[y + i][x].show_overlay = true;
        board[y + i][x].overlay.type = "promote";
        board[y + i][x].overlay.piece = pieces[i];
        board[y + i][x].overlay.color = color;
        board[y + i][x].overlay.x = x;
        board[y + i][x].overlay.y = y;
      }
    }

    this.setState({ board: board });
  }

  render() {
    let board = [] as any[][];
    for (let y = 0; y < 8; y++) {
      board[y] = [];
      for (let x = 0; x < 8; x++) {
        board[y][x] = this.makeSquare(
          x,
          y,
          this.state.board[y][x].piece,
          this.state.board[y][x].color
        );
      }
    }

    return (
      <div>
        <Container>
          <Row>
            {board[7]}
            <div className="col-xs-20 remove-padding">
              <BoardDecorator type="vertical" position="8" />
            </div>
          </Row>
          <Row>
            {board[6]}
            <div className="col-xs-20 remove-padding">
              <BoardDecorator type="vertical" position="7" />
            </div>
          </Row>
          <Row>
            {board[5]}
            <div className="col-xs-20 remove-padding">
              <BoardDecorator type="vertical" position="6" />
            </div>
          </Row>
          <Row>
            {board[4]}
            <div className="col-xs-20 remove-padding">
              <BoardDecorator type="vertical" position="5" />
            </div>
          </Row>
          <Row>
            {board[3]}
            <div className="col-xs-20 remove-padding">
              <BoardDecorator type="vertical" position="4" />
            </div>
          </Row>
          <Row>
            {board[2]}
            <div className="col-xs-20 remove-padding">
              <BoardDecorator type="vertical" position="3" />
            </div>
          </Row>
          <Row>
            {board[1]}
            <div className="col-xs-20 remove-padding">
              <BoardDecorator type="vertical" position="2" />
            </div>
          </Row>
          <Row>
            {board[0]}
            <div className="col-xs-20 remove-padding">
              <BoardDecorator type="vertical" position="1" />
            </div>
          </Row>
          <Row>
            <Col className="col-xs-18">
              <BoardDecorator type="horizontal" position="a" />
            </Col>
            <Col className="col-xs-18">
              <BoardDecorator type="horizontal" position="b" />
            </Col>
            <Col className="col-xs-18">
              <BoardDecorator type="horizontal" position="c" />
            </Col>
            <Col className="col-xs-18">
              <BoardDecorator type="horizontal" position="d" />
            </Col>
            <Col className="col-xs-18">
              <BoardDecorator type="horizontal" position="e" />
            </Col>
            <Col className="col-xs-18">
              <BoardDecorator type="horizontal" position="f" />
            </Col>
            <Col className="col-xs-18">
              <BoardDecorator type="horizontal" position="g" />
            </Col>
            <Col className="col-xs-18">
              <BoardDecorator type="horizontal" position="h" />
            </Col>
            <div className="col-xs-20 remove-padding" />
          </Row>
        </Container>
      </div>
    );
  }
}
