const prisma = require("../utils/prisma");

async function getMoviesList(runtimeQuery) {
  const { query } = runtimeQuery
  
  switch(query) {

    case !query: 
      

  }

  const movies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });
  return {movies} ;
}

async function createNewMovie(title, runtimeMins) {
  const movie = await prisma.movie.create({
    data: {
      title,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
  return {movie} ;
}

async function getMovieById(givenId) {
  const id = Number(givenId);
  const movie = await prisma.movie.findUnique({
    where: {
      id: id,
    },
    include: {
      screenings: true,
    },
  });
  return {movie};
}

async function updateMovieById(givenId, givenTitle, givenRuntimeMins) {
  const id = Number(givenId);
  const movie = await prisma.movie.update({
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
  return {movie};
}

module.exports = {
  getMoviesList,
  createNewMovie,
  getMovieById,
  updateMovieById,
};
