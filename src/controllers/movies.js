const { Prisma } = require("@prisma/client");
const { movie } = require("../utils/prisma");
const prisma = require("../utils/prisma");
const { buildRuntimeClause } = require("./utils");
// Get all movies
const getAllMovies = async (req, res) => {
  const base = { include: { screenings: true } };
  const query = buildRuntimeClause(req.query, base);
  const movies = await prisma.movie.findMany(query);
  res.json({ movies: movies });
};

// Create a movie
const createMovie = async (req, res) => {
  const { title, runtimeMins, screenings } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in the request body",
    });
  }
  const foundMovie = await prisma.movie.findFirst({
    where: {
      title: title,
    },
  });
  if (foundMovie) {
    return res
      .status(409)
      .json({ error: " A movie with the provided title already exists" });
  }
  try {
    const createdMovie = await prisma.movie.create({
      data: {
        title: title,
        runtimeMins: runtimeMins,
        screenings: screenings
          ? {
              createMany: {
                data: screenings.map(({ screenId, startsAt }) => ({
                  screenId,
                  startsAt: new Date(startsAt),
                })),
              },
            }
          : undefined,
      },
      include: { screenings: true },
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

// Get a movie by ID
const getMovieById = async (req, res) => {
  const movieid = Number(req.params.id);
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: movieid },
      include: { screenings: true },
    });

    if (!movie) {
      res
        .status(404)
        .json({ error: "Movie with that id or title does not exist" });
    }
    res.json({ movie: movie });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Update a movie
const updateMovie = async (req, res) => {
  const movieId = Number(req.params.id);
  const { title, runtimeMins, screenings } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }
  const foundMovie = await prisma.movie.findFirst({
    where: { id: movieId },
  });
  if (!foundMovie) {
    res.status(404).json({ error: "Movie with that id does not exist" });
  }
  const movieFound = await prisma.movie.findFirst({
    where: { title: title },
  });
  if (movieFound) {
    return res
      .status(409)
      .json({ error: "A movie with the provided title already exists" });
  }
  try {
    const updatedMovie = await prisma.movie.update({
      data: {
        title: title,
        runtimeMins: runtimeMins,
        screenings: { update: screenings },
      },
      where: { id: movieId },
      include: { screenings: true },
    });

    res.status(201).json({ movie: updatedMovie });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
};
