const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // If already connected, return immediately
        if (mongoose.connection.readyState === 1) {
            console.log('✅ MongoDB Already Connected');
            return;
        }

        console.log("⏳ Connecting to MongoDB...");

        // Set connection options with longer timeout
        const options = {
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
            socketTimeoutMS: 45000,
            family: 4 // Force IPv4
        };

        await mongoose.connect(process.env.MONGO_URI, options);
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error.message);
        console.log('⚠️  Server will continue without database. Some features may not work.');
        // Re-throw error so caller knows connection failed
        throw error;
        // Don't exit - let server run without database
        // process.exit(1);
    }
};

// Handle connection errors after initial connection
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('reconnected', () => {
    console.log('✅ MongoDB reconnected successfully');
});

module.exports = connectDB;
