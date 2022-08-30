const { Prisma } = require("@prisma/client");
const { request } = require("express");
const prisma = require("../utils/prisma");

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany();
  res.status(200).json({ movies });
};

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;
  const createdMovie = await prisma.movie.create({
    data: {
      title,
      runtimeMins,
    },
    include: {
      screenings: true,
    },
  });

  res.json({ movie: createdMovie });
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
