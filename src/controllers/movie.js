const { PrismaClientKnownRequestError } = require("@prisma/client");
const domainMovie = require("../domains/movie");

const fetchMovies = async (req, res) => {
  const theMovies = await domainMovie.fetchMoviesDB();
  res.json({ theMovies });
};

module.exports = {
  fetchMovies,
};
