import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

const Navigation = ({ heading, onLogout }) => (
  <nav className="nav">
    <h1>{heading}</h1>
    <div className="nav__logout">
      <Link to="/login" className="btn red" onClick={onLogout}>
        Logout
      </Link>
    </div>
  </nav>
);

export default Navigation;
