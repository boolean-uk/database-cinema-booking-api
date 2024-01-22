const { movie } = require('../utils/prisma')

const getAllMoviesDb = async () => {
  const movies = await movie.findMany()

  return movies
}

const getMovieByIdDb = async () =>{
  const foundMovie = await movie.findUnique({
    where: {
      id: id,
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

const updateMovieDb = async (movieId, updatedData) => {
  const updatedMovie = await movie.update({
    where: {
      id: movieId,
    },
    data: updatedData,
  });

  return updatedMovie;
};

module.exports = {
  getAllMoviesDb,
  getMovieByIdDb,
  createMovieDb,
  updateMovieDb
}
