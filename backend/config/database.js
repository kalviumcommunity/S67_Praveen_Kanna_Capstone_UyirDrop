import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.error('MongoDB URI is not defined in environment variables');
            process.exit(1);
        }
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        };
        await mongoose.connect(process.env.MONGODB_URI, options);
        console.log('📚 Connected to MongoDB successfully');
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', 'MongoDB Connection Error:');
        console.error('Make sure MongoDB is running on your machine.');
        console.error('Try running: brew services start mongodb-community');
        console.error(`Error details: ${error.message}`);
        process.exit(1);
    }
};