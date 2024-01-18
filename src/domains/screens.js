const { screen } = require('../utils/prisma')

const getAllScreensDb = async () => {
  const allScreens = await screen.findMany()

  return allScreens
}

const createScreenDb = async (number, screenings) => {
  const createdScreen = await screen.create({
    data: {
      number: number,
      ...(screenings && {
        screenings: {
          createMany: {
            data: screenings
          }
        }
      })
    }
  })

  return createdScreen
}

module.exports = {
  getAllScreensDb,
  createScreenDb
}
