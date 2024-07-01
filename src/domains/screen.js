const prisma = require("../utils/prisma")

const createSceenDb = async (number) =>
  await prisma.screen.create({
    data: {
      number: number
    }
  })

module.exports = createSceenDb
