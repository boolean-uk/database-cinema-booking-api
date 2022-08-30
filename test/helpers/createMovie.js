const prisma = require('../../src/utils/prisma');

const createMovie = async (title, runtimeMins, screen = null) => {
  const movieData = {
    data: {
      title: title,
      runtimeMins: runtimeMins,
    },
    include: {
      screenings: true,
    },
  };

  if (screen) {
    movieData.data.screenings = {
      create: [
        {
          startsAt: '2022-06-11T18:30:00.000Z',
          screenId: screen.id,
        },
      ],
    };
  }

  return await prisma.movie.create(movieData);
};

module.exports = {
  createMovie,
};
