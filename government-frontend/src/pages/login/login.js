import React, { Component } from 'react';
import './login.css';

class Login extends Component {
  onLogin = (e) => {
    const { target } = e;
    e.preventDefault();

    const username = target.username.value;
    const password = target.password.value;

    this.props.onAuthenticate(username, password);
  };

  render() {
    return (
      <div className="login">
        <div className="login__content">
          <h1>Traxit Government</h1>
          <form onSubmit={this.onLogin}>
            <input type="text"
                   name="username"
                   placeholder="Username"
                   autoFocus="true" spellCheck="false" autoCapitalize="none"/>
            <input type="password"
                   name="password"
                   placeholder="Password"
                   spellCheck="false" autoCapitalize="none"/>
            <a href="#" className="login__content__forgot-password">Forgot password?</a>
            <button className="btn blue ">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
