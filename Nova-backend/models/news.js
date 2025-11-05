const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: [5, "Title must be at least 5 characters long"]
  },
  category: {
    type: String,
    enum: ["Technology", "Company News", "Events", "Partnership"],
    required: [true, "Category is required"]
  },
  date: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    minlength: [10, "Content must be at least 10 characters long"]
  },
  imageUrl: {
    type: String, // This will store the image URL after upload
    required: [true, "Image is required"]
  }
});

module.exports = mongoose.model("News", newsSchema);
