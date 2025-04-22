import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import '../styles/Profile.css'

const Profile = () => {
  const { user } = useAuth()
  const { addToast } = useToast()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (!response.ok) throw new Error('Failed to fetch profile')
        const data = await response.json()
        setProfile(data)
      } catch (error) {
        addToast('Failed to load profile', 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [addToast])

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile</h2>
        <div className="profile-info">
          <div className="info-group">
            <label>Name:</label>
            <span>{user?.name}</span>
          </div>
          <div className="info-group">
            <label>Email:</label>
            <span>{user?.email}</span>
          </div>
          {profile?.donorInfo && (
            <>
              <h3>Donor Information</h3>
              <div className="info-group">
                <label>Blood Type:</label>
                <span>{profile.donorInfo.bloodType}</span>
              </div>
              <div className="info-group">
                <label>Last Donation:</label>
                <span>{new Date(profile.donorInfo.lastDonation).toLocaleDateString()}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile