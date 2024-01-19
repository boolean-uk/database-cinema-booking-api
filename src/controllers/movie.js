const {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
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
  updateMovieWithScreeningsDb,
} = require("../domains/movie");

const getMovies = async (req, res) => {
  let movies;
  const { runtimeLt, runtimeGt } = req.query;
  if (runtimeLt && runtimeGt) {
    const runtimeLtNum = Number(runtimeLt);
    const runtimeGtNum = Number(runtimeGt);
    movies = await getMoviesWhereAndDb(runtimeGtNum, runtimeLtNum);
  }

  if (runtimeLt && !runtimeGt) {
    const runtimeLtNum = Number(runtimeLt);
    movies = await getMoviesWhereLtDb(runtimeLtNum);
  }

  if (runtimeGt && !runtimeLt) {
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

  if (!screenings || screenings.length === 0) {
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
      if (e instanceof PrismaClientValidationError) {
        // e.code is undefined for P1012 ("Arguement {} is missing.")
        // hence testing that the ends of the message matches what
        // we'd expect instead.
        if (e.message.endsWith("is missing.")) {
          res.status(400).json({ error: "Missing fiels in request body" });
          return;
        }
      }
    }
  }

  if (screenings && screenings.length !== 0) {
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

const getMovieBy = async (req, res) => {
  const { searchparam } = req.params;
  let movie;

  if (Number(searchparam)) {
    const idNum = Number(searchparam);
    movie = await getMovieByIdDb(idNum);
  } else {
    [movie] = await getMovieByTitleDb(searchparam);
  }
  // attempts to refactor to try...catch seemed to indicate
  // that prisma does not throw an error when a findUnique() fails
  // TODO: look up docs to see whether this is accurate
  if (!movie || movie.length === 0) {
    res.status(404).json({ error: "movie not found" });
    return;
  }
  res.json({ movie: movie });
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const idNum = Number(id);
  let updatedMovie;

  if (
    !data.title ||
    !data.runtimeMins ||
    data.title.length === 0 ||
    data.runtimeMins.length === 0
  ) {
    res.status(400).json({ error: "Missing fiels in request body" });
    return;
  }

  try {
    if(data.screenings) {
      updatedMovie = await updateMovieWithScreeningsDb(idNum, data)
      res.status(201).json({ movie: updatedMovie });
      return
    }
    updatedMovie = await updateMovieDb(idNum, data);
    res.status(201).json({ movie: updatedMovie });
    return
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
  if (!updatedMovie || updatedMovie.length === 0) {
    res.status(404).json({ error: "movie not found" });
    return;
  }
};

module.exports = {
  getMovies,
  createMovie,
  getMovieBy,
  updateMovie,
};
