const Announcement = require("../models/announcement");

// @desc    Get current announcement
// @route   GET /api/announcements
// @access  Public
exports.getAnnouncement = async (req, res) => {
    try {
        let announcement = await Announcement.findOne().sort({ updatedAt: -1 });
        if (!announcement) {
            // Create a default one if none exists
            announcement = await Announcement.create({
                text: "NEW Casting.io System Live on",
                link: "#",
                isActive: true
            });
        }
        res.status(200).json(announcement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update announcement
// @route   PUT /api/announcements
// @access  Private/Admin
exports.updateAnnouncement = async (req, res) => {
    try {
        const { text, link, isActive } = req.body;

        // Use findOneAndUpdate to either update the existing one or create a new one
        // This ensures we don't end up with multiple documents if called rapidly
        let announcement = await Announcement.findOneAndUpdate(
            {},
            {
                text: text,
                link: link,
                isActive: isActive,
                updatedAt: Date.now()
            },
            { upsert: true, new: true, runValidators: true }
        );

        res.status(200).json(announcement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
