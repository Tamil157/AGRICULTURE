import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./stylesheet/navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar">
      <div className="logo-container">
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <h1 className="logo">FarmerIndia</h1>
      </div>
      <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" className="links">Home</Link>
        <Link to="/services" className="links">Services</Link>
        <Link to="/about" className="links">About</Link>
        <button className="logout-btn">LOGOUT</button>
      </div>
    </header>
  );
}
