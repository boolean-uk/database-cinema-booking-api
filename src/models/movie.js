// const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

// const getMoviesData = async () => {
//   const movies = await prisma.movie.findMany();
//   return {movies}
// };

const output = {
  select: {
    id: true,
    title: true,
    runtimeMins: true,
    createdAt: true,
    updatedAt: true,
    screenings: {
      select: {
        id: true,
        movieId: true,
        screenId: true,
        startsAt: true,
        createdAt: true,
        updatedAt: true,
      },
    },
  },
};

const getMoviesData = async () => {
  const movies = await prisma.movie.findMany(output);
  return { movies };
};

const getMovieDataById = async (id) => {
  const movie = await prisma.movie.findUnique({
    where: {
      id,
    },
    select: output.select,
  });
  return { movie };
};

const createMovieData = async (title, runtimeMins) => {
  const new_movie = await prisma.movie.create({
    data: {
      title,
      runtimeMins,
    },
  });

  const movie_with_screen = getMovieDataById(new_movie.id);
  return movie_with_screen;
};

const updateMovieData = async (id, title, runtimeMins) => {
  const update_movie = await prisma.movie.update({
    where: {
      id,
    },
    data: {
      title,
      runtimeMins,
    },
    select: output.select,
  });
  return update_movie;
};

module.exports = {
  getMoviesData,
  getMovieDataById,
  createMovieData,
  updateMovieData,
};
