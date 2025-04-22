import { useState } from 'react'
import '../styles/Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Add API integration
    console.log('Form submitted:', formData)
  }

  return (
    <div className="contact">
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>Have questions? We'd love to hear from you.</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-item">
            <div className="icon">📍</div>
            <h3>Our Location</h3>
            <p>16/2 UyirDrop BloodBank<br />JP Nagar - 560078</p>
          </div>
          
          <div className="info-item">
            <div className="icon">📞</div>
            <h3>Phone</h3>
            <p>+91 8778044576<br />Emergency: +91 9443287254</p>
          </div>
          
          <div className="info-item">
            <div className="icon">✉️</div>
            <h3>Email</h3>
            <p>info@bloodlife.com<br />support@bloodlife.com</p>
          </div>
        </div>

        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              />
            </div>

            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </div>

      <div className="map-container">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.9571044210626!2d77.59456281482115!3d12.971598290857735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c63b5d49%3A0xf99be62e135aaf5b!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1619424416654!5m2!1sen!2sin"
    width="100%"
    height="450"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
  />
</div>
    </div>
  )
}

export default Contact