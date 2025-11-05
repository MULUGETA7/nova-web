const mongoose = require('mongoose');

// Define the schema for a project
const projectSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    }, // Title of the project
    description: { 
        type: String, 
        required: true 
    }, // Detailed description
    tags: {
        type: [String], // Array of strings for tags
        default: [],    // Default to an empty array
    },
    status: { 
        type: String, 
        default: "Pending" // Status: Pending, Approved, Rejected
    },
    files: {
        type: [String], // File paths or URLs
        default: [],    // Default to an empty array
    },
    createdAt: { 
        type: Date, 
        default: Date.now // Automatically set creation date
    },
    updatedAt: { 
        type: Date // Updated timestamp, set manually
    },
});

// Middleware to set `updatedAt` before updating a project
projectSchema.pre('save', function (next) {
    if (!this.isNew) {
        this.updatedAt = Date.now();
    }
    next();
});

// Create the Project model
const Project = mongoose.model('Project', projectSchema);

// Export the model for use in controllers or routes
module.exports = Project;
