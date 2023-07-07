const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getAllMovies = async (req, res) => {
  let { runtimeLt, runtimeGt } = req.query;
  const conditions = {};
  const now = new Date();

  if (runtimeLt && runtimeGt) {
    runtimeLt = Number(runtimeLt);
    runtimeGt = Number(runtimeGt);
    conditions.runtimeMins = { gt: runtimeGt, lt: runtimeLt };
  } else if (runtimeLt) {
    runtimeLt = Number(runtimeLt);
    conditions.runtimeMins = { lt: runtimeLt };
  } else if (runtimeGt) {
    runtimeGt = Number(runtimeGt);
    conditions.runtimeMins = { gt: runtimeGt };
  }

  const getAllMovies = await prisma.movie.findMany({
    where: {
      AND: [
        conditions,
        {
          OR: [
            {
              screenings: {
                some: {
                  startsAt: {
                    gt: now,
                  },
                },
              },
            },
            {
              screenings: {
                none: {},
              },
            },
          ],
        },
      ],
    },
    include: { screenings: true },
  });

  res.json({ movies: getAllMovies });
};

const createMovie = async (req, res) => {
  const { title, runtimeMins, screenings } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  const findTitle = await prisma.movie.findFirst({
    where: { title: title },
  });

  if (!findTitle) {
    if (!screenings) {
      const createMovie = await prisma.movie.create({
        data: {
          title,
          runtimeMins,
        },

        include: {
          screenings: true,
        },
      });

      res.status(201).json({ movie: createMovie });
    } else {
      const createMovie = await prisma.movie.create({
        data: {
          title,
          runtimeMins,
          screenings: {
            create: screenings,
          },
        },
        include: {
          screenings: true,
        },
      });

      res.status(201).json({ movie: createMovie });
    }
  } else {
    return res
      .status(409)
      .json({ error: "A movie with the provided title already exists" });
  }
};

const getMovieID = async (req, res) => {
  const { id } = req.params;

  const movie = await prisma.movie.findFirst({
    where: {
      OR: [
        {
          id: Number(id) || undefined,
        },
        {
          title: id,
        },
      ],
    },
    include: {
      screenings: true,
    },
  });

  if (movie) {
    return res.json({ movie: movie });
  }

  return res
    .status(404)
    .json({ error: "Movie with that id or title does not exist" });
};

const updateMovie = async (req, res) => {
  let { id } = req.params;
  id = Number(id);
  const { title, runtimeMins } = req.body;

  if (!title && !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  const findMovie = await prisma.movie.findUnique({
    where: { id: id },
  });

  if (findMovie) {
    const findTitle = await prisma.movie.findFirst({
      where: { title: title },
    });
    if (!findTitle) {
      const updateMovie = await prisma.movie.update({
        where: {
          id: id,
        },
        data: {
          title: title,
          runtimeMins: runtimeMins,
        },
        include: {
          screenings: true,
        },
      });

      res.status(201).json({ movie: updateMovie });
    } else {
      return res.status(409).json({
        error: "Movie with that title already exists",
      });
    }
  } else {
    return res.status(404).json({
      error: "Movie with that id does not exist",
    });
  }
};
module.exports = {
  getAllMovies,
  getMovieID,
  createMovie,
  updateMovie,
};
