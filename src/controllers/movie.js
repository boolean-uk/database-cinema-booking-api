const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

// GET read all movies (including screenings)
const getMovies = async (req, res) => {
  // res.json({ msg: `I'm all hooked up` });
  const rq = req.query 

  const movies = await prisma.movie.findMany({
    include: { screenings: true },
  });
  res.json({ movies: movies });
};

// GET read a movie by id
const getMovieById = async (req, res) => {
  const movieId = Number(req.params.id);
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
    include: { screenings: true },
  });
  res.json({ movie: movie });
};

// POST create a movie
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
    res.status(201).json({ movie: createdMovie });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(409)
          .json({ error: "A movie with the provided title already exists" });
      }
    }
    res.status(500).json({ error: e.message });
  }
};

// PUT update a movie
const updateMovie = async (req, res) => {
  const movieId = Number(req.params.id);
  const { title, runtimeMins} = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
  const updatedMovie = await prisma.movie.update({
    where: {
      id: movieId
    },
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
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === "P2002") {
      return res
        .status(409)
        .json({ error: "A movie with the provided title already exists" });
    }
  }
  res.status(500).json({ error: e.message });
}

}

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie
};
