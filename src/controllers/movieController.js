const { Prisma } = require("@prisma/client");
// const prisma = require("../utils/prisma");

const {
  getMoviesData,
  getMovieDataById,
  createMovieData,
  updateMovieData,
} = require("../models/movie");

// const getMoviesData = async (req, res) => {
//   const movie = await prisma.movie.findMany();
//   res.json(movie)
// };

// const getMovies = async () => {
//   const movie = await prisma.movie.findMany();
//   return movie
// };

const getMovies = async (req, res) => {
  const movie = await getMoviesData();
  res.json(movie);
};

const getMovieById = async (req, res) => {
  const id = Number(req.params.id);
  const movie = await getMovieDataById(id);
  res.json(movie);
};

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;
  const new_movie = await createMovieData(title, runtimeMins);
  res.status(201).json(new_movie);
};

const updateMovie = async (req, res) => {
  const id = Number(req.params.id);
  const { title, runtimeMins } = req.body;
  const movie_update = await updateMovieData(id, title, runtimeMins);
  res.status(201).json({ movie: movie_update });
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
};
