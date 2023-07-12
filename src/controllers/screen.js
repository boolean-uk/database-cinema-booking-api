const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');

const createScreen = async (req, res) => {
  const { number } = req.body;

  if (!number) {
    return res.status(400).json();
  }

  try {
    const createdScreen = await prisma.screen.create({
      data: {
        number,
      },
    });

    res.status(201).json({ screen: createdScreen });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  createScreen,
};
