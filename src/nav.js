import React from "react";
import {Link} from "react-router-dom";
import "./stylesheet/navbar.css"

export default function Navbar(){
  return(
    <header className="navbar">
      <div>
        <h1 className="logo">FarmerIndia</h1>
      </div>
      <div>
        <Link to="/" className="links" style={{marginRight:'30px',fontSize:'25px',textDecoration: 'none'}}>Home</Link>
        <Link to="/services" className="links" style={{marginRight:'30px',fontSize:'25px',textDecoration: 'none'}}>Services</Link>
        <Link to="/about" className="links" style={{fontSize:'25px',textDecoration: 'none'}}>About</Link>
        <button className="logout-btn">LOGOUT</button>
      </div>
    </header>
  )
  }
