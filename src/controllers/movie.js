const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getMovies = async (req, res) => {
  try {
    const { runtimeLt, runtimeGt } = req.query;
    const movies = await prisma.movie.findMany({
      include: {
        screenings: true,
      },
      where: {
        runtimeMins: {
          lt: runtimeLt ? parseInt(runtimeLt) : undefined,
          gt: runtimeGt ? parseInt(runtimeGt) : undefined,
        },
      },
    });

    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({ error: 'Missing fields in request body' });
  }

  try {
    const existingMovie = await prisma.movie.findUnique({ where: { title } });
    if (existingMovie) {
      return res.status(409).json({ error: 'Movie with that title already exists' });
    }

    const createdMovie = await prisma.movie.create({
      data: {
        title,
        runtimeMins: parseInt(runtimeMins),
        screenings: { create: [] },
      },
      include: { screenings: true },
    });

    res.status(201).json({ movie: createdMovie });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await prisma.movie.findUnique({
      where: { id: parseInt(id) },
      include: { screenings: true },
    });

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.status(200).json({ movie });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({ error: 'Missing fields in request body' });
  }

  try {
    const existingMovie = await prisma.movie.findUnique({ where: { id: parseInt(id) } });
    if (!existingMovie) {
      return res.status(404).json({ error: 'Movie with that id does not exist' });
    }

    const updatedMovie = await prisma.movie.update({
      where: { id: parseInt(id) },
      data: {
        title,
        runtimeMins: parseInt(runtimeMins),
      },
      include: { screenings: true },
    });

    res.status(200).json({ movie: updatedMovie });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getMovies,
  createMovie,
  getMovieById,
  updateMovie,
};
