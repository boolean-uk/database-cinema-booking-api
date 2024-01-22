const { PrismaClientKnownRequestError } = require("@prisma/client");
const { addScreenToDatabase } = require("../domains/screen.js");

const addScreen = async (req, res) => {
  try {
    const { number } = req.body;
    const newScreen = await addScreenToDatabase(number);
    res.status(201).json({ screen: newScreen });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addScreen };
