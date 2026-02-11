const mongoose = require('mongoose');

// Define the Blog schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Title is mandatory
    },
    content: {
        type: String,
        required: true, // Content is mandatory
    },
    author: {
        type: String,
        required: true, // Author is mandatory
    },
    tags: {
        type: [String], // Array of strings for tags
        default: [], // Default to an empty array
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the date when a blog is created
    },
    updatedAt: {
        type: Date, // Updated timestamp, set manually when updating
    },
});

// Middleware to set the `updatedAt` field before saving updates
blogSchema.pre('save', function (next) {
    if (!this.isNew) {
        this.updatedAt = Date.now();
    }
    next();
});

// Create the Blog model
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
