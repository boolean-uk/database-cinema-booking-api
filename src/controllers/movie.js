const { Prisma } = require("@prisma/client");
const { request } = require("express");
const prisma = require("../utils/prisma");
const { buildRuntimeClause, errorMessages } = require("./utils");

const getAllMovies = async (req, res) => {
  console.log("Queries: ", req.query);
  const base = { include: { screenings: true } };
  const query = buildRuntimeClause(req.query, base);

  const movies = await prisma.movie.findMany(query);
  res.status(200).json({ movies });
};

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({ error: errorMessages.missingField });
  }

  // const found = await prisma.movie.findUnique({
  //   where: {
  //     title,
  //   },
  // });
  // if (found) {
  //   return res.status(409).json({ error: errorMessages.movieExists });
  // }
  const screenings = [
    {
      // movieId: 17,
      screenId: 1,
      startsAt: new Date(),
    },
  ];
  let movieData = { title, runtimeMins };
  if (screenings) {
    movieData = { ...movieData, screenings: { create: screenings } };
  }

  try {
    const createdMovie = await prisma.movie.create({
      data: movieData,
      include: {
        screenings: true,
      },
    });

    // if (screenings) {
    //   await prisma.screening.create({
    //     data: {
    //       movieId: createdMovie.id,
    //       screenId: 1,
    //       startsAt: new Date(),
    //     },
    //   });
    // }

    // const movie = await prisma.movie.findUnique({
    //   where: {
    //     id: createdMovie.id,
    //   },
    //   include: {
    //     screenings: true,
    //   },
    // });

    res.status(201).json({ movie: createdMovie });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({ error: errorMessages.movieExists });
      }
    }
    console.log("Error: " + err);
    return res.json({ error: err });
  }
};

const getMovieById = async (req, res) => {
  const movie = await prisma.movie.findUnique({
    where: {
      id: Number(req.params.id),
    },
    include: {
      screenings: true,
    },
  });
  res.json({ movie: movie });
};

const updateMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;
  const movie = await prisma.movie.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      title,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });

  res.status(201).json({ movie });
};

module.exports = { getAllMovies, createMovie, getMovieById, updateMovie };
