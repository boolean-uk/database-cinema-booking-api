// TODO: update how screenings are processed so that only one screen
// TODO: make screen.number unique
// exists for a given screen number
// TODO: update "udpateMovie" so that new screenings replace old ones instead of being added to them


const prisma = require("../utils/prisma");

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

  const updatedData = {
    title: data.title,
    runtimeMins: data.runtimeMins,
  };
  if (data.screenings) {
    updatedData.screenings = {
      create: data.screenings.map((screening) => ({
        startsAt: screening.startsAt,
        screen: {
          create: {
            number: screening.screen.number
          },
        },
      })),
    };
  }

  await prisma.movie.update({
    where: {
      id: id,
    },
    data: updatedData,
    include: {
      screenings: true,
    },
  });
  console.log(await prisma.screen.findMany())
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
