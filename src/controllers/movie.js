const { PrismaClientKnownRequestError } = require("@prisma/client");
const { getMovieListDb, postMovieDb } = require("../domains/movie.js");

//Get Movies
const getMovieList = async (req, res) => {
  const movieList = await getMovieListDb();
  res.status(200).json({ movies: movieList });
};

//Create Movies
const postMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;
  const newMovie = postMovieDb(title, runtimeMins);
  res.status(201).json({ movie: newMovie });
};

module.exports = { getMovieList, postMovie };
