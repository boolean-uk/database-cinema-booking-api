const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");
const createScreen = async (req, res) => {
  const { number } = req.body;
  if (!number) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }
  const foundScreen = await prisma.screen.findFirst({
    where: { number: number },
  });
  if (foundScreen) {
    return res
      .status(409)
      .json({ error: "A screen with the provided number already exists" });
  }
  try {
    const createdScreen = await prisma.screen.create({
      data: { number: number },
      include: { screenings: false },
    });
    res.status(201).json({ screen: createdScreen });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
module.exports = { createScreen };
