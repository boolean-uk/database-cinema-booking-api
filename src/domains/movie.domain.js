const prisma = require("../utils/prisma");

/**
 *
 * @param {Number} [runTimeLessThan]
 * @param {Number} [runTimeGreaterThan]
 * @returns
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
  });
}

module.exports = {
  selectMovies,
};
