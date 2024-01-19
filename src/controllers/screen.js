const {
  PrismaClientKnownRequestError,
} = require("@prisma/client/runtime/library");
const { createScreenDb } = require("../domains/screen");

const createScreen = async (req, res) => {
  try {
    const number = Number(req.body.number);
    const screen = await createScreenDb(number);
    res.status(201).json({ screen });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      console.log(`Known prisma error: ${err}`);
    }

    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createScreen,
};
