const express = require("express");
const portfolioController = require("../controllers/portfolioController");
const upload = require("../middleware/upload"); // Use Multer for image uploads
const { protect, admin } = require("../middleware/auth");
const router = express.Router();

// Public Routes
router.get("/", portfolioController.getAllPortfolios);
router.get("/:id", portfolioController.getPortfolioById);

// Admin Routes (Only admins can manage portfolios)
router.post("/", protect, admin, upload.array("images", 5), portfolioController.createPortfolio);
router.put("/:id", protect, admin, upload.array("images", 5), portfolioController.updatePortfolio);
router.delete("/:id", protect, admin, portfolioController.deletePortfolio);

module.exports = router;
