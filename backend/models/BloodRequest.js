const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  bloodType: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  units: {
    type: Number,
    required: true,
    min: 1
  },
  hospital: {
    type: String,
    required: true
  },
  urgency: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['pending', 'fulfilled', 'cancelled'],
    default: 'pending'
  },
  contactPerson: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true,
    match: /^\d{10}$/
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  fulfilledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor'
  },
  fulfilledAt: Date
});

bloodRequestSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);