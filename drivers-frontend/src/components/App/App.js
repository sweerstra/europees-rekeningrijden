import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import Login from '../../pages/login/login';
import Register from "../../pages/register/register";
import RouteInvoices from '../../pages/route-invoices/route-invoices';
import Vehicles from '../../pages/vehicles/vehicles';
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

    console.log(isAuthenticated)

    return (
      <div className="App">
        <Switch>
          <Route path="/login" render={() =>
            isAuthenticated
              ? <RouteInvoices/>
              : <Login onAuthenticate={this.handleAuthentication}/>
          }/>
          <Route path="/register" component={Register}/>
          <PrivateRoute path="/routes" authenticated={isAuthenticated} component={RouteInvoices}/>
          <PrivateRoute exact path="/vehicles" authenticated={isAuthenticated} component={Vehicles}/>
          <PrivateRoute exact path="/vehicles/sign-over" authenticated={isAuthenticated} component={SignOverConfirmation}/>
          <Redirect to="/login"/>
        </Switch>
      </div>
    );
  }

  handleAuthentication = (token) => {
    setToken(token);
    this.setState({ isAuthenticated: true, loggedInEmail: getLoggedInEmail() });
  };
}

export default App;
