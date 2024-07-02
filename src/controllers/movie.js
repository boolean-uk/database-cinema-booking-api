const {
  getAllMoviesDb,
  createMovieDb,
  getMovieByIdOrTitleDb,
  updateMovieDb,
} = require("../domains/movie")

const getAllMovies = async (req, res) => {
  const runtimeLt = Number(req.query.runtimeLt)
  const runtimeGt = Number(req.query.runtimeGt)
  const movies = await getAllMoviesDb(runtimeLt, runtimeGt)

  res.json({
    movies,
  })
}

const createMovie = async (req, res) => {
  const { title, runtimeMins, screenings } = req.body
  const movie = await createMovieDb(title, runtimeMins, screenings)

  res.status(201).json({
    movie,
  })
}

const getMovieByIdOrTitle = async (req, res) => {
  let id = Number(req.params.idOrTitle)
  let title = undefined

  if (isNaN(id)) {
    title = req.params.idOrTitle
    id = undefined
  }

  const movie = await getMovieByIdOrTitleDb(id, title)

  res.json({
    movie,
  })
}

const updateMovie = async (req, res) => {
  const paramsId = Number(req.params.id)
  const { title, runtimeMins, screenings } = req.body
  const movie = await updateMovieDb(paramsId, title, runtimeMins, screenings)

  res.status(201).json({
    movie,
  })
}

module.exports = {
  getAllMovies,
  createMovie,
  getMovieByIdOrTitle,
  updateMovie,
}
