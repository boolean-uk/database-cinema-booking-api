const prisma = require('../utils/prisma')

const createScreenDb = async (number) => {
  try {
    const screen = await prisma.screen.create({
      data : {
        number
      }
    })
    return screen
  } catch (error) {
    throw new Error ({error : 'Something went wrong at db'})
  }
}

module.exports = {createScreenDb}