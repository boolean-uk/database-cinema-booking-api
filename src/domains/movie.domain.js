const prisma = require("../utils/prisma");
const Types = require("../utils/types.d");

/**
 * @param {Number} [runTimeLessThan]
 * @param {Number} [runTimeGreaterThan]
 * @returns {Promise<Types.Movie[]>}
 */
async function selectMovies(runTimeLessThan, runTimeGreaterThan) {
  const runtimeWhere = {};

  if (typeof runTimeLessThan === "number") {
    runtimeWhere.lt = runTimeLessThan;
  }

  if (typeof runTimeGreaterThan === "number") {
    runtimeWhere.gt = runTimeGreaterThan;
  }

  return await prisma.movie.findMany({
    where: {
      runtimeMins: runtimeWhere,
    },
    include: {
      screenings: true,
    },
  });
}

/**
 * @param {Number} id
 * @returns {Promise<Types.Movie>}
 */
async function selectMovieById(id) {
  return await prisma.movie.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      screenings: true,
    },
  });
}

/**
 * @param {String} title
 * @param {Number} runtimeMins
 * @returns {Promise<Types.Movie>}
 */
async function createMovie(title, runtimeMins) {
  return await prisma.movie.create({
    data: {
      title,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
}

/**
 * @param {String} title
 * @param {Number} runtimeMins
 * @param {Types.ScreeningWithMovie[]} screenings
 * @returns {Promise<Types.Movie>}
 */
async function createMovieAndScreenings(title, runtimeMins, screenings) {
  return await prisma.movie.create({
    data: {
      title,
      runtimeMins,
      screenings: {
        create: screenings,
      },
    },
    include: {
      screenings: true,
    },
  });
}

module.exports = {
  selectMovies,
  selectMovieById,
  createMovie,
  createMovieAndScreenings,
};
