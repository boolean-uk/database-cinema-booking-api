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

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body
  console.log('\n\n', title, runtimeMins, '\n\n')

  const movie = await prisma.movie.create({
    data: {
      title,
      runtimeMins
    },
    include: {
      screenings: true
    }
  })

  return res.status(201).send({ movie })
}

module.exports = {
  getMovies,
  createMovie
}
