const { PrismaClient, PrismaClientKnownRequestError } = require("@prisma/client"); // Import PrismaClient and PrismaClientKnownRequestError
const prisma = new PrismaClient(); // Save as Prisma

// Getting all the movies
const getMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        screenings: true,
      },
    });
    res.status(200).json({ movies });
  } catch (e) {
    // Log the error for debugging purposes
    console.error('Error fetching movies:', e);

    if (e instanceof PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      return res.status(400).json({ error: 'A known error occurred while fetching movies.' });
    }

    res.status(500).json({ error: e.message });
  }
};

// Creating a new movie
const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }

  // Try-catch is a very common way to handle errors in JavaScript.
  // It allows us to customise how we want errors that are thrown to be handled.
  // Read more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch

  // Here, if Prisma throws an error in the process of trying to create a new movie,
  // instead of the Prisma error being thrown (and the app potentially crashing) we exit the
  // `try` block (bypassing the `res.status` code) and enter the `catch` block.
  try {
    const newMovie = await prisma.movie.create({
      data: {
        title,
        runtimeMins,
      },
      include: {
        screenings: true,
      },
    });
    res.status(201).json({ movie: newMovie });
  } catch (e) {
    // Log the error for debugging purposes
    console.error('Error creating movie:', e);

    if (e instanceof PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      if (e.code === 'P2002') {
        return res.status(409).json({ error: 'A movie with the provided title already exists' });
      }
    }

    res.status(500).json({ error: e.message });
  }
};

// Getting a movie by ID
const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await prisma.movie.findUnique({
      where: { id: Number(id) },
      include: {
        screenings: true,
      },
    });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({ movie });
  } catch (e) {
    // Log the error for debugging purposes
    console.error('Error fetching movie by ID:', e);

    if (e instanceof PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      return res.status(400).json({ error: 'A known error occurred while fetching the movie by ID.' });
    }

    res.status(500).json({ error: e.message });
  }
};

// Updating a movie by ID
const updateMovieById = async (req, res) => {
  const { id } = req.params;
  const { title, runtimeMins } = req.body;

  try {
    const updatedMovie = await prisma.movie.update({
      where: { id: Number(id) },
      data: {
        title,
        runtimeMins,
      },
      include: {
        screenings: true,
      },
    });

    res.status(201).json({ movie: updatedMovie });
  } catch (e) {
    // Log the error for debugging purposes
    console.error('Error updating movie:', e);

    if (e instanceof PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      return res.status(400).json({ error: 'A known error occurred while updating the movie.' });
    }

    res.status(500).json({ error: e.message });
  }
};

// Exporting the functions
module.exports = {
  getMovies,
  createMovie,
  getMovieById,
  updateMovieById,
};
