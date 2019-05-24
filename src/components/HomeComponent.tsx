import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { RouteComponentProps } from "react-router-dom";
import { Client } from "@stomp/stompjs";

import CreatUrlGameModal from "../modal/CreateUrlGameModal";

import { sendCreateGameUrl } from "../util/APIUtil";
import {
  subscribeToWaitForOpponent,
  sendGameJoined,
  createClient
} from "../util/WSUtil";
import { ACCESS_TOKEN } from "../constants";
import { SystemState } from "../store/system/types";
import { AppState } from "../store";
import { connect } from "react-redux";

interface IHomeComponentProps extends RouteComponentProps {}

interface IHomeComponentDispatchProps {
  system: SystemState;
}

interface IHomeComponentState {
  create_url_game_modal_open: boolean;
  create_url_game_game_id: string | null;
}

class HomeComponent extends Component<
  IHomeComponentProps & IHomeComponentDispatchProps,
  IHomeComponentState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      create_url_game_modal_open: false,
      create_url_game_game_id: null
    };
  }

  toggleCreateUrlGame(open: boolean) {
    this.setState({ create_url_game_modal_open: open });
  }

  playWithAFriendButtonClick() {
    let self = this;
    sendCreateGameUrl()
      .then(response => {
        let gameId = response.Payload.toString()
          .replace(/['"]+/g, "")
          .trim();

        this.setState({ create_url_game_game_id: gameId });
        self.toggleCreateUrlGame(true);

        subscribeToWaitForOpponent(gameId, self.gameJoinedCallback.bind(self));
      })
      .catch(error => {
        console.log(error);
      });
  }

  gameJoinedCallback(message: string, client: Client) {
    if (message == "success") {
      client.deactivate();
      createClient(this.sendOpponentAck.bind(this));
      this.props.history.push(
        "/game/play/" + this.state.create_url_game_game_id
      );
    }
  }

  sendOpponentAck(client: Client) {
    sendGameJoined(
      client,
      this.state.create_url_game_game_id as string,
      localStorage.getItem(ACCESS_TOKEN) as string
    );
    client.deactivate();
  }

  render() {
    if (!this.props.system.logged_in) {
      return <div />;
    } else {
      return (
        <div>
          <div>
            <CreatUrlGameModal
              is_open={this.state.create_url_game_modal_open}
              toggle={this.toggleCreateUrlGame.bind(this)}
              game_id={this.state.create_url_game_game_id}
            />
          </div>
          <Container>
            <Row>
              <Col xs="2">
                <Button onClick={e => this.playWithAFriendButtonClick()}>
                  Play With A Friend
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}

const mapStateToProps = (state: AppState) => ({
  system: state.system
});

export default connect(mapStateToProps)(HomeComponent);
