const { Prisma } = require("@prisma/client");
const {
  getMoviesList,
  createNewMovie,
  getMovieById,
  updateMovieById,
} = require("../domains/movies");

const getMovies = async (req, res) => {
  try {
    const retrievedMovies = await getMoviesList();
    res.json({ movies: retrievedMovies });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.json({ error: "getMovies went oopsie" });
      }
    }
    res.status(500).json({ error: e.message });
  }
};

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;
  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }
  try {
    const createdMovie = await createNewMovie(title, runtimeMins);
    res.status(201).json({ movie: createdMovie });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.json({ error: "createdMovie went oopsie" });
      }
    }
    res.status(500).json({ error: e.message });
  }
};

const findMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const retrievedMovie = await getMovieById(id);
    res.json({ movie: retrievedMovie });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.json({ error: "findMovie went oopsie" });
      }
    }
    res.status(500).json({ error: e.message });
  }
};

const updateMovie = async (req, res) => {
  const { title, runtimeMins, createdAt, updatedAt } = req.body;
  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }
  try {
    const { id } = req.params
    const foundMovie = await updateMovieById(id, title, runtimeMins)
    res.json({ movie: foundMovie })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.json({ error: "updateMovie went oopsie" });
      }
    }
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  getMovies,
  createMovie,
  findMovie,
  updateMovie
};
