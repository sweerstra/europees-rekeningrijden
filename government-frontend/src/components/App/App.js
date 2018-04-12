import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../../pages/login/login';
import Trackers from '../../pages/trackers/trackers';
import Invoices from '../../pages/invoices/invoices';
import Region from '../../pages/region/region';
import PrivateRoute from '../PrivateRoute';
import { getLoggedInEmail, isLoggedIn } from '../../api/auth';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isAuthenticated: isLoggedIn(),
      loggedInEmail: getLoggedInEmail()
    };
  }

  render() {
    const { isAuthenticated } = this.state;

    return (
      <div className="App">
        <Switch>
          <PrivateRoute path="/trackers" authenticated={isAuthenticated} component={Trackers}/>
          <PrivateRoute path="/invoices" authenticated={isAuthenticated} component={Invoices}/>
          <PrivateRoute path="/region" authenticated={isAuthenticated} component={Region}/>
          <Route path="/login" render={() =>
            isAuthenticated
              ? <Trackers/>
              : <Login onAuthenticate={this.handleAuthentication}/>
          }/>
          <Redirect to="/login"/>
        </Switch>
      </div>
    );
  }

  handleAuthentication = (token) => {
    localStorage.setItem('access_token', token);
    this.setState({ isAuthenticated: true, loggedInEmail: getLoggedInEmail() });
  };
}

export default App;
