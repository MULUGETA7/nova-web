import React from 'react';
import './Logo.css'; // Import the CSS file

const Logo = () => {
  return (
    <div className="logo-container">
      <img
        src={require('../assets/images/logo.png')} // Replace with your logo path
        alt="Nova Labs Logo"
        className="logo-image"
      />
    </div>
  );
};

export default Logo;