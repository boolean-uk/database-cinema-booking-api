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

module.exports = {
  fetchMovies,
  generateMovie,
};
