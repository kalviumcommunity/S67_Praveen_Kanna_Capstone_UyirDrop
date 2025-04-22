import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    urgency: {
        type: String,
        enum: ['urgent', 'normal'],
        default: 'normal'
    },
    hospital: {
        type: String
    },
    location: {
        type: String
    },
    contact: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'fulfilled', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true 
});

export default mongoose.model('Request', requestSchema);