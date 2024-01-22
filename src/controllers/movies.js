const { PrismaClientKnownRequestError } = require("@prisma/client");
const { getAllMoviesDb } = require("../domains/movies.js");

const getAllMovies = async (req, res) => {
  const movies = await getAllMoviesDb()
  res.json ({movies})
}
 









module.exports = { getAllMovies };
