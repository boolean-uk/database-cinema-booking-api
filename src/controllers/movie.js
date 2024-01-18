const {
    getMoviesDB,
    createMovieDB,
    getMovieDB,
    updateMovieByIdDB,
} = require("../domains/movie.js");

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
    const id = Number(req.params.id);

    if (!id) {
        return res.status(400).json("Please provide an ID");
    }

    const foundMovie = await getMovieDB(id);
    if (foundMovie === null) {
        return res.status(404).json(`No movie found with id: ${req.params.id}`);
    }

    res.status(200).json({ movie: foundMovie });
};

const updateMovieById = async (req, res) => {
    const id = Number(req.params.id);
    const { title, runtimeMins } = req.body;
    const updatedMovie = await updateMovieByIdDB(id, title, runtimeMins);
    res.status(201).json({ movie: updatedMovie });
};

module.exports = {
    getMovies,
    createMovie,
    getMovie,
    updateMovieById,
};
