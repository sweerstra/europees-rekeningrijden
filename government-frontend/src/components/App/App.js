import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Login from '../../pages/login/login';
import Trackers from '../../pages/trackers/trackers';
import Invoices from '../../pages/invoices/invoices';
import Region from '../../pages/region/region';
import Settings from '../../pages/settings/settings';
import PrivateRoute from '../PrivateRoute';
import {getLoggedInEmail, isLoggedIn, setToken} from '../../api/auth';
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
    const {isAuthenticated} = this.state;

    return (
      <div className="App">
        <Switch>
          <PrivateRoute path="/trackers" authenticated={isAuthenticated} component={Trackers}/>
          <PrivateRoute path="/invoices" authenticated={isAuthenticated} component={Invoices}/>
          <PrivateRoute path="/region" authenticated={isAuthenticated} component={Region}/>
          <PrivateRoute path="/settings" authenticated={isAuthenticated} component={Settings}/>
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
    setToken(token);
    this.setState({isAuthenticated: true, loggedInEmail: getLoggedInEmail()});
  };
}

export default App;
