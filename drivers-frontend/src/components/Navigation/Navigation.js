import React, { Component } from 'react';
import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import { getLoggedInEmail, logout } from '../../api/auth';

class Navigation extends Component {
  render() {
    return (
      <nav className="nav">
        <h1 className="nav__heading">
          <Link to="/">{this.props.heading}</Link>
        </h1>

        <div>
          <NavLink to="/routes">Route Invoices</NavLink>
        </div>

        <div>
          <NavLink to="/vehicles">Vehicles</NavLink>
        </div>

        <div>Logged in as <b>{localStorage.getItem('user')}</b></div>

        <div className="nav__logout">
          <Link to="/login" className="btn light" onClick={this.onLogout}>
            Logout
          </Link>
        </div>
      </nav>
    );
  }

  onLogout = () => {
    logout();
    this.props.history.push('/login');
  };
}

export default Navigation;
