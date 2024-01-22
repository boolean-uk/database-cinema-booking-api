const { PrismaClientKnownRequestError } = require("@prisma/client");
const { addScreenToDatabase } = require("../domains/screen.js");

const addScreen = async (req, res) => {
    const { number } = req.body;
    const newScreen = await addScreenToDatabase(number);
    res.status(201).json({ screen: newScreen });
};

module.exports = { addScreen };
