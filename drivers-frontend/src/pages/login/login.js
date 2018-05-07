import React, { Component } from 'react';
import './login.css';
import Api from '../../api';
import { PasswordIcon, UserIcon } from "../../icons";

class Login extends Component {
  onLogin = async (e) => {
    const { target } = e;
    e.preventDefault();

    const email = target.email.value;
    const password = target.password.value;

    /* Api.auth.login(email, password)
      .then(this.props.onAuthenticate); */

    // TODO: replace temporary workaround with auth
    this.props.history.push('/routes');

    let index = email.indexOf('@');

    index = index === -1 ? email.length : index;

    localStorage.setItem('user', email.slice(0, index));
  };

  render() {
    return (
      <div className="login">
        <div className="login__content">
          <h1>Traxit Drivers System</h1>
          <form onSubmit={this.onLogin}>
            <div className={"form__input-container"}>
              <UserIcon/>
              <input type="text"
                     name="email"
                     placeholder="Email"
                     autoFocus="true" spellCheck="false" autoCapitalize="none"/>
            </div>
            <div className={"form__input-container"}>
              <PasswordIcon/>
              <input type="password"
                     name="password"
                     placeholder="Password"
                     spellCheck="false" autoCapitalize="none"/>
            </div>
            <a href="#" className="login__content__forgot-password login__other-actions">Forgot password?</a>
            <a href="/register" className="login__content__create-account login__other-actions">Create a new account</a>
            <button className="btn blue">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
