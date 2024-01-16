const {
  getMoviesDb,
  getMoviesWhereAndDb,
  getMoviesWhereLtDb,
  getMoviesWhereGtDb,
  createMovieDb,
	createMovieWithScreeningsDb,
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
  let createdMovie
  
  if (!title || !runtimeMins) {
    res.status(400).json({ error: "Missing fields in request body" });
  }

  if(!screenings) {
     createdMovie = await createMovieDb(title, runtimeMins);
  }

  if (screenings) {
   createdMovie = await createMovieWithScreeningsDb(title, runtimeMins, screenings)
  }
  res.status(201).json({ movie: createdMovie });
};

module.exports = {
  getMovies,
  createMovie,
};
