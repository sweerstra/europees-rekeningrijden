import React, {Component} from 'react';
import '../login/login.css';
import './register.css';
import Api from '../../api';
import {UserIcon, PasswordIcon, EmailIcon} from "../../icons";

class Register extends Component {


  render() {
    return (
      <div className="register">
        <div className="register__content">
          <h1>Traxit Drivers System</h1>
          <form onSubmit={this.onLogin}>
            <div className={"form__input-container"}>
              <EmailIcon/>
              <input type="text"
                     name="email"
                     placeholder="Email"
                     autoFocus="true" spellCheck="false"
                     autoCapitalize="none"/>
            </div>
            <div className={"form__input-container"}>
              <PasswordIcon/>
              <input type="password"
                     name="password"
                     placeholder="Password"
                     spellCheck="false" autoCapitalize="none"/>
            </div>
            <div className={"form__input-container"}>
              <PasswordIcon/>
              <input type="password"
                     name="password"
                     placeholder="Repeat password"
                     spellCheck="false" autoCapitalize="none"/>
            </div>
            <a href="/login" className="register__content__create-account register__other-actions">Already have an
              account?</a>
            <button className="btn blue">Login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Register;
