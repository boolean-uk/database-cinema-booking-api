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

  try {
    let movie
    if (isNaN(Number(id))) {
      movie = await movieDomain.getMovieByTitle(id)
    } else {
      movie = await movieDomain.getMovieByID(id)
    }
    res.status(200).json({ movie })
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
}

const createMovie = async (req, res) => {
  const { title, runtimeMins, screenings } = req.body

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const movie = await movieDomain.createMovie(title, runtimeMins, screenings)
    res.status(201).json({ movie })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ error: "A movie with the provided title already exists" })
      }
    }
    res.status(500).json({ error: e.message })
  }

}

const updateMovie = async(req, res) => {
  const { title, runtimeMins, screenings } = req.body
  const { id } = req.params

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const movie = await movieDomain.updateMovie(title, runtimeMins, screenings, id)
    res.status(201).json({ movie })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ error: "Movie with that title already exists" })
      }
      if (e.code === "P2025") {
        return res.status(404).json({ error: "Movie with that id does not exist"})
      }
    }
    res.status(500).json({ error: e.message })
  }
}

module.exports = {
  getAllMovies,
  getMovieByID,
  createMovie,
  updateMovie
}