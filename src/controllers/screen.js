const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createScreen = async (req, res) => {
  const { number } = req.body;
  if (!number) {
    return res.status(400).json({ error: "missing entry" });
  }
  const createdScreen = await prisma.screen.create({
    data: { number },
  });
  res.status.json({ screen: createdScreen });
};

module.exports = { createScreen };
