const {
  selectMovies,
  selectMovieById,
  createMovieAndScreenings,
  createMovie,
  updateMovieReplaceScreenings,
  updateMovie,
} = require("../domains/movie.domain.js");
const handleError = require("../utils/error.js");

const Types = require("../utils/types.d.js");

/**
 * @param {Types.Request} req
 * @param {Types.Response} res
 * @returns {Promise<void>}
 */
async function getMovies(req, res) {
  const { runtimeLt, runtimeGt } = req.query;

  let runTimeLessThan;
  let runTimeGreaterThan;
  if (typeof runtimeLt !== "undefined") {
    runTimeLessThan = Number(runtimeLt);
  }
  if (typeof runtimeGt !== "undefined") {
    runTimeGreaterThan = Number(runtimeGt);
  }

  try {
    const requestedMovies = await selectMovies(
      runTimeLessThan,
      runTimeGreaterThan
    );
    res.json({ movies: requestedMovies });
  } catch (error) {
    handleError(error, res);
  }
}

/**
 * @param {Types.Request} req
 * @param {Types.Response} res
 * @returns {Promise<void>}
 */
async function getMovieById(req, res) {
  const id = Number(req.params.id);

  try {
    const requestedMovie = await selectMovieById(id);
    res.json({ movie: requestedMovie });
  } catch (error) {
    handleError(error, res);
  }
}

/**
 * @param {Types.Request} req
 * @param {Types.Response} res
 * @returns {Promise<void>}
 */
async function postMovie(req, res) {
  const { title, runtimeMins, screenings } = req.body;

  let newMovie;
  try {
    if (screenings) {
      newMovie = await createMovieAndScreenings(title, runtimeMins, screenings);
    }
    if (!screenings) newMovie = await createMovie(title, runtimeMins);
  } catch (error) {
    handleError(error, res);
    return;
  }

  res.status(201).json({ movie: newMovie });
}

/**
 * @param {Types.Request} req
 * @param {Types.Response} res
 * @returns {Promise<void>}
 */
async function putMovie(req, res) {
  const { title, runtimeMins, screenings } = req.body;
  const movieId = Number(req.params.id);

  let amendedMovie;
  try {
    if (screenings)
      amendedMovie = await updateMovieReplaceScreenings(
        movieId,
        title,
        runtimeMins,
        screenings
      );
    if (!screenings)
      amendedMovie = await updateMovie(movieId, title, runtimeMins);
  } catch (error) {
    handleError(error, res);
    return;
  }

  res.status(201).json({ movie: amendedMovie });
}

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
  putMovie,
};
