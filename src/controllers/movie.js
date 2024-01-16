const { getMoviesDb } = require("../domains/movie");

const getMovies = async (req, res) => {
    const movies = await getMoviesDb()
    return res.json({ movies: movies })
}

module.exports = {
    getMovies
}