const prisma = require('../utils/prisma')

const moviesDb = async () => await prisma.movie.findMany({
    include: {
       screenings: true
    }
});


module.exports = {
    moviesDb
}