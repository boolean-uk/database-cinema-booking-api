const prisma = require("../../src/utils/prisma");

async function createScreening(movie, screen, startTime) {
  const screeningData = {
    movieId: movie.id,
    screenId: screen.id,
    startsAt: startTime,
  };

  const screening = await prisma.screening.create({
    data: screeningData,
  });

  return screening
}

module.exports = {
  createScreening,
};
