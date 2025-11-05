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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Partner", partnerSchema);
