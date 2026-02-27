const Client = require("../models/client");

// ✅ Add Client Logo
const createClient = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Client logo is required" });
        }

        const { name, type } = req.body;
        const logoUrl = `/uploads/${req.file.filename}`;

        const client = new Client({
            name,
            logo: logoUrl,
            type: type || 'client'
        });

        await client.save();
        res.status(201).json({ message: "Client added successfully", client });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get All Clients
const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find().sort({ createdAt: -1 });
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Delete Client
const deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }
        res.status(200).json({ message: "Client deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createClient,
    getAllClients,
    deleteClient,
};
