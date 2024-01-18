const prisma = require("../utils/prisma")
const getAllScreensDb = async () => await prisma.screen.findMany()
const createScreenDb = async (request_body) => {
  const { number, screenings } = request_body

  const dataToCreate = {}

  if (number) {
    dataToCreate.number = number
  }

  if (screenings) {
    dataToCreate.screenings = {
      create: {
        movieId: screenings.movieId,
        screenId: screenings.screenId,
        startsAt: screenings.startsAt,
      },
    }
  }

  const createdScreen = await prisma.screen.create({
    data: dataToCreate,
    include: {
      screenings: true,
    },
  })

  return createdScreen
}

module.exports = {
  getAllScreensDb,
  createScreenDb,
}