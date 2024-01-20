const { movie } = require('../utils/prisma')

const getAllMoviesDb = async () => {
  const movies = await movie.findMany()

  return movies
}

const getMovieByIdDb = async () =>{
  const foundMovie = await movie.findUnique({
    where: {
      id: movieId,
    },
  });

  return foundMovie;
};

const createMovieDb = async () => {
  const newMovie = await movie.create({
    data:{
      title,
      runtimeMins
    },
  })
  return newMovie
}

module.exports = {
  getAllMoviesDb,
  getMovieByIdDb,
  createMovieDb
}
