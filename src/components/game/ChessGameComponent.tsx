import React, { Component } from "react";
import { Container, Col, Row } from "reactstrap";
import { Client } from "@stomp/stompjs";

import Board from "../../game/Board";
import GameOverModal from "../../game/GameOverModal";

import { subscribeToGame } from "../../util/WSUtil";

import "../../resc/css/ChessGame.css";

export interface IChessGameComponentProps {}

export interface IChessGameComponentState {
  player1: {
    name: string;
    elo: number;
    color: string;
  };
  player2: {
    name: string;
    elo: number;
    color: string;
  };

  time_light_millis: number;
  time_dark_millis: number;

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

export default class ChessGameComponent extends Component<
  IChessGameComponentProps,
  IChessGameComponentState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      player1: {
        name: "Player 1",
        elo: 1020,
        color: "white"
      },
      player2: {
        name: "Player 2",
        elo: 1010,
        color: "dark"
      },
      time_light_millis: 600000,
      time_dark_millis: 60000,
      game: {
        move: "light",
        increment_millis: 10000,
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

  testFunc1() {
    console.log("THIS IS A TEST 1");
  }

  testFunc2() {
    console.log("THIS IS A TEST 2");
  }

  componentDidMount() {
    let client = new Client();
    client.configure({
      brokerURL: "ws://localhost:8080/chess/websocket",
      onConnect: () => {
        console.log("connected");

        client.subscribe("/topic/chess/update/abcd", message => {
          console.log(message.body);
        });

        client.publish({
          destination: "/app/chess/abcd",
          body: "Hello, World!"
        });
      },
      debug: str => {
        console.log(str);
      }
    });

    client.activate();
  }

  setTurn(color: string) {
    let game = this.state.game;
    game.move = color;
    this.setState({ game: game });
  }

  subtractTime(color: string, millis: number) {
    if (color == "light") {
      let time = this.state.time_light_millis;
      this.setState({ time_light_millis: time - millis });
    } else if (color == "dark") {
      let time = this.state.time_dark_millis;
      this.setState({ time_dark_millis: time - millis });
    }
  }

  addTime(color: string, millis: number) {
    if (color == "light") {
      let time = this.state.time_light_millis + millis;
      this.setState({ time_light_millis: time });
    } else if (color == "dark") {
      let time = this.state.time_dark_millis + millis;
      this.setState({ time_dark_millis: time });
    }
  }

  renderTimeLeft(millis: number) {
    let minutes = Math.floor(millis / 1000 / 60)
      .toString()
      .padStart(2, "0");
    let seconds = Math.floor((millis / 1000) % 60)
      .toString()
      .padStart(2, "0");

    if (minutes == "00") {
      let hundredMillis = (millis % 1000).toString();
      if (hundredMillis.length == 3) {
        hundredMillis = hundredMillis.substr(0, 2);
      }

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
                  {this.renderTimeLeft(this.state.time_dark_millis)}
                </p>
              </span>
            </Col>
          </Row>
          <Row>
            <Col xs="8">
              <Board
                game={this.state.game}
                subtract_time_callback={this.subtractTime.bind(this)}
                add_time_callback={this.addTime.bind(this)}
                set_turn_callback={this.setTurn.bind(this)}
              />
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
                  {this.renderTimeLeft(this.state.time_light_millis)}
                </p>
              </span>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
