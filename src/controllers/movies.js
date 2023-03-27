const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });

  return res.status(200).json({ movies: movies });
};

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;
  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const createdMovie = await prisma.movie.create({
      data: {
        title,
        runtimeMins,
      },
      include: {
        screenings: true,
      },
    });

    return res.status(201).json({ movie: createdMovie });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(409)
          .json({ error: "A movie with tthis title already exists" });
      }
    }
  }
};

const getMovieByID = async (req, res) => {
  const id = Number(req.params.id);
  const movie = await prisma.movie.findUnique({
    where: {
      id: id,
    },
    include: {
      screenings: true,
    },
  });
  if (!movie) {
    return res.status(404).json("movie with this id not found");
  }
  return res.status(200).json({ movie });
};

const updateMovieByID = async (req, res) => {
  const id = Number(req.params.id);
  const { title, runtimeMins } = req.body;
  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const movie = await prisma.movie.update({
      where: {
        id: id,
      },
      data: {
        title,
        runtimeMins,
      },
      include: {
        screenings: true,
      },
    });

    return res.status(201).json({ movie });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return res
          .status(404)
          .json({ error: "movie with that id does not exist" });
      }
      if (e.code === "P2002") {
        return res.status(409).json({
          error: "Movie with that title already exists",
        });
      }
      res.status(500).json({ error: e.message });
    }
    res.status(404).json({ error: e.message });
  }
};

module.exports = {
  getMovies,
  getMovieByID,
  createMovie,
  updateMovieByID,
};
