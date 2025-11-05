const mongoose = require("mongoose");

const hackathonSchema = new mongoose.Schema({
  images: {
    type: [String], // Array of image URLs
    required: [true, "At least one image is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Hackathon", hackathonSchema);
