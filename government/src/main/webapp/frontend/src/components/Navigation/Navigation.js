import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

const Navigation = ({ heading }) => (
  <nav className="nav">
    <h1>{heading}</h1>
    <div className="nav__logout">
      <Link to="/login">Logout</Link>
    </div>
  </nav>
);

export default Navigation;
