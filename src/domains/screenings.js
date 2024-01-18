const { screening } = require('../utils/prisma')

const getScreeningByIdDb = async (screeningId) => {
  const foundScreening = await screening.findFirst({
    where: {
      id: Number(screeningId)
    }
  })

  return foundScreening
}

module.exports = {
  getScreeningByIdDb
}
