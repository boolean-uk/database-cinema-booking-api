const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });

  res.status(200).json({ movies: movies });
};

const getMovie = async (req, res) => {
  const movie = await prisma.movie.findUnique({
    where: {
      id: Number(req.params.id),
    },

    include: {
      screenings: true,
    },
  });

  res.status(200).json({ movie: movie });
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
        title: req.body.title,
        runtimeMins: req.body.runtimeMins,
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

const updateMovie = async (req, res) => {
  const movie = await prisma.movie.update({
    where: {
      id: Number(req.params.id),
    },

    data: {
      title: req.body.title,
      runtimeMins: req.body.runtimeMins,
    },

    include: {
      screenings: true,
    },
  });

  res.status(201).json({ movie: movie });
};

module.exports = {
  getMovies,
  createMovie,
  getMovie,
  updateMovie,
};
