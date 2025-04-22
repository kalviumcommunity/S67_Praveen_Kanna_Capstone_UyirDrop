process.removeAllListeners('warning');

import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';


import { connectDB } from './config/database.js';
import authRoutes from './routes/auth.js';
import donorRoutes from './routes/donors.js';
import requestRoutes from './routes/requests.js';
import contactRoutes from './routes/contact.js';
import chatRoutes from './routes/chat.js'; // ✅ Import chatbot route

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
await connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chat', chatRoutes); // ✅ Add chatbot route

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});