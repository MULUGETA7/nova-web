const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user');

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/novalabs');
        console.log('Connected to MongoDB');

        const users = await User.find({}, 'email role name');
        console.log('Users in system:');
        users.forEach(u => {
            console.log(`- ${u.name} | ${u.email} | Role: ${u.role}`);
        });

        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
};

checkUsers();
