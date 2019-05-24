import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./Routes";

import { AppState } from "./store";
import { SystemState } from "./store/system/types";
import { updateSession } from "./store/system/actions";
import { connect } from "react-redux";

interface IAppProps {
  system: SystemState;

  updateSession: typeof updateSession;
}

interface IAppState {}

class App extends Component<IAppProps, IAppState> {
  constructor(props: any) {
    super(props);
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

const mapStateToProps = (state: AppState) => ({
  system: state.system
});

const mapDispatchToProps = {
  updateSession
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
