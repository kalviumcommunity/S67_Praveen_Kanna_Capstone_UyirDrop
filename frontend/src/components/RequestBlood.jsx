import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import '../styles/RequestBlood.css';

const RequestBlood = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [formData, setFormData] = useState({
        patientName: '',
        bloodGroup: '',
        units: '',
        hospital: '',
        contactPerson: '',
        contactNumber: '',
        urgency: 'Medium'
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const [searchParams, setSearchParams] = useState({
        bloodType: '',
        location: '',
        urgency: 'normal'
    });
    const [donors, setDonors] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.patientName.trim()) newErrors.patientName = 'Patient name is required';
        if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
        if (!formData.units) newErrors.units = 'Units required';
        else if (formData.units < 1) newErrors.units = 'Units must be greater than 0';
        if (!formData.hospital.trim()) newErrors.hospital = 'Hospital name is required';
        if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
        if (!formData.contactNumber) newErrors.contactNumber = 'Contact number is required';
        else if (!/^\d{10}$/.test(formData.contactNumber)) newErrors.contactNumber = 'Enter valid 10-digit number';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
            return;
        }

        setSubmitting(true);
        try {
            await axios.post('http://localhost:5000/api/requests', formData);
            addToast('Request submitted successfully', 'success');
            navigate('/requests');
        } catch (error) {
            addToast(error.response?.data?.message || 'Request submission failed', 'error');
            setErrors({
                submit: 'Request submission failed. Please try again.'
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsSearching(true);
        try {
            // Simulated search for now
            setTimeout(() => {
                setDonors([
                    { id: 1, name: 'John Doe', bloodType: 'A+', location: 'New York', phone: '1234567890' },
                    { id: 2, name: 'Jane Smith', bloodType: 'O-', location: 'Boston', phone: '0987654321' }
                ]);
                addToast('Search completed successfully', 'success');
            }, 1500);
        } catch (error) {
            console.error('Search failed:', error);
            addToast('Failed to search donors', 'error');
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header bg-danger text-white">
                            <h2 className="mb-0">Request Blood</h2>
                        </div>
                        <div className="card-body">
                            {errors.submit && (
                                <div className="alert alert-danger">{errors.submit}</div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Patient Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.patientName ? 'is-invalid' : ''}`}
                                        name="patientName"
                                        value={formData.patientName}
                                        onChange={handleChange}
                                    />
                                    {errors.patientName && <div className="invalid-feedback">{errors.patientName}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Blood Group Needed</label>
                                    <select
                                        className={`form-control ${errors.bloodGroup ? 'is-invalid' : ''}`}
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Blood Group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                    {errors.bloodGroup && <div className="invalid-feedback">{errors.bloodGroup}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Units Required</label>
                                    <input
                                        type="number"
                                        className={`form-control ${errors.units ? 'is-invalid' : ''}`}
                                        name="units"
                                        value={formData.units}
                                        onChange={handleChange}
                                        min="1"
                                    />
                                    {errors.units && <div className="invalid-feedback">{errors.units}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Hospital Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.hospital ? 'is-invalid' : ''}`}
                                        name="hospital"
                                        value={formData.hospital}
                                        onChange={handleChange}
                                    />
                                    {errors.hospital && <div className="invalid-feedback">{errors.hospital}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contact Person</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.contactPerson ? 'is-invalid' : ''}`}
                                        name="contactPerson"
                                        value={formData.contactPerson}
                                        onChange={handleChange}
                                    />
                                    {errors.contactPerson && <div className="invalid-feedback">{errors.contactPerson}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contact Number</label>
                                    <input
                                        type="tel"
                                        className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
                                        name="contactNumber"
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                    />
                                    {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Urgency Level</label>
                                    <select
                                        className="form-control"
                                        name="urgency"
                                        value={formData.urgency}
                                        onChange={handleChange}
                                    >
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-danger"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Submitting...' : 'Submit Request'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="search-container mt-5">
                <h2>Find Blood Donors</h2>
                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-inputs">
                        <select
                            value={searchParams.bloodType}
                            onChange={(e) => setSearchParams({ ...searchParams, bloodType: e.target.value })}
                            required
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

                        <input
                            type="text"
                            placeholder="Enter Location"
                            value={searchParams.location}
                            onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                            required
                        />

                        <select
                            value={searchParams.urgency}
                            onChange={(e) => setSearchParams({ ...searchParams, urgency: e.target.value })}
                        >
                            <option value="normal">Normal</option>
                            <option value="urgent">Urgent</option>
                            <option value="emergency">Emergency</option>
                        </select>
                    </div>

                    <button type="submit" className="search-button" disabled={isSearching}>
                        {isSearching ? 'Searching...' : 'Find Donors'}
                    </button>
                </form>
            </div>

            <div className="results-container mt-5">
                {isSearching ? (
                    <div className="loading-spinner"></div>
                ) : donors.length > 0 ? (
                    <div className="donors-grid">
                        {donors.map(donor => (
                            <div key={donor.id} className="donor-card">
                                <div className="blood-type">{donor.bloodType}</div>
                                <h3>{donor.name}</h3>
                                <p><i className="fas fa-map-marker-alt"></i> {donor.location}</p>
                                <a href={`tel:${donor.phone}`} className="contact-button">
                                    Contact Donor
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-results">No donors found matching your criteria.</p>
                )}
            </div>
        </div>
    );
};

export default RequestBlood;