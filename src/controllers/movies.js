const {
  getAllMoviesDb,
  createMovieDb,
  getMovieByIdDb,
  updateMovieByIdDb,
} = require("../domains/movies.js");

const getAllMovies = async (req, res) => {
  const allMovies = await getAllMoviesDb();

  return res.status(200).send({ movies: allMovies });
};

const getMovieById = async (req, res) => {
  const id = Number(req.params.id);

  const foundMovie = await getMovieByIdDb(id);

  if (foundMovie) {
    return res.status(200).send({ movie: foundMovie });
  }

  return res.status(404).send({ error: "No movie found with provided ID" });
};

const createMovie = async (req, res) => {
  try {
    const { title, runtimeMins } = req.body;

    if (!title && !runtimeMins) {
      return res.status(400).send({ error: "Missing fields in request body" });
    }

    const allMovies = await getAllMoviesDb();

    const titleExists = allMovies.some((movie) => movie.title === title);

    if (titleExists) {
      return res
        .status(409)
        .send({ error: "A movie with the provided title already exists" });
    }

    const createdMovie = await createMovieDb(title, runtimeMins);

    return res.status(201).send({ movie: createdMovie });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ error: e.message });
  }
};

const updateMovieById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, runtimeMins, screenings } = req.body;
    const movie = await getMovieByIdDb(id);

    if (!title && !runtimeMins && !screenings) {
      return res.status(400).send({ error: "Missing fields in request body" });
    }

    if (!movie) {
      return res.status(404).send({ error: "No movie with the provided ID" });
    }

    const updatedMovie = await updateMovieByIdDb(req.body, id);

    return res.status(201).send({ movie: updatedMovie });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovieById,
};
