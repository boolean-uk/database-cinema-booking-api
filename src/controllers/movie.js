const { PrismaClientKnownRequestError } = require("@prisma/client");
const domainMovie = require("../domains/movie");

const fetchMovies = async (req, res) => {
  const theMovies = await domainMovie.fetchMoviesDB();
  res.json({ theMovies });
};

const generateMovie = async (request, response) => {
  const { title, runtimeMins } = request.body;

  const movieEntry = await domainMovie.generateMovieDB(title, runtimeMins);
  response.status(201).json({ movie: movieEntry });
};
const fetchMovieById = async (req, res) => {
  const { id } = req.params;

  const singleMovie = await domainMovie.fetchMovieByIdDB(id);
  res.json({ singleMovie });
};
const updateTheMovie = async (req, res) => {
  const { id } = req.params;
  const { title, runtimeMins } = req.body;

  const updatedMovie = await domainMovie.updateTheMovieDB(
    id,
    title,
    runtimeMins
  );

  res.status(201).json({ movie: updatedMovie });
};

module.exports = {
  fetchMovies,
  generateMovie,
  fetchMovieById,
  updateTheMovie,
};
