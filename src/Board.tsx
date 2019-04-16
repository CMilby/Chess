import React, { Component } from "react";

import BoardSquare from "./BoardSquare";
import PromotionModal from "./PromotionModal";

import { calculateAllMoves } from "./Game";

import "./Board.css";

export interface IBoardProps {}

export interface IBoardState {
  board: {
    piece: string;
    color: string;
    has_moved: boolean;
    possible_moves: number[][];
    is_special: string[];
    covered: string[];
    show_overlay: boolean;
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
        color: "",
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
          show_overlay: false
        };
      }
    }
  }

  componentDidMount() {
    calculateAllMoves(this.state.board, this.state.last_move);
  }

  componentDidUpdate() {
    calculateAllMoves(this.state.board, this.state.last_move);
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
        promotion_panel_callback={this.showPromotionModal.bind(this)}
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
      show_overlay: false
    };
    board[ySet][xSet] = {
      piece: piece,
      color: color,
      has_moved: true,
      possible_moves: [],
      is_special: [],
      covered: [],
      show_overlay: false
    };

    this.setState({ board: board, last_move: lastMove });
  }

  handlePromotionModalClick(
    piece: string,
    color: string,
    x: number,
    y: number
  ) {
    this.setState({
      promotion_modal: { show: false, color: "", x: -1, y: -1 }
    });

    this.setAndRemovePiece(x, y, x, y, piece, color);
  }

  showPromotionModal(color: string, x: number, y: number) {
    this.setState({
      promotion_modal: { show: true, color: color, x: x, y: y }
    });
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
      <div id="board">
        <table className="board">
          <tbody>
            <tr>{board[7]}</tr>
            <tr>{board[6]}</tr>
            <tr>{board[5]}</tr>
            <tr>{board[4]}</tr>
            <tr>{board[3]}</tr>
            <tr>{board[2]}</tr>
            <tr>{board[1]}</tr>
            <tr>{board[0]}</tr>
          </tbody>
        </table>
        <PromotionModal
          promotion_modal={this.state.promotion_modal}
          handle_click_callback={this.handlePromotionModalClick.bind(this)}
        />
      </div>
    );
  }
}
