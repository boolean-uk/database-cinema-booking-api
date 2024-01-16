const prisma = require("../utils/prisma");

const getMoviesDb = async () => await prisma.movie.findMany();
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

module.exports = {
  getMoviesDb,
  getMoviesWhereLtDb,
  getMoviesWhereGtDb,
  getMoviesWhereAndDb,
};
