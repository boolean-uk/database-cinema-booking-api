const {
  PrismaClientKnownRequestError, PrismaClientValidationError,
} = require("@prisma/client/runtime/library");
const {
  getMoviesDb,
  getMoviesWhereAndDb,
  getMoviesWhereLtDb,
  getMoviesWhereGtDb,
  createMovieDb,
  createMovieWithScreeningsDb,
  getMovieByIdDb,
  updateMovieDb,
  getMovieByTitleDb,
} = require("../domains/movie");

const getMovies = async (req, res) => {
  let movies;
  const { runtimeLt, runtimeGt } = req.query;
  if (runtimeLt && runtimeGt) {
    const runtimeLtNum = Number(runtimeLt);
    const runtimeGtNum = Number(runtimeGt);
    movies = await getMoviesWhereAndDb(runtimeLtNum, runtimeGtNum);
  }

  if (runtimeLt) {
    const runtimeLtNum = Number(runtimeLt);
    movies = await getMoviesWhereLtDb(runtimeLtNum);
  }

  if (runtimeGt) {
    const runtimeGtNum = Number(runtimeGt);
    movies = await getMoviesWhereGtDb(runtimeGtNum);
  }

  if (!runtimeLt && !runtimeGt) {
    movies = await getMoviesDb();
  }

  res.json({ movies: movies });
};

const createMovie = async (req, res) => {
  const { title, runtimeMins, screenings } = req.body;
  let createdMovie;

  if (!screenings) {
    try {
      createdMovie = await createMovieDb(title, runtimeMins);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          res
          .status(409)
          .json({ error: "A movie with the provided title already exists" });
          return;
        }
      }
      if(e instanceof PrismaClientValidationError){
        // e.code is undefined for P1012 ("Arguement {} is missing.")
        // hence testing that the ends of the message matches what 
        // we'd expect instead.
        if (e.message.endsWith("is missing.")) {
          console.log(e.message)
          res
            .status(400)
            .json({ error: "Missing fiels in request body" });
          return;
        }
      }

    }
  }

  if (screenings) {
    try {
      createdMovie = await createMovieWithScreeningsDb(
        title,
        runtimeMins,
        screenings
      );
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          res
            .status(409)
            .json({ error: "A movie with the provided title already exists" });
          return;
        }
      }
    }
  }
  res.status(201).json({ movie: createdMovie });
};

const getMovieById = async (req, res) => {
  const { id } = req.params;
  const idNum = Number(id);
  const movie = await getMovieByIdDb(idNum);
  if (!movie) {
    res.status(404).json("movie not found");
  }
  res.json({ movie: movie });
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const idNum = Number(id);
  const updatedMovie = await updateMovieDb(idNum, data);
  res.status(201).json({ movie: updatedMovie });
};

module.exports = {
  getMovies,
  createMovie,
  getMovieById,
  updateMovie,
};
