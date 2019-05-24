import React, { Component, ChangeEvent } from "react";
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
import { ThunkDispatch } from "redux-thunk";

import { AppState } from "../store";
import { SystemState, SystemActionTypes } from "../store/system/types";
import { ModalState, ModalActionTypes } from "../store/modal/types";
import { login } from "../store/system/actions";
import { toggle } from "../store/modal/actions";

interface ILoginModalProps {}

interface ILoginModalStateProps {
  system: SystemState;
  modal: ModalState;
}

interface ILoginModalDispatchProps {
  login: (usernameOrEmail: string, password: string) => Promise<any>;
  toggle: typeof toggle;
}

interface ILoginModalState {
  username_or_email: string | null;
  password: string | null;
}

class LoginModal extends Component<
  ILoginModalProps & ILoginModalStateProps & ILoginModalDispatchProps,
  ILoginModalState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      username_or_email: null,
      password: null
    };

    this.toggle = this.toggle.bind(this);
    this.toggleSignupModal = this.toggleSignupModal.bind(this);
  }

  usernameEmailChanged(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ username_or_email: e.target.value });
  }

  passwordChanged(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ password: e.target.value });
  }

  loginUser() {
    let self = this;

    this.props
      .login(
        this.state.username_or_email as string,
        this.state.password as string
      )
      .then(response => {
        console.log("response:\n" + response);
        self.toggle();
      })
      .catch(error => {
        console.log("error:\n" + error);
      });
  }

  toggle() {
    this.props.toggle("login", this.props.modal);
  }

  toggleSignupModal() {
    this.toggle();
    this.props.toggle("signup", this.props.modal);
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal["login"]} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Sign In</ModalHeader>
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
                  <a href="#" onClick={this.toggleSignupModal}>
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
            <Button color="secondary" onClick={this.toggle.bind(this)}>
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

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, SystemActionTypes | ModalActionTypes>
) => ({
  login: (usernameOrEmail: string, password: string) => {
    return dispatch(login(usernameOrEmail, password));
  },
  toggle: (modal: string, state: ModalState) => {
    dispatch(toggle(modal, state));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
