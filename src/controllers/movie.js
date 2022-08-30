const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

// GET read all movies (including screenings)
const getMovies = async (req, res) => {
  // res.json({ msg: `I'm all hooked up` });
  const movies = await prisma.movie.findMany(
    {include: {screenings: true}}
    );
  res.json({movies: movies});
}; 

// GET read a movie by id

// POST create a movie

// PUT update a movie

module.exports = {
  getMovies,
};
