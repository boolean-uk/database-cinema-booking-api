const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');
const { SUCCESS, FAILED } = require('../utils/vars');

const getAllMovies = async query => {
  try {
    const movies = await prisma.movie.findMany({
      where: {
        runtimeMins: {
          lt: parseInt(query.runtimeLt) || undefined,
          gt: parseInt(query.runtimeGt) || undefined,
        },
      },
      include: {
        screenings: true,
      },
    });

    return [SUCCESS, movies];
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return [FAILED, error.code];
    }
  }
};

const getMovieById = async (id, title) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id,
        title,
      },
      include: {
        screenings: true,
      },
    });

    if (movie === null) {
      return [FAILED, 'P2001'];
    }

    return [SUCCESS, movie];
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return [FAILED, error.code];
    }
  }
};

const createMovie = async (title, runtimeMins, screeningsInfo = []) => {
  console.log('1', screeningsInfo);
  console.log('2', [...screeningsInfo]);
  try {
    const movie = await prisma.movie.create({
      data: {
        title,
        runtimeMins,
        screenings: {
          create: [...screeningsInfo],
        },
      },
      include: {
        screenings: true,
      },
    });

    return [SUCCESS, movie];
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return [FAILED, error.code];
    }
  }
};

const updateMovie = async (id, title, runtimeMins) => {
  try {
    const movie = await prisma.movie.update({
      data: {
        title,
        runtimeMins,
      },
      where: {
        id,
      },
      include: {
        screenings: true,
      },
    });

    return [SUCCESS, movie];
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return [FAILED, error.code];
    }
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
};
