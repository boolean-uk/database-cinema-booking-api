const { PrismaClientKnownRequestError } = require("@prisma/client");
const movieDomain = require("../domains/movie.js");

const getMovies = async (req, res) => {
  const { runtimeLt, runtimeGt } = req.query;

  try {
    const movies = await movieDomain.getMoviesDB(runtimeGt, runtimeLt);
    res.json({ movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error occured" });
  }
};

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  const newMovie = await movieDomain.createMovieDB(title, runtimeMins);
  res.status(201).json({ movie: newMovie });
};

const getMovieById = async (req, res) => {
  const { id } = req.params;

  const movie = await movieDomain.getMovieByIdDB(id);
  res.json({ movie });
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, runtimeMins } = req.body;

  const updatedMovie = await movieDomain.updateMovieDB(id, title, runtimeMins);

  res.status(201).json({ movie: updatedMovie });
};

module.exports = {
  getMovies,
  createMovie,
  getMovieById,
  updateMovie,
};
