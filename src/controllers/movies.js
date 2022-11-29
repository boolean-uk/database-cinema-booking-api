const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const { MissingFieldsError } = require("../utils/errors");
const { movie } = require("../utils/prisma");

const getMovies = async (req, res) => {
  const { runtimeLt, runtimeGt } = req.query;

  const movies = await prisma.movie.findMany({
    where: {
      runtimeMins: {
        lt: runtimeLt ? Number(runtimeLt) : undefined,
        gt: runtimeGt ? Number(runtimeGt) : undefined,
      },
    },
    include: {
      screenings: true,
    },
  });
  res.json({ movies: movies });
};

const createMovie = async (req, res) => {
  const { title, runtimeMins, screenings } = req.body;
  let includeScreenings;
  if (!title || !runtimeMins) {
    throw new MissingFieldsError();
  }

  if (screenings) {
    includeScreenings = {
      createMany: {
        data: screenings.map(({ screenId, startsAt }) => ({
          screenId,
          startsAt: new Date(startsAt),
        })),
      },
    };
  }

  const createdMovie = await prisma.movie.create({
    data: {
      title: title,
      runtimeMins: runtimeMins,
      screenings: screenings ? includeScreenings : undefined,
    },
    include: { screenings: true },
  });

  res.status(201).json({ movie: createdMovie });
};

const getMovieById = async (req, res) => {
  console.log(req.params.id);
  let id;
  let title;
  if (isNaN(Number(req.params.id))) {
    id = 9999;
    title = req.params.id;
  } else {
    id = Number(req.params.id);
    title = "Not a real movie, help me with this functionality!!!";
  }

  const movie = await prisma.movie.findFirst({
    where: {
      OR: [
        {
          title: {
            equals: title,
          },
        },
        {
          id: {
            equals: id,
          },
        },
      ],
    },
    include: { screenings: true },
  });
  if (movie.length === 0) {
    throw new Error("A movie with the provided title or id does not exist");
  }
  res.json({ movie: movie });
};

const updateMovie = async (req, res) => {
  const movieId = Number(req.params.id);
  const { title, runtimeMins, screenings } = req.body;
  console.log(req.body)

  if (!title || !runtimeMins) {
    throw new MissingFieldsError();
  }


  const updatedMovie = await prisma.movie.update({
    where: { id: movieId },
    data: {
      title: title,
      runtimeMins: runtimeMins,
      },
      include: { screenings: true },
    });

    console.log(updatedMovie.screenings.filter(() => ))

  screenings?.forEach(async screening => {
    await prisma.screening.update({
      where: {
        movieId: movieId,

      },
      data: {
        screenId: screening.screenId,
        startsAt: new Date(screening.startsAt)
      }
    })
  })
  
  res.status(201).json({ movie: updatedMovie });
};

module.exports = {
  getMovies,
  createMovie,
  getMovieById,
  updateMovie,
};
