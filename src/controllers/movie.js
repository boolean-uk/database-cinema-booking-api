const { PrismaClientKnownRequestError } = require("@prisma/client");
const {
  getAllMoviesDb,
  getMovieByIdDb,
  createMovieDb,
  updateMovieDb,
} = require("../domains/movie");

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
  const id = Number(req.params.id)
  try {
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
  const id = Number(req.params.id)
  const { title, runtimeMins } = req.body;
  const movieFound = await getMovieByIdDb(id)
  if(!movieFound){
    return res.status(400).json({ error: 'Movie not found.' });
  }
  const updatedMovie = await updateMovieDb (id, title, runtimeMins)
  return res.status(201).json({movie: updatedMovie})
}

  

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
};
