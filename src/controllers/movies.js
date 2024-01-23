const { PrismaClientKnownRequestError } = require("@prisma/client");
const { getAllMoviesDb, createMovieDb } = require("../domains/movies.js");

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

module.exports = { getAllMovies, createAMovie};
