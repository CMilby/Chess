import React, { Component, FormEvent, ChangeEvent } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Row,
  Col
} from "reactstrap";

import { login } from "../util/APIUtil";
import { ACCESS_TOKEN } from "../constants";

export interface ILoginModalProps {
  is_open: boolean;

  toggle: any;
  open_signup_modal: any;

  handle_login: any;
}

export interface ILoginModalState {
  username_or_email: string | null;
  password: string | null;
}

export default class LoginModal extends Component<
  ILoginModalProps,
  ILoginModalState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      username_or_email: null,
      password: null
    };
  }

  usernameEmailChanged(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ username_or_email: e.target.value });
  }

  passwordChanged(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ password: e.target.value });
  }

  loginUser() {
    let self = this;
    login({
      UsernameOrEmail: this.state.username_or_email,
      Password: this.state.password
    })
      .then(function(response) {
        self.props.handle_login(response.Message);
        self.toggleIsOpen(false);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  toggle() {
    this.props.toggle(!this.props.is_open);
  }

  toggleIsOpen(open: boolean) {
    this.props.toggle(open);
  }

  toggleSignupModal() {
    this.toggleIsOpen(false);
    this.props.open_signup_modal(true);
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.is_open} toggle={this.toggle.bind(this)}>
          <ModalHeader toggle={this.toggle.bind(this)}>Sign In</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12">
                <span>Username Or Email</span>
                <Input
                  type="text"
                  placeholder="Username or Email"
                  onChange={this.usernameEmailChanged.bind(this)}
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <span>Password</span>
                <Input
                  type="password"
                  onChange={this.passwordChanged.bind(this)}
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <span>
                  Don't have an account?{" "}
                  <a href="#" onClick={this.toggleSignupModal.bind(this)}>
                    Create One!
                  </a>
                </span>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.loginUser.bind(this)}>
              Sign In
            </Button>
            <Button
              color="secondary"
              onClick={this.toggleIsOpen.bind(this, false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
