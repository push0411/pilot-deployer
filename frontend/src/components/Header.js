import React from 'react';
import './css/Header.css';
import logo from '../images/logo.png';

const Header = ({ title }) => {
  return (
    <header className="header-navbar">
      <div className="header-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="header-title">
        <h5>{title}</h5>
      </div>
    </header>
  );
};

export default Header;
