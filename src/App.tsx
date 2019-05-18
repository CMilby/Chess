import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./Routes";

export interface IAppProps {}

export interface IAppState {}

export default class App extends Component<IAppProps, IAppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      auth: {
        is_authenticated: false,
        user: null
      }
    };
  }

  render() {
    return (
      <div>
        <Router>
          <Routes />
        </Router>
      </div>
    );
  }
}
