const prisma = require("../utils/prisma");

async function createNewScreen(number) {
  const screen = await prisma.screen.create({
    data: {
      number,
    },
  });

  return {screen};
}

module.exports = { createNewScreen };
