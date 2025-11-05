const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect, admin } = require("../middleware/auth");

// Auth Routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/me', protect, authController.getProfile);
router.put('/update-profile', protect, authController.updateProfile);
router.delete('/delete', protect, authController.deleteAccount);

module.exports = router;