import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import Board from "./Board";
import GameOverModal from "./GameOverModal";

export interface IChessGameProps {}

export interface IChessGameState {
  player1: {
    name: string;
    elo: number;
    time_millis: number;
  };
  player2: {
    name: string;
    elo: number;
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
        time_millis: 5000
      },
      player2: {
        name: "Player 2",
        elo: 1010,
        time_millis: 5000
      },
      game: {
        move: "white",
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

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={2} />
          <Grid item xs={6} className="board-parent">
            <Grid container>
              <Grid item xs={2}>
                <span>
                  {this.state.player1.name}: {this.state.player1.elo}
                </span>
              </Grid>
              <Grid item xs={8} />
              <Grid item xs={2}>
                <span>
                  <p className="game-time-p">
                    {this.state.player1.time_millis}
                  </p>
                </span>
              </Grid>
              <Grid item xs={12}>
                <Board />
                <GameOverModal
                  show_modal={false}
                  win_condition="Checkmate"
                  player1_name={this.state.player1.name}
                  player1_elo={this.state.player1.elo}
                  player2_name={this.state.player2.name}
                  player2_elo={this.state.player2.elo}
                />
              </Grid>
              <Grid item xs={2}>
                <span>
                  {this.state.player2.name}: {this.state.player2.elo}
                </span>
              </Grid>
              <Grid item xs={8} />
              <Grid item xs={2}>
                <span>
                  <p className="game-time-p">
                    {this.state.player2.time_millis}
                  </p>
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
