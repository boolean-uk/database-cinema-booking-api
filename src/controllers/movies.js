const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const min = Number(req.query.runtimeLt);
  const max = Number(req.query.runtimeGt);

  const request = {
    include: {
      screenings: true,
    },
  };

  if (min !== undefined && max !== undefined) {
    request.where = {
      runtimeMins: {
        gt: min,
        lt: max,
      },
    };
  } else if (min !== undefined) {
    request.where = {
      runtimeMins: {
        gt: min,
      },
    };
  } else if (max !== undefined) {
    request.where = {
      runtimeMins: {
        lt: max,
      },
    };
  }

  const movies = await prisma.movie.findMany(request);

  return res.status(200).json({ movies });
};

const createMovie = async (req, res) => {
  const movieTitle = req.body.title;
  const movieRunTime = req.body.runtimeMins;
  const screenings = req.body.screenings;

  if (!movieTitle || !movieRunTime) {
    return res.status(400).json({ error: "Missing or invalid Input field" });
  }

  const data = {
    data: {
      title: movieTitle,
      runtimeMins: movieRunTime,
    },
    include: {
      screenings: true,
    },
  };

  if (screenings !== undefined) {
    data.data.screenings = {
      create: screenings,
    };
  }

  try {
    const newMovie = await prisma.movie.create(data);
    res.status(201).json({ movie: newMovie });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(409)
          .json({ error: `A movie with title: ${movieTitle} already exists` });
      }
      res.status(500).json({ error: e.message });
    }
  }
};

const getMovieById = async (req, res) => {
  const movieId = Number(req.params.id);
  try {
    const movie = await prisma.movie.findUniqueOrThrow({
      where: {
        id: movieId,
      },
      include: {
        screenings: true,
      },
    });
    res.status(200).json({ movie });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return res
          .status(404)
          .json({ error: `Movie with id: ${movieId} does not exits` });
      }
      res.status(500).json({ error: e.message });
    }
  }
};

const updateMovieById = async (req, res) => {
  const movieId = Number(req.params.id);
  const updatedData = req.body;

  if (!updatedData.title || !updatedData.runtimeMins) {
    return res.status(400).json({ error: "Missing or invalid Input field" });
  }

  const data = {
    where: {
      id: movieId,
    },
    data: {
      title: updatedData.title,
      runtimeMins: updatedData.runtimeMins,
    },
    include: {
      screenings: true,
    },
  };

  if (updatedData.screenings !== undefined) {
    data.data.screenings = {
      create: updatedData.screenings,
    };
  }

  try {
    const updatedMovie = await prisma.movie.update(data);
    res.status(201).json({ movie: updatedMovie });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({
          error: `Movie with title: ${updatedData.title} already exists`,
        });
      }
      if (e.code === "P2025") {
        return res
          .status(404)
          .json({ error: `No movie with Id: ${movieId} found` });
      }
      res.status(500).json({ error: e.message });
    }
  }
};

module.exports = {
  getMovies,
  createMovie,
  getMovieById,
  updateMovieById,
};
