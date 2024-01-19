const { getMovieById } = require("../controllers/movie");
const { getAllMoviesDb, getMovieByIdDb } = require("../domains/movie");


const titleValidation =  async (title) => {
    const movies = await getAllMoviesDb()
    const foundMovie =  movies.find((movie) => movie.title === title);

    if(foundMovie) {
        throw errorCreator('A movie with the provided title already exists', 409)
    };
};


const fieldValidation = (allFields) => {
    allFields.forEach(field => {
        if(!field) {
            throw errorCreator('Missing fields in request body', 400)       
        }
    });
};


const validateId = (id) => {
    if (typeof id !== 'number' || isNaN(id)) {
        throw { status: 400, message: 'Please provide a valid parameter' };
    }
};

const doesMovieExit = (id) => {
    const foundMovie = getMovieByIdDb(id)
    if(!foundMovie) {
        return res.status(400).json({ error: 'Movie with that id or title does not exist' });
    }

}

module.exports = {
    titleValidation,
    fieldValidation,
    validateId,
    doesMovieExit
};