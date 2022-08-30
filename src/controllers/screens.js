const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getAllScreens = async (req, res) => {
  const screens = await prisma.screen.findMany({
    include: {
      screenings: true,
    },
  });

  res.status(200).json({
    screens
  });

  console.log("");
};

const createNewScreen = async (req, res) => {
  console.log('screening');
  const { number } = req.body

  if(!number) {
    return res.status(400).json({
      error: "Missing screen information"
    })
  }

  try {
    const createdScreen = await prisma.screen.create({
      data: {
        number,
      }
    });
    res.status(201).json({ screen: createdScreen})
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ error: "This Screen Already Exists" });
      }
    }
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
    getAllScreens,
    createNewScreen
}