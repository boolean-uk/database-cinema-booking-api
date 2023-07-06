const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");
const movieDomain = require('../domains/movie')

const getAllMovies = async (req, res) => {
  const minRuntime = (req.query.runtimeGt ? req.query.runtimeGt : null )
  const maxRuntime = (req.query.runtimeLt ? req.query.runtimeLt : undefined )
  
  const movies = await movieDomain.getAllMovies(minRuntime, maxRuntime)
  res.status(200).json({ movies })
}

const getMovieByID = async (req, res) => {
  const { id } = req.params

  let movie

  try {
    if (isNaN(Number(id))) {
      movie = await movieDomain.getMovieByTitle(id)
    } else {
      movie = await movieDomain.getMovieByID(id)
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return res.status(404).json({
          error: "Movie with that id or title does not exist"
        })
      }
    }
    res.status(500).json({ error: e.message })
  }
  
  res.status(200).json({ movie })
  }

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body
  const movie = await movieDomain.createMovie(title, runtimeMins)
  res.status(201).json({ movie })
}

const updateMovie = async(req, res) => {
  const { title, runtimeMins } = req.body
  const { id } = req.params

  const movie = await movieDomain.updateMovie(title, runtimeMins, id)
  res.status(201).json({ movie })
}

module.exports = {
  getAllMovies,
  getMovieByID,
  createMovie,
  updateMovie
}