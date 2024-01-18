const prisma = require("../utils/prisma");

const getScreenByDb = async (number) => {
  await prisma.screen.findUnique({
    where: {
      number:number
    }
  })
}

const createScreenDb = async (data) =>
  await prisma.screen.create({
    data: {
      number: data.number,
    },
  });

module.exports = {
  createScreenDb,
  getScreenByDb
};
