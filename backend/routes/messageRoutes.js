const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/auth");
const {
    createMessage,
    getAllMessages,
    updateMessageStatus,
    replyToMessage,
    getRepliesByEmail,
    deleteMessage,
} = require("../controllers/messageController");

// ✅ Public route to send a message
router.post("/", createMessage);

// ✅ Public route to check replies by email
router.get("/replies/:email", getRepliesByEmail);

// ✅ Admin routes to manage messages
router.get("/", protect, admin, getAllMessages);
router.put("/:id", protect, admin, updateMessageStatus);
router.put("/:id/reply", protect, admin, replyToMessage);
router.delete("/:id", protect, admin, deleteMessage);

module.exports = router;
