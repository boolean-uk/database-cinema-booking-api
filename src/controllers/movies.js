const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    res.json({ movies });
  } catch (error) {}
};

const getMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json({ movie });
  } catch (error) {}
};

const createMovie = async (req, res) => {
  const { title, runtimeMins, screenings } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
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
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }
  
  try {
    const movie = await prisma.movie.update({
      data: {
        title,
        runtimeMins,
      },
      where: {
        id: Number(id),
      },
      include: {
        screenings,
      },
    });
    res.status(201).json({ movie });
  } catch (error) {}
};

module.exports = { getAllMovies, createMovie, getMovie, updateMovie };
