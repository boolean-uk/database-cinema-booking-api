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
  const id = Number(givenId);
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

async function updateMovieById(givenId, givenTitle, givenRuntimeMins) {
  const id = Number(givenId);
  const updatedMovie = await prisma.movie.update({
    where: {
      id: id,
    },
    data: {
      title: givenTitle,
      runtimeMins: givenRuntimeMins,
    },
    include: {
      screenings: true,
    },
  });
  console.log("updatedMovie", updatedMovie);
  return updatedMovie;
}

module.exports = {
  getMoviesList,
  createNewMovie,
  getMovieById,
  updateMovieById,
};
