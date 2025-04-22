import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bloodType: {
        type: String,
        required: true,
        enum: ['A+', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-','A-']

    },
    lastDonation: Date,
    location: String,
    phone: String,
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model('Donor', donorSchema);