const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getAll = async (req, res) => {
  const getAll = await prisma.screen.findMany();
  res.json({ screens: getAll });
};

const createScreen = async (req, res) => {
  let { number } = req.body;

  if (!number) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  } else if (number) {
    number = Number(number);
    const findNumber = await prisma.screen.findFirst({
      where: { number: number },
    });
    if (findNumber) {
      return res.status(409).json({
        error: "A screen with the provided number already exists",
      });
    } else {
      const createScreen = await prisma.screen.create({
        data: {
          number,
        },
        include: {
          screenings: true,
        },
      });

      res.status(201).json({ screen: createScreen });
    }
  }
};

module.exports = {
  createScreen,
  getAll,
};
