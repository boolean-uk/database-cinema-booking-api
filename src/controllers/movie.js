const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

const getMovies = async (req, res) => {
  let {runtimeLt,runtimeGt}=req.query
  if (runtimeLt !== undefined) {
    runtimeLt = Number(runtimeLt)
  }
  if (runtimeGt !== undefined) {
    runtimeGt = Number(runtimeGt)
  }
  console.log("query", runtimeLt, runtimeGt)
  try {
    const movies = await prisma.movie.findMany({
      include: {
        screenings: true,
      },
      where: {
        runtimeMins: {
          lte: runtimeLt,
          gte: runtimeGt,
        },
      },
    });

    res.status(200).json({ movies });
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.message });
  }
};

const createMovie = async (req, res) => {
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }

  try {
    // const existingMovie = await prisma.movie.findUnique({ where: { title } });
    // if (existingMovie) {
    //   return res
    //     .status(409)
    //     .json({ error: "Movie with that title already exists" });
    // }

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
      console.error(error)
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return res.status(409).json({ error: "Movie with that title already exists" });
        }
      }
    res.status(500).json({ error: error.message });
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
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({ movie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }

  try {
    const existingMovie = await prisma.movie.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingMovie) {
      return res
        .status(404)
        .json({ error: "Movie with that id does not exist" });
    }

    const updatedMovie = await prisma.movie.update({
      where: { id: parseInt(id) },
      data: {
        title,
        runtimeMins: parseInt(runtimeMins),
      },
      include: { screenings: true },
    });

    res.status(201).json({ movie: updatedMovie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMovies,
  createMovie,
  getMovieById,
  updateMovie,
};
