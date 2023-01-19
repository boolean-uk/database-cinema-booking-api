const { Prisma } = require("@prisma/client");
const { screening } = require("../utils/prisma");
const prisma = require("../utils/prisma");

const getAllMovies = async (req, res) => {
  const { runtimeLt, runtimeGt } = req.query;

  try {
    if (runtimeGt && runtimeLt) {
      const movies = await prisma.movie.findMany({
        select: {
          title: true,
          runtimeMins: true,
          screenings: true,
        },
        where: {
          AND: [
            {
              runtimeMins: {
                gte: Number(runtimeGt),
              },
            },
            {
              runtimeMins: {
                lte: Number(runtimeLt),
              },
            },
          ],
        },
      });
      res.json({ movies });
      return;
    }

    if (runtimeLt) {
      const movies = await prisma.movie.findMany({
        select: {
          title: true,
          runtimeMins: true,
          screenings: true,
        },
        where: {
          runtimeMins: {
            lte: Number(runtimeLt),
          },
        },
      });
      res.json({ movies });
      return;
    }

    if (runtimeGt) {
      const movies = await prisma.movie.findMany({
        select: {
          title: true,
          runtimeMins: true,
          screenings: true,
        },
        where: {
          runtimeMins: {
            gte: Number(runtimeGt),
          },
        },
      });
      res.json({ movies });
      return;
    }

    const movies = await prisma.movie.findMany({
      select: {
        title: true,
        runtimeMins: true,
        screenings: true,
        // screenings: {
        //   where: {
        //     startsAt: {
        //       gt: new Date(),
        //     },
        //   },
        // },
      },
      // where: { screenings: { some: {} } },
    });

    res.json({ movies });
  } catch (error) {}
};

const getMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const screenings = await prisma.screening.findMany({
      where: {
        movieId: Number(id),
      },
    });
    const movie = await prisma.movie.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!movie) {
      res.status(404).json({
        error: "Movie with that id or title does not exist",
      });
    }
    res.json({ movie: { ...movie, screenings } });
  } catch (error) {}
};

const createMovie = async (req, res) => {
  const { title, runtimeMins, screenings } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }
  const foundMovie = await prisma.movie.findFirst({
    where: {
      title: title,
    },
  });
  if (foundMovie) {
    return res.status(409).json({
      error: "A movie with the provided title already exists",
    });
  }

  try {
    const createdMovie = await prisma.movie.create({
      data: {
        title,
        runtimeMins,
        screenings: {
          create: screenings,
        },
      },
      include: {
        screenings,
      },
    });

    res.status(201).json({ movie: createdMovie });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(409)
          .json({ error: "A movie with the provided title already exists" });
      }
    }

    res.status(500).json({ error: e.message });
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, runtimeMins, screenings } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  const foundMovie = await prisma.movie.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!foundMovie) {
    res.status(404).json({
      error: "Movie with that id does not exist",
    });
  }

  const alreadyExists = await prisma.movie.findFirst({
    where: {
      title: title,
    },
  });

  if (alreadyExists) {
    return res.status(409).json({
      error: "A movie with the provided title already exists",
    });
  }
  try {
    const movie = await prisma.movie.update({
      data: {
        title,
        runtimeMins,
        screenings: {
          update: screenings,
        },
      },
      where: {
        id: Number(id),
      },
      include: {
        screenings,
      },
    });

    res.status(201).json({ movie });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllMovies, createMovie, getMovie, updateMovie };
