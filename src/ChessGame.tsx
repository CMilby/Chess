import React, { Component } from "react";
import { Container, Col, Row } from "reactstrap";

import Board from "./Board";
import GameOverModal from "./GameOverModal";

import "./ChessGame.css";

export interface IChessGameProps {}

export interface IChessGameState {
  player1: {
    name: string;
    elo: number;
    color: string;
    time_millis: number;
  };
  player2: {
    name: string;
    elo: number;
    color: string;
    time_millis: number;
  };
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

export default class ChessGame extends Component<
  IChessGameProps,
  IChessGameState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      player1: {
        name: "Player 1",
        elo: 1020,
        color: "white",
        time_millis: 90051
      },
      player2: {
        name: "Player 2",
        elo: 1010,
        color: "dark",
        time_millis: 5000
      },
      game: {
        move: "light",
        increment_millis: 1000,
        light: {
          in_check: false,
          in_checkmate: false,
          x: -1,
          y: -1
        },
        dark: {
          in_check: false,
          in_checkmate: false,
          x: -1,
          y: -1
        }
      }
    };
  }

  renderTimeLeft(millis: number) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);

    if (minutes == 0) {
      let hundredMillis = (millis % 1000).toFixed(0);
      return seconds + "." + hundredMillis;
    }

    return minutes + ":" + seconds;
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col xs="2">
              <span>
                {this.state.player1.name}: {this.state.player1.elo}
              </span>
            </Col>
            <Col xs="4" />
            <Col xs="2">
              <span>
                <p className="game-time-p">
                  {this.renderTimeLeft(this.state.player1.time_millis)}
                </p>
              </span>
            </Col>
          </Row>
          <Row>
            <Col xs="8">
              <Board game={this.state.game} />
              <GameOverModal
                show_modal={false}
                win_condition="Checkmate"
                player1_name={this.state.player1.name}
                player1_elo={this.state.player1.elo}
                player2_name={this.state.player2.name}
                player2_elo={this.state.player2.elo}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="2">
              <span>
                {this.state.player2.name}: {this.state.player2.elo}
              </span>
            </Col>
            <Col xs="4" />
            <Col xs="2">
              <span>
                <p className="game-time-p">
                  {this.renderTimeLeft(this.state.player2.time_millis)}
                </p>
              </span>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
