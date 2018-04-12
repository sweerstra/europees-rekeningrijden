import React, { Component } from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import { getLoggedInEmail, logout } from '../../api/auth';

class Navigation extends Component {
  render() {
    return (
      <nav className="nav">
        <h1 className="nav__heading">{this.props.heading}</h1>
        <div>Logged in as <b>{getLoggedInEmail()}</b></div>
        <div className="nav__logout">
          <Link to="/login" className="btn red" onClick={this.onLogout}>
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
