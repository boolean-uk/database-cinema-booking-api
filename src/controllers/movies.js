const { Prisma } = require("@prisma/client");
const { movie } = require("../utils/prisma");
const prisma = require("../utils/prisma");

// Get all movies
const getMovies = async (req, res) => {
  const { runtimeLt, runtimeGt } = req.body;
  try {
    const movies = await prisma.movie.findMany({
      where: {
        lt: runtimeLt ? Number(runtimeLt) : undefined,
        gt: runtimeGt ? Number(runtimeGt) : undefined,
      },
      include: {
        screenings: true,
      },
    });
    res.json({ movies: movies });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Create a movie
const createMovie = async (req, res) => {
  const { title, runtimeMins, screenings } = req.body;

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
const getMoviesById = async (req, res) => {
  const movieid = Number(req.params.id);
  // const screenId = Number(req.params.id);
  try {
    // const screenings = await prisma.screening.findMany({
    //   where: { id: screenId },
    // });
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
    return res.json(400).json({
      error: "Missing fields in request body",
    });
  }
  const foundMovie = await prisma.movie.findFirst({
    where: { id: movieId },
  });
  if (!foundMovie) {
    res.status(404).json({ error: "Movie with that id does not exist" });
  }
  try {
    const updatedMovie = await prisma.movie.update({
      data: {
        title: title,
        runtimeMins: runtimeMins,
        screenings: { update: screenings },
      },
      where: { id: movieId },
      include: { screenings },
    });

    const movieFound = await prisma.movie.findFirst({
      where: { title: movie.title },
    });
    if (movieFound) {
      return res
        .status(409)
        .json({ error: "A movie with the provided title already exists" });
    }
    res.status(201).json({ movie: updatedMovie });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  createMovie,
  getMovies,
  getMoviesById,
  updateMovie,
};
