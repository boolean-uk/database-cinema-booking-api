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
const getMovieById = async (req, res) => {
  const movieId = Number(req.params.id)
  const movie = await prisma.movie.findUnique({
    where: {id: movieId},
    include: {screenings: true}
  });
  res.json({movie: movie});
}

// const user = await prisma.user.findUnique({
//   where: {
//     id: 99,
//   },
// })

// POST create a movie

// PUT update a movie

module.exports = {
  getMovies, getMovieById
};
