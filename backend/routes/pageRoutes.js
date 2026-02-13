const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { createOrUpdatePage, getAllPages, getPageBySlug, deletePage } = require("../controllers/pageController");

// Configure Multer for Page Section Images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `page-section-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

// Routes
router.post("/", createOrUpdatePage);
router.get("/", getAllPages);
router.get("/:slug", getPageBySlug);
router.delete("/:id", deletePage);

// Route for uploading section images separately if needed
router.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Image is required" });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ url: imageUrl });
});

module.exports = router;
