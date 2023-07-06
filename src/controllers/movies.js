const { getMoviesList, createNewMovie } = require("../domains/movies");

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

const newMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;
  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }
  try {
    const createdMovie = await createNewMovie();
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

module.exports = {
  getMovies,
  newMovie,
};
