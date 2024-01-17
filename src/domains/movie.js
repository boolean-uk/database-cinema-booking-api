const prisma = require('../utils/prisma')

const getAllMoviesDb = async () => await prisma.movie.findMany({
  include: {
    screenings: true
  }
})

const getMovieByIdDb = async (req, res) => {
  const id = Number(req.params.id)
  const movie = await prisma.movie.findUnique({
    where: {
      id: id
    },
    include: {
      screenings: true
    }
  })
  return movie
}

const createMovieDb = async (req, res) => {
  const { title, runtimeMins } =  req.body
  const movie = await prisma.movie.create({
    data: {
      title,
      runtimeMins,
      screenings: {}
    },
    include: {
      screenings: true
    }
  })
  return movie
}

const updateMovieDb = async (req, res) => {
  const id = Number(req.params.id)
  const { title, runtimeMins } = req.body
  const movie = await prisma.movie.update({
    where: {
      id: id
    },
    data: {
      title,
      runtimeMins
    },
    include: {
      screenings: true
    }
  })
  return movie
}

module.exports = { 
  getAllMoviesDb,
  createMovieDb,
  getMovieByIdDb,
  updateMovieDb
}