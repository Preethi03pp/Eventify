// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';


const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* 🔹 HERO SECTION WITH IMAGE - Now the primary content */}
      <div className="hero-section">
        {/* Left Side: Content */}
        <div className="hero-content">
          <h2 className="hero-title">
            Your Event, <br />
            Our Platform.
          </h2>
          <p className="hero-description">
            Effortlessly create, manage, and share your events with a seamless and beautiful experience.
          </p>
          <div className="cta-buttons">
            <Link to="/create-event" className="cta-button primary">
              Get Started
            </Link>
            <Link to="/admin-dashboard" className="cta-button secondary">
              Explore Events
            </Link>
          </div>
        </div>

        {/* Right Side: Image Placeholder */}
        <div className="hero-image-container">
          <img src="/Landing_page.png" alt="Event management illustration" className="hero-image" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;