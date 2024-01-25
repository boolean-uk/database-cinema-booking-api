const {
    getAllMoviesDb,
    createMovieDb,
    getMovieByIdDb,
    updateMovieByIdDb,
  } = require("../domains/movies");
  
  const getAllMovies = async (req, res) => {
    try {
      const allMovies = await getAllMoviesDb(req.query)
      return res.status(200).send({ movies: allMovies })
    } catch (e) {
      console.error(e.message)
      return res.status(500).send({ error: e.message })
    }
  }

  const getMovieById = async (req, res) => {
    const id = Number(req.params.id)

    const foundMovie = await getMovieByIdDb(id)
    if (foundMovie) {
      return res.status(200).send({ movie: foundMovie })
    }
    return res.status(404).send({ error: "No movie found with provided ID" })
  }
  
  // Controller function to create a new movie
  const createMovie = async (req, res) => {
    try {
      const { title, runtimeMins } = req.body
      if (!title && !runtimeMins) {
        return res.status(400).send({ error: "Missing fields in request body" })
      }
      const allMovies = await getAllMoviesDb(req.query)
      const titleExists = allMovies.some((movie) => movie.title === title)
  
      if (titleExists) {
        return res
          .status(409)
          .send({ error: "A movie with the provided title already exists" })
      }
  
      // Call the domain function to create a new movie
      const createdMovie = await createMovieDb(title, runtimeMins)
      return res.status(201).send({ movie: createdMovie })
    } catch (e) {
      console.log(e.message)
      return res.status(500).json({ error: e.message })
    }
  }
  
  // Controller function to update a movie by ID
  const updateMovieById = async (req, res) => {
    try {
      const id = Number(req.params.id)
      const { title, runtimeMins, screenings } = req.body
      const movie = await getMovieByIdDb(id)
  
      // Check for missing fields
      if (!title && !runtimeMins && !screenings) {
        return res.status(400).send({ error: "Missing fields in request body" })
      }
      if (!movie) {
        return res.status(404).send({ error: "No movie with the provided ID" })
      }
  
      // Call the domain function to update the movie by ID
      const updatedMovie = await updateMovieByIdDb(req.body, id)
  
      // Respond with a 201 status and the updated movie
      return res.status(201).send({ movie: updatedMovie })
    } catch (e) {
      // Handle errors and respond with a 500 status
      console.log(e.message);
      return res.status(500).json({ error: e.message })
    }
  }
  
  module.exports = {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovieById,
  }
  