const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getProfile, updateProfile, changePassword } = require("../controllers/profileController");

// ✅ Get Profile
router.get("/", protect, getProfile);

// ✅ Update Profile (Email)
router.put("/update", protect, updateProfile);

// ✅ Change Password
router.put("/change-password", protect, changePassword);

module.exports = router;
