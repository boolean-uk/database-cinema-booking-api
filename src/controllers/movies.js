const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        screenings: true,
      },
    });
    res.json({ movies: movies });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in the request body",
    });
  }
  try {
    const createdMovie = await prisma.movie.create({
      data: {
        title: title,
        runtimeMins: runtimeMins,
      },
    });
    res.status(201).json({ movie: createdMovie });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError)
      if (e.code === "P2002") {
        return res
          .status(409)
          .json({ error: " A movie with the provided title already exists" });
      }
    res.status(500).json({ error: e.message });
  }
};

const getMoviesById = async (req, res) => {
  const movieid = Number(req.params.id);
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: movieid },
      include: { screenings: true },
    });
    res.json({ movie: movie });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  createMovie,
  getMovies,
  getMoviesById,
};
