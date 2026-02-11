const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { createClient, getAllClients, deleteClient } = require("../controllers/clientController");

// Configure Multer for Logo Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `client-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("logo"), createClient);
router.get("/", getAllClients);
router.delete("/:id", deleteClient);

module.exports = router;
