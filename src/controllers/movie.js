const {
    getAllMoviesDB,
    createMovieDB,
    getMovieByIdDB,
    updateMovieByIdDB,
} = require("../domains/movie.js");

const getAllMovies = async (req, res) => {
    const allMovies = await getAllMoviesDB();
    res.status(200).json({ movies: allMovies });
};

const createMovie = async (req, res) => {
    const { title, runtimeMins } = req.body;
    const newMovie = await createMovieDB(title, runtimeMins);
    res.status(201).json({ movie: newMovie });
};

const getMovieById = async (req, res) => {
    const id = Number(req.params.id);
    const foundMovie = await getMovieByIdDB(id);
    res.status(200).json({ movie: foundMovie });
};

const updateMovieById = async (req, res) => {
    const id = Number(req.params.id);
    const { title, runtimeMins } = req.body;
    const updatedMovie = await updateMovieByIdDB(id, title, runtimeMins);
    res.status(201).json({ movie: updatedMovie });
};

module.exports = {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovieById,
};
