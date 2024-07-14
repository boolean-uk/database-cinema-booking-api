const prisma = require('../utils/prisma')

const createScreen = async (number) => {
    const createdScreen = await prisma.screen.create({
      data: {
        number,
      },
      include: {
        screenings: true
      }
    })
    return createdScreen
  }

  module.exports = { createScreen }