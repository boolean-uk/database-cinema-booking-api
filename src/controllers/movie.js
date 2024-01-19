const {
    getMoviesDB,
    createMovieDB,
    getMovieByIdDB,
    getMovieByTitleDB,
    updateMovieDB,
} = require("../domains/movie.js");
const { get } = require("../routers/movie.js");

const getMovies = async (req, res) => {
    const filter = {
        title: req.query.title,
        runtimeMins: req.query.runtimeMins,
        runtimeLt: req.query.runtimeLt,
        runtimeGt: req.query.runtimeGt,
    };
    console.log(filter);
    const movies = await getMoviesDB(filter);
    res.status(200).json({ movies: movies });
};

const createMovie = async (req, res) => {
    try {
        const { title, runtimeMins } = req.body;
        const filter = { title: title };
        const foundMovie = await getMoviesDB(filter);

        if (foundMovie.length !== 0) {
            return res
                .status(409)
                .json(`Failed to create movie: ${title} in use.`);
        }
        const newMovie = await createMovieDB(title, runtimeMins);
        res.status(201).json({ movie: newMovie });
    } catch (err) {
        const recievedColumns = Object.keys(req.body);
        res.status(400).json(
            `Failed to create movie. You must provide fields: title, runtimeMins. Only recieved: ${recievedColumns}`
        );
        return null;
    }
};

const getMovie = async (req, res) => {
    const identifier = req.params.identifier;

    if (isNaN(identifier)) {
        const foundMovie = await getMovieByTitleDB(identifier);
        return res.status(200).json({ movie: foundMovie });
    }
    
    const id = Number(req.params.identifier);
    if (!id) {
        return res.status(400).json("Please provide an ID");
    }
    
    const foundMovie = await getMovieByIdDB(id);
    if (foundMovie === null) {
        return res.status(404).json(`No movie found with id: ${id}`);
    }
    res.status(200).json({ movie: foundMovie });
};

const updateMovie = async (req, res) => {
    let movieToUpdate;
    const filter = {
        title: req.body.title,
        runtimeMins: req.body.runtimeMins,
        screenings: req.body.screenings,
    };

    const identifier = req.params.identifier;

    if (!isNaN(identifier)) {
        const id = Number(identifier);
        try {
            movieToUpdate = await getMovieByIdDB(id);
        } catch (err) {
            return res
                .status(404)
                .json(`Movie with id ${identifier} does not exist.`);
        }
    } else {
        try {
            movieToUpdate = await getMovieByTitleDB(identifier);
        } catch (err) {
            return res
                .status(409)
                .json(`Movie with title ${identifier} does not exist.`);
        }
    }

    try {
        const updatedMovie = await updateMovieDB(movieToUpdate, filter);
        res.status(201).json({ movie: updatedMovie });
    } catch (err) {
        res.status(400).json(
            `Missing fields required. Only ${filter} was entered.`
        );
    }
};

module.exports = {
    getMovies,
    createMovie,
    getMovie,
    updateMovie,
};
