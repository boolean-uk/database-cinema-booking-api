const prisma = require("../utils/prisma");

const getScreensDb = async () => await prisma.screen.findMany();

const getScreensByDb = async (number) =>
  await prisma.screen.findMany({
    where: {
      number: number,
    },
  });

const createScreenDb = async (data) =>
  await prisma.screen.create({
    data: {
      number: data.number,
    },
  });

const createScreenWithScreeningsDb = async (number, screenings) => {
  const screenData = { number };
  screenData.screenings = {
    create: screenings.map((screening) => ({
      startsAt: screening.startsAt,
      movie: {
        connect: {
          id: screening.movie.id,
        },
      },
    })),
  };
  return await prisma.screen.create({
    data: screenData,
    include: { screenings: true },
  });
};

module.exports = {
  createScreenDb,
  getScreensByDb,
  getScreensDb,
  createScreenWithScreeningsDb,
};
