import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Client } from "@stomp/stompjs";

import { ACCESS_TOKEN } from "../constants";
import {
  createClient,
  sendGameJoined,
  subscribeToWaitForOpponent
} from "../util/WSUtil";

export interface IJoinGameComponentProps extends RouteComponentProps<any> {}

export interface IJoinGameComponentState {}

export default class JoinGameComponent extends Component<
  IJoinGameComponentProps,
  IJoinGameComponentState
> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    createClient(this.connected.bind(this));
  }

  connected(client: Client) {
    sendGameJoined(client as Client, this.parseGameId(), localStorage.getItem(
      ACCESS_TOKEN
    ) as string);
    client.deactivate();
    subscribeToWaitForOpponent(
      this.parseGameId(),
      this.receivedOpponentAck.bind(this)
    );
  }

  receivedOpponentAck(message: string, client: Client) {
    if (message == "success") {
      client.deactivate();
      this.props.history.push("/game/play/" + this.parseGameId());
    }
  }

  parseGameId() {
    let path = this.props.location.pathname;
    if (path.endsWith("/")) {
      path = path.substr(0, path.length - 1);
    }
    return path.substr(path.lastIndexOf("/") + 1);
  }

  render() {
    return <div>Join Game Component</div>;
  }
}
