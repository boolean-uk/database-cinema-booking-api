const { Prisma } = require("@prisma/client");
const {
  getMoviesList,
  createNewMovie,
  getMovieById,
  updateMovieById,
} = require("../domains/movies");

const getMovies = async (req, res) => {
  // const id = req.params
  const { runtimeLt, runtimeGt } = req.query
  const runtimeQuery = {}

  if (runtimeLt) {runtimeQuery.runtimeLt}
  if (runtimeGt) { runtimeQuery.runtimeGt}

  try {
    const movies = await getMoviesList(runtimeQuery);
    res.json( movies );
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
    const movie = await createNewMovie(title, runtimeMins);
    res.status(201).json( movie );
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
    const movie = await getMovieById(id);
    res.json( movie );
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
  const { title, runtimeMins} = req.body;
  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }
  try {
    const { id } = req.params
    const movie = await updateMovieById(id, title, runtimeMins)
    res.status(201).json( movie )
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
