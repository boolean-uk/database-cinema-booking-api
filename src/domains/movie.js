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
            lt: runtimeLt,
          },
        },
        {
          runtimeMins: {
            gt: runtimeGt,
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
  return await prisma.movie.create({
    data: {
      title: title,
      runtimeMins: runtimeMins,
      screenings: {
        create: screenings.map((screening) => ({
          startsAt: screening.startsAt,
          screenId: screening.screenId,
        }))
      },
    },
    include: { screenings: true },
  });
}

const getMovieByIdDb = async (id) => await prisma.movie.findUnique({
  where: {
    id: id
  }, 
  include: {screenings: true}
})

const getMovieByTitleDb = async (title) => await prisma.movie.findMany({
  where: {
    title: title
  }, 
})

const updateMovieDb = async (id, data) => await prisma.movie.update({
  where: {
    id: id
  }, 
  data: {
    title: data.title,
    runtimeMins: data.runtimeMins
  }, 
  include: {
    screenings: true
  }

}) 
module.exports = {
  getMoviesDb,
  getMoviesWhereLtDb,
  getMoviesWhereGtDb,
  getMoviesWhereAndDb,
  createMovieDb,
  createMovieWithScreeningsDb, 
  getMovieByIdDb, 
  updateMovieDb, 
  getMovieByTitleDb
};
