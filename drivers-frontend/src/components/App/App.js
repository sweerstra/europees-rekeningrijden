import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import Login from '../../pages/login/login';
import Register from "../../pages/register/register";
import RouteInvoices from '../../pages/route-invoices/route-invoices';
import Vehicles from '../../pages/vehicles/vehicles';
import Account from '../../pages/account/account';
import Payment from '../../pages/payment/payment';
import SignOverConfirmation from '../../pages/sign-over-confirmation/sign-over-confirmation';
import { getLoggedInEmail, isLoggedIn, setToken } from '../../api/auth';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInEmail: getLoggedInEmail(),
      isAuthenticated: isLoggedIn()
    };
  }

  render() {
    const { isAuthenticated } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route path="/login" render={() =>
            isAuthenticated
              ? <RouteInvoices/>
              : <Login onAuthenticate={this.handleAuthentication}/>
          }/>
          <Route path="/register" component={Register}/>
          <PrivateRoute path="/routes" component={RouteInvoices}/>
          <PrivateRoute path="/vehicles" authenticated={isAuthenticated} component={Vehicles}/>
          <PrivateRoute path="/account" authenticated={isAuthenticated} component={Account}/>
          <PrivateRoute exact path="/vehicles/sign-over" component={SignOverConfirmation}/>
          <Route path="/payment/:invoiceId" render={routeProps => <Payment isSuccessful={true} {...routeProps}/>}/>
          <Route path="/payment-failed" render={routeProps => <Payment isSuccessful={false} {...routeProps}/>}/>
          <Redirect to="/login"/>
        </Switch>
      </div>
    );
  }

  handleAuthentication = (token) => {
    if (!token.message) {
      setToken(token);
      this.setState({ isAuthenticated: true, loggedInEmail: getLoggedInEmail() });
    }
  };
}

export default App;
