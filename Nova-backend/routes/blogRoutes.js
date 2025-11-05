const express = require("express");
const blogController = require("../controllers/blogController");
const { protect, admin } = require("../middleware/auth"); // ✅ Import auth middleware
const router = express.Router();

// Public Routes
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);

// Admin Routes (Only admins can manage blogs)
router.post("/", protect, admin, blogController.createBlog);
router.put("/:id", protect, admin, blogController.updateBlog);
router.delete("/:id", protect, admin, blogController.deleteBlog);

module.exports = router;
