const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    trim: true,
  },
  images: {
    type: [String], // Array of image URLs
    required: [true, "At least one image is required"],
  },
  column: {
    type: String,
    enum: {
      values: ['left', 'middle', 'right'],
      message: '{VALUE} is not a valid column'
    },
    default: 'middle'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
