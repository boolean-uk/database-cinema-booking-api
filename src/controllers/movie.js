const { PrismaClient } = require("@prisma/client"); //import PrismaClient!
const prisma = new PrismaClient(); //saved as Prisma

//Getting all the movies
const getMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        screenings: true,
      },
    });
    res.status(200).json({ movies });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//creating movies
const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }

  try {
    const newMovie = await prisma.movie.create({
      data: {
        title,
        runtimeMins,
      },
      include: {
        screenings: true,
      },
    });
    res.status(201).json({ movie: newMovie });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Getting the moovies by Id
const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await prisma.movie.findUnique({
      where: { id: Number(id) },
      include: {
        screenings: true,
      },
    });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({ movie });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//Updating
const updateMovieById = async (req, res) => {
  const { id } = req.params;
  const { title, runtimeMins } = req.body;

  try {
    const updatedMovie = await prisma.movie.update({
      where: { id: Number(id) },
      data: {
        title,
        runtimeMins,
      },
      include: {
        screenings: true,
      },
    });

    res.status(201).json({ movie: updatedMovie });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

//Exporting
module.exports = {
  getMovies,
  createMovie,
  getMovieById,
  updateMovieById,
};
