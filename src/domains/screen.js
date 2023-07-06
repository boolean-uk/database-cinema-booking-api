const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createScreen = async (number) => {
  const screen = await prisma.screen.create({
    data: {
      number
    },
    include: {
      screenings: true
    }
  })
  return screen
}

module.exports = {
  createScreen
}