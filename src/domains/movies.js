const prisma = require("../utils/prisma");

const getAllMoviesDb = async () => {

  return await prisma.movie.findMany();
};

/*const createNewMoviesDb = async () => {

  return await prisma.movie.create();
};*/


module.exports = { getAllMoviesDb };
