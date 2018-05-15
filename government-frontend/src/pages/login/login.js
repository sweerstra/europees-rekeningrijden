import React, { Component } from 'react';
import './login.css';
import Api from '../../api';

class Login extends Component {
  state = {
    error: null
  };

  onLogin = async (e) => {
    const { target } = e;
    e.preventDefault();

    const email = target.email.value;
    const password = target.password.value;

    Api.auth.login(email, password)
      .then(this.props.onAuthenticate)
      .catch(() => {
        this.setState({ error: 'Invalid credentials' });
        target.reset();
      });
  };

  render() {
    const { error } = this.state;

    return (
      <div className="login">
        <div className="login__content">
          <h1>Traxit Government</h1>
          <form onSubmit={this.onLogin}>
            <input type="text"
                   name="email"
                   placeholder="Email"
                   autoFocus="true" spellCheck="false" autoCapitalize="none"/>
            <input type="password"
                   name="password"
                   placeholder="Password"
                   spellCheck="false" autoCapitalize="none"/>
            <span className="error">{error && error}</span>
            <a href="#" className="login__content__forgot-password">Forgot password?</a>
            <a href="/register" className="login__content__create-account login__other-actions">Create a new account</a>
            <button className="btn blue">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
