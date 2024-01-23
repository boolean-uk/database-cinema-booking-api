const prisma = require('../utils/prisma')

const createScreenDb = async (number) => {
  const screen = await prisma.screen.create({
    data: {
      number
    }
  })
  return screen
}

module.exports = { createScreenDb }