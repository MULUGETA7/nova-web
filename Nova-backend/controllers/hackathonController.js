const Hackathon = require("../models/hackathon");
const hackathonValidationSchema = require("../validations/hackathonValidation");

// ✅ Create Hackathon Entry (Image Upload Only)
const createHackathon = async (req, res) => {
  try {
    // Ensure `req.files` is not empty
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "At least one image is required" });
    }

    // Validate uploaded images
    const { error } = hackathonValidationSchema.validate({ images: req.files.map(file => file.filename) });
    if (error) return res.status(400).json({ error: error.details[0].message });

    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    // Save images in the database
    const hackathon = new Hackathon({ images: imageUrls });
    await hackathon.save();

    res.status(201).json({ message: "Hackathon images uploaded successfully", hackathon });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all Hackathon Images
const getAllHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find().sort({ createdAt: -1 });
    res.status(200).json(hackathons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Hackathon Image by ID
const getHackathonById = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) return res.status(404).json({ error: "Hackathon image not found" });

    res.status(200).json(hackathon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Hackathon Image
const updateHackathon = async (req, res) => {
  try {
    // Fetch existing hackathon entry
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) return res.status(404).json({ error: "Hackathon image not found" });

    // If no new image is uploaded, retain existing images
    let imageUrls = hackathon.images;
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file => `/uploads/${file.filename}`);
    }

    // Validate updated images
    const { error } = hackathonValidationSchema.validate({ images: imageUrls });
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Update images in the database
    hackathon.images = imageUrls;
    await hackathon.save();

    res.status(200).json({ message: "Hackathon image updated successfully", hackathon });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete Hackathon Image
const deleteHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findByIdAndDelete(req.params.id);
    if (!hackathon) return res.status(404).json({ error: "Hackathon image not found" });

    res.status(200).json({ message: "Hackathon image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Export all functions
module.exports = {
  createHackathon,
  getAllHackathons,
  getHackathonById,
  updateHackathon,
  deleteHackathon,
};
