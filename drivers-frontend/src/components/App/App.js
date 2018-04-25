import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../../pages/login/login';
import Invoices from '../../pages/invoices/invoices'
import PrivateRoute from '../PrivateRoute';
import { getLoggedInEmail, isLoggedIn, setToken } from '../../api/auth';
import './App.css';
import Register from "../../pages/register/register";

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
              ? <Invoices/>
              : <Login onAuthenticate={this.handleAuthentication}/>
          }/>
          <Route path="/register" render={() =>
            isAuthenticated
              ? <Invoices/>
              : <Register onAuthenticate={this.handleAuthentication}/>
          }/>
          <Route path="/invoices" component={Invoices}/>
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
