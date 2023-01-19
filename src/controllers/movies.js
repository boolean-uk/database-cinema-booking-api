const { Prisma } = require("@prisma/client");
const e = require("express");
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
  if (!getByMovie) {
    return res
      .status(404)
      .json({ error: `Movie with that id or title does not exist` });
  }
  res.status(200).json({ movie: getByMovie });
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

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    console.log("giving back a res");
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
    console.log("UDPATED MOVIE IS: ", updatedMovie);
    if (!updatedMovie) {
      console.log("giving back a 404 res");
      return res
        .status(404)
        .json({ error: `Movie with that id does not exist` });
    }
    console.log("giving back a 201 res");
    res.status(201).json({ movie: updatedMovie });
  } catch (e) {
    console.log("Catch called");
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if ((e.code = "P2025")) {
        return res
          .status(404)
          .json({ error: "Movie with that id does not exist" });
      } else if (e.code === "P2002") {
        return res
          .status(409)
          .json({ error: "A movie with that title already exists" });
      }
    }

    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getMovies,
  createMovie,
  getMovieById,
  updateMovieById,
};
