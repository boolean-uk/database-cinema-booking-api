const { PrismaClientKnownRequestError } = require("@prisma/client")

const {
    getAllMoviesDb,
    createMovieDb,
    createMovieWithScreeningDb,
    getMovieByIdDb,
    updateMovieByIdDb,
    // updateMovieByIdWithScreeningDb
} = require('../domains/movie');


const { 
    fieldValidation, 
    titleValidation ,
    validateId
} = require("../help/validation");



const getAllMovies = async (req, res) => {
    const { runtimeGt, runtimeLt } = req.query;

    try {
        const allMovies = await getAllMoviesDb(runtimeGt, runtimeLt);
        return res.status(200).json({movies: allMovies});
    } catch (error) {
        return res.status(error.status ?? 500).json({error: error.message});
    };
};



const createMovie = async (req, res) => {
    const { title, runtimeMins, screenings } = req.body;
    let createdMovie;

    try {
        fieldValidation([title, runtimeMins]);
        titleValidation(title);

        if(screenings) {
            createdMovie = await createMovieWithScreeningDb(title, runtimeMins, screenings);
        } else {
            createdMovie = await createMovieDb(title, runtimeMins);
        };

        return res.status(201).json({movie: createdMovie})

    } catch (error) {
        return res.status(error.status ?? 500).json({error: error.message})
    };
};



const getMovieById = async (req, res) => {
    const id = Number(req.params.id)

    try {
        validateId(id)

        const movieFound = await getMovieByIdDb(id)

        if(!movieFound) {
            return res.status(400).json({ error: 'Please provide a valid parameter' });
        }

        return res.status(200).json({movie: movieFound})
    } catch (error) {
        return res.status(error.status ?? 500).json({error: error.message})
    };
}


const updateMovieById = async (req, res) => {
    const id = Number(req.params.id)
    const {title, runtimeMins} = req.body

    let updatedMovie
    const movieFound = await getMovieByIdDb(id)

    console.log('this isthe movie before the if statment', movieFound)
    if(!movieFound) {
        return res.status(400).json({ error: 'Please provide a valid parameter' });
    }
    console.log('this is the movie after the if statement', movieFound )

    updatedMovie =  await updateMovieByIdDb(id, title, runtimeMins) 
    return res.status(201).json({movie: updatedMovie})
    
}
        



module.exports = {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovieById
};