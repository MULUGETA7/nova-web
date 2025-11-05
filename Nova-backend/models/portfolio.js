const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  images: {
    type: [String], // Array of image URLs
    required: [true, "At least one image is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
