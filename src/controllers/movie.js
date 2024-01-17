const { getMoviesDb } = require("../domains/movie");

const getAllMovies = async (req,res) => {
    const movies = await getMoviesDb();
    return res.status(200).json({movies: movies});
}

module.exports = { getAllMovies };