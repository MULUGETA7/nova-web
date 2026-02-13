const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
    },
    subject: {
        type: String,
        required: [true, "Subject is required"],
        trim: true,
    },
    content: {
        type: String,
        required: [true, "Message content is required"],
        trim: true,
    },
    source: {
        type: String,
        enum: ["dev_terminal", "chat_widget", "unknown"],
        default: "unknown",
    },
    status: {
        type: String,
        enum: ["unread", "read", "replied"],
        default: "unread",
    },
    reply: {
        type: String,
        default: null,
    },
    repliedAt: {
        type: Date,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Message", messageSchema);
