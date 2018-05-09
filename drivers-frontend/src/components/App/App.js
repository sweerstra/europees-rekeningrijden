import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import Login from '../../pages/login/login';
import Register from "../../pages/register/register";
import RouteInvoices from '../../pages/route-invoices/route-invoices';
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
          <PrivateRoute path="/register" isAutenticated={isAuthenticated} component={Register}/>
          <PrivateRoute path="/routes" isAutenticated={isAuthenticated} component={RouteInvoices}/>
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
