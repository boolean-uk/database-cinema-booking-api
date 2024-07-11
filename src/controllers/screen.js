// src/controllers/screen.js
const { createScreenDb } = require('../domains/screen');

const createScreen = async (req, res) => {
    const { number } = req.body;

    if (!number) {
        return res.status(400).json({ error: "Number field is required" });
    }

    try {
        const createdScreen = await createScreenDb(number);
        res.status(201).json({ screen: createdScreen });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

module.exports = {
    createScreen,
};
