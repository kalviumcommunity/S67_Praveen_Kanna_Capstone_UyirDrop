import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import '../styles/DonorRegistration.css';

const DonorRegistration = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        bloodType: '',
        phone: '',
        email: '',
        address: '',
        lastDonation: '',
        medicalHistory: ''
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.age) newErrors.age = 'Age is required';
        else if (formData.age < 18 || formData.age > 65) newErrors.age = 'Age must be between 18 and 65';
        if (!formData.bloodType) newErrors.bloodType = 'Blood type is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Enter valid 10-digit number';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter valid email';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            addToast('Please fix the errors in the form', 'error');
            return;
        }

        setSubmitting(true);
        try {
            const response = await fetch('http://localhost:5000/api/donors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            addToast('Registration successful! Thank you for becoming a donor.', 'success');
            navigate('/profile');
        } catch (error) {
            addToast(error.message || 'Registration failed. Please try again.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="donor-registration">
            <div className="form-container">
                <h2>Register as Blood Donor</h2>
                
                <form onSubmit={handleSubmit} className="registration-form">
                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className={errors.name ? 'error' : ''}
                            />
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>
                        
                        <div className="form-group">
                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={formData.age}
                                onChange={handleChange}
                                min="18"
                                max="65"
                                className={errors.age ? 'error' : ''}
                            />
                            {errors.age && <span className="error-message">{errors.age}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <select
                                name="bloodType"
                                value={formData.bloodType}
                                onChange={handleChange}
                                className={errors.bloodType ? 'error' : ''}
                            >
                                <option value="">Select Blood Type</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                            {errors.bloodType && <span className="error-message">{errors.bloodType}</span>}
                        </div>

                        <div className="form-group">
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                className={errors.phone ? 'error' : ''}
                            />
                            {errors.phone && <span className="error-message">{errors.phone}</span>}
                        </div>
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <textarea
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            className={errors.address ? 'error' : ''}
                        />
                        {errors.address && <span className="error-message">{errors.address}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            type="date"
                            name="lastDonation"
                            placeholder="Last Donation Date"
                            value={formData.lastDonation}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            name="medicalHistory"
                            placeholder="Medical History (Optional)"
                            value={formData.medicalHistory}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="submit-button" disabled={submitting}>
                        {submitting ? 'Registering...' : 'Register as Donor'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DonorRegistration;