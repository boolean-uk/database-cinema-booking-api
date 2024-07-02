const { PrismaClientKnownRequestError } = require("@prisma/client");
const {
  getMoviesDb,
  createMovieDb,
  getMovieByIdDb,
  updateMovieByIdDb,
  getMoviesWithQueryDb,
} = require("../domains/movies.js");
const {
  MissingFieldsError,
} = require("../errors/errors.js");

async function getMovies(req, res) {
  let movies;
  if (Object.keys(req.query).length > 0) {
    movies = await getMoviesWithQueryDb(req.query);
  } else {
    movies = await getMoviesDb();
  }
  res.status(200).json({ movies });
}

async function createMovie(req, res) {
  const newMovie = req.body;

  const requiredFields = ["title", "runtimeMins"];
  if (!requiredFields.every((field) => newMovie[field])) {
    throw new MissingFieldsError("Movies require a title and runtime");
  }

  try {
    const movie = await createMovieDb(newMovie);
    res.status(201).json({ movie });
  } catch (e) {
    if (e.code === "P2002") {
      res.status(409).json({ error: "A movie with that title already exists" });
    }
  }
}

async function getMovieById(req, res) {
  const id = Number(req.params.id);

  try {
    const movie = await getMovieByIdDb(id);
    res.status(200).json({ movie });
  } catch (e) {
    if (e.code === "P2025") {
      res.status(404).json({ error: "No movie found with that ID" });
    }
  }
}

async function updateMovieById(req, res) {
  const id = Number(req.params.id);
  const updatedProps = req.body;

  if (!updatedProps.title && !updatedProps.runtimeMins) {
    throw new MissingFieldsError("Updating movies requires a title or runtime");
  }

  try {
    const movie = await updateMovieByIdDb(id, updatedProps);
    res.status(201).json({ movie });
  } catch (e) {
    if (e.code === "P2025") {
      res.status(404).json({ error: "No movie found with that ID" });
    }
    if (e.code === "P2002") {
      res.status(409).json({ error: "A movie with that title already exists" });
    }
  }
}

module.exports = {
  getMovies,
  createMovie,
  getMovieById,
  updateMovieById,
};
