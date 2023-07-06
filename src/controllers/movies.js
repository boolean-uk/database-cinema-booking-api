const { getMoviesList } = require("../domains/movies");

const getMovies = async (req, res) => {
  const retrievedMovies = await getMoviesList();
  res.json({ movies: retrievedMovies });
};

module.exports = {
  getMovies,
};
