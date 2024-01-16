const { PrismaClientKnownRequestError } = require("@prisma/client");
const movieDomain = require("../domains/movie.js");

const getMovies = async (req, res) => {
  const movies = await movieDomain.getMoviesDB();
  console.log(movies);
  res.json({ movies });
};

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  const newMovie = await movieDomain.createMovieDB(title, runtimeMins);
  res.status(201).json({ movie: newMovie });
};

module.exports = {
  getMovies,
  createMovie,
};
