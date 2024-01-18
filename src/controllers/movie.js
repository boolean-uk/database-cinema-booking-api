const { getMoviesDb,createMovieDb,getMovieByIdDb } = require("../domains/movie");

const getAllMovies = async (req,res) => {
    const movies = await getMoviesDb();
    return res.status(200).json({movies: movies});
}

const createMovie = async (req,res) => {
    try {
        const {title,runtimeMins,screenings} = req.body;
        const movie = await createMovieDb(title,runtimeMins,screenings);
        return res.status(201).json({movie: movie});
    }catch (err) {
        return res.status(400).json({error: err.message});
    }
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
    try {
        const filmId = Number(req.params.id);
        const {title,runtimeMins,screenings} = req.body;
        if (screenings === undefined) {
            return res.status(400).json({ error: "Screenings data is missing in the request body" });
        }

        const updatedMovie = await updateMovieDb(filmId,title,runtimeMins,screenings);
        if (!updatedMovie) {
            return res.status(404).json({error: "Movie not found"});
    
        }
        return res.status(201).json({movie: updatedMovie});
    }catch (err) {
        return res.status(404).json({error: err.message});
    }
}



module.exports = { getAllMovies,createMovie,getMovieById,updateMovie };