import React, { Component } from 'react';
import './sign-over-confirmation.css';
import Api from '../../api';
import { getLoggedInEmail } from '../../api/auth';

class SignOverConfirmation extends Component {
  state = {
    details: {
      licensePlate: '',
      sender: {
        firstName: '',
        lastName: ''
      }
    },
    invalidCredentials: false
  };

  componentDidMount() {
    // TODO: fetch code details
    const { code } = this.props.match.params;

    Api.signOver.getDetailsForCode(code)
      .then(details => this.setState({ details }))
      .catch(err => {
        // code not available or already confirmed

      });
  }

  render() {
    const { details: { licensePlate, sender: { firstName, lastName } }, invalidCredentials } = this.state;

    return (
      <form className="sign-over-confirmation"
            onSubmit={this.onConfirm}>
        <h2>Accept Sign Over Request</h2>
        <p>
          You have been sent a request by {firstName} {lastName} for
          signing over <b className="red">{licensePlate}</b> to you. <br/>
          If this information is correct, please verify this request by entering your password.
        </p>
        <label>
          Password confirmation
          <input type="password"
                 name="password"
                 placeholder="password" required/>
        </label>
        {invalidCredentials && <p className="sign-over-confirmation__wrong-credentials">Wrong password</p>}
        <button className="btn red">Confirm</button>
      </form>
    );
  }

  onConfirm = e => {
    e.preventDefault();

    const { target } = e;
    const email = getLoggedInEmail();
    const password = target.password.value;

    Api.auth.login(email, password)
      .then(() => {
        // continue to vehicles page
        // TODO: in backend make request for changing the vehicle ownership
        this.props.history.push('/vehicles');
      })
      .catch(() => this.setState({ invalidCredentials: true }));

    console.log({ email, password });
  };
}

export default SignOverConfirmation;
