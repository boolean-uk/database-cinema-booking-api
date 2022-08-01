const prisma = require("../utils/prisma");

const createScreen = async (req, res) => {
  const { number } = req.body;

  const screen = await prisma.screen.create({
    data: { number: Number(number) },
  });

  return res.status(201).json({ screen });
};

module.exports = { createScreen };
