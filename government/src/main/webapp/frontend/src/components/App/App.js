import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../../pages/login/login';
import './App.css';

const App = () => (
  <div className="App">
    <Switch>
      <Route path="/login" component={Login}/>
      <Redirect to="/login"/>
    </Switch>
  </div>
);

export default App;
