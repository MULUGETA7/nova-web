const Hackathon = require("../models/hackathon");
const hackathonValidationSchema = require("../validations/hackathonValidation");

// ✅ Create Hackathon Entry (Image Upload Only)
const createHackathon = async (req, res) => {
  try {
    // Extract data
    const { title, eventDate, type, metric, subtext } = req.body;

    // Ensure images are present ONLY if type is 'image'
    if (type === 'image' && (!req.files || req.files.length === 0)) {
      return res.status(400).json({ error: "At least one image is required for visual assets" });
    }

    // Validate data
    const { error } = hackathonValidationSchema.validate({
      title,
      eventDate,
      type,
      metric,
      subtext,
      images: req.files ? req.files.map(file => file.filename) : []
    });
    if (error) return res.status(400).json({ error: error.details[0].message });

    const imageUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    // Save hackathon entry
    const hackathon = new Hackathon({
      title,
      eventDate,
      type,
      metric,
      subtext,
      images: imageUrls
    });
    await hackathon.save();

    res.status(201).json({ message: "Hackathon gallery entry created successfully", hackathon });
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

    const { title, eventDate, type, metric, subtext } = req.body;

    // Handle image updates
    let imageUrls = hackathon.images;
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file => `/uploads/${file.filename}`);
    }

    // Validate updated entry
    const { error } = hackathonValidationSchema.validate({
      title: title || hackathon.title,
      eventDate: eventDate || hackathon.eventDate,
      type: type || hackathon.type,
      metric: metric !== undefined ? metric : hackathon.metric,
      subtext: subtext !== undefined ? subtext : hackathon.subtext,
      images: imageUrls
    });
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Update in the database
    hackathon.title = title || hackathon.title;
    hackathon.eventDate = eventDate || hackathon.eventDate;
    hackathon.type = type || hackathon.type;
    hackathon.metric = metric !== undefined ? metric : hackathon.metric;
    hackathon.subtext = subtext !== undefined ? subtext : hackathon.subtext;
    hackathon.images = imageUrls;
    await hackathon.save();

    res.status(200).json({ message: "Hackathon entry updated successfully", hackathon });
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
