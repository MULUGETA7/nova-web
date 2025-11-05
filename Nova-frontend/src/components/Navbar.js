import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation(); // Get the current route location

  // Check if the current route is the Home page
  const isHomePage = location.pathname === '/';

  console.log('Current Path:', location.pathname); // Debugging

  return (
    <div className="navbar">
      <div className={`navbar-links ${isHomePage ? 'no-home' : ''}`}>
        {/* Conditionally render the Home link */}
        {!isHomePage && <Link to="/">Home</Link>}
        <Link to="/">Nova Creative</Link>
        <Link to="/">Nova Flow</Link>
        <Link to="/">Agent 7</Link>
        <Link to="/service">Service</Link>
        <Link to="/about-us">About Us</Link>
      </div>
    </div>
  );
};

export default Navbar;