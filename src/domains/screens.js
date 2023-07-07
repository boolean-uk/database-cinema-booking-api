const prisma = require("../utils/prisma");

async function createNewScreen(number) {
  const createdScreen = await prisma.screen.create({
    data: {
      number,
    },
  });
  console.log("createdScreen", createdScreen);
  return { createdScreen };
}

module.exports = { createNewScreen };
