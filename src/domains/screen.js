const prisma = require("../utils/prisma");

const fetchAllScreensDb = async () => await prisma.screen.findMany();

const deployScreenDb = async (request) => {
  const { number, screenings } = request;

  const dataToCreate = {};

  if (number) {
    dataToCreate.number = number;
  }

  if (screenings) {
    dataToCreate.screenings = {
      create: {
        movieId: screenings.movieId,
        screenId: screenings.screenId,
        startsAt: screenings.startsAt,
      },
    };
  }

  const createdScreen = await prisma.screen.create({
    data: dataToCreate,
    include: {
      screenings: true,
    },
  });

  return createdScreen;
};

module.exports = {
  fetchAllScreensDb,
  deployScreenDb,
};