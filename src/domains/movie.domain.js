const prisma = require("../utils/prisma");

/**
 *
 * @param {Number} [runTimeLessThan]
 * @param {Number} [runTimeGreaterThan]
 * @returns
 */
async function selectMovies(runTimeLessThan, runTimeGreaterThan) {
  return await prisma.movie.findMany({
    where: {
      runtimeMins: {
        gt: runTimeGreaterThan,
        lt: runTimeLessThan,
      },
    },
  });
}

module.exports = {
  selectMovies,
};
