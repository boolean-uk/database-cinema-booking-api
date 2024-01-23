const prisma = require("../utils/prisma");

const getAllMoviesDb = async () => {

  return await prisma.movie.findMany({
    include: {
      screenings: true
    }
  });
};

const createNewMoviesDb = async (title, runtimeMins) => {
  return await prisma.movie.create({
    data: {
      title,
      runtimeMins,

    },
    include: {
      screenings: true
    }
  });
}

const getMovieByIdDb = async (id) => {
 
  return await prisma.movie.findUnique({
    where:{
      id ,
    }

  })
}

const updateMovieByIdDb = async (id,title,runtimeMins) => {

  return await prisma.movie.update({

    where: {
      id,
    },
    data: {
      title,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  })
}

module.exports = { getAllMoviesDb, createNewMoviesDb ,getMovieByIdDb ,updateMovieByIdDb};
