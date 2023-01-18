const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createScreen = async (req, res) => {
  const { number } = req.body;

  if (!number) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }
  try {
    const screen = await prisma.screen.create({
      data: {
        number,
      },
    });
    res.status(201).json({ screen });
  } catch {}
};

module.exports = { createScreen };
