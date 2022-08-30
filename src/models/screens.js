const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');

const { SUCCESS, FAILED } = require('../utils/vars');

const createScreen = async (number, screeningsBody) => {
  try {
    const screen = await prisma.screen.create({
      data: {
        number,
        screenings: {
          create: screeningsBody,
        },
      },
      include: {
        screenings: true,
      },
    });

    return [SUCCESS, screen];
  } catch (err) {
    console.error('[DB ERROR]', err);
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return [FAILED, err.code];
    }
  }
};

module.exports = { createScreen };
