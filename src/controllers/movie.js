const {
  getMoviesDb,
  getMoviesWhereAndDb,
  getMoviesWhereOrDb,
  getMoviesWhereLtDb,
  getMoviesWhereGtDb,
  createMovieDb,
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
  console.log(movies)

  res.json({ movies: movies });
};

const createMovie = async (req, res) => {
  const { title, runtimeMins, screenings } = req.body;

  if (!title || !runtimeMins) {
    res.status(400).json({ error: "Missing fields in request body" });
  }
  const createdMovie = await createMovieDb(title, runtimeMins, screenings);

  res.status(201).json({ movie: createdMovie });
};

module.exports = {
  getMovies,
  createMovie,
};
