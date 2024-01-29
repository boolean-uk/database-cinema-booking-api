const { PrismaClientKnownRequestError } = require("@prisma/client/runtime/library");
const { createScreenDb } = require("../domains/screen");

const createScreen = async (req, res) => {
  const { number } = req.body;

  try {
    const screen = await createScreenDb(number);
    res.status(201).json({ screen });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(409).json({ error: "A screen with the provided number already exists" });
      }
    }

    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createScreen,
};
