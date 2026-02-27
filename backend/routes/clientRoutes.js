const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { protect, admin } = require("../middleware/auth");
const { createClient, getAllClients, deleteClient } = require("../controllers/clientController");

// Configure Multer for Logo Uploads with Validation
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `client-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|svg|webp/;
        const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mime = allowedTypes.test(file.mimetype);
        if (ext && mime) {
            return cb(null, true);
        }
        cb(new Error("Only images (jpeg, png, svg, webp) are allowed"));
    }
});

// Routes
router.post("/", protect, admin, upload.single("logo"), createClient);
router.get("/", getAllClients);
router.delete("/:id", protect, admin, deleteClient);

module.exports = router;
