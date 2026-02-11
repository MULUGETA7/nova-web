const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Announcement text is required"],
        trim: true,
    },
    link: {
        type: String,
        trim: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Announcement", announcementSchema);
