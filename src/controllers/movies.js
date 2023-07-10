const { Prisma } = require('@prisma/client')
const prisma = require('../utils/prisma')

const getMovies = async (req, res) => {
  const greater = Number(req.query.runtimeGt)
  const less = Number(req.query.runtimeLt)

  if (greater && less) {
    const movies = await prisma.movie.findMany({
      where: {
        OR: [{ runtimeMins: { gt: greater } }, { runtimeMins: { lt: less } }]
      },
      include: { screenings: true }
    })
    return res.status(200).send({ movies: movies })
  }

  if (greater) {
    const movies = await prisma.movie.findMany({
      where: {
        OR: [{ runtimeMins: { gt: greater } }]
      }
    })
    return res.status(200).send({ movies: movies })
  }

  if (less) {
    const movies = await prisma.movie.findMany({
      where: {
        OR: [{ runtimeMins: { lt: less } }]
      },
      include: { screenings: true }
    })

    return res.status(200).send({ movies: movies })
  }

  const movies = await prisma.movie.findMany({ include: { screenings: true } })
  res.status(200).send({ movies: movies })
}

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body
  const findMovie = await prisma.movie.findFirst({
    where: {
      title: title
    }
  })
  if (!title && !runtimeMins) {
    return res.status(400).json({ error: 'Missing fields in request body' })
  }

  if (findMovie) {
    return res
      .status(409)
      .json({ error: 'A Movie with the provided title already exist' })
  }
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
  const findMovie = await prisma.movie.findUnique({
    where: { id: id }
  })
  if (!findMovie) {
    return res
      .status(404)
      .json({ error: 'Customer with that id does not exist' })
  }
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
  const findMovieByTitle = await prisma.movie.findFirst({
    where: { title: title }
  })
  const findMovieById = await prisma.movie.findUnique({
    where: { id: id }
  })
  if (!title && !runtimeMins) {
    return res.status(400).json({ error: 'Missing fields in request body' })
  }
  if (findMovieByTitle && findMovieByTitle.id !== id) {
    return res
      .status(409)
      .json({ error: 'Movie with that title already exist' })
  }
  if (!findMovieById) {
    return res.status(404).json({ error: 'Movie with that id does not exist' })
  }
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
