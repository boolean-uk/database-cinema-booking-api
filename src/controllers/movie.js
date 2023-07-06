const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getAllMovies = async (req, res) => {
  const getAllMovies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });
  res.json({ movies: getAllMovies });
}

const createMovie = async (req, res) => {
  const { title, runtimeMins, startsAt } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {

    const createMovie = await prisma.movie.create({
      data: {
        title,
        runtimeMins, 
        screenings: {
          startsAt
        }
        
      },

      include: {
        screenings: true,
      },
    });

    res.status(201).json({ movie: createMovie });
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

const getMovieID = async (req, res)=> {
  let { id } = req.params;
  id = Number(id);
  const getMovieID = await prisma.movie.findUnique({
    where: {
      id: id
    },
    include: {
      screenings: true,
    },
  })
  res.json({ movie: getMovieID });
}

const updateMovie = async (req, res) => {
  let { id } = req.params;
  id = Number(id);
  const { title, runtimeMins } = req.body;

  const updateMovie = await prisma.movie.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      runtimeMins: runtimeMins

    },
    include: {
        screenings: true,
      },
  });
  
  res.status(201).json({ movie: updateMovie });
};

module.exports = {
  getAllMovies,
  getMovieID,
  createMovie,
  updateMovie
  };