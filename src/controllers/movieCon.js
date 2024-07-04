const { PrismaClientKnownRequestError } = require("@prisma/client");
const {
  getMoviesDb,
  getMovieDb,
  createMovieDb,
  updateMovieDb,
  deleteMovieDb,
} = require("../domains/movieDom.js");

const getMovies = async (req, res) => {
  try {
    const movies = await getMoviesDb();

    res.status(200).json({ movies });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2021") {
        return res
          .status(404)
          .json({ error: "The table does not exist in the current database" });
      }
    }

    res.status(500).json({ error: e.message });
  }
};

const createMovie = async (req, res) => {
  const { body } = req;

  if (!body.title || !body.runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const newMovie = await createMovieDb(body);

    res.status(201).json({ movie: newMovie });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getMovie = async (req, res) => {
  const id = Number.parseInt(req.params.id, 10);

  try {
    const movie = await getMovieDb(id);

    res.status(200).json({ movie });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.name === "NotFoundError") {
        return res
          .status(404)
          .json({ error: `The movie with ID ${id} does not exist` });
      }
    }
    res.status(500).json({ error: e.message });
  }
};

const updateMovie = async (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const { body } = req;

  if (!body.title || !body.runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const updatedMovie = await updateMovieDb(id, body);

    res.status(201).json({ movie: updatedMovie });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return res
          .status(404)
          .json({ error: `The movie with ID ${id} does not exist` });
      }
    }
    res.status(500).json({ error: e.message });
  }
};

const deleteMovie = async (req, res) => {
  const id = Number.parseInt(req.params.id, 10);

  try {
    const deletedMovie = await deleteMovieDb(id);

    res.status(200).json({ movie: deletedMovie });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return res
          .status(404)
          .json({ error: `The movie with ID ${id} does not exist` });
      }
    }
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};
