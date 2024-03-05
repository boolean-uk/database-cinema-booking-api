const { getMoviesDb, getMovieByIdDb } = require('../domains/movies')

const getMovies = async (req, res) => {
    try {
        const movies = await getMoviesDb()
        res.status(200).json({ movies })
    } catch (e) {
        console.log(e, 'error')
        res.status(500).json({ error: e.message })
    }
}

const getMovieById = async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const movie = await getMovieByIdDb(id)
        res.status(200).json({ movie })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

module.exports = {
    getMovies,
    getMovieById
}