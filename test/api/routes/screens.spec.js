const express = require('express');
const router = express.Router();
const { createScreen } = require('../../helpers/createScreen');

router.post('/', async (req, res) => {
    try {
        const { number } = req.body;
        const screen = await createScreen(number);
        res.status(201).json({ screen });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;