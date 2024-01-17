const { createScreenDb } = require('../domains/screens');

/**
 * Handles the HTTP POST request to create a new screen.
 * @param {Request} req - The Express request object
 * @param {Response} res - The Express response object
 */
const createScreen = async (req, res) => {
    try {
        const { number } = req.body;
        const newScreen = await createScreenDb(number);

        res.status(201).json({ screen: newScreen });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal server error" });
    }
};

module.exports = {
    createScreen,
};
