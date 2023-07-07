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

const getMovieById = async (req, res) => {
  const id = Number(req.params.id)
  const movie = await prisma.movie.findUnique({
    where: {
      id
    },
    include: {
      screenings: true
    }
  })

  return res.send({ movie })
}

const updateMovieById = async (req, res) => {
  const id = Number(req.params.id)
  const { title, runtimeMins } = req.body
  const movie = await prisma.movie.update({
    where: {
      id
    },
    include: {
      screenings: true
    },
    data: {
      title,
      runtimeMins
    }
  })

  return res.status(201).send({movie})
}

module.exports = {
  getMovies,
  createMovie,
  getMovieById,
  updateMovieById
}
