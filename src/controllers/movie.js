const { PrismaClientKnownRequestError } = require("@prisma/client");
const { getAllMoviesDb } = require("../domains/movies.js");

const getAllMovies = async (req, res) => {
  const { id, title } = req.query;
  if (!id || !title) {
    return res.status(400).json({
      error: "Missing fields in query parameters",
    });
  }

  try {
    const allMovies = await getAllMoviesDb(id, title);

    res.status(200).json({ movies: allMovies });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ error: "This movie does not exist" });
      }
    }

    res.status(500).json({ error: e.message });
  }
};


const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error:'Missing fields in request body',
    })
  }
  try{
    const newMovie = await createMovieDb(title, runtimeMins)
    res.status(201).json({ movie: newMovie })
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return res.status(409).json({ error: 'A movie with the same title already exists' });
      }
    }
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  getAllMovies,
  createMovie
};
