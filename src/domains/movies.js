const prisma = require("../utils/prisma");

async function getMoviesDb() {
  const movies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });
  return movies;
}

async function createMovieDb(newMovie) {
  const movie = await prisma.movie.create({
    data: newMovie,
    include: {
      screenings: true,
    },
  });
  return movie;
}

async function getMovieByIdDb(movieId) {
    const movie = await prisma.movie.findUnique({
        where: {
            id: movieId
        },
        include: {
            screenings: true,
        }
    })
    return movie
}

module.exports = {
  getMoviesDb,
  createMovieDb,
  getMovieByIdDb
};
