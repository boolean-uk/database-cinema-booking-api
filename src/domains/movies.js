const prismaInstance = require("../utils/prisma");

const retrieveMovieByIdDb = async (identifier) => {
  return await prismaInstance.movie.findMany({
    where: {
      id: identifier,
    },
    include: {
      showings: true,
    },
  });
};

const insertMovieDb = async (filmTitle, durationMinutes) => {
  return await prismaInstance.movie.create({
    data: {
      title: filmTitle,
      durationMinutes: durationMinutes,
    },
    include: {
      showings: true,
    },
  });
};

const modifyMovieByIdDb = async (identifier, requestPayload, runtimeMins) => {
  return await prisma.movie.update({
    where: {
      id: identifier,
    },
    data: {
      title: requestPayload,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
};

const fetchAllMoviesDb = async ({ identifier }) => {
  return await prisma.movie.findUnique({
    where: {
      id: identifier,
    },
    include: {
      screenings: true,
    },
  });
};

module.exports = {
  retrieveMovieByIdDb,
  insertMovieDb,
  fetchAllMoviesDb,
  modifyMovieByIdDb,
};
