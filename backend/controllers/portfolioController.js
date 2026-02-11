const Portfolio = require("../models/portfolio");
const portfolioValidationSchema = require("../validations/portfolioValidation");



// ✅ Create Portfolio Entry (Admin Only)
const createPortfolio = async (req, res) => {
  try {
    // Ensure at least one image is uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "At least one image is required" });
    }

    // Extract image paths
    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    // Extract metadata
    const { title, category, description, url, column } = req.body;

    // Create a new Portfolio entry
    const portfolio = new Portfolio({
      title,
      category,
      description,
      url,
      column,
      images: imageUrls
    });
    await portfolio.save();

    res.status(201).json({ message: "Portfolio project created successfully", portfolio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Portfolio Images
const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Portfolio by ID
const getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete Portfolio Image (Admin Only)
const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio image not found" });
    }
    res.status(200).json({ message: "Portfolio image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Ensure updatePortfolio is properly defined
const updatePortfolio = async (req, res) => {
  try {
    const { error } = portfolioValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { title, category, description, url, column } = req.body;
    let imageUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const updateData = {
      title,
      category,
      description,
      url,
      column
    };

    if (imageUrls.length > 0) {
      updateData.images = imageUrls;
    }

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedPortfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    res.status(200).json({ message: "Portfolio updated successfully", updatedPortfolio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Ensure updatePortfolio is included in module.exports
module.exports = {
  createPortfolio,
  getAllPortfolios,
  getPortfolioById,
  updatePortfolio, // ✅ Ensure this is included!
  deletePortfolio,
};

