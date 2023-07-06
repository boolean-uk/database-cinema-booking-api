const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");
const movieDomain = require('../domains/movie')

const getAllMovies = async (req, res) => {
  const movies = await movieDomain.getAllMovies()
  res.status(200).json({ movies })
}

const getMovieByID = async (req, res) => {
  const { id } = req.params
  const movie = await movieDomain.getMovieByID(id)
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