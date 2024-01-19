const { getMoviesDb,createMovieDb,getMovieByIdDb, updateMovieDb } = require("../domains/movie");

const getAllMovies = async (req,res) => {
    const movies = await getMoviesDb();
    return res.status(200).json({movies: movies});
}

const createMovie = async (req,res) => {
    const movie = await createMovieDb(req, res)
    return res.status(201).json({ movie })
}

const getMovieById = async (req,res) => {
    try {
        const filmId = Number(req.params.id);
        const movie = await getMovieByIdDb(filmId);
        if (!movie) {
            return res.status(404).json({error: "Movie not found"});
    
        }
        return res.status(200).json({movie: movie});
    }catch (err) {
        return res.status(404).json({error: err.message});
    }
}

const updateMovie = async (req,res) => {
    const movie = await updateMovieDb(req,res);
    return res.status(201).json({movie});
}




module.exports = { getAllMovies,createMovie,getMovieById,updateMovie };