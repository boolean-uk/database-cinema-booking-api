const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });

  res.status(200).json({
    movies,
  });
};

const createNewMovie = async (req, res) => {
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
    });
    res.status(201).json({ movie: createdMovie });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ error: "This Movie Already Exists" });
      }
    }
    res.status(500).json({ error: e.message });
  }
};

const getMovieById = async (req, res) => {
  const movieId = parseInt(req.params.id);
  console.log("movie id", movieId);

  if (!movieId) {
    return res.status(400).json({
      error: "ID does not exist",
    });
  }

  const foundMovie = await prisma.movie.findUnique({
    where: {
      id: movieId,
    },
    include: {
      screenings: true,
    },
  });
  res.status(200).json({ foundMovie });
};

const updateMovie = async (req, res) => {
  const movieId = parseInt(req.params.id);
  const { title, runtimeMins } = req.body

  if (!movieId) {
    return res.status(400).json({
      error: "ID does not exist",
    });
  }

  const foundMovie = await prisma.movie.update({
    where: {
      id: movieId,
    },
    data: {
      title,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
  res.status(201).json({
    foundMovie
  });
};

module.exports = {
  getAllMovies,
  getMovieById,
  createNewMovie,
  updateMovie,
};
