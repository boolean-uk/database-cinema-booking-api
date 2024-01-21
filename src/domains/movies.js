const prismaInstance = require("../utils/prisma");

const retrieveMovieByIdDb = async (identifier) =>
  await prismaInstance.movie.findUnique({
    where: {
      id: identifier,
    },
    include: {
      showings: true,
    },
  });

const insertMovieDb = async (filmTitle, durationMinutes) =>
  await prismaInstance.movie.create({
    data: {
      title: filmTitle,
      durationMinutes: durationMinutes,
    },
    include: {
      showings: true,
    },
  });

const modifyMovieByIdDb = async (requestPayload, identifier) => {
  const { filmTitle, durationMinutes, showings } = requestPayload;

  const dataToModify = {};

  if (filmTitle) {
    dataToModify.title = filmTitle;
  }

  if (durationMinutes) {
    dataToModify.durationMinutes = durationMinutes;
  }

  if (showings) {
    dataToModify.showings = {
      update: {
        movieId: showings.movieId,
        screenId: showings.screenId,
        startTime: showings.startTime,
      },
    };
  }

  const updatedFilm = await prismaInstance.movie.update({
    where: { id: identifier },
    data: dataToModify,
    include: {
      showings: true,
    },
  });

  return updatedFilm;
};

const fetchAllMoviesDb = async ({ durationLessThan, durationGreaterThan }) => {
  durationGreaterThan = parseInt(durationGreaterThan);
  durationLessThan = parseInt(durationLessThan);

  const filmQuery = {
    include: {
      showings: true,
    },
  };

  if (durationLessThan) {
    filmQuery.where = {
      durationMinutes: {
        lt: durationLessThan,
      },
    };
  }

  if (durationGreaterThan) {
    filmQuery.where = {
      durationMinutes: {
        gt: durationGreaterThan,
      },
    };
  }

  return await prismaInstance.movie.findMany(filmQuery);
};

module.exports = {
  retrieveMovieByIdDb,
  insertMovieDb,
  fetchAllMoviesDb,
  modifyMovieByIdDb,
};
