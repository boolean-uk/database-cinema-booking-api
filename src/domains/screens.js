const { screen } = require('../utils/prisma')

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

const getAllScreensDb = async () => {
  const allScreens = await screen.findMany()

  return allScreens
}

module.exports = {
  createScreenDb,
  getAllScreensDb
}
