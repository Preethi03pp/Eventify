// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the new CSS file for Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Eventify</h1>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link> {/* Added className for styling */}
        <Link to="/admin-dashboard" className="nav-link">Dashboard</Link> {/* Added className for styling */}
        <Link to="/create-event" className="nav-link">Create Event</Link> {/* Added className for styling */}
        <Link to="/rsvp-list" className="nav-link">RSVP List</Link> {/* Added className for styling */}
      </div>
    </nav>
  );
};

export default Navbar;