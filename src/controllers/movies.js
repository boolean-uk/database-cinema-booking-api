const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const getAllMovies = await prisma.movie.findMany({
    include: { screenings: true },
  });
  res.status(200).json({ movies: getAllMovies });
};

const getMovieById = async (req, res) => {
  const { id } = req.params;

  const getByMovie = await prisma.movie.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      screenings: true,
    },
  });
  res.status(200).json({ movie: getByMovie });
};


const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try{

  const createdMovie = await prisma.movie.create({
    data: {
      title,
      runtimeMins,
      screenings: {
        connect: {
          id: 1,
        },
      },
    },
    include: {
      screenings: true,
    },
  });

  res.status(201).json({ movie: createdMovie });
} catch (e) {

  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === "P2002") {
      return res
        .status(409)
        .json({ error: "A movie with the provided email already exists" });
    }
  }

  res.status(500).json({ error: e.message });
}
};

const updateMovieById = async (req, res) => {
  const { id } = req.params;
  const { title, runtimeMins } = req.body;

  const updatedMovie = await prisma.movie.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });

  res.status(201).json({ movie: updatedMovie });
};

module.exports = {
  getMovies,
  createMovie,
  getMovieById,
  updateMovieById,
};
