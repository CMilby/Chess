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
import { connect } from "react-redux";

import { AppState } from "../store";
import { SystemState } from "../store/system/types";
import { ModalState } from "../store/modal/types";
import { toggle } from "../store/modal/actions";

export interface ISignupModalProps {}

export interface ISignupModalStateProps {
  system: SystemState;
  modal: ModalState;
}

export interface ISignupModalDispatchProps {
  //toggle: typeof toggle;
}

export interface ISignupModalState {
  username: string | null;
  password: string | null;
  email: string | null;
}

class SignupModal extends Component<
  ISignupModalProps & ISignupModalStateProps & ISignupModalDispatchProps,
  ISignupModalState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: null,
      email: null,
      password: null
    };

    this.toggle = this.toggle.bind(this);
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.signupUser = this.signupUser.bind(this);
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
    // axios
    //   .post("/user/signup", {
    //     Username: this.state.username,
    //     Email: this.state.email,
    //     Password: this.state.password
    //   })
    //   .then(function(response) {
    //     console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  }

  toggle() {
    // this.props.toggle("signup", this.props.modal);
  }

  toggleLoginModal() {
    //  this.toggle();
    // this.props.toggle("login", this.props.modal);
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal["signup"]} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Signup</ModalHeader>
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
                  <a href="#" onClick={this.toggleLoginModal}>
                    Login
                  </a>
                </span>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.signupUser}>
              Signup
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  system: state.system,
  modal: state.modal
});

const mapDispatchToProps = {
  //toggle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupModal);
