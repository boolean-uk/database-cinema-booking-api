const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const getAllMovies = await prisma.movie.findMany();
  res.status(200).json({ movies: getAllMovies });
};

const getMovieById = async (req, res) => {
  const { id } = req.params;

  const getByMovie = await prisma.movie.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      screenings: true,
    },
  });
  res.status(200).json({ movie: getByMovie });
};

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  const createdMovie = await prisma.movie.create({
    data: {
      title,
      runtimeMins,
      screenings: {
        create: {
          screen: {
            connect: {
              id: 1,
            },
          },
          startsAt: "2023-01-17T12:10:22.547Z",
        },
      },
    },
    include: {
      screenings: true,
    },
  });

  res.status(201).json({ movie: createdMovie });
};

const updateMovieById = async (req, res) => {
  const { id } = req.params;
  const { title, runtimeMins } = req.body;
  console.log("TITLE: ", title);
  console.log("RUNTIME: ", runtimeMins);

  const updatedMovie = await prisma.movie.update({
    where: {
      id: Number(id),
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
};

module.exports = {
  getMovies,
  createMovie,
  getMovieById,
  updateMovieById,
};
