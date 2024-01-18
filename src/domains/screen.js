const prisma = require("../utils/prisma");

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
  getScreensByDb
};
