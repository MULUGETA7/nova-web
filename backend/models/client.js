const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Client name is required"],
        trim: true,
    },
    logo: {
        type: String, // Image URL
        required: [true, "Logo is required"],
    },
    type: {
        type: String,
        enum: ["client", "partner"],
        default: "client",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Client", clientSchema);
