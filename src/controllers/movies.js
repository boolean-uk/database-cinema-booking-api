

const { PrismaClientKnownRequestError } = require("@prisma/client");
const { getAllMoviesDb } = require("../domains/movies.js");

const getAllMovies = async (req, res) => {

  const movies = await getAllMoviesDb()
  res.status(200).json({movies})
}
 









module.exports = { getAllMovies };
