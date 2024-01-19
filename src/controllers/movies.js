const { PrismaClientKnownRequestError } = require("@prisma/client")
const { moviesDb, createMovieDb, getMovieByIdDb, updateMovieByIdDb } = require('../domains/movies')

const moviesList = async (req, res) => {
    const movies = await moviesDb()
    res.json({ movies })
}

const newMovie = async (req, res) => {
    const { title, runtimeMins } = req.body;
    const newMovie = await createMovieDb(title, runtimeMins);
    res.status(201).json({ movie: newMovie });
};

const getMovieById = async (req, res) => {
    const movie = await getMovieByIdDb(req, res)
    res.json({ movie })
}

const updateMovieById = async (req, res) => {
    const id = Number(req.params.id);
    const { title, runtimeMins } = req.body;
    const updatedMovie = await updateMovieByIdDb(id, title, runtimeMins);
    res.status(201).json({ movie: updatedMovie });
};

module.exports = {
    moviesList,
    newMovie,
    getMovieById,
    updateMovieById
}



