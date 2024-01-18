const prisma = require("../utils/prisma");
const Types = require("../utils/types.d");

/**
 * @param {Number} number
 * @returns {Promise<Types.Screen>}
 */
async function createScreen(number) {
  return await prisma.screen.create({
    data: {
      number,
    },
    include: {
      screenings: true,
    },
  });
}

/**
 * @param {Number} number
 * @param {Types.ScreeningWithScreen} screenings
 * @returns {Promise<Types.Screen>}
 */
async function createScreenAndScreenings(number, screenings) {
  return await prisma.screen.create({
    data: {
      number,
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
  createScreen,
  createScreenAndScreenings,
};
