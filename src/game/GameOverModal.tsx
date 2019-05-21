import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import "../resc/css/GameOverModal.css";

export interface IGameOverModalProps {
  show_modal: boolean;

  win_condition: string;

  player1_name: string;
  player2_name: string;
  player1_elo: number;
  player2_elo: number;
}

export interface IGameOverModalState {}

export default class GameOverModal extends Component<
  IGameOverModalProps,
  IGameOverModalState
> {
  constructor(props: any) {
    super(props);
  }

  render() {
    if (this.props.show_modal) {
      return (
        <div className="game-over-modal-root">
          <div>
            <Container>
              <Row>
                <Col>
                  {" "}
                  <span className="game-over-header">
                    <h2 className="game-over-header-h">
                      {this.props.win_condition}
                    </h2>
                  </span>
                </Col>
              </Row>
              <Row>
                <Col xs="1" />
                <Col xs="10">
                  <hr />
                </Col>
              </Row>
              <Row>
                <Col xs="1" />
                <Col xs="5">
                  <span>
                    <h4 className="game-over-players">
                      {this.props.player1_name}
                    </h4>
                    <h5 className="game-over-players">
                      {this.props.player1_elo}
                    </h5>
                  </span>
                </Col>
                <Col xs="5">
                  <span>
                    <h4 className="game-over-players">
                      {this.props.player2_name}
                    </h4>
                    <h5 className="game-over-players">
                      {this.props.player2_elo}
                    </h5>
                  </span>
                </Col>
              </Row>
              <Row>
                <Col xs="1" />
                <Col xs="10">
                  <hr />
                </Col>
              </Row>
              <Row>
                <Col xs="1" />
                <Col xs="5">
                  <button className="game-over-btn">New Game</button>
                </Col>
                <Col xs="5">
                  <button className="game-over-btn">Rematch</button>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      );
    }

    return <div />;
  }
}
