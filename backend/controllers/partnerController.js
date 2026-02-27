const Partner = require("../models/partner");
const partnerValidationSchema = require("../validations/partnerValidation");

// ✅ Create Partner Entry
const createPartner = async (req, res) => {
  try {
    const { error } = partnerValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, description, category, subtitle, linkedinUrl, instagramUrl, buttonText, buttonUrl, bgColor } = req.body;
    let logoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!logoUrl) return res.status(400).json({ error: "Logo image is required" });

    const partner = new Partner({
      name,
      logo: logoUrl,
      description,
      category,
      subtitle,
      linkedinUrl,
      instagramUrl,
      buttonText,
      buttonUrl,
      bgColor
    });

    await partner.save();
    res.status(201).json({ message: "Partner added successfully", partner });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all Partners
const getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Partner by ID
const getPartnerById = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).json({ error: "Partner not found" });

    res.status(200).json(partner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Partner
const updatePartner = async (req, res) => {
  try {
    const { error } = partnerValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, description, category, subtitle, linkedinUrl, instagramUrl, buttonText, buttonUrl, bgColor } = req.body;
    let logoUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedPartner = await Partner.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        category,
        subtitle,
        linkedinUrl,
        instagramUrl,
        buttonText,
        buttonUrl,
        bgColor,
        logo: logoUrl || undefined
      },
      { new: true, runValidators: true }
    );

    if (!updatedPartner) return res.status(404).json({ error: "Partner not found" });

    res.status(200).json({ message: "Partner updated successfully", updatedPartner });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete Partner
const deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) return res.status(404).json({ error: "Partner not found" });

    res.status(200).json({ message: "Partner deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPartner,
  getAllPartners,
  getPartnerById,
  updatePartner,
  deletePartner,
};
