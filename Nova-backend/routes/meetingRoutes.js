const express = require('express');
const { google } = require('googleapis');
const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

router.post('/schedule', async (req, res) => {
    const { summary, description, startTime, endTime } = req.body;
    try {
        const calendar = await google.calendar({ version: 'v3', auth: oauth2Client });
        const event = {
            summary,
            description,
            start: { dateTime: startTime },
            end: { dateTime: endTime },
        };
        const response = await calendar.events.insert({ calendarId: 'primary', resource: event });
        res.json({ message: 'Meeting scheduled!', eventId: response.data.id });
    } catch (err) {
        res.status(500).json({ message: 'Error scheduling meeting', error: err.message });
    }
});

module.exports = router;