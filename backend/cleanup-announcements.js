const mongoose = require('mongoose');
require('dotenv').config();

async function cleanup() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { family: 4 });
        console.log('✅ Connected to MongoDB');

        const db = mongoose.connection.db;
        const result = await db.collection('announcements').deleteMany({});
        console.log(`🗑️ Deleted ${result.deletedCount} announcements.`);

        console.log('Re-init with default...');
        const Announcement = require('./models/announcement');
        await Announcement.create({
            text: "NEW Casting.io System Live on",
            link: "#",
            isActive: true
        });
        console.log('✅ Initialized with default.');

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await mongoose.disconnect();
    }
}

cleanup();
