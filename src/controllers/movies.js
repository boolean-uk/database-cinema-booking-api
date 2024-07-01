const { PrismaClientKnownRequestError } = require("@prisma/client")
const { getMoviesDb } = require('../domains/movies.js')


async function getMovies(req, res) {
    console.log('in')
    const movies = await getMoviesDb()
    res.status(200).json({ movies })
  }



  module.exports = {
    getMovies
  }