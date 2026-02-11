const mongoose = require("mongoose");

const hackathonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Event title is required"],
    trim: true,
  },
  eventDate: {
    type: Date,
    required: [true, "Event date is required"],
  },
  type: {
    type: String,
    enum: ["image", "stat"],
    default: "image",
  },
  images: {
    type: [String], // Array of image URLs
    required: function () { return this.type === 'image'; }
  },
  metric: {
    type: String,
    trim: true,
  },
  subtext: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Hackathon", hackathonSchema);
