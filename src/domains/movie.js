const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getAllMovies = async (minRuntime, maxRuntime) => {
  
  const request = {
    include: {
      screenings: true,
    },
  };

  if (minRuntime && maxRuntime) {
    request.where = {
      runtimeMins: {
        gt: Number(minRuntime),
        lt: Number(maxRuntime),
      },
    };
  }

  if (minRuntime && !maxRuntime) {
    request.where = {
      runtimeMins: {
        gt: Number(minRuntime)
      },
    }
  }

  if (!minRuntime && maxRuntime) {
    request.where = {
      runtimeMins: {
        lt: Number(maxRuntime)
      }
    }
  }

  const movies = await prisma.movie.findMany(request);
  return movies;
};

const getMovieByID = async (id) => {
  const movie = await prisma.movie.findUniqueOrThrow({
    where: { id: Number(id) },
    include: {
      screenings: true,
    },
  });
  return movie;
};

const getMovieByTitle = async (title) => {
  const movie = await prisma.movie.findFirstOrThrow({
    where: { title: title },
    include: {
      screenings: true,
    },
  });
  return movie;
};

const createMovie = async (title, runtimeMins) => {
  const movie = await prisma.movie.create({
    data: {
      title,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
  return movie;
};

const updateMovie = async (title, runtimeMins, id) => {
  const movie = await prisma.movie.update({
    where: { id: Number(id) },
    data: {
      title: title,
      runtimeMins: runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
  return movie;
};

module.exports = {
  getAllMovies,
  getMovieByID,
  createMovie,
  updateMovie,
  getMovieByTitle
};
