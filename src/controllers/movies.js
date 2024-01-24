const { PrismaClientKnownRequestError } = require("@prisma/client");
const {
  getAllMoviesDb,
  createMovieDb,
  getAMovieByIdDb,
  updateMoviebyIdDb,
} = require("../domains/movies.js");

const getAllMovies = async (req, res) => {
  const movies = await getAllMoviesDb();
  res.status(200).json({ movies });
};
const createAMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }
  try {
    const createdMovie = await createMovieDb(title, runtimeMins);

    res.status(201).json({ movie: createdMovie });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(409)
          .json({ error: "A movie with the provided title already exists" });
      }
    }

    res.status(500).json({ error: e.message });
  }
};
const getAMovieById = async (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = await getAMovieByIdDb(movieId);
  res.status(200).json({ movie });
};
const updateMoviebyId = async (req, res) => {
  const movieId = parseInt(req.params.id);
  const { title, runtimeMins } = req.body;
  const movie = await updateMoviebyIdDb(movieId, title, runtimeMins);
  res.status(201).json({ movie });
};

module.exports = { getAllMovies, createAMovie, getAMovieById, updateMoviebyId };
