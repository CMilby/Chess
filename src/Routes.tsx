import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
  withRouter
} from "react-router-dom";

import Header from "./header/Header";

import Home from "./Home";
import ChessGame from "./game/ChessGame";

import { Auth } from "./objects/Auth";
import { getCurrentUser } from "./util/APIUtil";

import { ACCESS_TOKEN } from "./constants";

export interface IRoutesProps extends RouteComponentProps<any> {}

export interface IRoutesState {
  auth: Auth;
}

class RoutesImpl extends Component<IRoutesProps, IRoutesState> {
  constructor(props: any) {
    super(props);

    this.state = {
      auth: {
        is_authenticated: false,
        user: null
      }
    };
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    let self = this;
    getCurrentUser()
      .then(response => {
        self.setState({
          auth: { is_authenticated: true, user: JSON.parse(response.Payload) }
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleLogin(jwt: string) {
    localStorage.setItem(ACCESS_TOKEN, jwt);
    this.loadCurrentUser();
  }

  handleLogout(redirectTo: string = "/") {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({ auth: { is_authenticated: false, user: null } });

    this.props.history.push(redirectTo);
  }

  render() {
    return (
      <div>
        <Header
          auth={this.state.auth}
          handle_login={this.handleLogin.bind(this)}
          handle_logout={this.handleLogout.bind(this)}
        />
        <Route path="/" exact component={Home} />
        <Route path="/play" component={ChessGame} />
      </div>
    );
  }
}

const Routes = withRouter(RoutesImpl as any);
export default Routes;
