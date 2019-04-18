import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

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
            <Grid
              container
              spacing={0}
              justify="center"
              alignContent="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <span className="game-over-header">
                  <h2 className="game-over-header-h">
                    {this.props.win_condition}
                  </h2>
                </span>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={10}>
                <hr />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={1} />
              <Grid item xs={5}>
                <span>
                  <h4 className="game-over-players">
                    {this.props.player1_name}
                  </h4>
                  <h5 className="game-over-players">
                    {this.props.player1_elo}
                  </h5>
                </span>
              </Grid>
              <Grid item xs={5}>
                <span>
                  <h4 className="game-over-players">
                    {this.props.player2_name}
                  </h4>
                  <h5 className="game-over-players">
                    {this.props.player2_elo}
                  </h5>
                </span>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={1} />
              <Grid item xs={10}>
                <hr />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={1} />
              <Grid item xs={5}>
                <button className="game-over-btn">New Game</button>
              </Grid>
              <Grid item xs={5}>
                <button className="game-over-btn">Rematch</button>
              </Grid>
              <Grid item xs={1} />
            </Grid>
          </div>
        </div>
      );
    }

    return <div />;
  }
}
