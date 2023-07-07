const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createScreen = async (number, screenings) => {

  const request = {
    data: {
      number,
    },
    include: {
      screenings: true
    }
  }

  if (screenings) {
    request.data.screenings = {
      create: screenings
    }
  }

  const screen = await prisma.screen.create(request)
  return screen
}

module.exports = {
  createScreen
}