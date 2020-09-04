import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import View from "./pages/View";
import Admin from "./pages/Admin";
import withAuthProvider from "./auth/AuthProvider";
import ErrorMessage from "./auth/ErrorMessage";
import AuthPanel from "./components/AuthPanel";

class App extends Component {
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
    return (
      <Router>
        <div>
          {error}
          <Route
            exact
            path="/"
            render={() =>
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
            render={() =>
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
