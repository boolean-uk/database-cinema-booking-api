const prisma = require("../utils/prisma");
const { getScreensByDb, createScreenDb } = require("./screen");

const getMoviesDb = async () =>
  await prisma.movie.findMany({ include: { screenings: true } });
const getMoviesWhereGtDb = async (runtimeGt) =>
  await prisma.movie.findMany({
    where: {
      runtimeMins: {
        gt: runtimeGt,
      },
    },
  });
const getMoviesWhereLtDb = async (runtimeLt) =>
  await prisma.movie.findMany({
    where: {
      runtimeMins: {
        lt: runtimeLt,
      },
    },
  });
const getMoviesWhereAndDb = async (runtimeGt, runtimeLt) =>
  await prisma.movie.findMany({
    where: {
      AND: [
        {
          runtimeMins: {
            gt: runtimeGt,
          },
        },
        {
          runtimeMins: {
            lt: runtimeLt,
          },
        },
      ],
    },
  });

const createMovieDb = async (title, runtimeMins) =>
  await prisma.movie.create({
    data: {
      title: title,
      runtimeMins: runtimeMins,
      screenings: {
        create: [],
      },
    },
    include: { screenings: true },
  });

const createMovieWithScreeningsDb = async (title, runtimeMins, screenings) => {
  const data = {
    title: title,
    runtimeMins: runtimeMins,
  };
  const movieData = {
    data: data,
    include: {
      screenings: true,
    },
  };
  movieData.data.screenings = {
    create: screenings.map((screening) => ({
      startsAt: screening.startsAt,
      screen: {
        create: {
          number: 1,
        },
      },
    })),
  };

  return await prisma.movie.create(movieData);
};

const getMovieByIdDb = async (id) =>
  await prisma.movie.findUnique({
    where: {
      id: id,
    },
    include: { screenings: true },
  });

const getMovieByTitleDb = async (title) =>
  await prisma.movie.findMany({
    where: {
      title: title,
    },
  });

const updateMovieDb = async (id, data) => {
	//TODO: REFACTOR
  const { title, runtimeMins, screenings } = data;

  screenings.map(async (screening) => {
    const screen = screening.screen;
    const num = screen.number;
    const foundScreen = await getScreensByDb(num);
    if (foundScreen.length === 0) {
      createScreenDb(screen);
    }
  });

  const updatedData = { title, runtimeMins };

  if (screenings) {
    updatedData.screenings = {
      create: screenings.map((screening) => ({
        startsAt: screening.startsAt,
        screen: {
          connect: {
            number: screening.screen.number,
          },
        },
      })),
    };
  }

  await prisma.movie.update({
    where: { id },
    data: {
      screenings: {
        deleteMany: {}
      },
    },
    include: {
      screenings: { include: { screen: true } },
    },
  });

  const result = await prisma.movie.update({
    where: { id },
    data: updatedData,
    include: {
      screenings: { include: { screen: true } },
    },
  });
  return result;
};
module.exports = {
  getMoviesDb,
  getMoviesWhereLtDb,
  getMoviesWhereGtDb,
  getMoviesWhereAndDb,
  createMovieDb,
  createMovieWithScreeningsDb,
  getMovieByIdDb,
  updateMovieDb,
  getMovieByTitleDb,
};
