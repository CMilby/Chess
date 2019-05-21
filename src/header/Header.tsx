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

import SignupModal from "../modal/SignupModal";
import LoginModal from "../modal/LoginModal";

import { Auth } from "../resc/obj/Auth";

export interface IHeaderProps {
  auth: Auth;

  handle_login: any;
  handle_logout: any;
}

export interface IHeaderState {
  navbar_open: boolean;

  signup_modal_open: boolean;
  login_modal_open: boolean;
}

export default class Header extends Component<IHeaderProps, IHeaderState> {
  constructor(props: any) {
    super(props);

    this.state = {
      navbar_open: false,

      signup_modal_open: false,
      login_modal_open: false
    };
  }

  toggleSignupModal(open: boolean) {
    this.setState({
      signup_modal_open: open
    });
  }

  toggleLoginModal(open: boolean) {
    this.setState({ login_modal_open: open });
  }

  toggleNavbar() {
    this.setState(prevState => ({ navbar_open: !prevState.navbar_open }));
  }

  render() {
    let navBarItems;
    if (!this.props.auth.is_authenticated) {
      navBarItems = (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="#" onClick={this.toggleSignupModal.bind(this, true)}>
              Signup
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={this.toggleLoginModal.bind(this, true)}>
              Login
            </NavLink>
          </NavItem>
        </Nav>
      );
    } else {
      navBarItems = (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="#" onClick={this.toggleSignupModal.bind(this, true)}>
              Account
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={this.props.handle_logout}>
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      );
    }

    return (
      <div>
        <div>
          <LoginModal
            is_open={this.state.login_modal_open}
            toggle={this.toggleLoginModal.bind(this)}
            open_signup_modal={this.toggleSignupModal.bind(this)}
            handle_login={this.props.handle_login}
          />
          <SignupModal
            is_open={this.state.signup_modal_open}
            toggle={this.toggleSignupModal.bind(this)}
            open_login_modal={this.toggleLoginModal.bind(this)}
          />
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
