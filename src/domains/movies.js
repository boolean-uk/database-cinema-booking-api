const prisma = require("../utils/prisma");

async function getMoviesList() {
  const foundMovies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });
  console.log("foundMovies", foundMovies);
  return { foundMovies };
}

async function createNewMovie(title, runtimeMins) {
  const createdMovie = await prisma.movie.create({
    data: {
      title,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
  console.log("createdMovie", createdMovie);
  return { movie: createdMovie };
}

async function getMovieById(givenId) {
  const id = Number(givenId)
  const foundMovie = await prisma.movie.findUnique({
    where: {
      id: id,
    },
    include: {
      screenings: true,
    },
  });
  console.log("foundMovie", foundMovie);
  return foundMovie;
}

module.exports = {
  getMoviesList,
  createNewMovie,
  getMovieById
};
