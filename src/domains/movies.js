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
  });
  console.log("createdMovie", createdMovie);
  return { movie: createdMovie };
}

module.exports = {
  getMoviesList,
  createNewMovie
};
