const { PrismaClientKnownRequestError } = require("@prisma/client");
const {
  fetchAllMoviesDb,
  insertMovieDb,
  retrieveMovieByIdDb,
  modifyMovieByIdDb,
} = require("../domains/movies.js");

//Fetching - getting all the movies

const fetchAllMovies = async (request, response) => {
  const allMovies = await fetchAllMoviesDb();
  return response.status(200).json({ allMovies });
};

//Retrieving - getting movie by ID
const retrieveMovieById = async (request, response) => {
  const id = Number(request.params.id);
  const foundMovie = await retrieveMovieByIdDb(id);
  if (foundMovie) {
    return response.status(200).json({ movie: foundMovie });
  }

  return response
    .status(404)
    .json({ error: "No movie found with the provided ID" });
};

// Inserting a movie - Creating a movie
const insertMovie = async (request, response) => {
  const { newTitle, newRuntimeMins } = request.body;
  if (!newTitle && !newRuntimeMins) {
    return response
      .status(400)
      .json({ error: "Missing fields in the request body" });
  }
  try {
    const createdMovie = await insertMovieDb(newTitle, newRuntimeMins);
    return response.status(201).json({ movie: createdMovie });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return response
          .status(409)
          .json({ error: "A movie with the provided title already exists" });
      }
    }
    response.status(500).json({ error: error.message });
  }
};

// Modifying the movie - updating movie by ID
const modifyMovieById = async (request, response) => {
  const id = parseInt(request.params.id);
  const { newTitle, newRuntimeMins } = request.body;
  const movie = await retrieveMovieByIdDb(id, newTitle, newRuntimeMins);
  return response.status(201).json({ movie });
};

module.exports = {
  fetchAllMovies,
  insertMovie,
  retrieveMovieById,
  modifyMovieById,
};
