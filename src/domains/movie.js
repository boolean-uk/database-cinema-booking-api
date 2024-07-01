const prisma = require("../utils/prisma")



const getAllMoviesDb = async () => {
    const allMovies = await prisma.movie.findMany()
    return allMovies
}


module.exports = {
    getAllMoviesDb
}