const prisma = require("../../src/utils/prisma");

async function createScreening(movie, screen, startTime) {
  const screeningData = {
    movieId: movie.id,
    screenId: screen.id,
    startsAt: startTime,
    include: {
      screen: true,
      movie: true,
    },
  };

  const screening = await prisma.screening.create({
    data: screeningData,
  });
}

module.exports = {
  createScreening,
};
