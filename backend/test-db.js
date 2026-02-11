const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
    const mongoUri = process.env.MONGO_URI;
    console.log('Testing connection with MONGO_URI:', mongoUri ? 'FOUND' : 'MISSING');

    if (!mongoUri) {
        console.error('❌ Error: MONGO_URI is not defined in environment variables.');
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000,
            family: 4
        });
        console.log('✅ MongoDB Connection Successful!');
        process.exit(0);
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error.message);
        process.exit(1);
    }
};

testConnection();
