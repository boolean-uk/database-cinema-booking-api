const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const getMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({
    include: {
      screenings: true
    }
  })

  console.log(movies)

  res.json({ movies })
}

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body

  const createdMovie = await prisma.movie.create({
    data: {
      title,
      runtimeMins
    },
    include: {
      screenings: true
    }
  })

  res.status(201).json({ movie: createdMovie })
}

const getByID = async (req, res) => {
  const id = Number(req.params.id)

  const movie = await prisma.movie.findUnique({
    where: { 
      id: id
    },
    include: {
      screenings: true
    }
  })
  res.json({ movie })
}

const updateMovie = async (req, res) => {
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
      screenings:true
    }
  })
  res.status(201).json({
    movie
  })
}

module.exports = {
  getMovies,
  createMovie,
  getByID,
  updateMovie
}