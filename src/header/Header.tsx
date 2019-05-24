import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { connect } from "react-redux";

import SignupModal from "../modal/SignupModal";
import LoginModal from "../modal/LoginModal";

import { AppState } from "../store";
import { SystemState } from "../store/system/types";
import { ModalState } from "../store/modal/types";
import { logout } from "../store/system/actions";
import { toggle } from "../store/modal/actions";

interface IHeaderProps {}

interface IHeaderStateProps {
  system: SystemState;
  modal: ModalState;
}

interface IHeaderDispatchProps {
  logout: typeof logout;
  toggle: typeof toggle;
}

interface IHeaderState {
  navbar_open: boolean;

  signup_modal_open: boolean;
  login_modal_open: boolean;
}

class Header extends Component<
  IHeaderProps & IHeaderStateProps & IHeaderDispatchProps,
  IHeaderState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      navbar_open: false,

      signup_modal_open: false,
      login_modal_open: false
    };

    this.toggleSignupModal = this.toggleSignupModal.bind(this);
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
  }

  // toggleSignupModal(open: boolean) {
  //   this.setState({
  //     signup_modal_open: open
  //   });
  // }

  // toggleLoginModal(open: boolean) {
  //   this.setState({ login_modal_open: open });
  // }

  toggleSignupModal() {
    this.props.toggle("signup", this.props.modal);
  }

  toggleLoginModal() {
    this.props.toggle("login", this.props.modal);
  }

  toggleNavbar() {
    this.setState(prevState => ({ navbar_open: !prevState.navbar_open }));
  }

  render() {
    let navBarItems;
    if (!this.props.system.logged_in) {
      navBarItems = (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="#" onClick={this.toggleSignupModal}>
              Signup
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={this.toggleLoginModal}>
              Login
            </NavLink>
          </NavItem>
        </Nav>
      );
    } else {
      navBarItems = (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="#" onClick={this.toggleSignupModal}>
              Account
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={this.props.logout}>
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      );
    }

    return (
      <div>
        <div>
          <LoginModal />
          <SignupModal />
        </div>
        <div>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Craig Chess</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar.bind(this)} />
            <Collapse isOpen={this.state.navbar_open} navbar>
              {navBarItems}
            </Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  system: state.system,
  modal: state.modal
});

const mapDispatchToProps = {
  logout,
  toggle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
