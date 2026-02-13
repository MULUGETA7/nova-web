const mongoose = require("mongoose");

const sectionImageSchema = new mongoose.Schema({
    label: { type: String, required: true },
    url: { type: String, required: true }
});

const pageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Page title is required"],
        trim: true,
    },
    slug: {
        type: String,
        required: [true, "Page slug is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    content: {
        type: Map,
        of: String,
        default: {}
    },
    sectionImages: [sectionImageSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

pageSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("Page", pageSchema);
