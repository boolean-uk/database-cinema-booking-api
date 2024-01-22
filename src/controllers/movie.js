const express = require("express");
const router = express.Router();
const DomainMovie = require("../domains/movie");
const theDomainMovie = new DomainMovie();

router.get("/", async (req, res) => {
  try {
    const movies = await theDomainMovie.fetchAllMovies();
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, runtimeMins, screenings } = req.body;
    const addNewMovie = await theDomainMovie.createMovie(
      title,
      runtimeMins,
      screenings
    );
    res.status(201).json({ movie: addNewMovie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getMovie = await theDomainMovie.fetchMovieById(id);

    res
      .status(getMovie ? 200 : 404)
      .json(getMovie ? { getMovie } : { message: "Movie not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, runtimeMins } = req.body;

    const theUpdatedMovie = await theDomainMovie.updateMovie(
      id,
      title,
      runtimeMins
    );

    res
      .status(theUpdatedMovie ? 201 : 404)
      .json(
        theUpdatedMovie
          ? { movie: theUpdatedMovie }
          : { message: "Movie not found" }
      );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
