const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');
const { SUCCESS, FAILED } = require('../utils/vars');

const getAllMovies = async () => {
  try {
    const movies = await prisma.movie.findMany({
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

const getMovieById = async (movieId, title) => {
  const id = movieId ?? title;
  console.log(id);
  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id,
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
    if (error instanceof Prisma.error) {
      console.log('hi');
    }
  }
};

const createMovie = async (title, runtimeMins) => {
  try {
    const movie = await prisma.movie.create({
      data: {
        title,
        runtimeMins,
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
