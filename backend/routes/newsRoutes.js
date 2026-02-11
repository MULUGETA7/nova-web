const express = require("express");
const newsController = require("../controllers/newsController");
const upload = require("../middleware/upload"); // Use Multer for image uploads
const { protect, admin } = require("../middleware/auth");
const router = express.Router();

// Public Routes (Users can view news)
router.get("/", newsController.getAllNews);
router.get("/:id", newsController.getNewsById);

// Admin Routes (Only admins can manage news)
router.post("/", protect, admin, upload.single("image"), newsController.createNews);
router.put("/:id", protect, admin, upload.single("image"), newsController.updateNews);
router.delete("/:id", protect, admin, newsController.deleteNews);

module.exports = router;
