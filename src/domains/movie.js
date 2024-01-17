const prisma = require("../utils/prisma")

const getMoviesDb = async () => await prisma.movie.findMany({
    include: {
      screenings: true
    }
});

module.exports = { getMoviesDb };