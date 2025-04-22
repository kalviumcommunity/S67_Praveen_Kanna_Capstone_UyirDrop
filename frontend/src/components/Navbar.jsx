import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Uyir<span>Drop</span></Link>
      </div>

      <button 
        className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
        <Link to="/donate" className="nav-link, red-link" onClick={() => setIsMobileMenuOpen(false)}>Donate</Link>
        <Link to="/request" className="nav-link, red-link" onClick={() => setIsMobileMenuOpen(false)}>Request Blood</Link>
        <Link to="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
        <Link to="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        
        {user ? (
          <div className="user-menu">
            <button 
              className="profile-button"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user.name}
              <span className="dropdown-arrow">▼</span>
            </button>
            
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
                <button onClick={handleLogout} className="dropdown-item">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="auth-button login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
            <Link to="/register" className="auth-button register" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar