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
import axios from "axios";

export interface ISignupModalProps {
  is_open: boolean;

  toggle: any;
  open_login_modal: any;
}

export interface ISignupModalState {
  username: string | null;
  password: string | null;
  email: string | null;
}

export default class SignupModal extends Component<
  ISignupModalProps,
  ISignupModalState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: null,
      email: null,
      password: null
    };
  }

  usernameChanged(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ username: e.target.value });
  }

  emailChanged(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ email: e.target.value });
  }

  passwordChanged(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ password: e.target.value });
  }

  signupUser() {
    axios
      .post("/user/signup", {
        Username: this.state.username,
        Email: this.state.email,
        Password: this.state.password
      })
      .then(function(response) {
        console.log(response);
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

  toggleLoginModal() {
    this.toggleIsOpen(false);
    this.props.open_login_modal(true);
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.is_open} toggle={this.toggle.bind(this)}>
          <ModalHeader toggle={this.toggle.bind(this)}>Signup</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12">
                <span>Username</span>
                <Input
                  type="text"
                  placeholder="Username"
                  onChange={this.usernameChanged.bind(this)}
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <span>Email</span>
                <Input
                  type="email"
                  placeholder="Email"
                  onChange={this.usernameChanged.bind(this)}
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <span>Password</span>
                <Input
                  type="password"
                  placeholder="Password"
                  onChange={this.passwordChanged.bind(this)}
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <span>
                  Already have an account?{" "}
                  <a href="#" onClick={this.toggleLoginModal.bind(this)}>
                    Login
                  </a>
                </span>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.signupUser.bind(this)}>
              Signup
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
