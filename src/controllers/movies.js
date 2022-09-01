const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });

  //EXT1 - two query params. Return movies if
  //   // 1. runtimeLt - runtime < than provided value
  //   //2. runtimeGt - runtime > than provided value
  //   // eg runtimeLt = 90
  //   // eg  runtimeGt = 100

  //   // Number(req.query.value)

  //   // logic that filters and returns movies according to which query is used
  //   console.log("RESULTS", req.query.value, req.query);

  //   const movie = await prisma.movie.findMany({
  //     where: {
  //       runtime: {
  //         lt: Number(req.query.runtime),
  //       },
  //     },
  //   });

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
