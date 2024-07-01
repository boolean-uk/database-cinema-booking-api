const { getAllMovies, createMovie, updateMovie, getAllMoviesByRuntimeLt, getAllMoviesByRuntimeGt } = require('../domains/movie.js')



const getAll = async (req, res) => {
    let allMovies
    if(!req.query.runtimeGt || !req.query.runtimeLt) {
        allMovies = (await getAllMovies()).map(m => m)
    } 
    if(req.query.runtimeGt) {
        allMovies = (await getAllMoviesByRuntimeGt(req.query.runtimeGt)).map(m => m)
    }
    if (req.query.runtimeLt) {
        allMovies = (await getAllMoviesByRuntimeLt(req.query.runtimeLt)).map(m => m)
    }
    
    res.status(200).json({
        movies: allMovies
    })
}

const addMovie = async (req, res) => {
    if (
        req.body.title === undefined ||
        req.body.title === "" ||
        req.body.runtimeMins === undefined ||
        req.body.runtimeMins === ""
    ) {
        throw new MissingFields("Movie title or runtimeMins field missing")
    }
    if (findMovieByTitle(req.body.title)) {
        throw new AlreadyExists("Movie already exists, please choose another to add")
    }
    const newMovie = await createMovie(req)

    res.status(201).json({
        movie: newMovie
    })
}

const findByID = async (req, res) => {
    const id = Number(req.params.id)
    const found = (await getAllMovies()).find((m) => m.id === id)
    if (!found) {
        throw new DoesNotExist("Could not find this movies")
    }
    res.status(200).json({
        movie: found
    })
}

const updateMovieByID = async (req, res) => {
    if (
        req.body.title === "" ||
        req.body.title === undefined ||
        req.body.runtimeMins === "" ||
        req.body.runtimeMins === undefined
    ) {
        throw new MissingFields("Movie title or runtimeMins field missing")
    }
    if (!findByID(req)) {
        throw new DoesNotExist("Could not find this movies")
    }
    if (findMovieByTitle) {
        throw new AlreadyExists("Movie already exists, please choose another to add")
    }
    const updatedMovie = await updateMovie(req)
    res.status(201).json({
        movie: updatedMovie
    })
}

const findMovieByTitle = async (title) => {
    const found = (await getAllMovies()).find((m) => m.title === title)
}

module.exports = {
    getAll,
    addMovie,
    findByID,
    updateMovieByID
}