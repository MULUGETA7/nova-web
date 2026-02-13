const mongoose = require('mongoose');
require('dotenv').config();
const Message = require('./models/message');

const checkMessages = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/novalabs');
        console.log('Connected to MongoDB');

        const messages = await Message.find().sort({ createdAt: -1 }).limit(5);
        console.log(`Found ${messages.length} messages:`);
        messages.forEach(m => {
            console.log(`- From: ${m.email} | Source: ${m.source} | Status: ${m.status} | Content: ${m.content.substring(0, 30)}...`);
        });

        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
};

checkMessages();
