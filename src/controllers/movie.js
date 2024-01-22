const { PrismaClientKnownRequestError } = require("@prisma/client");
const {
  getMovieListDb,
  postMovieDb,
  getMovieByIdDb,
  updateMovieDb,
} = require("../domains/movie.js");

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

//get movie by id
const getMovieById = async (req, res) => {
  const id = Number(req.params.id);
  const foundMovie = await getMovieByIdDb(id);
  res.status(200).json({ movie: foundMovie });
};

//update movie by id
const updateMovieById = async (req, res) => {
  const id = Number(req.params.id);
  const { title, runtimeMins } = req.body;
  const updatedMovie = await updateMovieDb(id,title,runtimeMins);
  res.status(201).json({movie:updatedMovie})
};

module.exports = { getMovieList, postMovie, getMovieById, updateMovieById };
