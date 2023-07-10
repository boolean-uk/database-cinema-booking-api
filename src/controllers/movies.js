const { Prisma } = require('@prisma/client')
const prisma = require('../utils/prisma')

const getMovies = async (req, res) => {
  const movies = await prisma.movie.findMany()
  res.status(200).send({ movies: movies })
}
const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body
  const movie = await prisma.movie.create({
    data: {
      title,
      runtimeMins
    },
    include: { screenings: true }
  })
  res.status(201).json({ movie: movie })
}
const getMovieById = async (req, res) => {
  const id = Number(req.params.id)
  const movie = await prisma.movie.findUnique({
    where: { id: id },
    include: {
      screenings: true
    }
  })
  res.status(200).json({ movie: movie })
}
const updateMovie = async (req, res) => {
  const id = Number(req.params.id)
  const { title, runtimeMins } = req.body
  const movie = await prisma.movie.update({
    where: { id: id },
    data: {
      title,
      runtimeMins
    },
    include: { screenings: true }
  })
  res.status(201).json({ movie: movie })
}
module.exports = {
  getMovies,
  createMovie,
  getMovieById,
  updateMovie
}
