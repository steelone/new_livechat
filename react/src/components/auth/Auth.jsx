import React from "react";
import Loader from "../Loader";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";

class SignUp extends React.Component {
  state = {
    chats: [],
    loginForm: true,
  };

  changeForm = () => {
    this.setState({ loginForm: !this.state.loginForm });
  };

  authenticate = (e) => {
    e.preventDefault();
    if (this.state.loginForm) {
      this.props.login(e.target.username.value, e.target.password.value);
    } else {
      this.props.signup(
        e.target.username.value,
        e.target.email.value,
        e.target.password.value,
        e.target.password2.value
      );
    }
  };

  render() {
    return (
      <div>
        {this.props.loading ? (
          <Loader />
        ) : (
          !this.props.logged_in && (
            <div>
              <form method="POST" onSubmit={this.authenticate}>
                {this.state.loginForm ? (
                  <div>
                    <input name="username" type="text" placeholder="username" />
                    <input
                      name="password"
                      type="password"
                      placeholder="password"
                    />
                  </div>
                ) : (
                  <div>
                    <input name="username" type="text" placeholder="username" />
                    <input name="email" type="email" placeholder="email" />
                    <input
                      name="password"
                      type="password"
                      placeholder="password"
                    />
                    <input
                      name="password2"
                      type="password"
                      placeholder="password confirm"
                    />
                  </div>
                )}

                <button type="submit">Authenticate</button>
              </form>
              <button onClick={this.changeForm}>Switch</button>
              <p style={{ color: "#DC143C" }}>
                {this.props.error &&
                  this.props.error.response.status +
                    " " +
                    this.props.error.response.statusText}
              </p>
              <p style={{ color: "#DC143C" }}>
                {this.props.error && this.props.error.request.response}
              </p>
            </div>
          )
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    logged_in: state.auth.logged_in,
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
    username: state.auth.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (userName, password) =>
      dispatch(actions.authLogin(userName, password)),
    logout: () => dispatch(actions.logout()),
    signup: (username, email, password1, password2) =>
      dispatch(actions.authSignup(username, email, password1, password2)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
