const prisma = require("../../src/utils/prisma");

/**
 * @param {Number} screenId
 * @param {Number} movieId
 * @param {String} startsAt
 * @returns {Promise<import("@prisma/client").Screening>}
 */
async function createScreening(screenId, movieId, startsAt) {
  return await prisma.screening.create({
    data: {
      screenId,
      movieId,
      startsAt,
    },
  });
}

module.exports = {
  createScreening,
};
