const mongoose = require('mongoose');
require('dotenv').config();

async function checkAnnouncements() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { family: 4 });
        console.log('✅ Connected to MongoDB');

        const db = mongoose.connection.db;
        const announcements = await db.collection('announcements').find({}).toArray();

        console.log('Announcements in DB:', announcements.length);
        announcements.forEach((a, i) => {
            console.log(`[${i}] ID: ${a._id}, Text: "${a.text}", Link: "${a.link}", Active: ${a.isActive}`);
        });

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await mongoose.disconnect();
    }
}

checkAnnouncements();
