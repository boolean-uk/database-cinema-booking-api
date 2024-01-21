const prisma = require("../utils/prisma.js");

const getMovieListDb = async () =>
  await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });

module.exports = { getMovieListDb };
