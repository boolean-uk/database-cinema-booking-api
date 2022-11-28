const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const { runtimeLt, runtimeGt } = req.query;
  try {
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
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const createMovie = async (req, res) => {
  const { title, runtimeMins, screenings } = req.body;
  let includeScreenings;
  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
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

  try {
    const createdMovie = await prisma.movie.create({
      data: {
        title: title,
        runtimeMins: runtimeMins,
        screenings: screenings ? includeScreenings : undefined,
      },
      include: { screenings: true },
    });

    res.status(201).json({ movie: createdMovie });
  } catch (e) {
    console.log(e.message);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(409)
          .json({ error: "A movie with the provided title already exists" });
      }
    }
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
};

const getMovieById = async (req, res) => {
  const queryParam = req.params.id.replace("%", " ");
  let id
  let title
  if (isNaN(Number(queryParam))) {
    id = 9999;
    title = queryParam
  } else {
    id = Number(queryParam);
    title = 'Not a real movie, help me with this functionality!!!'
  }

  try {
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
          }
        ],
      },
      include: { screenings: true },
    });
    if (movie.length === 0) {
      return res.status(404).json({error: "A movie with the provided title or id does not exist"});
    }
    res.json({ movie: movie });
  } catch (e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientValidationError) {
      if (e.code === "P2001") { // This does not work
        return res
          .status(404)
          .json({ error: "A movie with the provided title or id does not exist" });
      }
    }
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
};

const updateMovie = async (req, res) => {
  const movieId = Number(req.params.id);
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const updatedMovie = await prisma.movie.update({
      where: { id: movieId },
      data: { title: title, runtimeMins: runtimeMins },
      include: { screenings: true },
    });

    res.status(201).json({ movie: updatedMovie });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getMovies,
  createMovie,
  getMovieById,
  updateMovie,
};
