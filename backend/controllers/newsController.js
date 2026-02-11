const News = require("../models/news");
const newsValidationSchema = require("../validations/newsValidation");

// ✅ Create News Article
const createNews = async (req, res) => {
  try {
    console.log('Received news create request:', req.body);
    console.log('File received:', req.file);

    // Validate the request body
    const { error } = newsValidationSchema.validate(req.body);
    if (error) {
      console.error('Validation error:', error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }

    const { title, category, content, date } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Get image path

    // Ensure an image is uploaded
    if (!imageUrl) {
      return res.status(400).json({ error: "Image is required" });
    }

    // Create a new News article
    const news = new News({ title, category, content, date, imageUrl });

    await news.save();
    console.log('News created successfully:', news);
    res.status(201).json({ message: "News created successfully", news });
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All News
const getAllNews = async (req, res) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 });
    res.status(200).json(newsList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Single News by ID
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update News (Fix: Keep existing image if not updated)
const updateNews = async (req, res) => {
  try {
    console.log('Received news update request:', req.body);
    console.log('File received:', req.file);

    const { error } = newsValidationSchema.validate(req.body);
    if (error) {
      console.error('Validation error:', error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }

    const { title, category, content, date } = req.body;
    
    // Get existing news to preserve image if not updated
    const existingNews = await News.findById(req.params.id);
    if (!existingNews) {
      return res.status(404).json({ message: "News not found" });
    }

    let imageUrl = req.file ? `/uploads/${req.file.filename}` : existingNews.imageUrl;

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { title, category, content, date, imageUrl },
      { new: true, runValidators: true }
    );

    console.log('News updated successfully:', updatedNews);
    res.status(200).json({ message: "News updated successfully", updatedNews });
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete News (Fix: Handle invalid ID case)
const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    await News.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Ensure all functions are exported properly
module.exports = {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
};
