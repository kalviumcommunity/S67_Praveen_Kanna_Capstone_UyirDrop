import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="home">
      <div className={`hero-section ${isVisible ? 'fade-in' : ''}`}>
        <h1>Save Lives Through Blood Donation</h1>
        <p>Your donation can give someone another chance at life</p>
        <div className="cta-buttons">
          <Link to="/donate" className="cta-button donate">Become a Donor</Link>
          <Link to="/request" className="cta-button request">Request Blood</Link>
        </div>
      </div>
      
      <div className="stats-section">
        <div className="stat-card">
          <h3>10+</h3>
          <p>Active Donors</p>
        </div>
        <div className="stat-card">
          <h3>50+</h3>
          <p>Lives Saved</p>
        </div>
        <div className="stat-card">
          <h3>24/7</h3>
          <p>Support</p>
        </div>
      </div>
    </div>
  );
};

export default Home;