// const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

// const getMoviesData = async () => {
//   const movies = await prisma.movie.findMany();
//   return {movies}
// };

const getMoviesData = async (runtimeLt, runtimeGt) => {
  if (runtimeLt !== undefined && runtimeGt !== undefined) {
    const movies = await prisma.movie.findMany({
      where: {
        OR: [
          {
            runtimeMins: {
              lt: Number(runtimeLt),
            },
          },
          {
            runtimeMins: {
              gt: Number(runtimeGt),
            },
          },
        ],
      },
      include: {
        screenings: true,
      },
    });
    console.log("both");
    return { movies };
  } else if (runtimeLt !== undefined) {
    const movies = await prisma.movie.findMany({
      where: {
        runtimeMins: {
          lt: Number(runtimeLt),
        },
      },
      include: {
        screenings: true,
      },
    });
    console.log("less than");
    return { movies };
  } else if (runtimeGt !== undefined) {
    const movies = await prisma.movie.findMany({
      where: {
        runtimeMins: {
          gt: Number(runtimeGt),
        },
      },
      include: {
        screenings: true,
      },
    });
    console.log("greater than");
    return { movies };
  } else {
    const movies = await prisma.movie.findMany({
      include: {
        screenings: true,
      },
    });
    console.log("neither");
    return { movies };
  }
};

const getMovieDataById = async (id) => {
  const movie = await prisma.movie.findUnique({
    where: {
      id,
    },
    include: {
      screenings: true,
    },
  });
  return { movie };
};

const createMovieData = async (title, runtimeMins) => {
  const new_movie = await prisma.movie.create({
    data: {
      title,
      runtimeMins,
    },
  });

  const movie_with_screen = getMovieDataById(new_movie.id);
  return movie_with_screen;
};

const updateMovieData = async (id, title, runtimeMins) => {
  const update_movie = await prisma.movie.update({
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
  });
  return update_movie;
};

module.exports = {
  getMoviesData,
  getMovieDataById,
  createMovieData,
  updateMovieData,
};
