const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

// GET read all movies (including screenings)
const getMovies = async (req, res) => {
  // res.json({ msg: `I'm all hooked up` });
  // const includeScreenings = { include: { screenings: true } };
  const { runtimeLt, runtimeGt } = req.query;

  if (runtimeLt && runtimeGt) {
    // const includeScreenings = { include: { screenings: true } };
    const movies = await prisma.movie.findMany({
      where: {
        AND: [
          {runtimeMins: {lt: Number(runtimeLt),},},
          {runtimeMins: {gt: Number(runtimeGt),},},
        ],
      },
      include: {screenings: true,},
    });
      res.status(200).json({
        movies: movies,
      });
  } else if (runtimeLt) {
      const movies = await prisma.movie.findMany({
        where: {
          runtimeMins: {lt: Number(runtimeLt),},
        },
        include: {screenings: true,},
      });
      res.status(200).json({
        movies: movies
      });
    } else if(runtimeGt) {
      const movies = await prisma.movie.findMany({
        where: {
          runtimeMins: {gt: Number(runtimeGt),},
        },
        include: {screenings: true,},
      });
      res.status(200).json({
        movies: movies
      });
    } else {
      const movies = await prisma.movie.findMany({
        include: {
          screenings: true,
        },
      });
      res.status(200).json({
        movies,
      });
    }
  }
  
// GET read a movie by id
const getMovieById = async (req, res) => {
  const movieId = Number(req.params.id);
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
    include: { screenings: true },
  });
  res.json({ movie: movie });
};

// POST create a movie
// - Include the ability to create screenings for the movie if the request body has a screenings property. If that property doesn't exist in the request body, just create the movie. ()
// - 404 Missing field in request body (x)
// - 409 A movie with the provided title already exists (x)
const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

if ("screenings" in createMovie); {
  // allowing adding of values to screenings
} else {

  try {
    const createdMovie = await prisma.movie.create({
      data: {
        title,
        runtimeMins,
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
          .json({ error: "A movie with the provided title already exists" });
      }
    }
  }
    res.status(500).json({ error: e.message });
  }
};

// PUT update a movie
const updateMovie = async (req, res) => {
  const movieId = Number(req.params.id);
  const { title, runtimeMins} = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
  const updatedMovie = await prisma.movie.update({
    where: {
      id: movieId
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

}

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie
};
