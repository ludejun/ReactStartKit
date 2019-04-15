import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from '../components/Header';
import * as userActions from '../actions/user';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login() {
    this.props.userActions.getLoginInfo({
      name: 'admin',
    });
  }

  render() {
    const { loading, name } = this.props.user;
    // console.log(this.props);
    return (
      <div>
        <Header />
        <button onClick={this.login} value="Login" type="button">
          Login
        </button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>
            User:
            {name}
          </p>
        )}
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login),
);
