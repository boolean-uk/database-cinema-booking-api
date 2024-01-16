const { PrismaClientKnownRequestError } = require("@prisma/client");
const movieDomain = require("../domains/movie.js");

const getMovies = async (req, res) => {
  const movies = await movieDomain.getMoviesDB();
  console.log(movies);
  res.json({ movies });
};

module.exports = {
  getMovies,
};
