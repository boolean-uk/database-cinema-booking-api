const { Prisma } = require("@prisma/client");
const { run } = require("jest");
const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({
    where: {
        NOT: {
          screenings: {}
        }
    },
    include: {
      screenings: true,
    },
  })
  res.json({ movies: movies });
};

const getMoviesById = async (req, res) => {
  const { id } = req.params;
  const movie = await prisma.movie.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      screenings: true,
    },
  });
  if (!movie) {
    return res.status(404).json({
      error: "Movie with that id or title does not exist",
    });
  }
  res.json({ movie: movie });
};

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;
  console.log(req.body);
  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  const movieAlreadyExist = await prisma.movie.findFirst({
    where: {
      title: { equals: title },
    },
  });

  if (movieAlreadyExist) {
    return res.status(409).json({
      error: "A movie with the provided title already exist",
    });
  }

  const movie = await prisma.movie.create({
    data: {
      title: title,
      runtimeMins: runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
  res.status(201).json({ movie: movie });
};

const updateMoviesById = async (req, res) => {
  const { id } = req.params;
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  const movieAlreadyExist = await prisma.movie.findFirst({
    where: {
      title: { equals: title },
    },
  });

  if (movieAlreadyExist) {
    return res.status(409).json({
      error: "A movie with the provided title already exist",
    });
  }
  const movie = await prisma.movie.update({
    where: {
      id: Number(id),
    },
    data: {
      title: title,
      runtimeMins: runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
  if (!movie) {
    return res.status(404).json({
      error: "Movie with that id or title does not exist",
    });
  }
  res.status(201).json({ movie: movie });
};

module.exports = {
  getMovies,
  getMoviesById,
  createMovie,
  updateMoviesById,
};
