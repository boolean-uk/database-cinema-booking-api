const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    res.json({ movies });
  } catch (error) {}
};

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

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
      },
    });
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

module.exports = { getAllMovies, createMovie };
