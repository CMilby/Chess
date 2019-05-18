import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";

import SignupModal from "./modal/SignupModal";
import LoginModal from "./modal/LoginModal";

export interface IHomeProps {}

export interface IHomeState {
  signup_modal_open: boolean;
  login_modal_open: boolean;
}

export default class Home extends Component<IHomeProps, IHomeState> {
  constructor(props: any) {
    super(props);

    this.state = {
      signup_modal_open: false,
      login_modal_open: false
    };
  }

  playWithAFriendButtonClick() {
    axios
      .post("/play/send-game-creation-request")
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
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
