const { PrismaClientKnownRequestError } = require("@prisma/client");
const {
  fetchMovieListFromDatabase,
  createMovieInDatabase,
  findMovieByIdInDatabase,
  modifyMovieByIdInDatabase,
} = require("../domains/movie.js");

// Retrieve list of movies
const getMovieList = async (req, res) => {
  const movieList = await fetchMovieListFromDatabase();
  res.status(200).json({ movies: movieList });
};

// Add a new movie
const postMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;
  const newMovie = await createMovieInDatabase(title, runtimeMins);
  res.status(201).json({ movie: newMovie });
};

// Retrieve a movie by ID
const getMovieById = async (req, res) => {
  const id = Number(req.params.id);
  const foundMovie = await findMovieByIdInDatabase(id);
  res.status(200).json({ movie: foundMovie });
};

// Update a movie by ID
const updateMovieById = async (req, res) => {
  const id = Number(req.params.id);
  const { title, runtimeMins } = req.body;
  const updatedMovie = await modifyMovieByIdInDatabase(id, title, runtimeMins);
  res.status(201).json({ movie: updatedMovie });
};

module.exports = { getMovieList, postMovie, getMovieById, updateMovieById };
