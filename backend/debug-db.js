const mongoose = require('mongoose');
require('dotenv').config();
const Message = require('./models/message');

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const counts = await Message.aggregate([
            { $group: { _id: '$source', count: { $sum: 1 } } }
        ]);
        console.log('Message counts by source:', counts);

        const latest = await Message.find().sort({ createdAt: -1 }).limit(10);
        console.log('Latest 10 messages:', JSON.stringify(latest, null, 2));

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

run();
