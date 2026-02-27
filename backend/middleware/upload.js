const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Ensure "uploads/" directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure storage for saving images locally
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Save images inside "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
  const mimetype = file.mimetype;
  const extname = path.extname(file.originalname).toLowerCase();

  const isValidType = allowedTypes.test(mimetype) || allowedTypes.test(extname);

  if (isValidType) {
    cb(null, true);
  } else {
    cb(new Error("Only images (jpeg, jpg, png, gif, webp, svg) are allowed"));
  }
};

// Create the multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

module.exports = upload;
