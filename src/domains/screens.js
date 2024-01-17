const { screen } = require('../utils/prisma')

const createScreenDb = async (number) => {
  const createdScreen = screen.create({
    data: {
      number: number
    }
  })

  return createdScreen
}

module.exports = {
  createScreenDb
}
