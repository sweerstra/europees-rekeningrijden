import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../../pages/login/login';
import Trackers from '../../pages/trackers/trackers';
import Invoices from '../../pages/invoices/invoices';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = { isAuthenticated: !!localStorage.getItem('access_token') };
  }

  render() {
    const { isAuthenticated } = this.state;

    const redirect = <Redirect to="/login"/>;

    return (
      <div className="App">
        <Switch>
          <Route path="/trackers"
                 render={() =>
                   isAuthenticated
                     ? <Trackers
                       isAuthenticated={isAuthenticated}
                       onLogout={this.logout}/>
                     : redirect
                 }/>
          <Route path="/invoices"
                 render={() =>
                   isAuthenticated
                     ? <Invoices
                       isAuthenticated={isAuthenticated}
                       onLogout={this.logout}/>
                     : redirect
                 }/>
          <Route path="/login" render={() =>
            isAuthenticated
              ? <Trackers/>
              : <Login onAuthenticate={this.authenticate}
                       isAuthenticated={isAuthenticated}/>
          }/>
          {redirect}
        </Switch>
      </div>
    );
  }

  authenticate = (username, password) => {
    // TODO: make request
    const isAuthenticated = true;

    if (isAuthenticated) {
      localStorage.setItem('access_token', 'token');
    }

    this.setState({ isAuthenticated: true });
  };

  logout = () => {
    console.log('logout');
    localStorage.removeItem('access_token');
    this.setState({ isAuthenticated: false });
  };
}

export default App;
