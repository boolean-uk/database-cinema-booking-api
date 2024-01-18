const { getMoviesDb,getMovieByIdDb } = require("../domains/movie");

const getAllMovies = async (req,res) => {
    const movies = await getMoviesDb();
    return res.status(200).json({movies: movies});
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



module.exports = { getAllMovies,getMovieById };