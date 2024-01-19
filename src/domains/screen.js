const prisma = require("../utils/prisma");

const getScreensDb = async () => 
  await prisma.screen.findMany()

const getScreensByDb = async (number) => 
  await prisma.screen.findMany({
    where: {
      number:number
    }
  })

const createScreenDb = async (data) =>
  await prisma.screen.create({
    data: {
      number: data.number,
    },
  });

module.exports = {
  createScreenDb,
  getScreensByDb, 
  getScreensDb
};
