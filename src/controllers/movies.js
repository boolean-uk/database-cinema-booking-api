const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getAllMovies = async (req, res) => {
  console.log('get movies');

  if (!req.query.runtimeLt && !req.query.runtimeGt) {
    const movies = await prisma.movie.findMany({
      include: {
        screenings: true,
      },
    });
  
    res.status(200).json({
      movies,
    });
  }

  if (req.query.runtimeLt) {
    const movies = await prisma.movie.findMany({
      where: {
        runtimeMins: {
          lt: Number(req.query.runtimeLt)
        }
      }
    })

    res.status(200).json({
      movies,
    });
  }

  if (req.query.runtimeGt) {
    const movies = await prisma.movie.findMany({
      where: {
        runtimeMins: {
          gt: Number(req.query.runtimeGt)
        }
      }
    })

    res.status(200).json({
      movies,
    });
  }

  if (req.query.runtimeLt && req.query.runtimeGt) {
    // + try
    const movies = await prisma.movie.findMany({
      where: {
        AND: [
          {
            runtimeMins: {
              lt: req.query.runtimeLt
            }
          },
          {
            runtimeMins: {
              gt: req.query.runtimeGt
            }
          }
        ]
      }
    })

    res.status(200).json({
      movies,
    });
  }
};

const createNewMovie = async (req, res) => {
  console.log("CREATING");
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }
  // if (title === "" && runtimeMins === "") {
  // }
  try {
    const createdMovie = await prisma.movie.create({
      data: {
        title,
        runtimeMins,
      },
    });
    res.status(201).json({ movie: createdMovie });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ error: "This Movie Already Exists" });
      }
    }
    res.status(500).json({ error: e.message });
  }
};

const getMovieById = async (req, res) => {
  const movieId = parseInt(req.params.id);
  console.log("movie id", movieId);

  if (!movieId) {
    return res.status(400).json({
      error: "ID does not exist",
    });
  }

  const foundMovie = await prisma.movie.findUnique({
    where: {
      id: movieId,
    },
    include: {
      screenings: true,
    },
  });
  res.status(200).json({ foundMovie });
};

const updateMovie = async (req, res) => {
  const movieId = parseInt(req.params.id);
  const { title, runtimeMins } = req.body;

  if (!movieId) {
    return res.status(400).json({
      error: "ID does not exist",
    });
  }

  const foundMovie = await prisma.movie.update({
    where: {
      id: movieId,
    },
    data: {
      title,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });
  res.status(201).json({
    foundMovie,
  });
};

module.exports = {
  getAllMovies,
  getMovieById,
  createNewMovie,
  updateMovie,
};
