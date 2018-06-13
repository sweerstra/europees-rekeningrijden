import React, { Component } from 'react';
import '../login/login.css';
import './register.css';
import Api from '../../api';
import { PasswordIcon, EmailIcon } from "../../icons";
import { debounce } from '../../utils/debounce';
import { logout } from '../../api/auth';

class Register extends Component {
  state = {
    owner: true,
    error: ''
  };

  componentDidMount() {
    this.emailCallback = debounce(e => {
      const { value } = e.target;
      Api.owner.getByEmail(value)
        .then(owner => this.setState({ owner, error: '' }))
        .catch(() => this.setState({ owner: false }));
    }, 600);
  }

  render() {
    const { owner, error } = this.state;
    let emailClassName = '';

    if (typeof owner === 'object') {
      emailClassName = 'green';
    } else if (owner === false) {
      emailClassName = 'red'
    }

    return (
      <div className="register">
        <div className="register__content">
          <h1>Traxit Drivers System</h1>
          <form onSubmit={this.onRegister}>
            <div className={"form__input-container"}>
              <EmailIcon/>
              <input type="text"
                     name="email"
                     className={emailClassName}
                     placeholder="Email"
                     onChange={this.onEmailChange}
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
                     name="confirmPassword"
                     placeholder="Repeat password"
                     spellCheck="false" autoCapitalize="none"/>
            </div>
            <a href="/login" className="register__content__create-account register__other-actions">Already have an
              account?</a>
            {error && <p className="red">{error}</p>}
            <button className="btn blue">Register</button>
          </form>
        </div>
      </div>
    )
  }

  onEmailChange = (e) => {
    e.persist();
    this.emailCallback(e);
  };

  onRegister = (e) => {
    e.preventDefault();

    const { target } = e;
    const email = target.email.value;
    const password = target.password.value;
    const confirmPassword = target.confirmPassword.value;
    const { owner } = this.state;

    if (typeof owner !== 'object') {
      this.setState({ error: 'Email is not registered in government' });
    } else if (password === confirmPassword) {
      Api.auth.register({ email, password, firstName: owner.firstName, lastName: owner.lastName, ownerId: owner.id })
        .then(() => {
          logout();
          this.props.history.push('/login');
        });
    } else {
      this.setState({ error: 'Passwords are not equal' });
    }
  };
}

export default Register;
