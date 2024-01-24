const {
  fetchAllMoviesDb,
  deployMovieDb,
  fetchMovieByIdDb,
  updateByIdDb,
} = require("../domains/movies.js");

const fetchAllMovies = async (req, res) => {
  try {
    const allMovies = await fetchAllMoviesDb(req.query);

    return res.status(200).send({ movies: allMovies });
  } catch (e) {
    console.error(e.message);
    return res.status(500).send({ error: e.message });
  }
};

const fetchMovieById = async (req, res) => {
  const id = Number(req.params.id);

  const foundMovie = await fetchMovieByIdDb(id);

  if (foundMovie) {
    return res.status(200).send({ movie: foundMovie });
  }

  return res.status(404).send({ error: "No movie found with provided ID" });
};

const deployMovie = async (req, res) => {
  try {
    const { title, runtimeMins } = req.body;

    if (!title && !runtimeMins) {
      return res.status(400).send({ error: "Missing fields in request body" });
    }

    const allMovies = await fetchAllMoviesDb(req.query);

    const titleExists = allMovies.some((movie) => movie.title === title);

    if (titleExists) {
      return res
        .status(409)
        .send({ error: "A movie with the provided title already exists" });
    }

    const createdMovie = await deployMovieDb(title, runtimeMins);

    return res.status(201).send({ movie: createdMovie });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ error: e.message });
  }
};

const updateById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, runtimeMins, screenings } = req.body;
    const movie = await fetchMovieByIdDb(id);

    if (!title && !runtimeMins && !screenings) {
      return res.status(400).send({ error: "Missing fields in request body" });
    }

    if (!movie) {
      return res.status(404).send({ error: "No movie with the provided ID" });
    }

    const updatedMovie = await updateByIdDb(req.body, id);

    return res.status(201).send({ movie: updatedMovie });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ error: e.message });
  }
};

module.exports = {
  fetchAllMovies,
  deployMovie,
  fetchMovieById,
  updateById,
};
