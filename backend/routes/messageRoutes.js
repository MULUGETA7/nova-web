const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/auth");
const {
    createMessage,
    getAllMessages,
    updateMessageStatus,
    deleteMessage,
} = require("../controllers/messageController");

// ✅ Public route to send a message
router.post("/", createMessage);

// ✅ Admin routes to manage messages
router.get("/", protect, admin, getAllMessages);
router.put("/:id", protect, admin, updateMessageStatus);
router.delete("/:id", protect, admin, deleteMessage);

module.exports = router;
