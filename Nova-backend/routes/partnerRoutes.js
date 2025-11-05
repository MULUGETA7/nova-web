const express = require("express");
const partnerController = require("../controllers/partnerController");
const upload = require("../middleware/upload"); // Use Multer for image uploads
const { protect, admin } = require("../middleware/auth");
const router = express.Router();

// Public Routes
router.get("/", partnerController.getAllPartners);
router.get("/:id", partnerController.getPartnerById);

// Admin Routes (Only admins can manage partners)
router.post("/", protect, admin, upload.single("logo"), partnerController.createPartner);
router.put("/:id", protect, admin, upload.single("logo"), partnerController.updatePartner);
router.delete("/:id", protect, admin, partnerController.deletePartner);

module.exports = router;
