const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Partner name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"],
  },
  logo: {
    type: String, // Image URL
    required: [true, "Logo is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [10, "Description must be at least 10 characters long"],
  },
  category: {
    type: String,
    default: "TECHNOLOGY / CORE",
    trim: true,
  },
  subtitle: {
    type: String,
    trim: true,
  },
  linkedinUrl: {
    type: String,
    trim: true,
  },
  instagramUrl: {
    type: String,
    trim: true,
  },
  buttonText: {
    type: String,
    trim: true,
    default: "Explore Product",
  },
  buttonUrl: {
    type: String,
    trim: true,
  },
  bgColor: {
    type: String,
    trim: true,
    default: "#00D1FF",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Partner", partnerSchema);
