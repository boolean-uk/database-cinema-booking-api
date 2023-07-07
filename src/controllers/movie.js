const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const getMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({
    include: {
      screenings: true
    }
  })

  return res.send({ movies })
}

module.exports = {
  getMovies
}
