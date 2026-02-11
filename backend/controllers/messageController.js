const Message = require("../models/message");

// @desc    Create a new message/inquiry
// @route   POST /api/messages
// @access  Public
exports.createMessage = async (req, res) => {
    try {
        const { name, email, subject, content } = req.body;

        if (!name || !email || !subject || !content) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newMessage = new Message({
            name,
            email,
            subject,
            content,
        });

        await newMessage.save();

        res.status(201).json({ message: "Intelligence transmission successful. We will respond shortly." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get all messages (for admin)
// @route   GET /api/messages
// @access  Private/Admin
exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Update message status (read/unread)
// @route   PUT /api/messages/:id
// @access  Private/Admin
exports.updateMessageStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!status || !["read", "unread"].includes(status)) {
            return res.status(400).json({ message: "Valid status is required" });
        }

        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({ message: "Inquiry not found" });
        }

        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
exports.deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) {
            return res.status(404).json({ message: "Inquiry not found" });
        }
        res.status(200).json({ message: "Inquiry de-indexed successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
