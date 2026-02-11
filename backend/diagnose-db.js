const mongoose = require('mongoose');
require('dotenv').config();

async function diagnose() {
    console.log('--- DB DIAGNOSTIC ---');
    console.log('MONGO_URI found:', !!process.env.MONGO_URI);

    try {
        console.log('Attempting connection with family: 4...');
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            family: 4
        });
        console.log('✅ Connected successfully!');

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));

        if (collections.some(c => c.name === 'users')) {
            const users = await db.collection('users').find({}, { projection: { email: 1, role: 1 } }).toArray();
            console.log('Users count:', users.length);
            users.forEach(u => console.log(` - ${u.email} (${u.role})`));
        } else {
            console.log('❌ "users" collection not found!');
        }

    } catch (err) {
        console.error('❌ Connection failed:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            console.log('TIP: This often means your IP is not whitelisted in MongoDB Atlas.');
        }
    } finally {
        await mongoose.disconnect();
        console.log('--- END DIAGNOSTIC ---');
        process.exit(0);
    }
}

diagnose();
