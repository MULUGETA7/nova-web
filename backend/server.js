const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const bcrypt = require('bcrypt'); // Replace bcryptjs with bcrypt

const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const assistantRoutes = require("./routes/assistantRoutes");
const meetingRoutes = require("./routes/meetingRoutes");
const blogRoutes = require("./routes/blogRoutes");
const newsRoutes = require("./routes/newsRoutes");
const hackathonRoutes = require("./routes/hackathonRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const partnerRoutes = require("./routes/partnerRoutes");
const clientRoutes = require("./routes/clientRoutes");
const profileRoutes = require("./routes/profileRoutes");
const messageRoutes = require("./routes/messageRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const pageRoutes = require("./routes/pageRoutes");
const { seedAdmin } = require("./seeder/adminSeeder")
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB().then(() => {
    // Seed admin after MongoDB connection is established
    seedAdmin().catch(err => {
        console.error("❌ Failed to seed admin:", err.message);
    });
}).catch(err => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
});
// ✅ CORS Configuration (Fixes Frontend Access Issues)
const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    process.env.ADMIN_URL || 'http://localhost:3001',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://196.190.251.203',
    'http://196.190.251.203:3000',
    'http://196.190.251.203:3001'
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(null, true); // Allow all origins for now - restrict in production
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // Allow credentials (for cookies or authentication)
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // ✅ Allow preflight requests for all routes

// ✅ Middleware
app.use(bodyParser.json());

// ✅ Serve static files for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/assistant", assistantRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/hackathon", hackathonRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/partner", partnerRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/pages", pageRoutes);

// ✅ Default Route
app.get("/", (req, res) => {
    res.send("NovaLabs Backend Running!");
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ✅ Ensure the Server Listens on All Network Interfaces
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server is running on http://localhost:${PORT} and accessible on the network.`);
});
