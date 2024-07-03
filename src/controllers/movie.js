const { getAllMovies, createMovie, updateMovie, getAllMoviesByRuntimeLt, getAllMoviesByRuntimeGt, getMovieByTitle } = require('../domains/movie.js')
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime/library')

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
    const {
        title,
        runtimeMins
    } = req.body

    if (!title || !runtimeMins) {
        return res.status(400).json({
            error: "Movie title or runtimeMins field missing"
        })
    } 
    if (getMovieByTitle(title) === true) {
        return res.status(409).json({
            error: "Movie already exists, please choose another to add"
        })
    } 
    try {
        const newMovie = await createMovie(req)
        
        res.status(201).json({
            movie: newMovie
        })
    } catch(e) {
        if(e.code === "P2002") {
            return res.status(409).json({
                error: "Movie already exists, please choose another to add"
            })
        }
        res.status(500).json({
            error: e.message
        })
    }
}

const findByID = async (req, res) => {
    const id = Number(req.params.id)
    const found = await findMovieByID(id)
    if (!found) {
        throw new DoesNotExist("Could not find this movie")
    } else {
        res.status(200).json({
            movie: found
        })
    }    
}

const updateMovieByID = async (req, res) => {
    const {
        title,
        runtimeMins
    } = req.body
    if (!title || !runtimeMins) {
        return res.status(400).json({
            error: "Movie title or runtimeMins field missing"
        })
    } 
    if (!findMovieByID(req.params.id)) {
        return res.status(404).json({
            error: "Could not find this movies, try another ID"
        })
    } 
    if (getMovieByTitle(title) === true) {
        return res.status(409).json({
            error: "Movie already exists, please choose another to add"
        })
    } 
    try {
        const updatedMovie = await updateMovie(req)
        res.status(201).json({
        movie: updatedMovie
        })
    } catch(e) {
        if (e instanceof PrismaClientKnownRequestError) {
            if(e.code === "P2002") {
                return res.status(409).json({
                    error: "Movie already exists, please choose another to add"
                })
            } else if (e.code === "P2001") {
                return res.status(404).json({
                    error: "Could not find this movies, try another ID"
                })
            }
        }

        res.status(500).json({
            error: e.message
        })
    }
}

const findMovieByID = async (id) => {
    const found = (await getAllMovies()).find((m) => m.id === id)
    return found
}

const findMovieByTitle = async (title) => {
    const found = (await getAllMovies()).find((m) => m.title === title)
    return found
}

module.exports = {
    getAll,
    addMovie,
    findByID,
    updateMovieByID
}