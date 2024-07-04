const { 
    getAllMovies,
    createMovie,
    updateMovie,
    getAllMoviesByRuntimeLt,
    getAllMoviesByRuntimeGt,
    getMovieByTitle,
    getMovieById 
} = require('../domains/movie.js')

const { PrismaClientKnownRequestError } = require('@prisma/client/runtime/library')

const getAll = async (req, res) => {
    const { runtimeLt,runtimeGt } = req.query
    let allMovies

    if(runtimeGt) {
        allMovies = await getAllMoviesByRuntimeGt(Number(runtimeGt))
    }
    if (runtimeLt) {
        allMovies = await getAllMoviesByRuntimeLt(Number(runtimeLt))
    }
    allMovies = await getAllMovies()
    
    res.status(200).json({
        movies: allMovies
    })
}

const addMovie = async (req, res) => {
    const {
        title,
        runtimeMins
    } = req.body

    const titleFound = await getMovieByTitle(title)

    if (!title || !runtimeMins) {
        return res.status(400).json({
            error: "Movie title or runtimeMins field missing"
        })
    } 
    if (titleFound) {
        return res.status(409).json({
            error: "Movie with that title already exists"
        })
    } 
    try {
        const newMovie = await createMovie(title, runtimeMins)
        
        res.status(201).json({
            movie: newMovie
        })
    } catch(e) {
        if(e instanceof PrismaClientKnownRequestError) {
            if(e.code === "P2002") {
                return res.status(409).json({
                    error: "Movie with that title already exists"
                })
            }
            res.status(500).json({
                error: e.message
            })
        }   
    }
}

const findByID = async (req, res) => {
    const id = Number(req.params.id)
    const found = await getMovieById(id)
    if (!found) {
        return res.status(404).json({
            error: "Could not find movie with that ID"
        })
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
    const id = Number(req.params.id)
    const foundId = await getMovieById(id)
    const foundTitle = await getMovieByTitle(title)
    if (!title || !runtimeMins) {
        return res.status(400).json({
            error: "Movie title or runtimeMins field missing"
        })
    } 
    if (!foundId) {
        return res.status(404).json({
            error: "Could not find movie with that ID"
        })
    } 
    if (foundTitle) {
        return res.status(409).json({
            error: "Movie with that title already exists"
        })
    } 
    try {
        const updatedMovie = await updateMovie(id, title,
            runtimeMins)
        res.status(201).json({
        movie: updatedMovie
        })
    } catch(e) {
        if (e instanceof PrismaClientKnownRequestError) {
            if(e.code === "P2002") {
                return res.status(409).json({
                    error: "Movie with that title already exists"
                })
            } else if (e.code === "P2001") {
                return res.status(404).json({
                    error: "Could not find movie with that ID"
                })
            }
        }
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports = {
    getAll,
    addMovie,
    findByID,
    updateMovieByID
}