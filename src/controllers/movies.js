

const { PrismaClientKnownRequestError } = require("@prisma/client");
const { getAllMoviesDb, createNewMoviesDb, getMovieByIdDb, updateMovieByIdDb } = require("../domains/movies.js");

// get all movies
const getAllMovies = async (req, res) => {

  const movies = await getAllMoviesDb()
  res.status(200).json({ movies })
}

// create movie
const createNewMovies = async (req, res) => {
  const { title, runtimeMins } = req.body;

  if (!title || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const createdMovie = await createNewMoviesDb(title, runtimeMins);

    res.status(201).json({ movie: createdMovie });
  }
  catch (e) {

    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(409)
          .json({ error: "A movie with the provided title already exists" });
      }
    }

    res.status(500).json({ error: e.message });
  }
};

//get movie by id
const getMovieById = async (req, res) => {

  const id = parseInt(req.params.id)
  const movieId = await getMovieByIdDb(id)
  res.status(200).json({ movieId })

}

//updae movie by id
const updateMovieById = async (req, res) => {

  const id = Number(req.params.id);
  const { title, runtimeMins } = req.body;
  const updatedMovie = await updateMovieByIdDb(id, title, runtimeMins);
  res.status(201).json({ movie: updatedMovie });
};




module.exports = { getAllMovies, createNewMovies, getMovieById, updateMovieById };
