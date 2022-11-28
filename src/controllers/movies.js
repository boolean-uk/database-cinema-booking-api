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
  console.log(title, runtimeMins);

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const createdMovie = await prisma.movie.create({
      data: { title: title, runtimeMins: runtimeMins },
      include: { screenings: true },
    });

    res.status(201).json({ movie: createdMovie });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getMovieById = async (req, res) => {
  const movieId = Number(req.params.id);
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
      include: { screenings: true },
    });
    res.json({ movie: movie });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const updateMovie = async (req, res) => {
    const movieId = Number(req.params.id);
    const { title, runtimeMins } = req.body;
  
    if (!title || !runtimeMins) {
      return res.status(400).json({
        error: "Missing fields in request body",
      });
    }
  
    try {
      const updatedMovie = await prisma.movie.update({
        where: { id: movieId },
        data: { title: title, runtimeMins: runtimeMins },
        include: { screenings: true },
      });
  
      res.status(201).json({ movie: updatedMovie });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

module.exports = {
  getMovies,
  createMovie,
  getMovieById,
  updateMovie
};
