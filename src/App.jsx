import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import View from "./pages/View";
import Admin from "./pages/Admin";
import { PlayListContext } from "./contexts/PlayListContext";
import withAuthProvider from "./Auth/AuthProvider";
import ErrorMessage from "./Auth/ErrorMessage";
import AuthPanel from "./components/AuthPanel";


class App extends Component {
  static contextType = PlayListContext;

  render() {
    let error = null;
    if (this.props.error) {
      error = (
        <ErrorMessage
          message={this.props.error.message}
          debug={this.props.error.debug}
        />
      );
    }
    const { playList } = this.context;
    localStorage.setItem("playList", JSON.stringify(playList));
    return (
      <Router>
        <div>
          {error}
          <Route
            exact
            path="/"
            render={(props) =>
              this.props.isAuthenticated ? (
                <View />
              ) : (
                <AuthPanel
                  isAuthenticated={this.props.isAuthenticated}
                  authButtonMethod={
                    this.props.isAuthenticated
                      ? this.props.logout
                      : this.props.login
                  }
                  user={this.props.user}
                />
              )
            }
          />
          <Route
            exact
            path="/admin"
            render={(props) =>
              this.props.isAuthenticated ? (
                <Admin
                  AuthPanel={
                    <AuthPanel
                      isAuthenticated={this.props.isAuthenticated}
                      authButtonMethod={
                        this.props.isAuthenticated
                          ? this.props.logout
                          : this.props.login
                      }
                      user={this.props.user}
                    />
                  }
                />
              ) : (
                <AuthPanel
                  isAuthenticated={this.props.isAuthenticated}
                  authButtonMethod={
                    this.props.isAuthenticated
                      ? this.props.logout
                      : this.props.login
                  }
                  user={this.props.user}
                />
              )
            }
          />
        </div>
      </Router>
    );
  }
}

export default withAuthProvider(App);
