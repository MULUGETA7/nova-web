const express = require("express");
const hackathonController = require("../controllers/hackathonController");
const upload = require("../middleware/upload"); // Use Multer for image uploads
const { protect, admin } = require("../middleware/auth");
const router = express.Router();

// ✅ Public Routes (Anyone can view hackathon images)
router.get("/", hackathonController.getAllHackathons);
router.get("/:id", hackathonController.getHackathonById);

// ✅ Admin Routes (Only admins can manage hackathon images)
router.post("/", protect, admin, upload.array("images", 5), hackathonController.createHackathon);
router.put("/:id", protect, admin, upload.array("images", 5), hackathonController.updateHackathon);
router.delete("/:id", protect, admin, hackathonController.deleteHackathon);

module.exports = router;
