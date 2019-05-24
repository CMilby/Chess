import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
  withRouter
} from "react-router-dom";

import Header from "./header/Header";

import HomeComponent from "./components/HomeComponent";
import JoinGameComponent from "./components/JoinGameComponent";
import ChessGameComponent from "./components/game/ChessGameComponent";
import { SystemState } from "./store/system/types";
import { AppState } from "./store";
import { connect } from "react-redux";
import { getCurrentUser } from "./store/system/actions";

interface IRoutesProps extends RouteComponentProps<any> {}

interface IRoutesStateProps {
  system: SystemState;
}

interface IRoutesDispatchProps {
  getCurrentUser: () => Promise<any>;
}

interface IRoutesState {}

class RoutesImpl extends Component<
  IRoutesProps & IRoutesStateProps & IRoutesDispatchProps,
  IRoutesState
> {
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
    this.props
      .getCurrentUser()
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Header />
        <Route
          path="/"
          exact
          component={() => (
            <HomeComponent
              history={this.props.history}
              location={this.props.location}
              match={this.props.match}
            />
          )}
        />
        <Route path="/game/join" component={JoinGameComponent} />
        <Route path="/game/play" component={ChessGameComponent} />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  system: state.system
});

const mapDispatchToProps = { getCurrentUser };

const Routes = withRouter(RoutesImpl as any);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
