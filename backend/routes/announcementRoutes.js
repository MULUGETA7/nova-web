const express = require("express");
const announcementController = require("../controllers/announcementController");
const { protect, admin } = require("../middleware/auth");
const router = express.Router();

// Public Route
router.get("/", announcementController.getAnnouncement);

// Admin Routes
router.put("/", protect, admin, announcementController.updateAnnouncement);

module.exports = router;
