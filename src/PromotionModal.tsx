import React, { Component } from "react";
import ReactModal from "react-modal";

export interface IPromotionModalProps {
  promotion_modal: {
    show: boolean;
    color: string;
    x: number;
    y: number;
  };

  handle_click_callback: any;
}

export interface IPromotionModalState {}

export default class PromotionModal extends Component<
  IPromotionModalProps,
  IPromotionModalState
> {
  constructor(props: any) {
    super(props);
  }

  handleClick(piece: string) {
    this.props.handle_click_callback(
      piece,
      this.props.promotion_modal.color,
      this.props.promotion_modal.x,
      this.props.promotion_modal.y
    );
  }

  render() {
    return (
      <div>
        <ReactModal
          isOpen={this.props.promotion_modal.show}
          contentLabel="Minimal Modal Example"
          className="promotion-modal"
        >
          <div className="promotion-modal-div">
            <button
              className="promotion-modal-btn"
              onClick={e => this.handleClick("queen")}
            >
              <img
                className="piece-img"
                src={
                  process.env.PUBLIC_URL +
                  "/pieces/queen_" +
                  this.props.promotion_modal.color +
                  ".png"
                }
              />
            </button>
            <br />
            <button
              className="promotion-modal-btn"
              onClick={e => this.handleClick("rook")}
            >
              <img
                className="piece-img"
                src={
                  process.env.PUBLIC_URL +
                  "/pieces/rook_" +
                  this.props.promotion_modal.color +
                  ".png"
                }
              />
            </button>
            <br />
            <button
              className="promotion-modal-btn"
              onClick={e => this.handleClick("bishop")}
            >
              <img
                className="piece-img"
                src={
                  process.env.PUBLIC_URL +
                  "/pieces/bishop_" +
                  this.props.promotion_modal.color +
                  ".png"
                }
              />
            </button>
            <br />
            <button
              className="promotion-modal-btn"
              onClick={e => this.handleClick("knight")}
            >
              <img
                className="piece-img"
                src={
                  process.env.PUBLIC_URL +
                  "/pieces/knight_" +
                  this.props.promotion_modal.color +
                  ".png"
                }
              />
            </button>
          </div>
        </ReactModal>
      </div>
    );
  }
}
