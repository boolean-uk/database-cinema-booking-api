const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getAllMovies = async (req, res) => {
  let { runtimeLt, runtimeGt } = req.query;
  if (runtimeLt) {
    runtimeLt = Number(runtimeLt);
    const getAllMovies = await prisma.movie.findMany({
      where: { runtimeMins: { lt: runtimeLt } },
      include: {
        screenings: true,
      },
    });
    res.json({ movies: getAllMovies });
  } else if (runtimeGt) {
    runtimeGt = Number(runtimeGt);
    const getAllMovies = await prisma.movie.findMany({
      where: { runtimeMins: { gt: runtimeGt } },
      include: {
        screenings: true,
      },
    });
    res.json({ movies: getAllMovies });
  } else {
    const getAllMovies = await prisma.movie.findMany({
      include: {
        screenings: true,
      },
    });
    res.json({ movies: getAllMovies });
  }
};

const createMovie = async (req, res) => {
  const { title, runtimeMins, startsAt } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  const findTitle = await prisma.movie.findFirst({
    where: { title: title },
  });

  if (!findTitle) {
    const createMovie = await prisma.movie.create({
      data: {
        title,
        runtimeMins,
        screenings: {
          startsAt,
        },
      },

      include: {
        screenings: true,
      },
    });

    res.status(201).json({ movie: createMovie });
  } else {
    return res
      .status(409)
      .json({ error: "A movie with the provided title already exists" });
  }
};

const getMovieID = async (req, res) => {
  let { id } = req.params;

  const getMovieTitle = await prisma.movie.findFirst({
    where: {
      title: id,
    },
    include: {
      screenings: true,
    },
  });

  if (getMovieTitle) {
    res.json({ movie: getMovieTitle });
  }

  if (isNaN(Number(id))) {
    return res
      .status(404)
      .json({ error: "Movie with that id or title does not exist" });
  }

  const getMovieByID = await prisma.movie.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      screenings: true,
    },
  });

  if (getMovieByID) {
    return res.json({ movie: getMovieByID });
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
