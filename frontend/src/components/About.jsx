import { useEffect, useState } from 'react'
import '../styles/About.css'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="about">
      <div className={`about-hero ${isVisible ? 'visible' : ''}`}>
        <h1>Our Mission</h1>
        <p>Connecting blood donors with those in need, saving lives one donation at a time.</p>
      </div>

      <div className="about-sections">
        <div className="about-section">
          <div className="icon">❤️</div>
          <h2>Why Donate Blood?</h2>
          <p>Your blood donation can help save up to three lives. Blood is needed for surgeries, accidents, and treating various medical conditions.</p>
        </div>

        <div className="about-section">
          <div className="icon">🏥</div>
          <h2>How It Works</h2>
          <p>Register as a donor, or search for blood donors in your area. Our platform connects donors with those in need quickly and efficiently.</p>
        </div>

        <div className="about-section">
          <div className="icon">🤝</div>
          <h2>Community Impact</h2>
          <p>Join thousands of donors who have already helped save lives in their community. Every donation makes a difference.</p>
        </div>
      </div>

      <div className="stats-banner">
        <div className="stat">
          <h3>5000+</h3>
          <p>Registered Donors</p>
        </div>
        <div className="stat">
          <h3>2000+</h3>
          <p>Lives Saved</p>
        </div>
        <div className="stat">
          <h3>500+</h3>
          <p>Monthly Donations</p>
        </div>
      </div>
    </div>
  )
}

export default About