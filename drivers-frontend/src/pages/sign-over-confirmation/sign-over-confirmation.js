import React, {Component} from 'react';
import './sign-over-confirmation.css';
import Api from '../../api';
import {getLoggedInEmail} from '../../api/auth';
import {BackIcon} from "../../icons";

class SignOverConfirmation extends Component {
  state = {
    details: {
      licensePlate: '',
      sender: {
        firstName: '',
        lastName: ''
      }
    },
    invalidCredentials: false,
    requestConfirmed: false
  };

  componentDidMount() {
    /* Api.signOver.getDetailsForCode(code)
      .then(details => this.setState({ details }))
      .catch(err => {
        // code not available or already confirmed

      }); */
  }

  render() {
    const {details: {licensePlate, sender: {firstName, lastName}}, invalidCredentials, requestConfirmed} = this.state;

    return (
      <div>
        <a href="/vehicles" className="sign-over__back">
          <BackIcon/>
        </a>
        <form className="sign-over-confirmation"
              onSubmit={this.onConfirm}
              autoComplete="off">
          <h2>Accept Sign Over Request</h2>
          <p>
            Fill in the token you have received to confirm your part of the sign over.<br/>
            Please verify this request by entering your password.
          </p>
          <label>
            Token
            <input type="text"
                   name="token"
                   placeholder="token" required/>
          </label>
          <label>
            Password confirmation
            <input type="password"
                   name="password"
                   placeholder="password" required/>
          </label>
          {invalidCredentials && <p className="sign-over-confirmation__wrong-credentials">
            The token or password was wrong, expired or already accepted
          </p>}
          <button className={`btn ${requestConfirmed ? 'green' : 'red'}`}>Confirm</button>
          {requestConfirmed && <p className="sign-over-confirmation__confirmed">
            The request was confirmed successfully.<br/>
            <p><a href="/vehicles">Click here to go back to your vehicles page.</a></p>
          </p>}
        </form>
      </div>
    );
  }

  onConfirm = e => {
    e.preventDefault();

    const {target} = e;
    const email = getLoggedInEmail();
    const token = target.token.value;
    const password = target.password.value;

    Api.signOver.confirmRequest({email, token, password})
      .then(() => {
        // TODO: in backend make request for changing the vehicle ownership

        this.setState({requestConfirmed: true});
      })
      .catch(() => this.setState({invalidCredentials: true}));
  };
}

export default SignOverConfirmation;
