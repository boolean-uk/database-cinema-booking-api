const { PrismaClientKnownRequestError } = require("@prisma/client");
const {
  getAllMoviesDb,
  getMovieByIdDb,
  createMovieDb,
  updateMovieDb,
} = require("../domains/movies");

const getAllMovies = async (req, res) => {
  const { runtimeMins } = req.query;
  try {
    const allMovies = await getAllMoviesDb(runtimeMins);
    res.status(200).json({ movies: allMovies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movieFound = await getMovieByIdDb(id);

    if (!movieFound) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    return res.status(200).json({ movie: movieFound });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(400).json({ error: 'Invalid movie ID' });
      }
    }

    return res.status(500).json({ error: error.message });
  }
};

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: 'Missing fields in request body',
    });
  }
  try {
    const newMovie = await createMovieDb(title, runtimeMins);
    res.status(201).json({ movie: newMovie });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return res
          .status(409)
          .json({ error: 'A movie with the same title already exists' });
      }
    }
    res.status(500).json({ error: e.message });
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, runtimeMins } = req.body;

  if (!id || !title || !runtimeMins) {
    return res.status(400).json({
      error: 'Missing fields in request body',
    });
  }

  try {
    const existingMovie = await getMovieByIdDb(id);

    if (!existingMovie) {
      return res.status(404).json({
        error: 'Movie not found',
      });
    }

    const updatedMovie = await updateMovieDb(id, { title, runtimeMins });

    res.status(200).json({ movie: updatedMovie });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return res.status(409).json({ error: 'This movie does not exist' });
      }
    }

    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
};
