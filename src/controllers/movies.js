const {
  fetchAllMoviesDb,
  insertMovieDb,
  retrieveMovieByIdDb,
  modifyMovieByIdDb,
} = require("../domains/movies.js");

//Fetching - getting all the movies

const fetchAllMovies = async (request, response) => {
  try {
    const allMovies = await fetchAllMoviesDb(request.query);

    return response.status(200).send({ movies: allMovies });
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ error: error.message });
  }
};

//Retrieving - getting movie by ID

const retrieveMovieById = async (request, response) => {
  const id = Number(request.params.id);

  const foundMovie = await retrieveMovieByIdDb(id);

  if (foundMovie) {
    return response.status(200).send({ movie: foundMovie });
  }

  return response
    .status(404)
    .send({ error: "No movie found with the provided ID" });
};

// Inserting a movie - Creating a movie

const insertMovie = async (request, response) => {
  try {
    const { newTitle, newRuntimeMins } = request.body;

    if (!newTitle && !newRuntimeMins) {
      return response
        .status(400)
        .send({ error: "Missing fields in the request body" });
    }

    const allMovies = await fetchAllMoviesDb(request.query);

    const titleExists = allMovies.some((movie) => movie.title === newTitle);

    if (titleExists) {
      return response
        .status(409)
        .send({ error: "A movie with the provided title already exists" });
    }

    const createdMovie = await insertMovieDb(newTitle, newRuntimeMins);

    return response.status(201).send({ movie: createdMovie });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ error: error.message });
  }
};

// Modifying the movie - updating movie by ID

const modifyMovieById = async (request, response) => {
  try {
    const id = Number(request.params.id);
    const { newTitle, newRuntimeMins, newScreenings } = request.body;
    const movie = await retrieveMovieByIdDb(id);

    if (!newTitle && !newRuntimeMins && !newScreenings) {
      return response
        .status(400)
        .send({ error: "Missing fields in the request body" });
    }

    if (!movie) {
      return response
        .status(404)
        .send({ error: "No movie with the provided ID" });
    }

    const updatedMovie = await modifyMovieByIdDb(request.body, id);

    return response.status(201).send({ movie: updatedMovie });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ error: error.message });
  }
};

module.exports = {
  fetchAllMovies,
  insertMovie,
  retrieveMovieById,
  modifyMovieById,
};
