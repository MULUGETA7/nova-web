const Message = require("../models/message");

// @desc    Create a new message/inquiry
// @route   POST /api/messages
// @access  Public
exports.createMessage = async (req, res) => {
    try {
        const { name, email, subject, content, source } = req.body;
        console.log('Incoming message request:', { name, email, subject, content, source });

        if (!name || !email || !subject || !content) {
            console.log('Validation failed: missing fields');
            return res.status(400).json({ message: "All fields are required" });
        }

        const newMessage = new Message({
            name,
            email,
            subject,
            content,
            source: source || "unknown",
        });

        await newMessage.save();
        console.log('Message created successfully:', newMessage._id);

        res.status(201).json({
            message: "Intelligence transmission successful. We will respond shortly.",
            data: newMessage
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get all messages (for admin)
// @route   GET /api/messages
// @access  Private/Admin
exports.getAllMessages = async (req, res) => {
    try {
        const { source } = req.query;
        const filter = source ? { source } : {};
        const messages = await Message.find(filter).sort({ createdAt: -1 });
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
        if (!status || !["read", "unread", "replied"].includes(status)) {
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

// @desc    Reply to a message
// @route   PUT /api/messages/:id/reply
// @access  Private/Admin
exports.replyToMessage = async (req, res) => {
    try {
        const { reply } = req.body;
        if (!reply || !reply.trim()) {
            return res.status(400).json({ message: "Reply content is required" });
        }

        const message = await Message.findByIdAndUpdate(
            req.params.id,
            {
                reply: reply.trim(),
                repliedAt: new Date(),
                status: "replied"
            },
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

// @desc    Get replies for a specific email (public - for frontend chat)
// @route   GET /api/messages/replies/:email
// @access  Public
exports.getRepliesByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const messages = await Message.find({
            email: email.toLowerCase(),
            reply: { $ne: null }
        }).sort({ repliedAt: -1 }).select('subject content reply repliedAt source');

        res.status(200).json(messages);
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
