const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/user"); // Import User model

// Load environment variables
dotenv.config();

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// ✅ Admin User Data
exports.seedAdmin = async () => {
  try {
    // Wait for MongoDB connection
    const mongoose = require("mongoose");
    if (mongoose.connection.readyState !== 1) {
      console.log("⏳ Waiting for MongoDB connection...");
      await new Promise((resolve) => {
        if (mongoose.connection.readyState === 1) {
          resolve();
        } else {
          mongoose.connection.once("connected", resolve);
          // Timeout after 10 seconds
          setTimeout(() => {
            console.log("⚠️  MongoDB connection timeout, skipping admin seed");
            resolve();
          }, 10000);
        }
      });
    }

    // Use defaults if env vars not set or empty
    let adminEmail = process.env.ADMIN_EMAIL || "muleab7@gmail.com";
    let adminPassword = process.env.ADMIN_PASSWORD || "Admin1234!";

    // Trim whitespace and check if empty
    adminEmail = adminEmail.trim();
    adminPassword = adminPassword.trim();

    // Validate password is not empty
    if (!adminPassword || adminPassword.length === 0) {
      console.log("⚠️  ADMIN_PASSWORD is empty, using default password");
      adminPassword = "Admin1234!";
    }

    // Validate email is not empty
    if (!adminEmail || adminEmail.length === 0) {
      console.log("⚠️  ADMIN_EMAIL is empty, using default email");
      adminEmail = "muleab7@gmail.com";
    }

    // Delete existing admin if exists
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      await User.deleteOne({ email: adminEmail });
      console.log("🔄 Old admin deleted, creating new one...");
    }

    // Hash the password before saving
    if (!adminPassword || typeof adminPassword !== 'string' || adminPassword.length === 0) {
      console.log("⚠️  ADMIN_PASSWORD is invalid, skipping admin creation");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create the admin user
    const admin = new User({
      name: "Nova Labs Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin user created successfully!");
    console.log("📧 Email:", adminEmail);
    console.log("🔑 Password:", adminPassword);
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
    // Don't throw - allow server to continue even if seeding fails
    // throw error; // Propagate error to caller
  }
};

// Run the function
// seedAdmin();
