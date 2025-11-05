const express = require('express');
const OpenAI = require('openai');
require('dotenv').config();
const router = express.Router();

// Check if API key is set
if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠️  OPENAI_API_KEY not set. AI Assistant routes will be disabled.');
}

// Create an OpenAI instance with the API key only if available
let openai = null;
if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
}

// POST route for handling AI queries
router.post('/', async (req, res) => {
    // Check if OpenAI is configured
    if (!openai) {
        return res.status(503).json({ message: 'AI Assistant is not configured. Please set OPENAI_API_KEY in environment variables.' });
    }

    const { query } = req.body; // or change to const { prompt } = req.body;

    // Validate the incoming query
    if (!query) {
        return res.status(400).json({ message: 'Query is required.' });
    }

    try {
        // Create a chat completion
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Use 'gpt-4' if you have access
            messages: [{ role: 'user', content: query }],
        });

        // Send the AI's response back to the client
        res.json({ response: response.choices[0].message.content.trim() });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Error with AI Assistant', error: err.message });
    }
});

module.exports = router;