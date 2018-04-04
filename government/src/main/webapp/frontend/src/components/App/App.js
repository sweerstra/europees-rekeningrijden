import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../../pages/login/login';
import Trackers from '../../pages/trackers/trackers';
import Invoices from '../../pages/invoices/invoices';
import './App.css';

const App = () => (
  <div className="App">
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/trackers" component={Trackers}/>
      <Route path="/invoices" component={Invoices}/>
      <Redirect to="/login"/>
    </Switch>
  </div>
);

export default App;
