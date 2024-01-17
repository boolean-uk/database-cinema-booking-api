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

module.exports = {
  selectMovies,
};
